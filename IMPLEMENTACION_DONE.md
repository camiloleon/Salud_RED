# Estado de Implementación - DONE (MVP)

## Producto entregado
Se implementó un **dashboard OTC ejecutable** con:
- Autenticación local por rol (`director`, `jefe`, `owner`) y restricción por alcance.
- Cálculo de KPI principal `score_otc` usando fórmula compuesta acordada.
- Cálculo `salud_otc_50_50 = 50% móvil + 50% fija`.
- Filtros operativos por fecha, zona, aliado, responsable.
- Ranking `Top 20` críticos (menor score + mayor impacto clientes).
- Drill-down por `regional`, `zona`, `aliado`, `responsable`, `sitio`.
- Fallback de último valor válido (hasta 3 días) y marca `is_fallback`.
- Exportaciones CSV, Excel y PDF.

## Validación realizada
- Importación de dependencias: OK.
- Ejecución del pipeline y cálculo de KPIs: OK (`df.shape=(4860, 26)`).
- Arranque de servidor Streamlit en modo headless: OK (sin errores de runtime).

## Ejecución
```bash
pip install -r requirements.txt
streamlit run app.py
```

## Credenciales demo
- `director / otc123`
- `jefe_cali / otc123`
- `owner_tol / otc123`

## Iteración continua (siguiente bucle)
1. Conectar `data/input_otc.csv` con datos reales diarios.
2. Reemplazar autenticación local por corporativa.
3. Endurecer reglas de KPI con diccionario firmado.
4. Publicar en servidor interno con monitoreo de disponibilidad.
5. Agregar alertas e integración con tickets (fase 2).
