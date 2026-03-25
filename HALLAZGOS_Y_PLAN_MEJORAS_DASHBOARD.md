# 📊 ANÁLISIS DE DATOS DE FRAUDE - HALLAZGOS Y PLAN DE MEJORAS

**Fecha de análisis:** 24 de marzo de 2026  
**Período de datos:** 10 febrero - 9 marzo 2026  
**Total de casos:** 74 órdenes canceladas por fraude

---

## 🔍 RESUMEN EJECUTIVO

El análisis cruzó DOS fuentes de datos:
1. **"Razones Fraude.xlsx"** (74 registros, 83 campos) - Base principal de OFSC con razones del técnico
2. **"Fraudes Cancelados en RR.xlsx"** (Resumen de 153 cierres totales por 5 usuarios)

### Hallazgo Principal
Los datos actuales del dashboard (74 casos embebidos en `fraud_charts.js`) son incompletos comparados con la nueva base que incluye:
- ✅ Razones específicas de cancelación del técnico
- ✅ Estados de confirmación con el cliente
- ✅ Resultados de gestión (CONFIRMADO, NO CONTACTO, ADELANTO, REPROGRAMADA)
- ✅ Causas de despacho y validaciones
- ✅ Información de reprogramaciones
- ✅ Estados de SLA (EN CUMPLIMIENTO vs EN INCUMPLIMIENTO)
- ✅ Más campos operacionales detallados

---

## 📈 HALLAZGOS CLAVE

### 1. PATRONES DE CONFIRMACIÓN CON CLIENTES
**Hallazgo:** Solo el 55% de casos fueron confirmados con el cliente
- **Confirmados:** 41 casos (55%)
- **No confirmados:** 33 casos (45%)

**Desglose de resultados de confirmación:**
- CONFIRMADO: 23 casos (31%)
- NO CONTACTO: 11 casos (15%)
- ADELANTO: 11 casos (15%)
- REPROGRAMADA: 1 caso (1%)
- Sin resultado: 28 casos (38%)

**Implicación:** Existe un patrón claro de órdenes marcadas como fraude SIN confirmación directa con el cliente, lo que sugiere posibles falsos positivos.

---

### 2. CAUSAS DE DESPACHO Y VALIDACIÓN
**Hallazgo:** Casi todas las órdenes fueron validadas, pero hay un pequeño grupo sin validar

**DESPAC_CAUSA:**
- "Validación razón": 71 casos (96%)
- "Completar visita sistema": 3 casos (4%)

**DESPAC_GESTION:**
- "Razón validada": 71 casos (96%)
- "Visita completada": 3 casos (4%)

**Implicación:** Los 3 casos con "Completar visita sistema" podrían representar un flujo diferente que requiere análisis separado.

---

### 3. REPROGRAMACIONES Y REINCIDENCIAS
**Hallazgo:** 30% de casos tuvieron al menos 1 reprogramación

- **Sin reprogramaciones:** 52 casos (70%)
- **Con 1 reprogramación:** 22 casos (30%)
- **Reincidencias en servicios:** 0 en todos los casos
- **Reincidencias en calidad:** 0 en todos los casos

**Implicación:** Las reprogramaciones podrían indicar complejidad o problemas en la primera visita.

---

### 4. CUMPLIMIENTO DE SLA
**Hallazgo:** Hay casos en incumplimiento de SLA marcados como fraude

- **EN CUMPLIMIENTO:** 52 casos (70%)
- **EN INCUMPLIMIENTO:** 10 casos (14%)
- **NODATA:** 2 casos (3%)
- **Sin dato:** 10 casos (14%)

**Distribución de SLA:**
- SLA 36 horas: 55 casos (74%)
- SLA 72 horas: 19 casos (26%)

**Implicación:** El 14% de fraudesocurrieron en órdenes que ya estaban en incumplimiento de SLA, lo que podría indicar presión por cerrar órdenes vencidas.

---

### 5. DISTRIBUCIÓN POR ALIADO (COMPAÑÍA)
**Hallazgo:** Un aliado concentra más de la mitad de los fraudes

- **CONECTAR TV S.A.S.:** 39 casos (53%)
- **TABASCO OC, LLC. SUCURSAL COLOMBIA:** 22 casos (30%)
- **CICSA COLOMBIA S.A.:** 13 casos (18%)

