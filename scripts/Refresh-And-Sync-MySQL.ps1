param(
    [Parameter(Mandatory = $true)]
    [string]$WorkbookPath,

    [string]$PythonExe = "c:/python314/python.exe",
    [switch]$SkipRefresh,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $WorkbookPath)) {
    throw "Workbook not found: $WorkbookPath"
}

if (-not $SkipRefresh) {
    powershell -NoProfile -ExecutionPolicy Bypass -File "D:\Hotmail\OneDrive\GIT\Salud_RED\scripts\Refresh-ExcelPowerBI.ps1" -WorkbookPath $WorkbookPath -AllowInteractiveAuth -KillExcelBeforeRun:$true -UseRefreshOnLoadOnly:$true
}

$args = @("D:\Hotmail\OneDrive\GIT\Salud_RED\scripts\sync_excel_to_mysql.py", "--workbook", $WorkbookPath)
if ($DryRun) {
    $args += "--dry-run"
}

& $PythonExe @args
if ($LASTEXITCODE -ne 0) {
    throw "sync_excel_to_mysql.py failed with exit code $LASTEXITCODE"
}

Write-Output "Refresh + MySQL sync completed"
