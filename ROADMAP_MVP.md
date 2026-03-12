# Roadmap MVP Dashboard OTC

## Objetivo
Entregar un dashboard operativo con vista 360 de red OTC, acceso por rol y priorización Top 20 críticos.

## Alcance MVP (DONE)
- Acceso por rol: `director`, `jefe`, `owner`.
- Filtros por jerarquía: país, regional, zona, aliado, responsable, sitio, fecha.
- KPI principal `score_otc` y componentes fijos/móvil.
- Ranking Top 20 críticos con desempate por impacto clientes.
- Drill-down completo país → sitio.
- Fallback de dato por último valor válido (documentado y marcado).
- Exportación CSV / Excel / PDF del ranking filtrado.
- Indicador de frescura del dato y alerta de atraso.

## Plan de ejecución
1. **Base técnica**: estructura Python + dependencias + datos.
2. **Pipeline**: normalización de fuentes y cálculo de KPIs.
3. **Dashboard**: vistas, filtros, tablas, tendencias, Top 20.
4. **Exportación**: CSV/Excel/PDF desde vista filtrada.
5. **Validación**: smoke test local y guía de ejecución.

## Bucle autónomo de iteración (implementado)
1. Ejecutar `run_daily_refresh.py` para regenerar dataset procesado.
2. Correr pruebas (`pytest -q`) para reglas KPI/fallback.
3. Levantar dashboard y validar UX por rol.
4. Revisar `dq_report.csv` y `audit_log.csv`.
5. Repetir ciclo con nuevos datos sin detener operación.

## Fuera de alcance MVP
- Integración con sistema de tickets.
- Alertas automáticas por correo/Teams.
- Bilingüe (fase 2).