**Implicación:** CONECTAR TV tiene más del doble de casos que TABASCO, sugiere:
1. Mayor volumen de órdenes asignadas a este aliado
2. Posible problema específico con procesos de este aliado
3. Necesidad de análisis de tasa de fraude vs total de órdenes

---

### 6. DISTRIBUCIÓN POR TIPO DE RED
**Hallazgo:** La mayoría de fraudes son en instalaciones bidireccionales

- **Masivo Bidireccional:** 41 casos (55%)
- **FTTH:** 29 casos (39%)
- **Pymes:** 4 casos (5%)

---

### 7. CONCENTRACIÓN DE FRAUDES POR TÉCNICO
**Hallazgo:** NO hay concentración extrema - la distribución es relativamente pareja

**Top 10 técnicos con más casos:**
1. JESUS ALFREDO RODRIGUEZ MORA: 3 casos
2. MILTON ANDRES AGUDELO RAMIREZ: 2 casos
3. DIDIER ENRIQUE PEREZ SARRIA: 2 casos
4. JOSE ADOLFO TORRES TORRES: 2 casos
5. (Resto con 2 casos cada uno)

**Total de técnicos únicos:** 59

**Promedio:** 1.25 casos por técnico

**Implicación:** El fraude está distribuido entre muchos técnicos, no hay "outliers" significativos que sugieran un técnico específico como problema sistemático.

---

### 8. CONCENTRACIÓN POR ASESOR COMERCIAL
**Hallazgo:** Similar al patrón de técnicos, distribución relativamente pareja

**Top 5 asesores:**
1. JOHANA ROSERO PERENGUE: 3 casos
2. ANDRES MAURICIO MONTER: 2 casos
3. GUZMAN VELA SEBASTIAN: 2 casos
4. ARLEX ADEY PALACIOS LO: 2 casos
5. ZUNIGA RIVERA ANGELICA: 2 casos

**Total de asesores únicos:** 64

**Promedio:** 1.16 casos por asesor

---

### 9. DISTRIBUCIÓN TEMPORAL
**Hallazgo:** Pico de fraudes el 4 de marzo

**Días con más casos:**
- 4 de marzo: 7 casos
- 5 de marzo: 5 casos
- 14, 16, 17, 20 de febrero: 4-5 casos cada día

**Distribución por semana:**
- Semana 10-16 feb: 17 casos
- Semana 17-23 feb: 14 casos
- Semana 24 feb - 2 mar: 16 casos
- Semana 3-9 mar: 27 casos ← **Tendencia al alza**

**Implicación:** Hay un incremento significativo en la última semana del período.

---

### 10. CANALES DE VENTA
**Hallazgo:** Confirmado - AGENTES es el canal con más fraudes

**Canal Principal:**
- AGENTES: 36 casos (49%)
- TELEFONICO VENTA: 20 casos (27%)
- CAV: 15 casos (20%)
- DIGITAL: 2 casos (3%)
- TELEFONICO SERVICIO: 1 caso (1%)

**Canal Secundario (sub-canal):**
- CALLE: 28 casos (38%)
- TMK OUT BOUND: 15 casos (20%)
- CAV: 15 casos (20%)
- PDV: 7 casos (9%)
- TMK IN BOUND: 5 casos (7%)
- ECOMMERCE ASISTIDO: 2 casos (3%)
- SAC: 1 caso (1%)
- EYN: 1 caso (1%)

**Implicación:** El patrón AGENTES → CALLE representa el 38% de todos los fraudes.

---

### 11. COBERTURA GEOGRÁFICA
**Hallazgo:** 67 de 74 registros tienen coordenadas geográficas válidas (91%)

**Registros con coordenadas:** 67/74 (91%)  
**Sin coordenadas:** 7 (9%)

**Implicación:** Excelente para visualización en mapa geográfico.

---

### 12. SUBTIPO DE ÓRDENES
**Hallazgo:** Las instalaciones FTTH y Empaquetadas concentran el 74% de casos

- **Instalacion FTTH:** 28 casos (38%)
- **Instalacion Empaquetada Bi:** 27 casos (36%)
- **Instalacion Basica Bi:** 14 casos (19%)
- **Instalacion Pymes:** 4 casos (5%)
- **BROWNFIELD:** 1 caso (1%)

---

## 🎯 GRÁFICOS REDUNDANTES IDENTIFICADOS

