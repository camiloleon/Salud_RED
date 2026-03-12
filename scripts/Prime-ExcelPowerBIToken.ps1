param(
    [Parameter(Mandatory = $true)]
    [string]$WorkbookPath,
    [int]$WaitSeconds = 180
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $WorkbookPath)) {
    throw "Workbook not found: $WorkbookPath"
}

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $true
$excel.DisplayAlerts = $false

$workbook = $excel.Workbooks.Open($WorkbookPath, 3, $false)
Write-Output "Workbook opened. Complete any Microsoft/Power BI sign-in prompts if shown."
Start-Sleep -Seconds $WaitSeconds

try { $workbook.Save() } catch {}
try { $workbook.Close($true) } catch {}
try { $excel.Quit() } catch {}

[void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($workbook)
[void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($excel)
[GC]::Collect()
[GC]::WaitForPendingFinalizers()
