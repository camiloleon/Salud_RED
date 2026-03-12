# Automatizacion 360 - Base KPI O&M (Power BI Azure)

## Hallazgos del archivo
Archivo analizado: `fuentes_dashboard/Base KPI O&M _ TRF Fijo - DATOS.xlsx`

Se detecto en `xl/connections.xml`:
- `Data Source=pbiazure://api.powerbi.com`
- `Provider=MSOLAP.8`
- `Integrated Security=ClaimsToken`
- `Identity Provider=https://login.microsoftonline.com/common, https://analysis.windows.net/powerbi/api`
- `refreshOnLoad=1`

Esto confirma autenticacion delegada de usuario (token Entra) y no una conexion de servicio desatendida.

## Opciones 360
1. Automatizar Excel Desktop (rapida)
- Pros: implementacion inmediata, sin rediseno de modelo.
- Contras: depende de sesion interactiva, MFA/token, Office UI/COM fragil.

2. XMLA + Service Principal (recomendada para produccion)
- Pros: robusta, segura, auditable, sin dependencia de escritorio.
- Contras: requiere configuracion de tenant/workspace/licencias y pipeline backend.

3. Power Automate/Dataflow
- Pros: low-code con gobierno M365.
- Contras: limites/cuotas y menor control fino.

4. REST API + almacenamiento (SQL/ADLS)
- Pros: arquitectura desacoplada y escalable.
- Contras: mayor complejidad tecnica inicial.

## Recomendacion operativa
- Corto plazo: ejecutar refresco cada 30 min con Excel COM y logs.
- Mediano plazo: migrar a XMLA + Service Principal + Key Vault.

## Implementacion incluida en este repo
- Script de refresco: `scripts/Refresh-ExcelPowerBI.ps1`
- Script de registro de tarea: `scripts/Register-ExcelRefreshTask.ps1`
- Orquestador de tarea 30 min: `scripts/run_refresh_30min.ps1`
- Script de prime de token: `scripts/Prime-ExcelPowerBIToken.ps1`
- Analizador de conexiones: `scripts/analyze_excel_connections.py`
- Parche de ventana del query DAX en Excel: `scripts/update_excel_query_window.py`
- Carga incremental a MySQL: `scripts/sync_excel_to_mysql.py`

## Uso inmediato
1. Analizar conexiones y generar reporte:
```powershell
c:/python314/python.exe scripts/analyze_excel_connections.py
```
2. Usar archivo con nombre seguro para scheduler:
```powershell
Copy-Item -LiteralPath "d:\Hotmail\OneDrive\GIT\Salud_RED\fuentes_dashboard\Base KPI O&M _ TRF Fijo - DATOS.xlsx" -Destination "d:\Hotmail\OneDrive\GIT\Salud_RED\fuentes_dashboard\Base_KPI_OM_TRF_Fijo_DATOS.xlsx" -Force
```
3. Registrar tarea cada 30 min:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/Register-ExcelRefreshTask.ps1 -WorkbookPath "d:\Hotmail\OneDrive\GIT\Salud_RED\fuentes_dashboard\Base_KPI_OM_TRF_Fijo_DATOS.xlsx"
```
4. Ejecutar prueba manual de refresco:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/Refresh-ExcelPowerBI.ps1 -WorkbookPath "d:\Hotmail\OneDrive\GIT\Salud_RED\fuentes_dashboard\Base_KPI_OM_TRF_Fijo_DATOS.xlsx" -AllowInteractiveAuth -KillExcelBeforeRun -UseRefreshOnLoadOnly
```
5. Verificar tarea:
```powershell
schtasks /Query /TN "OTC_Excel_Refresh_30min" /V /FO LIST
```

## Modo de carga a MySQL (lo solicitado)
- Primera corrida (bootstrap):
	- Ajusta query del Excel a ventana `2023-01-01` hasta hoy.
	- Refresca Excel.
	- Carga tablas `O_M`, `Tabla2`, `TRF_Fijo` a MySQL.
- Corridas siguientes (incremental):
	- Ajusta query del Excel a ventana `hoy-2` hasta hoy.
	- Refresca Excel.
	- Sube solo filas del rango de los ultimos 2 dias.

El estado se guarda en `data/sync_state.json`.

## Notas criticas
- Usar `Run only when user is logged on` para que Excel COM y ClaimsToken funcionen.
- Si caduca token/MFA, abrir Excel manualmente una vez para renovar sesion.
- Si hay prompts de cuenta Microsoft/Power BI, ejecutar prime:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/Prime-ExcelPowerBIToken.ps1 -WorkbookPath "d:\Hotmail\OneDrive\GIT\Salud_RED\fuentes_dashboard\Base_KPI_OM_TRF_Fijo_DATOS.xlsx"
```
- Revisar logs en `logs/excel_refresh_YYYYMMDD.log`.
