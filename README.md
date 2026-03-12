# Dashboard OTC MVP+

Aplicación MVP para monitoreo de salud de red OTC con enfoque operativo por rol.

## Incluye
- Login por rol (`director`, `jefe`, `owner`).
- KPI principal `score_otc` + `salud_otc_50_50` (móvil/fijo).
- Filtros jerárquicos y rango de fechas.
- Ranking Top 20 críticos (menor score, mayor impacto clientes).
- Drill-down por nivel (`regional`, `zona`, `aliado`, `responsable`, `sitio`).
- Alerta por atraso de dato + fallback de último valor válido.
- Exportación CSV / Excel / PDF.
- Auditoría de eventos (`logs/audit_log.csv`).
- Pipeline diario de procesamiento + reporte DQ.

## Arquitectura
- `app.py`: interfaz Streamlit.
- `src/otc_dashboard/pipeline.py`: validación, fallback, KPIs, score OTC, top críticos.
- `src/otc_dashboard/auth.py`: usuarios con hash SHA-256 y scope por rol.
- `src/otc_dashboard/exports.py`: exportaciones CSV/Excel/PDF.
- `src/otc_dashboard/audit.py`: bitácora de accesos/exportaciones.
- `scripts/run_daily_refresh.py`: job diario de procesamiento.

## Ejecutar local
1. Crear/activar entorno Python.
2. Instalar dependencias:
   - `pip install -r requirements.txt`
3. Ejecutar:
   - `streamlit run app.py`

## Job diario
- Ejecutar procesamiento diario:
   - `python scripts/run_daily_refresh.py`
- Salidas:
   - `data/processed_otc.csv`
   - `data/dq_report.csv`

## Pruebas
- `pytest -q`

## Usuarios demo
- `director / otc123`
- `jefe_cali / otc123`
- `owner_tol / otc123`

Los usuarios están en `data/users.json` con password almacenado en hash.

## Carga de datos reales
Si existe `data/input_otc.csv`, la app lo usa en lugar de datos sintéticos.
Puedes partir del archivo `data/input_otc_template.csv` y guardarlo como `data/input_otc.csv`.

Columnas esperadas mínimas:
- `fecha`, `pais`, `regional`, `zona`, `aliado`, `responsable`, `sitio`, `impacto_clientes`
- `sr_movil`, `sr_fijo`
- `kpi_crt`, `kpi_icr`, `kpi_ruido`, `kpi_trf_fijo`, `kpi_dispon`
- `kpi_q30`, `kpi_tr`, `kpi_1ag`, `kpi_efect_xp`
