# 🚨 Fraud Analytics Terminal - Dashboard de Análisis de Fraude

## 🎯 Visión General

Dashboard profesional de análisis de fraude con diseño tipo **terminal de seguridad** usando colores **rojo, blanco y gris** predominantes. Enfocado en análisis por **CANALES**, **ASESORES** y **ZONAS** con georreferenciación.

### ✨ Características Principales

- 🔴 **Tema Terminal Rojo/Blanco/Gris**: Diseño de seguridad tipo alerta
- 📊 **Análisis por Canal**: Visualización detallada de casos por canal comercial
- 👤 **Top Asesores**: Ranking de asesores con más casos detectados
- 🗺️ **Análisis por Zona**: Distribución geográfica de casos
- 🌡️ **Mapa de Calor Georreferenciado**: Visualización de coordenadas agrupadas por canal
- ⚡ **Feed de Alertas**: Monitoreo en tiempo real de casos
- 📈 **Métricas en Vivo**: Indicadores actualizados automáticamente

---

## 📊 Fuente de Datos

**Archivo**: `fuentes_dashboard/Razones Fraude.xlsx`

### Datos Procesados:
- **Total de Registros**: 74 casos de fraude
- **Canales Principales**: 5 canales identificados
- **Canales Secundarios**: 8 subcanales
- **Zonas Afectadas**: 7 zonas de trabajo
- **Asesores Involucrados**: 15 asesores comerciales
- **Registros Georreferenciados**: 67 casos con coordenadas

### Columnas Clave Utilizadas:
- `CANAL` y `CANAL2`: Análisis por canal de venta
- `Asesor comercial`: Identificación de asesores
- `Zona`: Zona de trabajo/geográfica
- `Coordenada X` y `Coordenada Y`: Geolocalización
- `Razón`: Clasificación del tipo de fraude
- `Regional`: Agrupación regional
- `Ciudad`: Ubicación específica

---

## 🚀 Cómo Usar

### 1. Abrir el Dashboard

```bash
# Desde la carpeta dashboard
start fraud_dashboard.html     # Windows
open fraud_dashboard.html      # macOS
```

### 2. Archivos Necesarios

```
dashboard/
├── fraud_dashboard.html      # Dashboard principal
├── fraud_styles.css          # Tema rojo/blanco/gris
├── fraud_charts.js           # Lógica de gráficos
└── fraud_data.json           # Datos procesados (generado automáticamente)
```

### 3. Generar Datos Actualizados

Si el archivo `Razones Fraude.xlsx` se actualiza, regenerar los datos:

```bash
python -c "
import pandas as pd
import json

df = pd.read_excel('fuentes_dashboard/Razones Fraude.xlsx')

# ... código de procesamiento ...

with open('dashboard/fraud_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
"
```

---

## 📈 Componentes del Dashboard

### 🔴 Barra de Alertas Superior

Métricas principales visibles:
1. **Casos Fraude**: Total de casos detectados con % de cambio
2. **Canales Afectados**: Número de canales con incidencias
3. **Zonas en Riesgo**: Zonas con mayor actividad sospechosa
4. **Asesores Involucrados**: Total de asesores con casos
5. **Tasa de Detección**: Porcentaje de efectividad del sistema
6. **Última Actualización**: Timestamp del último refresh

### 📊 Visualizaciones Principales

#### 1. **Distribución de Fraude por Canal** (Gráfico Principal)
- **Tipo**: Barra horizontal / Pie / Donut (intercambiable)
- **Enfoque**: Canal principal de ventas
- **Datos**: Casos agrupados por canal
- **Interacción**: Cambiar tipo de gráfico con botones superiores
- **Estadísticas**: Canal más afectado, número de casos, % del total

#### 2. **Análisis por Canal Secundario**
- **Tipo**: Gráfico de donut
- **Enfoque**: Subcanales de distribución
- **Colores**: Paleta de rojos, naranjas y grises

#### 3. **Top 10 Asesores con Más Casos** ⭐
- **Tipo**: Lista ranking
- **Visualización**: Números grandes con destacado en rojo
- **Ordenamiento**: Descendente por número de casos
- **Destacado**: Top 3 con colores especiales (rojo, rojo claro, naranja)

#### 4. **Distribución por Zona**
- **Tipo**: Gráfico de barras
- **Enfoque**: Zonas de trabajo geográficas
- **Color**: Naranja para advertencia