### Gráficos para ELIMINAR:
1. **"Distribución por Ciudad"** (si existe como gráfico de barras completo)
2. **"Top Ciudades"** (si existe como gráfico separado)

**Razón:** Ambos muestran exactamente lo mismo - cantidad de casos por ciudad. Es redundante tener:
- Un gráfico de barras con todas las ciudades
- Un "Top X" de las mismas ciudades
- Un mapa geográfico que ya muestra la distribución espacial

**Recomendación:** Mantener SOLO el mapa geográfico interactivo con heatmap, es más visual y aporta contexto espacial.

### Gráficos para CONSOLIDAR:
3. **Canal Principal vs Canal Secundario** - Podrían consolidarse en un gráfico de drill-down o Sankey diagram que muestre el flujo Canal → Sub-canal

---

## 💡 NUEVOS GRÁFICOS PROPUESTOS

### 1. **EMBUDO DE CONFIRMACIÓN**
Visualizar el flujo de validación:
```
74 Casos de Fraude
    ├─ 41 Confirmados (55%)
    │   ├─ 23 CONFIRMADO (31%)
    │   ├─ 11 NO CONTACTO (15%)
    │   ├─ 11 ADELANTO (15%)
    │   └─ 1 REPROGRAMADA (1%)
    └─ 33 No confirmados (45%)
```

**Tipo:** Embudo (funnel chart) o gráfico de flujo (Sankey)  
**Valor:** Muestra el problema de confirmación con clientes

---

### 2. **MATRIZ DE RIESGO: Aliado vs SLA**
Cruce de Compañía (Aliado) con Estado de SLA

|                  | EN CUMPLIMIENTO | EN INCUMPLIMIENTO | NODATA |
|------------------|----------------|-------------------|--------|
| CONECTAR TV      |                |                   |        |
| TABASCO          |                |                   |        |
| CICSA            |                |                   |        |

**Tipo:** Heatmap  
**Valor:** Identificar si un aliado tiene más problemas con SLA

---

### 3. **TENDENCIA TEMPORAL CON EVENTOS**
Gráfico de línea temporal que muestre casos por día con anotaciones de picos

**Tipo:** Gráfico de línea con annotations  
**Valor:** Detectar patrones temporales, días de la semana problemáticos

---

### 4. **DISTRIBUCIÓN DE REPROGRAMACIONES**
Gráfico que muestre casos con/sin reprogramación por aliado o canal

**Tipo:** Stacked bar chart  
**Valor:** Entender si las reprogramaciones están relacionadas con algún factor específico

---

### 5. **FLUJO CANAL → SUB-CANAL → ALIADO**
Diagrama de Sankey que muestre el flujo:
```
AGENTES → CALLE → CONECTAR TV: 15 casos
AGENTES → PDV → CONECTAR TV: 7 casos
TELEFONICO VENTA → TMK OUT BOUND → TABASCO: 15 casos
...
```

**Tipo:** Sankey Diagram  
**Valor:** Visualizar rutas completas de fraude

---

### 6. **KPI DE TASA DE CONFIRMACIÓN**
Indicador visual tipo gauge mostrando:
- % de casos confirmados con cliente
- Semáforo: Rojo <40%, Amarillo 40-60%, Verde >60%

**Tipo:** Gauge o Progress bar  
**Valor:** Métrica clave de validación

---

### 7. **ANÁLISIS DE DURACIÓN PROMEDIO**
Comparar duración de visitas fraudulentas vs legítimas (si tenemos datos de comparación)

**Tipo:** Box plot o violin plot  **Valor:** Detectar si hay patrones en tiempo de ejecución

---

### 8. **TABLA DETALLADA DE CASOS CRÍTICOS**
Tabla filtrable con casos que cumplan:
- EN INCUMPLIMIENTO de SLA
- NO CONTACTO con cliente
- Con reprogramaciones

**Tipo:** DataTable interactiva  
**Valor:** Permite drill-down en casos sospechosos

---

## 🗑️ PLAN DE LIMPIEZA - GRÁFICOS A ELIMINAR

