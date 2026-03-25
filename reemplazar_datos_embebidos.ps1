# Script para reemplazar EMBEDDED_FRAUD_DATA en fraud_charts.js

# Leer el nuevo contenido (fraud_data_embedded.js)
$newData = Get-Content "fraud_data_embedded.js" -Raw -Encoding UTF8

# Leer fraud_charts.js completo
$fraudChartsContent = Get-Content "dashboard/fraud_charts.js" -Raw -Encoding UTF8

# Buscar el inicio y fin del objeto EMBEDDED_FRAUD_DATA
$startPattern = 'const EMBEDDED_FRAUD_DATA = {'
$endPattern = '};'

# Encontrar posiciones
$startIndex = $fraudChartsContent.IndexOf($startPattern)
if ($startIndex -eq -1) {
    Write-Host "❌ No se encontró EMBEDDED_FRAUD_DATA" -ForegroundColor Red
    exit 1
}

# Buscar el cierre del objeto (el primer }; después del inicio)
$searchStart = $startIndex + $startPattern.Length
$endIndex = $fraudChartsContent.IndexOf($endPattern, $searchStart)
if ($endIndex -eq -1) {
    Write-Host "❌ No se encontró el cierre del objeto" -ForegroundColor Red
    exit 1
}

# Calcular longitud a reemplazar (incluye '};')
$endIndex += $endPattern.Length

# Construir nuevo contenido
$before = $fraudChartsContent.Substring(0, $startIndex)
$after = $fraudChartsContent.Substring($endIndex)
$newContent = $before + $newData.TrimEnd() + $after

# Guardar
$newContent | Set-Content "dashboard/fraud_charts.js" -Encoding UTF8 -NoNewline

Write-Host "Reemplazado exitosamente" -ForegroundColor Green
Write-Host "  Archivo: dashboard/fraud_charts.js" -ForegroundColor Cyan
$length = $endIndex - $startIndex
Write-Host "  Longitud reemplazada: $length caracteres" -ForegroundColor Cyan
