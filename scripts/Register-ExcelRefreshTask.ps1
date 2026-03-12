param(
    [Parameter(Mandatory = $true)]
    [string]$WorkbookPath,

    [string]$TaskName = "OTC_Excel_Refresh_30min",
    [string]$ScriptPath = "D:\Hotmail\OneDrive\GIT\Salud_RED\scripts\Refresh-ExcelPowerBI.ps1",
    [string]$TaskCmdPath = "D:\Hotmail\OneDrive\GIT\Salud_RED\scripts\run_refresh_30min.ps1"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $WorkbookPath)) {
    throw "Workbook not found: $WorkbookPath"
}
if (-not (Test-Path -LiteralPath $TaskCmdPath)) {
    throw "Task command file not found: $TaskCmdPath"
}

$taskRun = "powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$TaskCmdPath`""

$createArgs = @(
    "/Create",
    "/F",
    "/TN", $TaskName,
    "/TR", $taskRun,
    "/SC", "MINUTE",
    "/MO", "30",
    "/RL", "LIMITED",
    "/IT"
)

& schtasks.exe @createArgs | Out-Null

Write-Output "Scheduled task '$TaskName' registered with schtasks (every 30 minutes, interactive)."