### Dashboard Actual (11 gráficos):
1. ✅ **Distribución por Canal** - MANTENER
2. ⚠️ **Tendencia Temporal** - MEJORAR (agregar eventos/picos)
3. ✅ **Top 10 Técnicos** - MANTENER
4. ✅ **Distribución por Tipo de Red** - MANTENER
5. ✅ **Distribución por Compañía** - MANTENER
6. ⚠️ **Matriz de Riesgo Zona-Canal** - REVISAR si es redundante con mapa
7. ✅ **Top 20 Nodos** - MANTENER
8. ❌ **Distribución Geográfica** (si es gráfico de barras) - ELIMINAR
9. ✅ **Distribución por Aliado** - MANTENER (es diferente a Compañía?)
10. ✅ **Lista de Asesores** - MANTENER
11. ✅ **Mapa Geográfico** - MANTENER (único gráfico geo)

### Redundancias a resolver:
- **"Distribución por Compañía" vs "Distribución por Aliado"** - ¿Son el mismo gráfico duplicado?
- **Gráficos de ciudad:** Mantener SOLO el mapa geográfico
- **Top 20 Nodos:** Validar si aporta valor o es demasiado granular

---

## 📋 PLAN DE IMPLEMENTACIÓN

### FASE 1: LIMPIEZA (Urgente)
1. ❌ Eliminar gráficos redundantes de ciudad/top ciudades
2. ❌ Eliminar duplicados de aliado/compañía si existen
3. ⚠️ Consolidar o eliminar "Top 20 Nodos" si no aporta insights

**Resultado:** Dashboard más limpio, de 11 a ~8 gráficos core

---

### FASE 2: NUEVOS DATOS (Alta prioridad)
1. ✅ Actualizar archivo de datos embebidos con los 74 registros del nuevo archivo
2. ✅ Agregar campos nuevos:
   - `confirmacion` (si/no)
   - `confir_resultado` (CONFIRMADO, NO CONTACTO, ADELANTO, REPROGRAMADA)
   - `despac_causa` (Validación razón, Completar visita sistema)
   - `despac_gestion` (Razón validada, Visita completada)
   - `num_reprogramaciones` (0 o 1)
   - `estado_sla` (EN CUMPLIMIENTO, EN INCUMPLIMIENTO, NODATA)
   - `sla_suscriptor` (36 o 72 horas)
   - `subtipo_orden` (Instalacion FTTH, Empaquetada, Basica, Pymes, BROWNFIELD)

**Resultado:** Dashboard con datos completos y actualizados

---

### FASE 3: GRÁFICOS NUEVOS (Valor añadido)
**Orden de prioridad:**

1. **ALTO IMPACTO - Implementar primero:**
   - 🔹 Embudo de Confirmación
   - 🔹 KPI de Tasa de Confirmación (ticker)
   - 🔹 Tendencia temporal mejorada (con línea de tendencia y anotaciones)

2. **MEDIO IMPACTO - Implementar después:**
   - 🔸 Matriz de Riesgo: Aliado vs SLA
   - 🔸 Distribución de Reprogramaciones
   - 🔸 Tabla de casos críticos

3. **BAJO IMPACTO - Opcional:**
   - 🔻 Flujo Sankey (complejo, quizás over-engineering para 74 casos)
   - 🔻 Análisis de duración (requiere datos de comparación)

**Resultado:** Dashboard enriquecido con insights accionables

---

### FASE 4: OPTIMIZACIÓN DE FILTROS (Mejora UX)
1. ✅ Agregar filtro de "Estado de Confirmación"
2. ✅ Agregar filtro de "Estado SLA"
3. ✅ Agregar filtro de "Reprogramaciones" (Sí/No)
4. ✅ Agregar filtro de "Subtipo de Orden"

**Resultado:** Más posibilidades de análisis ad-hoc

---

## 📊 ESTRUCTURA DE DATOS PROPUESTA

### Archivo: `fraud_data_completo.json`

```json
{
  "geo_data": [
    {
      "orden_trabajo": "465676178_O_CO_23",
      "external_id": "1113691108",
      "tecnico": "BRAYAN STEVEN GUERRON TORRES",
      "fecha": "2026-02-25",
      "cliente": "WALTER LOZANO MARTINEZ",
      "direccion": "CR 15A 47D-48 PI1-IN101 PALMIRA",
      "ciudad": "PALMIRA",
      "latitud": 3.54421,
      "longitud": -76.28794,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "PDV",
      "tipo_red": "Masivo Bidireccional",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "ANDREA CATALINA DE LA",
      "nodo": "PBU",
      "zona": 507578,
      "regional": "RVA",
      
      // CAMPOS NUEVOS
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "duracion_minutos": 65,
      "tiempo_viaje_minutos": 29
    },
    // ... resto de 73 casos
  ],
  
  // Agregaciones
  "total_casos": 74,
  "confirmados": 41,
  "tasa_confirmacion": 55.4,
  "en_cumplimiento_sla": 52,
  "tasa_cumplimiento_sla": 70.3,
  "con_reprogramaciones": 22,
  "tasa_reprogramacion": 29.7
}
```