#### 5. **Razones de Fraude**
- **Tipo**: Gráfico de pie
- **Datos**: Clasificación por tipo/razón del fraude
- **Utilidad**: Identificar patrones comunes

#### 6. **Análisis por Regional**
- **Tipo**: Gráfico de barras
- **Datos**: Casos agrupados por región administrativa

#### 7. **Mapa de Calor - Georreferenciación por Canales** ⭐⭐⭐
- **Tipo**: Scatter plot con coordenadas reales
- **Ejes**: 
  - X: Longitud (Coordenada X)
  - Y: Latitud (Coordenada Y)
- **Agrupamiento**: Por color según canal
- **Filtro**: Selector para ver canales específicos o todos
- **Tooltips**: Muestra canal, zona, ciudad y coordenadas exactas
- **Estadísticas**: Total de puntos georreferenciados y zona de mayor concentración

#### 8. **Matriz de Riesgo: Canal × Zona**
- **Tipo**: Gráfico de barras apiladas
- **Visualización**: Cruce de canales con zonas
- **Utilidad**: Identificar combinaciones de alto riesgo

#### 9. **Feed de Alertas en Tiempo Real** ⚡
- **Estilo**: Lista tipo Twitter/Exchange
- **Columnas**: Hora, Tipo (Canal), Descripción (Asesor-Zona), Prioridad
- **Filtros**: TODOS / CRÍTICO / MEDIO / BAJO
- **Códigos de Color**:
  - 🔴 **CRÍTICO**: Fondo rojo, borde izquierdo destacado
  - 🟠 **MEDIO**: Fondo naranja
  - ⚪ **BAJO**: Fondo gris

---

## 🎨 Esquema de Colores

### Paleta Principal

```css
Rojo Alerta:     #dc2626  /* Casos críticos, alertas */
Rojo Oscuro:     #991b1b  /* Acentos oscuros */
Rojo Claro:      #fca5a5  /* Highlights */
Naranja:         #f59e0b  /* Advertencias */
Blanco:          #ffffff  /* Texto principal */
Gris Claro:      #d1d5db  /* Texto secundario */
Gris:            #9ca3af  /* Elementos neutrales */
Gris Oscuro:     #4b5563  /* Bordes */
Negro Terminal:  #0f0f0f  /* Fondo principal */
```

### Uso de Colores

