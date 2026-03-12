$ErrorActionPreference = "Stop"

$root = "D:\Hotmail\OneDrive\GIT\Salud_RED"
$workbook = "$root\fuentes_dashboard\Base_KPI_OM_TRF_Fijo_DATOS.xlsx"
$stateFile = "$root\data\sync_state.json"
$python = "c:/python314/python.exe"

if (-not (Test-Path -LiteralPath $stateFile)) {
    "{`"bootstrap_done`": false, `"last_mode`": `"none`", `"last_run_utc`": `"`"}" | Set-Content -Path $stateFile -Encoding UTF8
}

$state = Get-Content $stateFile -Raw | ConvertFrom-Json
$today = Get-Date -Format "yyyy-MM-dd"
$twoDaysBack = (Get-Date).AddDays(-2).ToString("yyyy-MM-dd")

if (-not $state.bootstrap_done) {
    $mode = "bootstrap"
    $start = "2023-01-01"
    $end = $today
} else {
    $mode = "incremental"
    $start = $twoDaysBack
    $end = $today
}

Write-Output "[INFO] mode=$mode window=$start..$end"

& $python "$root\scripts\update_excel_query_window.py" --workbook $workbook --start $start --end $end
if ($LASTEXITCODE -ne 0) { throw "Failed to patch query window" }

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$root\scripts\Refresh-ExcelPowerBI.ps1" -WorkbookPath $workbook -AllowInteractiveAuth -KillExcelBeforeRun -UseRefreshOnLoadOnly
if ($LASTEXITCODE -ne 0) { throw "Excel refresh failed" }

if (Test-Path -LiteralPath "$root\.env.mysql") {
    & $python "$root\scripts\sync_excel_to_mysql.py" --workbook $workbook --only-tables O_M Tabla2 TRF_Fijo --mode $mode --bootstrap-start "2023-01-01" --incremental-days 2
    if ($LASTEXITCODE -ne 0) { throw "MySQL sync failed" }
} else {
    Write-Output "[WARN] Missing .env.mysql. Skipping MySQL sync."
}

$state.bootstrap_done = $true
$state.last_mode = $mode
$state.last_run_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$state | ConvertTo-Json | Set-Content -Path $stateFile -Encoding UTF8

Write-Output "[INFO] run_refresh_30min completed"