---

## 🎨 MOCKUP DE DASHBOARD PROPUESTO

```
┌─────────────────────────────────────────────────────────────────────┐
│  ⚠️  FRAUD ALERT - Dashboard de Análisis                          │
│  [☰ FILTROS]                                     74 Casos Totales  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│   74       │    55.4%    │    70.3%    │    29.7%    │   16        │
│  Casos     │Confirmados  │ SLA OK      │Reprogramados│  Ciudades   │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘

┌─────────────────────────────┬───────────────────────────────────────┐
│  EMBUDO DE CONFIRMACIÓN     │   TENDENCIA TEMPORAL                  │
│                             │                                       │
│  74 Casos                   │   [Gráfico de línea con eventos]     │
│   ├─ 41 Confirmados (55%)   │                                       │
│   │  ├─ 23 CONFIRMADO       │                                       │
│   │  ├─ 11 NO CONTACTO      │                                       │
│   │  └─ 11 ADELANTO         │                                       │
│   └─ 33 No confirmados      │                                       │
└─────────────────────────────┴───────────────────────────────────────┘

┌──────────────────────────┬────────────────────┬───────────────────┐
│ CANAL PRINCIPAL          │ ALIADO vs SLA      │ REPROGRAMACIONES   │
│ [Gráfico barras]         │ [Heatmap]          │ [Stacked bars]     │
└──────────────────────────┴────────────────────┴───────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│  MAPA GEOGRÁFICO INTERACTIVO                                       │
│  [Mapa con heatmap de 16 ciudades - 67 casos geocodificados]      │
└────────────────────────────────────────────────────────────────────┘

┌─────────────────────┬──────────────────────┬──────────────────────┐
│ TOP 10 TÉCNICOS     │ TOP 10 ASESORES      │ CASOS CRÍTICOS       │
│ [Lista scrollable]  │ [Lista scrollable]   │ [Tabla filtrable]    │
└─────────────────────┴──────────────────────┴──────────────────────┘
```

**Total gráficos:** 8-9 (reducción de 11 a 9, pero con más valor)

---

## ✅ CRITERIOS DE ÉXITO

### Métricas de calidad del dashboard:
1. ✅ Reducción de redundancia: de 11 a ~8-9 gráficos core
2. ✅ Tasa de confirmación visible: nuevo KPI crítico
3. ✅ Insights accionables: embudo de confirmación muestra problema clave
4. ✅ Filtros mejorados: 4 nuevos filtros operacionales
5. ✅ Datos actualizados: 74 casos con 8+ campos nuevos

### Preguntas que el dashboard debe responder:
- ✅ ¿Cuántos casos fueron realmente confirmados con el cliente?
- ✅ ¿Qué aliados tienen más problemas de SLA?
- ✅ ¿Hay patrones temporales (días/semanas)?
- ✅ ¿Las reprogramaciones están asociadas a algún canal/aliado?
- ✅ ¿Qué casos son más críticos (SLA+NO CONTACTO+reprogramación)?

---

## 🚀 PRÓXIMOS PASOS

### ¿Aprueba el plan?

**OPCIÓN A - Implementación completa:**
- Fase 1: Limpieza (eliminar redundantes)
- Fase 2: Actualizar datos (agregar 8 campos nuevos)
- Fase 3: 3 gráficos nuevos (embudo, KPI, tendencia mejorada)
- Fase 4: 4 filtros nuevos

**OPCIÓN B - Implementación mínima:**
- Solo Fase 1 y 2 (limpieza + datos actualizados)
- Sin gráficos nuevos, solo mejora de los existentes

**OPCIÓN C - Modificar el plan:**
- Indicar qué gráficos quiere mantener/eliminar
- Qué gráficos nuevos priorizar
- Cambios en la estructura de datos

---

**Por favor confirme antes de continuar con la implementación.**

