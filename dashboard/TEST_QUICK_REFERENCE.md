# FRAUD DASHBOARD - QUICK TEST REFERENCE GUIDE

**Use this alongside FUNCTIONAL_TEST_PLAN.md for rapid testing**

---

## 🚀 Quick Start Checklist

### 1. Initial Load (30 seconds)
```
✓ Page loads without errors
✓ All charts render
✓ Map displays with markers
✓ Clock ticking
✓ Console shows: "Fraud Analytics Terminal initialized successfully"
```

### 2. Chart Switcher Test (1 minute)
**Location:** Main chart "DISTRIBUCIÓN DE FRAUDE POR CANAL"

| Button | Expected Result | ✓ |
|--------|-----------------|---|
| BAR | Horizontal bars, 5 canales | ☐ |
| PIE | Pie chart with legend | ☐ |
| DONUT | Doughnut with center hole | ☐ |
| LINE | Timeline (Feb 11-14) with 5 lines | ☐ |

**Data Check:** All views should total **64 cases**

---

## 📍 Map Quick Tests (2 minutes)

### Marker Count by Canal Filter
```
TODOS LOS CANALES:      64 markers ← [MOST IMPORTANT]
AGENTES:                34 markers
TELEFONICO VENTA:       18 markers
CAV:                     9 markers
DIGITAL:                 2 markers
TELEFONICO SERVICIO:     1 marker
```

### Popup Content Checklist
Click any marker and verify popup shows:
```
✓ Canal
✓ Tipo Red (CANAL2)
✓ Ciudad
✓ Zona
✓ Nodo
✓ Técnico (full name)
✓ Asesor (full name)
✓ ID Aliado
✓ Coordinates (Lat, Lon)
```

### Duplicate Coordinate Locations (zoom in to verify offset)
1. **CB3** - POPAYAN: 2 markers at (-76.58827, 2.46458)
2. **SEVIG7** - SEVILLA: 2 markers at (-75.93624, 4.27020)
3. **4SP** - PALMIRA: 2 markers at (-76.28574, 3.53235)
4. **SPU1** - NEIVA: 2 markers at (-75.26306, 2.92611)
5. **CT13** - CARTAGO: 2 markers at (-75.93328, 4.76256)
6. **VLK3F** - FLANDES: 2 markers at (-74.83092, 4.27201)

---

## 📊 Data Accuracy Cheat Sheet

### Scatter Charts (Critical!)

#### Técnicos Scatter ("DISPERSIÓN: TÉCNICOS VS FRAUDES")
```
Total Points: 59 (not 10!)
X-axis: 1 to 59 (ordinal positions)
Y-axis: 1, 2, 3 (fraud counts)

Distribution:
  y=3: 1 técnico  (JESUS ALFREDO RODRIGUEZ MORA)
  y=2: 12 técnicos
  y=1: 46 técnicos
```

#### Asesores Scatter ("DISPERSIÓN: ASESORES VS FRAUDES")
```
Total Points: 15
X-axis: 1 to 15
Y-axis: 1, 2, 3

Distribution:
  y=3: 1 asesor  (JOHANA ROSERO PERENGUE)
  y=2: 6 asesores
  y=1: 8 asesores
```

### Nodo Chart ("ANÁLISIS POR NODOS")
```
Total Bars: 20 (top 20)

Nodos with 2 casos (verify these exactly):
  ✓ CB3
  ✓ SEVIG7
  ✓ 4SP
  ✓ SPU1
  ✓ CT13
  ✓ VLK3F

Remaining 14 nodos: 1 caso each
```

---

## 🎯 Critical Metrics Verification

### Ticker Bar Metrics
```
CASOS FRAUDE:              64  (red, with ↑ +12%)
CANALES AFECTADOS:          5
CIUDADES EN RIESGO:        13  (orange)
ASESORES INVOLUCRADOS:     15
TASA DE DETECCIÓN:      94.2%  (green)
ÚLTIMA ACTUALIZACIÓN:   HH:MM  (updates with clock)
```

### Main Chart Footer
```
CANAL MÁS AFECTADO:   AGENTES
CASOS:                     34
% DEL TOTAL:            53.1%
```

### Map Footer
```
PUNTOS GEORREFERENCIADOS:  64
ZONA DE MAYOR CONCENTRACIÓN: CALI
```

---

## 🎨 Tooltip Testing Matrix

| Chart | Location | Expected Tooltip |
|-------|----------|------------------|
| Canal (BAR) | AGENTES bar | "Casos de Fraude: 34" |
| Canal (PIE) | AGENTES slice | "AGENTES: 34 casos (53.1%)" |
| Ciudad | CALI bar | "Casos: 18 (28.1%)" |
| Técnico Scatter | Highest point (y=3) | "JESUS ALFREDO RODRIGUEZ MORA" + "Fraudes: 3" |
| Asesor Scatter | Highest point (y=3) | "JOHANA ROSERO PERENGUE" + "Fraudes: 3" |
| Nodo | CB3 bar | "Nodo: CB3" + "Casos: 2" |
| Map Marker | Any marker | Canal, Ciudad, Zona, Nodo, Técnico, Asesor, Aliado, Coords |

