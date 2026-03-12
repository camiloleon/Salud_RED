# Script para monitorear descarga de SharePoint y copiar automáticamente
# Ejecutar este script después de iniciar la descarga

$downloadFolder = "$env:USERPROFILE\Downloads"
$targetFolder = "D:\Hotmail\OneDrive\GIT\Salud_RED\fuentes_dashboard"
$fileName = "ESTRUCTURA MODELO GESTION INTEGRAL (RESIDENCIAL) MARZO 2026.xlsb"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  MONITOR DE DESCARGA DE SHAREPOINT" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Monitoreando: $downloadFolder" -ForegroundColor White
Write-Host "Archivo esperado: $fileName" -ForegroundColor White
Write-Host ""
Write-Host "Esperando descarga..." -ForegroundColor Yellow
Write-Host "(Presiona Ctrl+C para cancelar)" -ForegroundColor Gray
Write-Host ""

$timeout = 300 # 5 minutos
$elapsed = 0
$interval = 2 # Check every 2 seconds

while ($elapsed -lt $timeout) {
    $filePath = Join-Path $downloadFolder $fileName
    
    if (Test-Path $filePath) {
        Write-Host "✅ Archivo detectado!" -ForegroundColor Green
        Start-Sleep -Seconds 2 # Wait for download to complete
        
        Write-Host "Copiando a fuentes_dashboard..." -ForegroundColor Yellow
        
        try {
            Copy-Item $filePath $targetFolder -Force
            Write-Host "✅ Archivo copiado exitosamente!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Ubicación final: $targetFolder\$fileName" -ForegroundColor Cyan
            
            # Show file info
            $fileInfo = Get-Item (Join-Path $targetFolder $fileName)
            Write-Host ""
            Write-Host "Información del archivo:" -ForegroundColor Cyan
            Write-Host "  Tamaño: $([math]::Round($fileInfo.Length / 1MB, 2)) MB" -ForegroundColor White
            Write-Host "  Fecha: $($fileInfo.LastWriteTime)" -ForegroundColor White
            
            exit 0
        }
        catch {
            Write-Host "❌ Error al copiar: $_" -ForegroundColor Red
            exit 1
        }
    }
    
    Write-Host "." -NoNewline -ForegroundColor Gray
    Start-Sleep -Seconds $interval
    $elapsed += $interval
    
    if ($elapsed % 10 -eq 0) {
        Write-Host " $elapsed s" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "⏱️ Tiempo de espera agotado" -ForegroundColor Yellow
Write-Host "Por favor verifica que el archivo se descargó correctamente" -ForegroundColor White
