param(
    [Parameter(Mandatory = $true)]
    [string]$WorkbookPath,

    [string]$LogDir = "D:\Hotmail\OneDrive\GIT\Salud_RED\logs",
    [int]$MaxAttempts = 3,
    [int]$ComRetryCount = 60,
    [int]$ComRetrySleepMs = 2000,
    [int]$RefreshTimeoutSec = 1200,
    [int]$PollSec = 5,
    [switch]$AllowInteractiveAuth,
    [switch]$KillExcelBeforeRun = $true,
    [switch]$UseRefreshOnLoadOnly
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

$logFile = Join-Path $LogDir ("excel_refresh_{0}.log" -f (Get-Date -Format "yyyyMMdd"))

function Write-Log {
    param(
        [string]$Message,
        [ValidateSet("INFO", "WARN", "ERROR")]
        [string]$Level = "INFO"
    )

    $line = "{0} [{1}] {2}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Level, $Message
    Add-Content -Path $logFile -Value $line
    Write-Output $line
}

function Release-ComObject {
    param([Parameter(ValueFromPipeline = $true)]$ComObject)
    if ($null -ne $ComObject) {
        try { [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($ComObject) } catch {}
    }
}

function Invoke-ExcelComWithRetry {
    param(
        [Parameter(Mandatory = $true)]
        [scriptblock]$Action,
        [string]$ActionName = "Excel COM action",
        [int]$RetryCount = 10,
        [int]$RetrySleepMs = 1500
    )

    for ($i = 1; $i -le $RetryCount; $i++) {
        try {
            & $Action
            return
        }
        catch {
            $msg = $_.Exception.Message
            $isBusy = ($msg -match "0x800AC472") -or ($msg -match "Call was rejected by callee")
            if (-not $isBusy -or $i -eq $RetryCount) {
                throw
            }
            Write-Log "$ActionName busy (attempt $i/$RetryCount). Retrying..." "WARN"
            Start-Sleep -Milliseconds $RetrySleepMs
        }
    }
}

function Wait-ExcelRefresh {
    param(
        [Parameter(Mandatory = $true)]$ExcelApp,
        [int]$TimeoutSec = 1200,
        [int]$PollSeconds = 5
    )

    $start = Get-Date
    while ($true) {
        $elapsed = ((Get-Date) - $start).TotalSeconds
        if ($elapsed -ge $TimeoutSec) {
            throw "Timeout waiting refresh/calc end ($TimeoutSec s)."
        }

        try { $ExcelApp.CalculateUntilAsyncQueriesDone() } catch {}

        $calcDone = $false
        try { $calcDone = ($ExcelApp.CalculationState -eq 0) } catch { $calcDone = $true }

        $isReady = $false
        try { $isReady = [bool]$ExcelApp.Ready } catch { $isReady = $true }

        if ($calcDone -and $isReady) {
            return
        }

        Start-Sleep -Seconds $PollSeconds
    }
}

function Invoke-WorkbookRefresh {
    param(
        [Parameter(Mandatory = $true)]$Workbook,
        [Parameter(Mandatory = $true)]$ExcelApp,
        [int]$RetryCount = 60,
        [int]$RetrySleepMs = 2000,
        [int]$TimeoutSec = 1200,
        [int]$PollSeconds = 5
    )

    $usedConnectionRefresh = $false
    foreach ($conn in $Workbook.Connections) {
        $connName = ""
        try { $connName = $conn.Name } catch { $connName = "<unknown>" }

        try {
            try {
                if ($null -ne $conn.OLEDBConnection) {
                    $conn.OLEDBConnection.BackgroundQuery = $false
                }
            } catch {}

            Write-Log "Refreshing connection: $connName"
            Invoke-ExcelComWithRetry -Action {
                $conn.Refresh()
            } -ActionName "Connection.Refresh($connName)" -RetryCount $RetryCount -RetrySleepMs $RetrySleepMs

            Wait-ExcelRefresh -ExcelApp $ExcelApp -TimeoutSec $TimeoutSec -PollSeconds $PollSeconds
            $usedConnectionRefresh = $true
        }
        catch {
            Write-Log "Connection refresh failed ($connName): $($_.Exception.Message)" "WARN"
        }
    }

    if (-not $usedConnectionRefresh) {
        Write-Log "No connection-level refresh completed; fallback to RefreshAll" "WARN"
        Invoke-ExcelComWithRetry -Action {
            $Workbook.RefreshAll()
        } -ActionName "RefreshAll" -RetryCount $RetryCount -RetrySleepMs $RetrySleepMs
        Wait-ExcelRefresh -ExcelApp $ExcelApp -TimeoutSec $TimeoutSec -PollSeconds $PollSeconds
    }
}

$attempt = 0
$completed = $false

while (-not $completed -and $attempt -lt $MaxAttempts) {
    $attempt++
    $excel = $null
    $workbook = $null

    try {
        Write-Log "Attempt $attempt/$MaxAttempts for: $WorkbookPath"

        if ($KillExcelBeforeRun) {
            Write-Log "Killing previous EXCEL.EXE processes to avoid lock collisions..." "WARN"
            Get-Process EXCEL -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 2
        }

        if (-not (Test-Path -LiteralPath $WorkbookPath)) {
            throw "Workbook not found: $WorkbookPath"
        }

        $excel = New-Object -ComObject Excel.Application
        $excel.DisplayAlerts = $false
        $excel.Visible = [bool]$AllowInteractiveAuth
        $excel.AskToUpdateLinks = $false
        $excel.EnableEvents = $false
        $excel.Interactive = $true

        try {
            Invoke-ExcelComWithRetry -Action {
                $excel.Calculation = -4135  # xlCalculationManual
            } -ActionName "Set Calculation manual" -RetryCount 3 -RetrySleepMs $ComRetrySleepMs
        }
        catch {
            Write-Log "Could not set Calculation mode, continuing: $($_.Exception.Message)" "WARN"
        }

        Invoke-ExcelComWithRetry -Action {
            $script:workbook = $excel.Workbooks.Open($WorkbookPath, 3, $false)
        } -ActionName "Open workbook" -RetryCount $ComRetryCount -RetrySleepMs $ComRetrySleepMs

        foreach ($ws in $workbook.Worksheets) {
            foreach ($lo in $ws.ListObjects) {
                try {
                    if ($null -ne $lo.QueryTable) {
                        $lo.QueryTable.BackgroundQuery = $false
                    }
                } catch {}
            }
        }

        Start-Sleep -Seconds 2
        if ($UseRefreshOnLoadOnly) {
            Write-Log "Using refreshOnLoad-only mode: waiting for async queries after open..."
            Wait-ExcelRefresh -ExcelApp $excel -TimeoutSec $RefreshTimeoutSec -PollSeconds $PollSec
        }
        else {
            Write-Log "Running workbook refresh (connection-first)..."
            Invoke-WorkbookRefresh -Workbook $workbook -ExcelApp $excel -RetryCount $ComRetryCount -RetrySleepMs $ComRetrySleepMs -TimeoutSec $RefreshTimeoutSec -PollSeconds $PollSec
        }

        Write-Log "Saving workbook..."
        Invoke-ExcelComWithRetry -Action {
            $workbook.Save()
        } -ActionName "Workbook Save" -RetryCount $ComRetryCount -RetrySleepMs $ComRetrySleepMs

        Invoke-ExcelComWithRetry -Action {
            $excel.CalculateFullRebuild()
        } -ActionName "CalculateFullRebuild" -RetryCount $ComRetryCount -RetrySleepMs $ComRetrySleepMs

        Write-Log "Refresh completed OK."
        $completed = $true
    }
    catch {
        Write-Log "Attempt $attempt failed: $($_.Exception.Message)" "ERROR"

        if ($attempt -lt $MaxAttempts) {
            $sleep = [Math]::Min(60 * $attempt, 180)
            Write-Log "Retrying in $sleep sec" "WARN"
            Start-Sleep -Seconds $sleep
        } else {
            Write-Log "All retries exhausted" "ERROR"
            throw
        }
    }
    finally {
        if ($null -ne $workbook) {
            try { $workbook.Close($true) } catch {}
        }
        if ($null -ne $excel) {
            try { $excel.Quit() } catch {}
        }

        $workbook | Release-ComObject
        $excel | Release-ComObject

        [GC]::Collect()
        [GC]::WaitForPendingFinalizers()
        [GC]::Collect()
        [GC]::WaitForPendingFinalizers()
    }
}