---

## 🔍 Console Validation

### Open DevTools (F12) → Console Tab

#### Success Messages (should see these):
```
✅ Total registros procesados: 64
📍 Coordenadas únicas: 58
🔄 Coordenadas con duplicados: 6
📊 Máxima duplicación: 2 casos en misma ubicación
✅ Total de marcadores agregados al mapa: 64
📊 Distribución por canal: AGENTES: 34, TELEFONICO VENTA: 18, ...
Fraud Analytics Terminal initialized successfully
```

#### Should NOT see:
```
❌ Any errors (red text)
❌ 404 errors
❌ CORS errors
❌ "undefined" or "null" errors
❌ Failed to load resources
```

---

## 🌐 Browser Testing Quick Matrix

### Chrome/Edge
```
☐ All features work
☐ Charts render correctly
☐ Map displays properly
☐ No console errors
☐ Fonts load (Roboto Mono)
```

### Firefox
```
☐ All features work
☐ Charts identical to Chrome
☐ Map smooth
☐ Tooltips work
```

---

## ⚡ Performance Quick Checks

### Open Performance Monitor (DevTools)

1. **Initial Load**
   - Target: < 4 seconds to full render
   - Check: All charts visible

2. **Chart Switch**
   - Click BAR → PIE rapidly
   - Should be instant (< 300ms)

3. **Map Interactions**
   - Click 10 markers rapidly
   - All popups should open smoothly

4. **Memory**
   - Initial: Note memory usage
   - After 5 min interaction: Check for leaks
   - Target: < 200 MB stable

---

## 🐛 Common Issues to Watch For

### Chart Switcher
- ⚠️ Data loss when switching types
- ⚠️ Multiple buttons active simultaneously
- ⚠️ LINE chart shows wrong date range

### Map
- ⚠️ Markers overlap (offset not working)
- ⚠️ Wrong marker count after filter
- ⚠️ Popup missing fields
- ⚠️ Map gray areas on resize

### Scatter Charts
- ⚠️ Only 10 points instead of 59/15
- ⚠️ Wrong axis labels (not ordinal)
- ⚠️ Tooltips show wrong data

### Nodo Chart
- ⚠️ Wrong nodos shown
- ⚠️ Incorrect case counts for CB3, SEVIG7, etc.

---

## ✅ 5-Minute Smoke Test

**Run this first to catch major issues:**

```
Time  Task                                    Pass?
----  ------------------------------------    -----
0:00  Open dashboard, wait for load           ☐
0:30  Check console (no errors)               ☐
0:45  Click all 4 chart type buttons          ☐
1:00  Test map filter (all 6 options)         ☐
1:30  Click 5 random markers                  ☐
2:00  Hover over 5 different charts           ☐
2:30  Count técnico scatter points (59?)      ☐
3:00  Count asesor scatter points (15?)       ☐
3:30  Verify nodo chart CB3 = 2 casos         ☐
4:00  Resize window (test responsive)         ☐
4:30  Check ticker metrics (64 casos?)        ☐
5:00  Final console check (no errors)         ☐
```

**If all ✓, proceed with full test plan**  
**If any ✗, log defect and investigate**

---

## 📝 Quick Defect Logging Template

```
DEF-XXX: [CRITICAL/HIGH/MEDIUM/LOW]
Component: [Chart Switcher/Map/Scatter/etc.]
Steps to Reproduce:
1. 
2. 
3. 
Expected: 
Actual: 
Screenshot: 
Browser: 
```

---

## 🎓 Testing Tips

1. **Use Console:** Keep DevTools open - many validations are logged
2. **Count Carefully:** Scatter charts are easy to miscount - zoom in
3. **Test All Filters:** Each canal filter changes marker count
4. **Check Duplicates:** Use zoom to verify offset markers
5. **Screenshot Defects:** Capture evidence immediately
6. **Test Responsively:** Resize window during testing
7. **Check Tooltips:** Hover everywhere - tooltips reveal data issues

---

## 📞 When to Escalate

**STOP and report immediately if:**
- ❌ Console shows JavaScript errors
- ❌ Charts don't render at all
- ❌ Map is blank or broken
- ❌ Marker count is not 64
- ❌ Scatter charts show wrong point count
- ❌ Multiple critical tests fail

---

## 🚦 GO/NO-GO Decision Criteria

### ✅ GO Criteria (all must be YES)
```
☐ All critical tests passed (18/18)
☐ Zero blocking defects
☐ Data accuracy verified (64/59/15/20 counts)
☐ No console errors
☐ All browsers work
☐ Performance acceptable
```

### ⚠️ GO WITH ISSUES (minor issues only)
```
☐ < 3 medium defects
☐ No data accuracy issues
☐ Documentation of workarounds
```

### ❌ NO-GO (any of these)
```
☐ Critical defects present
☐ Data accuracy failures
☐ Console errors
☐ Features broken in major browsers
```

---

**READY TO TEST? Open FUNCTIONAL_TEST_PLAN.md and start with Test ID: CTS-001** 🚀