- **Rojo (#dc2626)**: Casos de fraude, alertas, métricas críticas
- **Blanco (#ffffff)**: Texto principal, títulos
- **Gris (#9ca3af)**: Elementos secundarios, datos neutrales
- **Naranja (#f59e0b)**: Advertencias, zonas de riesgo medio

---

## 🔧 Personalización

### Actualizar Datos en Tiempo Real

Para conectar con una API en vivo, modificar `fraud_charts.js`:

```javascript
// Antes: Carga estática
async function loadFraudData() {
    const response = await fetch('fraud_data.json');
    return await response.json();
}

// Después: API en vivo
async function loadFraudData() {
    const response = await fetch('https://tu-api.com/fraud-data');
    return await response.json();
}
```

### Cambiar Paleta de Colores

Editar `fraud_styles.css`:

```css
:root {
    --alert-red: #TU_COLOR_ROJO;
    --color-warning: #TU_COLOR_NARANJA;
    /* ... más variables */
}
```

### Agregar Nuevas Métricas

1. Agregar HTML en `fraud_dashboard.html`:
```html
<div class="ticker-item">
    <div class="ticker-label">TU MÉTRICA</div>
    <div class="ticker-value" id="tuMetrica">--</div>
</div>
```

2. Actualizar en `fraud_charts.js`:
```javascript
document.getElementById('tuMetrica').textContent = tuValor;
```

---

## 📱 Diseño Responsivo

| Pantalla | Ancho | Adaptación |
|----------|-------|------------|
| Desktop  | > 1400px | Grid 2-3 columnas |
| Laptop   | 1024-1400px | Grid 2 columnas |
| Tablet   | 768-1024px | 1 columna |
| Móvil    | < 768px | Stack vertical |

---

## 🔍 Casos de Uso

### Análisis por Canal
**Pregunta**: *"¿Qué canal tiene más casos de fraude?"*
- Ver gráfico principal "Distribución de Fraude por Canal"
- El canal con la barra más larga es el más afectado
- Estadísticas detalladas en el footer del gráfico

### Identificar Asesores de Alto Riesgo
**Pregunta**: *"¿Qué asesores están involucrados en más casos?"*
- Consultar panel "Top 10 Asesores con Más Casos"
- Los primeros 3 lugares tienen destacado especial en rojo

### Análisis Geográfico
**Pregunta**: *"¿Dónde se concentran los casos?"*
1. Ver gráfico "Distribución por Zona" para resumen
2. Usar "Mapa de Calor Georreferenciación" para ubicación exacta
3. Filtrar por canal específico usando el selector
4. Identificar clusters (agrupaciones) de puntos

### Detectar Patrones Canal-Zona
**Pregunta**: *"¿Existen combinaciones peligrosas de canal + zona?"*
- Consultar "Matriz de Riesgo: Canal × Zona"
- Barras más altas indican combinaciones frecuentes
- Colores apilados muestran distribución por zona dentro de cada canal

### Monitoreo en Tiempo Real
**Acción**: *"Ver últimos casos detectados"*
- Revisar "Feed de Alertas en Tiempo Real"
- Filtrar por prioridad (CRÍTICO/MEDIO/BAJO)
- Casos críticos aparecen con borde rojo izquierdo

---

## 🐛 Solución de Problemas

### El dashboard no carga datos

1. Verificar que existe `fraud_data.json` en la carpeta dashboard
2. Si no existe, generar con el script Python
3. Verificar consola del navegador (F12) para errores

### Los gráficos no se muestran

1. Verificar que Chart.js se carga desde CDN:
   ```javascript
   console.log(typeof Chart); // Debe ser 'function'
   ```
2. Limpiar caché del navegador
3. Verificar que los canvas tienen IDs correctos

### El mapa de calor está vacío

1. Confirmar que el JSON tiene datos en `geo_data`
2. Verificar que las coordenadas son numéricas válidas
3. Algunos registros pueden no tener coordenadas (67/74 en dataset actual)

### Los colores se ven diferentes

1. Asegurarse de usar `fraud_styles.css` (no `styles.css` o `styles_pro.css`)
2. Verificar que `fraud-theme` está en la clase del `<body>`
3. Revisar variables CSS en :root

---

## 📊 Estadísticas del Dataset

### Resumen Actual (Razones Fraude.xlsx)

```
Total Registros:          74 casos
Canales Principales:      5 canales
Canales Secundarios:      8 subcanales  
Zonas Geográficas:        7 zonas
Asesores Involucrados:    15 asesores
Georreferenciados:        67 registros (90.5%)
Rango de Fechas:          [calculado dinámicamente]
```

### Distribución Aproximada

- **Por Canal**: Variable según datos reales
- **Por Zona**: 7 zonas identificadas
- **Por Prioridad**: Calculada automáticamente (Top 3: Alto, 4-8: Medio, resto: Bajo)

---

## 🔮 Mejoras Futuras

### Planificadas

- [ ] Integración con API en tiempo real
- [ ] Exportar reportes a PDF
- [ ] Filtros de fecha interactivos
- [ ] Alertas por correo/SMS cuando se detecta patrón
- [ ] Machine Learning para predicción de fraude
- [ ] Dashboard móvil dedicado
- [ ] Integración con sistema de tickets
- [ ] Historial de tendencias (mes a mes)

### Análisis Avanzados

- [ ] Correlación Canal-Asesor-Zona
- [ ] Análisis de series temporales
- [ ] Predicción de zonas de riesgo futuro
- [ ] Scoring de riesgo por asesor/canal
- [ ] Comparación regional

---

## 📄 Licencia

Dashboard interno para análisis de fraude - Proyecto Salud_RED

---

## 👨‍💻 Soporte Técnico

### Verificación Rápida

```javascript
// En consola del navegador (F12)
console.log('Chart.js loaded:', typeof Chart !== 'undefined');
console.log('Data loaded:', fraudData !== null);
console.log('Charts created:', Object.keys(charts));
```

### Archivos Críticos

| Archivo | Propósito | Crítico |
|---------|-----------|---------|
| fraud_dashboard.html | Estructura | ✅ Sí |
| fraud_styles.css | Tema rojo/gris | ✅ Sí |
| fraud_charts.js | Lógica | ✅ Sí |
| fraud_data.json | Datos | ✅ Sí |

---

**© 2026 Salud_RED - Fraud Analytics Terminal v1.0**

*Sistema de Detección y Análisis de Fraude - Terminal de Seguridad*
