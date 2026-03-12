# FRAUD SECURITY DASHBOARD - COMPREHENSIVE FUNCTIONAL TEST PLAN
**Version:** 1.0  
**Date:** March 12, 2026  
**Dashboard Location:** `d:\Hotmail\OneDrive\GIT\Salud_RED\dashboard\fraud_dashboard.html`  
**Status:** PRE-DEPLOYMENT VALIDATION  

---

## EXECUTIVE SUMMARY

This document provides a comprehensive functional test plan for all interactive elements in the fraud security dashboard. This is the **final validation step before production deployment**.

**Total Test Categories:** 7  
**Total Test Cases:** 58  
**Critical Path Tests:** 18  
**Performance Benchmarks:** 6  

---

## TEST ENVIRONMENT

- **Browser Requirements:** Chrome 120+, Firefox 115+, Edge 120+
- **Dependencies:**
  - Chart.js v4.4.0
  - Leaflet v1.9.4
  - Roboto Mono Font (Google Fonts)
- **Data Source:** `fraud_data_updated.json` (64 fraud cases embedded)
- **Display Resolution:** 1920x1080 (primary), 1366x768 (responsive)

---

## 1. CHART TYPE SWITCHER (MAIN CANAL CHART)

### Test ID: CTS-001
**Test Case:** Verify BAR button switches to horizontal bar chart  
**Priority:** HIGH  
**Steps:**
1. Open dashboard in browser
2. Locate "DISTRIBUCIÓN DE FRAUDE POR CANAL" section
3. Click "BAR" button
4. Observe chart transformation

**Expected Results:**
- ✅ Chart displays horizontal bar chart (indexAxis: 'y')
- ✅ Button shows "active" state (green border/background)
- ✅ Data shows 5 canales: AGENTES (34), TELEFONICO VENTA (18), CAV (9), DIGITAL (2), TELEFONICO SERVICIO (1)
- ✅ Bars colored: Top = Red (#dc2626), 2nd = Orange (#f59e0b), Rest = Gray (#9ca3af)
- ✅ X-axis labeled "Número de Casos"

**Actual Results:**
```
Status: [ PASS / FAIL ]
Notes: _____________________
```

---

### Test ID: CTS-002
**Test Case:** Verify PIE button switches to pie chart  
**Priority:** HIGH  
**Steps:**
1. From BAR view, click "PIE" button
2. Observe chart transformation

**Expected Results:**
- ✅ Chart type changes to pie chart
- ✅ PIE button becomes active
- ✅ BAR button becomes inactive
- ✅ Legend displays on right side
- ✅ All 5 canal segments visible
- ✅ Data persists (no data loss during transition)

**Actual Results:**
```
Status: [ PASS / FAIL ]
Notes: _____________________
```

---

### Test ID: CTS-003
**Test Case:** Verify DONUT button switches to doughnut chart  
**Priority:** HIGH  
**Steps:**
1. From any view, click "DONUT" button
2. Observe chart transformation

**Expected Results:**
- ✅ Chart type changes to doughnut chart (pie with center hole)
- ✅ DONUT button becomes active
- ✅ Center hole visible
- ✅ Legend displays correctly
- ✅ Data remains accurate

**Actual Results:**
```
Status: [ PASS / FAIL ]
Notes: _____________________
```

---

### Test ID: CTS-004
**Test Case:** Verify LINE button shows temporal line chart  
**Priority:** HIGH  
**Steps:**
1. From any view, click "LINE" button
2. Examine line chart configuration

**Expected Results:**
- ✅ Chart type changes to line chart
- ✅ X-axis shows dates (Feb 11-14, 2026)
- ✅ Y-axis shows "Casos por Día"
- ✅ Multiple lines (one per canal) with different colors
- ✅ Legend displays at top showing all canales
- ✅ Data distributed across 4 days
- ✅ Lines use tension (curved) and fill
- ✅ Point radius = 4px (hover = 6px)

**Actual Results:**
```
Status: [ PASS / FAIL ]
Data Distribution Check:
- Feb 11: ___ cases
- Feb 12: ___ cases
- Feb 13: ___ cases
- Feb 14: ___ cases
Notes: _____________________
```

---

### Test ID: CTS-005
**Test Case:** Verify data persistence across type changes  
**Priority:** CRITICAL  
**Steps:**
1. Note total value in BAR view (should be 64 total)
2. Switch to PIE
3. Verify all segments sum to 64
4. Switch to DONUT
5. Verify all segments sum to 64
6. Switch to LINE
7. Sum all timeline data points across all canales
8. Verify total = 64

**Expected Results:**
- ✅ BAR: Sum of all bars = 64
- ✅ PIE: Sum of all slices = 64
- ✅ DONUT: Sum of all slices = 64
- ✅ LINE: Sum of all data points across all canales = 64
- ✅ No data loss during transitions

**Actual Results:**
```
Status: [ PASS / FAIL ]
BAR Total: ___
PIE Total: ___
DONUT Total: ___
LINE Total: ___
Notes: _____________________
```

---

### Test ID: CTS-006
**Test Case:** Verify button active states (active-btn class)  
**Priority:** MEDIUM  
**Steps:**
1. Inspect each button when clicked
2. Verify CSS class application

**Expected Results:**
- ✅ Active button has `active` class
- ✅ Active button visual style: Green accent color
- ✅ Inactive buttons: Gray style
- ✅ Only ONE button active at a time
- ✅ Smooth transition between states

**Actual Results:**
```
Status: [ PASS / FAIL ]
CSS Class Applied: [ YES / NO ]
Visual Feedback: [ CLEAR / UNCLEAR ]
Notes: _____________________
```

---

## 2. MAP INTERACTIONS (GEO HEATMAP)

### Test ID: MAP-001
**Test Case:** Test zoom in/out controls  
**Priority:** HIGH  
**Steps:**
1. Locate map in "GEORREFERENCIACIÓN" section
2. Click zoom in (+) button 3 times
3. Click zoom out (-) button 3 times
4. Use mouse wheel to zoom

**Expected Results:**
- ✅ Zoom controls visible and functional
- ✅ Map zooms in smoothly (increases detail)
- ✅ Map zooms out smoothly (decreases detail)
- ✅ Mouse wheel zoom works
- ✅ Map stays centered on Colombia region
- ✅ No tile loading errors

**Actual Results:**
```
Status: [ PASS / FAIL ]
Zoom Range: Min ___ to Max ___
Performance: [ SMOOTH / LAGGY ]
Notes: _____________________
```

---

### Test ID: MAP-002
**Test Case:** Click each marker to verify popup opens  
**Priority:** CRITICAL  
**Steps:**
1. Click on 10 random markers across the map
2. Verify popup appears for each
3. Click outside popup to close

**Expected Results:**
- ✅ Popup opens on marker click
- ✅ Popup displays correctly positioned
- ✅ Popup closes when clicking outside
- ✅ Popup has dark theme styling
- ✅ Red border (#dc2626) visible

**Actual Results:**
```
Status: [ PASS / FAIL ]
Markers Tested: ___/10
Popups Opened: ___/10
Notes: _____________________
```

---

### Test ID: MAP-003
**Test Case:** Verify popup shows all required fields  
**Priority:** CRITICAL  
**Steps:**
1. Click marker in CALI
2. Verify all fields present
3. Click marker in POPAYAN
4. Verify all fields present
5. Test 5 more random markers

**Expected Results for EACH popup:**
- ✅ "⚠ FRAUDE DETECTADO" header (colored by canal)
- ✅ Canal: [Canal name]
- ✅ Tipo Red: [CANAL2 value]
- ✅ Ciudad: [City name]
- ✅ Zona: [Zone code]
- ✅ Nodo: [Node code]
- ✅ Técnico: [Full technician name]
- ✅ Asesor: [Advisor name]
- ✅ ID Aliado: [Partner ID]
- ✅ Coordinates: "Lat: X.XXXXX, Lon: X.XXXXX"
- ✅ Duplicate warning (if offset applied): "⚠ Ubicación ajustada para visibilidad"

**Actual Results:**
```
Status: [ PASS / FAIL ]
Sample Popup Data:
Canal: _________________
Ciudad: ________________
Nodo: __________________
Técnico: _______________
Asesor: ________________
Missing Fields: _________
Notes: _____________________
```

---

### Test ID: MAP-004
**Test Case:** Test filter dropdown (filter by canal)  
**Priority:** HIGH  
**Steps:**
1. Locate filter dropdown "TODOS LOS CANALES"
2. Count total visible markers (should be 64)
3. Select "AGENTES"
4. Count visible markers (should be 34)
5. Select "TELEFONICO VENTA"
6. Count visible markers (should be 18)
7. Select "CAV"
8. Count visible markers (should be 9)
9. Select "DIGITAL"
10. Count visible markers (should be 2)
11. Select "TELEFONICO SERVICIO"
12. Count visible markers (should be 1)
13. Return to "TODOS LOS CANALES"

**Expected Results:**
- ✅ Dropdown contains all canal options
- ✅ AGENTES filter: 34 markers visible
- ✅ TELEFONICO VENTA filter: 18 markers visible
- ✅ CAV filter: 9 markers visible
- ✅ DIGITAL filter: 2 markers visible
- ✅ TELEFONICO SERVICIO filter: 1 marker visible
- ✅ "TODOS LOS CANALES": 64 markers visible
- ✅ Hidden markers completely removed from view
- ✅ Filter applies instantly

**Actual Results:**
```
Status: [ PASS / FAIL ]
AGENTES: ___ markers (expected 34)
TELEFONICO VENTA: ___ markers (expected 18)
CAV: ___ markers (expected 9)
DIGITAL: ___ markers (expected 2)
TELEFONICO SERVICIO: ___ markers (expected 1)
ALL: ___ markers (expected 64)
Notes: _____________________
```

---

### Test ID: MAP-005
**Test Case:** Verify markers update when filter changes  
**Priority:** HIGH  
**Steps:**
1. Open a popup on an AGENTES marker (e.g., in PALMIRA)
2. Change filter to "TELEFONICO VENTA"
3. Verify AGENTES markers disappear and popup closes
4. Verify only orange markers visible

**Expected Results:**
- ✅ Markers matching filter remain visible
- ✅ Non-matching markers removed immediately
- ✅ Open popups close when marker hidden
- ✅ No JavaScript errors in console
- ✅ Smooth transition (no flicker)

**Actual Results:**
```
Status: [ PASS / FAIL ]
Transition Speed: [ INSTANT / SMOOTH / SLOW ]
Console Errors: [ YES / NO ]
Notes: _____________________
```

---

### Test ID: MAP-006
**Test Case:** Test duplicate coordinates are offset correctly (circular jitter)  
**Priority:** HIGH  
**Steps:**
1. Identify coordinates with duplicates:
   - CB3 in POPAYAN: (-76.58827, 2.46458) - 2 cases
   - SEVIG7 in SEVILLA: (-75.93624, 4.27020) - 2 cases
   - 4SP in PALMIRA: (-76.28574, 3.53235) - 2 cases
   - SPU1 in NEIVA: (-75.26306, 2.92611) - 2 cases
   - CT13 in CARTAGO: (-75.93328, 4.76256) - 2 cases
   - VLK3F in FLANDES: (-74.83092, 4.27201) - 2 cases
2. Zoom in on each location
3. Verify 2 markers visible and slightly offset
4. Verify popup shows duplicate warning

**Expected Results:**
- ✅ 2 markers visible at each duplicate location
- ✅ Markers offset in circular pattern (radius ~0.003-0.006 degrees)
- ✅ Both markers clickable
- ✅ Duplicate marker slightly larger (14px vs 12px)
- ✅ Popup shows: "⚠ Ubicación ajustada para visibilidad"
- ✅ Original coordinates displayed in popup
- ✅ No overlapping markers

**Actual Results:**
```
Status: [ PASS / FAIL ]
CB3 (POPAYAN): ___ markers visible
SEVIG7 (SEVILLA): ___ markers visible
4SP (PALMIRA): ___ markers visible
SPU1 (NEIVA): ___ markers visible
CT13 (CARTAGO): ___ markers visible
VLK3F (FLANDES): ___ markers visible
Duplicate Warning Displayed: [ YES / NO ]
Notes: _____________________
```

---

### Test ID: MAP-007
**Test Case:** Verify legend displays correctly with all canal colors  
**Priority:** MEDIUM  
**Steps:**
1. Locate legend in bottom-right corner
2. Verify all canal types listed
3. Verify color coding matches markers

**Expected Results:**
- ✅ Legend visible in bottom-right
- ✅ Black background with red border
- ✅ "⚠ CANALES" header in red
- ✅ AGENTES: Red dot (#dc2626)
- ✅ TELEFONICO VENTA: Orange dot (#f59e0b)
- ✅ CAV: Gray dot (#9ca3af)
- ✅ DIGITAL: Green dot (#10b981)
- ✅ TELEFONICO SERVICIO: Purple dot (#8b5cf6)
- ✅ Font: Roboto Mono, 10px

**Actual Results:**
```
Status: [ PASS / FAIL ]
Legend Items: ___/5
Color Accuracy: [ CORRECT / INCORRECT ]
Notes: _____________________
```

---

### Test ID: MAP-008
**Test Case:** Verify total markers count  
**Priority:** CRITICAL  
**Steps:**
1. Open browser console
2. Check console logs for marker count
3. Verify "✅ Total de marcadores agregados al mapa: 64"

**Expected Results:**
- ✅ Console shows: "✅ Total registros procesados: 64"
- ✅ Console shows: "📍 Coordenadas únicas: 58"
- ✅ Console shows: "🔄 Coordenadas con duplicados: 6"
- ✅ Console shows: "📊 Máxima duplicación: 2 casos en misma ubicación"
- ✅ All 64 markers added successfully

**Actual Results:**
```
Status: [ PASS / FAIL ]
Total Markers: ___
Unique Coordinates: ___
Duplicated Coordinates: ___
Console Output: _____________
Notes: _____________________
```

---

### Test ID: MAP-009
**Test Case:** Verify Colombian coordinate range validation  
**Priority:** MEDIUM  
**Steps:**
1. Check console for coordinate warnings
2. Verify all coordinates within valid range:
   - Latitude: 1.5° to 5.5° (SW Colombia)
   - Longitude: -78.0° to -74.0° (SW Colombia)

**Expected Results:**
- ✅ All coordinates within Colombian SW range
- ✅ No "⚠️ Coordenadas fuera del suroccidente" warnings
- ✅ Map properly centered on region
- ✅ No markers outside visible area

**Actual Results:**
```
Status: [ PASS / FAIL ]
Invalid Coordinates: ___
Warnings in Console: [ YES / NO ]
Notes: _____________________
```

---

## 3. DYNAMIC METRICS

### Test ID: MET-001
**Test Case:** Verify clock updates every second  
**Priority:** MEDIUM  
**Steps:**
1. Locate terminal clock in header
2. Note initial time
3. Wait 10 seconds
4. Verify time updated correctly

**Expected Results:**
- ✅ Clock displays HH:MM:SS format (24-hour)
- ✅ Updates every second
- ✅ Time is accurate
- ✅ No lag or freeze
- ✅ Format: "14:23:45"

**Actual Results:**
```
Status: [ PASS / FAIL ]
Update Frequency: ___ seconds
Format Correct: [ YES / NO ]
Notes: _____________________
```

---

### Test ID: MET-002
**Test Case:** Check FPS counter updates  
**Priority:** LOW  
**Steps:**
1. Locate FPS indicator in footer
2. Observe value for 30 seconds
3. Note range

**Expected Results:**
- ✅ FPS value displays in footer
- ✅ Updates every ~1.5 seconds
- ✅ Range: 58-62 FPS (simulated)
- ✅ Format: "FPS: 60"

**Actual Results:**
```
Status: [ PASS / FAIL ]
FPS Range: ___ to ___
Update Frequency: ___ seconds
Notes: _____________________
```

---

### Test ID: MET-003
**Test Case:** Check latency simulation updates  
**Priority:** LOW  
**Steps:**
1. Locate "Latency" in footer
2. Observe value for 30 seconds

**Expected Results:**
- ✅ Latency displays in footer
- ✅ Updates every ~1.5 seconds
- ✅ Range: 35-60ms (simulated)
- ✅ Format: "Latency: 42ms"

**Actual Results:**
```
Status: [ PASS / FAIL ]
Latency Range: ___ to ___ ms
Notes: _____________________
```

---

### Test ID: MET-004
**Test Case:** Verify alert ticker displays correctly  
**Priority:** HIGH  
**Steps:**
1. Locate ticker bar below navigation
2. Verify all metrics displayed

**Expected Results:**
- ✅ CASOS FRAUDE: 64 (red color)
- ✅ Fraud change: +12% with up arrow
- ✅ CANALES AFECTADOS: 5
- ✅ CIUDADES EN RIESGO: 13 (orange/warning)
- ✅ ASESORES INVOLUCRADOS: 15
- ✅ TASA DE DETECCIÓN: 94.2% (green/positive)
- ✅ ÚLTIMA ACTUALIZACIÓN: [Current time HH:MM]
- ✅ Separators "|" between items
- ✅ Professional monospace font

**Actual Results:**
```
Status: [ PASS / FAIL ]
Total Fraud Cases: ___ (expected 64)
Canales: ___ (expected 5)
Ciudades: ___ (expected 13)
Asesores: ___ (expected 15)
Detection Rate: ___ (expected 94.2%)
Notes: _____________________
```

---

### Test ID: MET-005
**Test Case:** Test all 12 metric counters display correct values  
**Priority:** HIGH  
**Steps:**
1. Check main chart footer metrics:
   - CANAL MÁS AFECTADO: AGENTES
   - CASOS: 34
   - % DEL TOTAL: 53.1%
2. Check geo map footer:
   - PUNTOS GEORREFERENCIADOS: 64
   - ZONA DE MAYOR CONCENTRACIÓN: CALI

**Expected Results:**
- ✅ Top Canal: AGENTES
- ✅ Top Canal Cases: 34
- ✅ Top Canal %: 53.1%
- ✅ Geo Total: 64
- ✅ Geo Hotspot: CALI (18 cases)

**Actual Results:**
```
Status: [ PASS / FAIL ]
Top Canal: ____________
Top Canal Cases: ___
Top Canal %: ___
Geo Total: ___
Geo Hotspot: ___________
Notes: _____________________
```

---

## 4. CHART INTERACTIONS

### Test ID: CHT-001
**Test Case:** Hover over Canal chart and verify tooltips  
**Priority:** HIGH  
**Steps:**
1. Switch main chart to BAR view
2. Hover over "AGENTES" bar
3. Hover over "TELEFONICO VENTA" bar
4. Hover over "CAV" bar

**Expected Results:**
- ✅ Tooltip appears on hover
- ✅ Dark background (rgba(0,0,0,0.9))
- ✅ Red border (#dc2626)
- ✅ Shows: "Casos de Fraude: [value]"
- ✅ Roboto Mono font
- ✅ AGENTES tooltip: 34
- ✅ TELEFONICO VENTA tooltip: 18
- ✅ CAV tooltip: 9

**Actual Results:**
```
Status: [ PASS / FAIL ]
Tooltip Style: [ CORRECT / INCORRECT ]
Data Accuracy: [ CORRECT / INCORRECT ]
Notes: _____________________
```

---

### Test ID: CHT-002
**Test Case:** Test Canal2 (Secondary) chart tooltips  
**Priority:** MEDIUM  
**Steps:**
1. Locate "ANÁLISIS POR CANAL SECUNDARIO" chart
2. Hover over each doughnut segment

**Expected Results:**
- ✅ Tooltip shows: "[Canal]: [count] casos ([percentage]%)"
- ✅ Top segment: CALLE: 26 casos
- ✅ Second: TMK OUT BOUND: 15 casos
- ✅ All segments sum to 64

**Actual Results:**
```
Status: [ PASS / FAIL ]
Sample Tooltip: _________________
Total Cases: ___
Notes: _____________________
```

---

### Test ID: CHT-003
**Test Case:** Test Zona/Ciudad bar chart tooltips  
**Priority:** MEDIUM  
**Steps:**
1. Locate "DISTRIBUCIÓN POR CIUDAD" chart
2. Hover over CALI bar
3. Hover over POPAYAN bar

**Expected Results:**
- ✅ Tooltip shows: "Casos: [value] ([percentage]%)"
- ✅ CALI: 18 casos (28.1%)
- ✅ POPAYAN: 10 casos (15.6%)
- ✅ Value labels visible on top of bars
- ✅ Percentage labels visible below value

**Actual Results:**
```
Status: [ PASS / FAIL ]
CALI Cases: ___ (expected 18)
POPAYAN Cases: ___ (expected 10)
Labels Visible: [ YES / NO ]
Notes: _____________________
```

---

### Test ID: CHT-004
**Test Case:** Test Técnico scatter plot tooltips  
**Priority:** HIGH  
**Steps:**
1. Locate "DISPERSIÓN: TÉCNICOS VS FRAUDES" chart
2. Hover over highest point (should be y=3)
3. Hover over several y=2 points
4. Hover over y=1 points

**Expected Results:**
- ✅ Total points: 59 (all técnicos)
- ✅ X-axis: Ordinal positions (1, 2, 3, 4... 59)
- ✅ Y-axis: Fraud counts (1, 2, 3)
- ✅ Tooltip shows: "[Técnico name]" (title) + "Fraudes: [count]" (body)
- ✅ Highest point (y=3): "JESUS ALFREDO RODRIGUEZ MORA"
- ✅ Multiple points at y=2 (12 técnicos with 2 cases)
- ✅ Most points at y=1 (46 técnicos with 1 case)
- ✅ Points colored orange (#f59e0b) with red border

**Actual Results:**
```
Status: [ PASS / FAIL ]
Total Points Visible: ___
Max Y Value: ___
Tooltip Accuracy: [ CORRECT / INCORRECT ]
Top Técnico: _____________________
Notes: _____________________
```

---

### Test ID: CHT-005
**Test Case:** Test Asesor scatter plot tooltips  
**Priority:** HIGH  
**Steps:**
1. Locate "DISPERSIÓN: ASESORES VS FRAUDES" chart
2. Hover over highest point
3. Count total points

**Expected Results:**
- ✅ Total points: 15 (all asesores)
- ✅ X-axis: Ordinal positions (1 to 15)
- ✅ Y-axis: Fraud counts (1, 2, 3)
- ✅ Tooltip shows: "[Asesor name]" + "Fraudes: [count]"
- ✅ Highest point (y=3): "JOHANA ROSERO PERENGUE"
- ✅ 6 asesores at y=2
- ✅ 8 asesores at y=1
- ✅ Points colored red (#dc2626)

**Actual Results:**
```
Status: [ PASS / FAIL ]
Total Points: ___ (expected 15)
Max Y Value: ___ (expected 3)
Top Asesor: _____________________
Notes: _____________________
```

---

### Test ID: CHT-006
**Test Case:** Test Nodo chart tooltips  
**Priority:** MEDIUM  
**Steps:**
1. Locate "ANÁLISIS POR NODOS (Top 20)" chart
2. Hover over bars with value 2
3. Hover over bars with value 1

**Expected Results:**
- ✅ Total bars: 20 (top 20 nodos)
- ✅ Tooltip shows: "Nodo: [code]" + "Casos: [count]"
- ✅ 6 nodos with 2 casos: CB3, SEVIG7, 4SP, SPU1, CT13, VLK3F
- ✅ 14 nodos with 1 caso
- ✅ Horizontal bar chart (indexAxis: 'y')
- ✅ Gray bars (#9ca3af)

**Actual Results:**
```
Status: [ PASS / FAIL ]
Nodos with 2 cases: ___ (expected 6)
Nodos with 1 case: ___ (expected 14)
Sample Tooltip: _________________
Notes: _____________________
```

---

### Test ID: CHT-007
**Test Case:** Test Matrix chart (Canal × Zona) tooltips  
**Priority:** MEDIUM  
**Steps:**
1. Locate "MATRIZ DE RIESGO: CANAL × ZONA" chart
2. Hover over stacked bars
3. Verify data shows canal-zone breakdown

**Expected Results:**
- ✅ Stacked bar chart with canales on X-axis
- ✅ Different colors for each zona (zone)
- ✅ Tooltip shows canal + zona + count
- ✅ All bars sum to 64 total cases

**Actual Results:**
```
Status: [ PASS / FAIL ]
Chart Type: [ STACKED BAR / OTHER ]
Tooltip Data: _________________
Notes: _____________________
```

---

### Test ID: CHT-008
**Test Case:** Verify hover animations work  
**Priority:** MEDIUM  
**Steps:**
1. Test hover effects on all chart types
2. Verify color changes
3. Verify scaling effects

**Expected Results:**
- ✅ Bars/segments change opacity on hover
- ✅ Scatter points enlarge on hover (6px → 8px)
- ✅ Smooth transitions
- ✅ No lag or flicker
- ✅ Cursor changes to pointer on interactive elements

**Actual Results:**
```
Status: [ PASS / FAIL ]
Animation Quality: [ SMOOTH / LAGGY ]
Notes: _____________________
```

---

## 5. DATA ACCURACY VALIDATION

### Test ID: DAT-001
**Test Case:** Verify Técnicos scatter shows 59 points (not just top 10)  
**Priority:** CRITICAL  
**Steps:**
1. Locate scatter chart
2. Count visible points
3. Inspect console logs

**Expected Results:**
- ✅ Exactly 59 points visible
- ✅ Points distributed across X-axis: 1 to 59
- ✅ Y-axis shows values: 1, 2, 3
- ✅ Distribution:
  - 1 técnico with 3 fraudes (x=1, y=3)
  - 12 técnicos with 2 fraudes (x=2-13, y=2)
  - 46 técnicos with 1 fraude (x=14-59, y=1)

**Actual Results:**
```
Status: [ PASS / FAIL ]
Total Points: ___ (expected 59)
Points at y=3: ___ (expected 1)
Points at y=2: ___ (expected 12)
Points at y=1: ___ (expected 46)
Notes: _____________________
```

---

### Test ID: DAT-002
**Test Case:** Verify Asesores scatter shows 15 points  
**Priority:** CRITICAL  
**Steps:**
1. Count points in asesor scatter chart
2. Verify distribution

**Expected Results:**
- ✅ Exactly 15 points visible
- ✅ X-axis: 1 to 15
- ✅ Y-axis: 1, 2, 3
- ✅ Distribution:
  - 1 asesor with 3 fraudes: JOHANA ROSERO PERENGUE
  - 6 asesores with 2 fraudes
  - 8 asesores with 1 fraude

**Actual Results:**
```
Status: [ PASS / FAIL ]
Total Points: ___ (expected 15)
Max Value: ___ (expected 3)
Notes: _____________________
```

---

### Test ID: DAT-003
**Test Case:** Verify x-axis shows ordinal positions (1, 2, 3...)  
**Priority:** HIGH  
**Steps:**
1. Inspect x-axis labels on both scatter charts
2. Verify sequential numbering

**Expected Results:**
- ✅ Técnicos chart: X-axis labeled 0, 5, 10, 15... up to 59
- ✅ Asesores chart: X-axis labeled 0, 5, 10, 15
- ✅ Labels use stepSize: 5
- ✅ Title: "Técnicos (ordenados por cantidad)" / "Asesores Comerciales (ordenados por cantidad)"

**Actual Results:**
```
Status: [ PASS / FAIL ]
X-axis Format: [ ORDINAL / OTHER ]
Step Size: ___
Notes: _____________________
```

---

### Test ID: DAT-004
**Test Case:** Verify y-axis shows fraud counts (1, 2, 3)  
**Priority:** HIGH  
**Steps:**
1. Inspect y-axis on scatter charts
2. Verify integer values only

**Expected Results:**
- ✅ Y-axis begins at 0
- ✅ Y-axis step size: 1
- ✅ Labels: 0, 1, 2, 3
- ✅ Title: "Cantidad de Fraudes"
- ✅ No decimal values

**Actual Results:**
```
Status: [ PASS / FAIL ]
Y-axis Range: ___ to ___
Step Size: ___
Notes: _____________________
```

---

### Test ID: DAT-005
**Test Case:** Check topmost points (max 3 fraudes)  
**Priority:** HIGH  
**Steps:**
1. Identify highest points on both scatter charts
2. Verify names and values

**Expected Results:**
- ✅ Técnicos: JESUS ALFREDO RODRIGUEZ MORA with 3 fraudes
- ✅ Asesores: JOHANA ROSERO PERENGUE with 3 fraudes
- ✅ No points above y=3
- ✅ Tooltip verification matches

**Actual Results:**
```
Status: [ PASS / FAIL ]
Top Técnico: ______________________ (expected JESUS ALFREDO RODRIGUEZ MORA)
Top Asesor: ______________________ (expected JOHANA ROSERO PERENGUE)
Max Value: ___ (expected 3)
Notes: _____________________
```

---

### Test ID: DAT-006
**Test Case:** Verify Nodo chart shows top 20 nodos  
**Priority:** MEDIUM  
**Steps:**
1. Count bars in Nodo chart
2. Verify specific nodos present

**Expected Results:**
- ✅ Exactly 20 bars visible
- ✅ Nodos with 2 casos visible: CB3, SEVIG7, 4SP, SPU1, CT13, VLK3F
- ✅ Remaining 14 nodos have 1 caso each
- ✅ Sorted by count (descending)

**Actual Results:**
```
Status: [ PASS / FAIL ]
Total Bars: ___ (expected 20)
Nodos with 2 casos: _______________
Notes: _____________________
```

---

### Test ID: DAT-007
**Test Case:** Verify specific nodo case counts  
**Priority:** MEDIUM  
**Steps:**
1. Hover over CB3 bar
2. Hover over SEVIG7 bar
3. Hover over 4SP, SPU1, CT13, VLK3F bars

**Expected Results:**
- ✅ CB3: 2 casos
- ✅ SEVIG7: 2 casos
- ✅ 4SP: 2 casos
- ✅ SPU1: 2 casos
- ✅ CT13: 2 casos
- ✅ VLK3F: 2 casos

**Actual Results:**
```
Status: [ PASS / FAIL ]
CB3: ___ (expected 2)
SEVIG7: ___ (expected 2)
4SP: ___ (expected 2)
SPU1: ___ (expected 2)
CT13: ___ (expected 2)
VLK3F: ___ (expected 2)
Notes: _____________________
```

---

### Test ID: DAT-008
**Test Case:** Verify map shows 64 markers total  
**Priority:** CRITICAL  
**Steps:**
1. Open browser console
2. Look for: "✅ Total de marcadores agregados al mapa: 64"
3. Manually count visible markers (use "TODOS LOS CANALES" filter)

**Expected Results:**
- ✅ Console confirms 64 markers added
- ✅ Visual count confirms 64 markers
- ✅ No duplicate markers at same exact position (offsets applied)

**Actual Results:**
```
Status: [ PASS / FAIL ]
Console Count: ___
Visual Count: ___
Notes: _____________________
```

---

### Test ID: DAT-009
**Test Case:** Verify no markers overlap (circular offset working)  
**Priority:** HIGH  
**Steps:**
1. Zoom in on known duplicate locations
2. Verify markers are offset
3. Check for any overlapping markers

**Expected Results:**
- ✅ No perfectly overlapping markers
- ✅ Duplicate locations show offset markers
- ✅ Markers remain clickable
- ✅ Visual separation clear

**Actual Results:**
```
Status: [ PASS / FAIL ]
Overlapping Markers Found: [ YES / NO ]
Notes: _____________________
```

---

### Test ID: DAT-010
**Test Case:** Check coordinates are within Colombian range  
**Priority:** MEDIUM  
**Steps:**
1. Review console warnings
2. Verify coordinate validation

**Expected Results:**
- ✅ All latitudes: 1.5° to 5.5°
- ✅ All longitudes: -78.0° to -74.0°
- ✅ No warnings in console about invalid coordinates
- ✅ All markers within map bounds

**Actual Results:**
```
Status: [ PASS / FAIL ]
Invalid Coordinates: ___
Console Warnings: [ YES / NO ]
Notes: _____________________
```

---

## 6. RESPONSIVE BEHAVIOR

### Test ID: RES-001
**Test Case:** Verify charts resize properly with window  
**Priority:** HIGH  
**Steps:**
1. Start at 1920x1080 resolution
2. Resize window to 1366x768
3. Resize to 1280x720
4. Return to 1920x1080

**Expected Results:**
- ✅ All charts resize smoothly
- ✅ Chart.js `responsive: true` working
- ✅ No chart overflow
- ✅ Text remains legible
- ✅ Tooltips still functional
- ✅ No layout breaks

**Actual Results:**
```
Status: [ PASS / FAIL ]
1920x1080: [ OK / BROKEN ]
1366x768: [ OK / BROKEN ]
1280x720: [ OK / BROKEN ]
Notes: _____________________
```

---

### Test ID: RES-002
**Test Case:** Check canvas elements maintain aspect ratio  
**Priority:** MEDIUM  
**Steps:**
1. Resize window
2. Verify charts don't stretch or compress disproportionately

**Expected Results:**
- ✅ `maintainAspectRatio: false` allows flexible sizing
- ✅ Charts fill container properly
- ✅ No distortion

**Actual Results:**
```
Status: [ PASS / FAIL ]
Aspect Ratio: [ MAINTAINED / DISTORTED ]
Notes: _____________________
```

---

### Test ID: RES-003
**Test Case:** Verify map invalidates size on resize  
**Priority:** HIGH  
**Steps:**
1. Resize browser window with map visible
2. Verify map adjusts correctly
3. Check for gray areas or missing tiles

**Expected Results:**
- ✅ Map resizes immediately
- ✅ Leaflet `invalidateSize()` called
- ✅ No gray missing areas
- ✅ Tiles reload if needed
- ✅ Markers remain positioned correctly

**Actual Results:**
```
Status: [ PASS / FAIL ]
Map Resize: [ SMOOTH / BROKEN ]
Gray Areas: [ YES / NO ]
Notes: _____________________
```

---

## 7. ERROR SCENARIOS

### Test ID: ERR-001
**Test Case:** Check browser console for runtime errors  
**Priority:** CRITICAL  
**Steps:**
1. Open browser console (F12)
2. Reload page
3. Interact with all features
4. Monitor for errors

**Expected Results:**
- ✅ No JavaScript errors
- ✅ No unhandled promise rejections
- ✅ No "undefined" or "null" errors
- ✅ Info logs only (green ✅ checkmarks)

**Actual Results:**
```
Status: [ PASS / FAIL ]
Errors Found: ___
Error Details: _________________
Screenshot: [Attach if errors present]
Notes: _____________________
```

---

### Test ID: ERR-002
**Test Case:** Verify no 404s for resources  
**Priority:** CRITICAL  
**Steps:**
1. Open Network tab in DevTools
2. Reload page
3. Check all resource loads

**Expected Results:**
- ✅ Chart.js loaded: `https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js`
- ✅ Leaflet CSS loaded: `https://unpkg.com/leaflet@1.9.4/dist/leaflet.css`
- ✅ Leaflet JS loaded: `https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`
- ✅ Roboto Mono font loaded
- ✅ fraud_charts.js loaded
- ✅ fraud_styles.css loaded
- ✅ No 404 errors

**Actual Results:**
```
Status: [ PASS / FAIL ]
Chart.js: [ LOADED / 404 ]
Leaflet: [ LOADED / 404 ]
Fonts: [ LOADED / 404 ]
fraud_charts.js: [ LOADED / 404 ]
fraud_styles.css: [ LOADED / 404 ]
Notes: _____________________
```

---

### Test ID: ERR-003
**Test Case:** Check all fonts load correctly (Roboto Mono)  
**Priority:** MEDIUM  
**Steps:**
1. Inspect page fonts in DevTools
2. Verify Roboto Mono applied

**Expected Results:**
- ✅ Roboto Mono loaded from Google Fonts
- ✅ Font applied to all text elements
- ✅ Weights loaded: 400, 600, 700
- ✅ Monospace appearance consistent

**Actual Results:**
```
Status: [ PASS / FAIL ]
Font Loaded: [ YES / NO ]
Fallback Used: [ YES / NO ]
Notes: _____________________
```

---

### Test ID: ERR-004
**Test Case:** Verify no CORS errors  
**Priority:** HIGH  
**Steps:**
1. Check console for CORS warnings
2. Verify all external resources load

**Expected Results:**
- ✅ No CORS errors for CDN resources
- ✅ Embedded data works (no file:// CORS issues)
- ✅ Map tiles load correctly

**Actual Results:**
```
Status: [ PASS / FAIL ]
CORS Errors: [ YES / NO ]
Notes: _____________________
```

---

## PERFORMANCE BENCHMARKS

### Test ID: PERF-001
**Test Case:** Initial page load time  
**Priority:** MEDIUM  
**Steps:**
1. Clear browser cache
2. Reload page
3. Measure load time in Network tab

**Expected Results:**
- ✅ DOMContentLoaded: < 2 seconds
- ✅ Full page load: < 4 seconds
- ✅ All charts rendered: < 5 seconds

**Actual Results:**
```
DOMContentLoaded: ___ ms
Page Load: ___ ms
Charts Rendered: ___ ms
Status: [ PASS / FAIL ]
```

---

### Test ID: PERF-002
**Test Case:** Chart type switch responsiveness  
**Priority:** MEDIUM  
**Steps:**
1. Switch chart types rapidly
2. Measure transition time

**Expected Results:**
- ✅ Chart type change: < 300ms
- ✅ Smooth animation
- ✅ No lag or freeze

**Actual Results:**
```
Transition Time: ___ ms
Status: [ PASS / FAIL ]
```

---

### Test ID: PERF-003
**Test Case:** Map interaction responsiveness  
**Priority:** MEDIUM  
**Steps:**
1. Click markers rapidly
2. Zoom in/out repeatedly
3. Change filters

**Expected Results:**
- ✅ Marker click response: < 100ms
- ✅ Zoom smooth at 60fps
- ✅ Filter change: < 200ms

**Actual Results:**
```
Marker Response: ___ ms
Zoom FPS: ___
Filter Change: ___ ms
Status: [ PASS / FAIL ]
```

---

### Test ID: PERF-004
**Test Case:** Memory usage  
**Priority:** LOW  
**Steps:**
1. Open Performance monitor
2. Interact with dashboard for 5 minutes
3. Check memory footprint

**Expected Results:**
- ✅ Memory usage: < 200 MB
- ✅ No memory leaks
- ✅ Stable over time

**Actual Results:**
```
Initial Memory: ___ MB
After 5 min: ___ MB
Memory Leak: [ YES / NO ]
Status: [ PASS / FAIL ]
```

---

## BROWSER COMPATIBILITY

### Test ID: COMPAT-001
**Test Case:** Chrome/Edge testing  
**Priority:** CRITICAL  
**Steps:**
1. Test all features in Chrome 120+
2. Test all features in Edge 120+

**Expected Results:**
- ✅ All features work identically
- ✅ Chart.js renders correctly
- ✅ Leaflet map displays properly
- ✅ No browser-specific bugs

**Actual Results:**
```
Chrome Version: ___
Chrome Status: [ PASS / FAIL ]
Edge Version: ___
Edge Status: [ PASS / FAIL ]
Issues: _____________________
```

---

### Test ID: COMPAT-002
**Test Case:** Firefox testing  
**Priority:** HIGH  
**Steps:**
1. Test all features in Firefox 115+

**Expected Results:**
- ✅ All features work
- ✅ Chart rendering identical
- ✅ Map interactions smooth
- ✅ Font rendering correct

**Actual Results:**
```
Firefox Version: ___
Status: [ PASS / FAIL ]
Issues: _____________________
```

---

## USER EXPERIENCE ASSESSMENT

### Criterion: Visual Design
**Rating: [ ⭐⭐⭐⭐⭐ / 5 ]**
- Fraud theme consistent (red/orange/black)
- Professional terminal aesthetic
- Clear visual hierarchy
- Good color contrast
- Monospace font appropriate

**Comments:**
```
_____________________
```

---

### Criterion: Usability
**Rating: [ ⭐⭐⭐⭐⭐ / 5 ]**
- Intuitive navigation
- Clear labels and legends
- Tooltips helpful
- Filter controls easy to use
- No confusing elements

**Comments:**
```
_____________________
```

---

### Criterion: Information Architecture
**Rating: [ ⭐⭐⭐⭐⭐ / 5 ]**
- Logical grouping of charts
- Important metrics prominent
- Data flow clear
- No information overload

**Comments:**
```
_____________________
```

---

### Criterion: Performance Perception
**Rating: [ ⭐⭐⭐⭐⭐ / 5 ]**
- Feels fast and responsive
- No lag during interactions
- Smooth animations
- Quick load time

**Comments:**
```
_____________________
```

---

### Criterion: Data Clarity
**Rating: [ ⭐⭐⭐⭐⭐ / 5 ]**
- Data easy to understand
- No ambiguous values
- Percentages helpful
- Context provided

**Comments:**
```
_____________________
```

---

## CRITICAL DEFECTS LOG

| ID | Severity | Component | Description | Status |
|----|----------|-----------|-------------|--------|
| DEF-001 | [ CRITICAL / HIGH / MEDIUM / LOW ] | [ Component ] | [ Description ] | [ OPEN / FIXED ] |
| DEF-002 | | | | |
| DEF-003 | | | | |

---

## TEST SUMMARY

### Test Execution Statistics
```
Total Test Cases: 58
Executed: ___/58
Passed: ___
Failed: ___
Blocked: ___
Skipped: ___

Pass Rate: ___%
```

### Critical Path Tests
```
Chart Switcher: [ PASS / FAIL ]
Map Functionality: [ PASS / FAIL ]
Data Accuracy: [ PASS / FAIL ]
Error-Free Execution: [ PASS / FAIL ]
```

### Performance Summary
```
Page Load: [ PASS / FAIL ]
Chart Interactions: [ PASS / FAIL ]
Map Interactions: [ PASS / FAIL ]
Memory Usage: [ PASS / FAIL ]
```

### Browser Compatibility
```
Chrome: [ PASS / FAIL ]
Firefox: [ PASS / FAIL ]
Edge: [ PASS / FAIL ]
```

---

## FINAL VERDICT

### Production Readiness Assessment

**Overall Score: ___/100**

**DECISION: [ ✅ GO / ⚠️ GO WITH ISSUES / ❌ NO-GO ]**

### Go Criteria (Must be YES for GO):
- [ ] All critical tests passed
- [ ] No blocking defects
- [ ] Data accuracy verified
- [ ] No console errors
- [ ] All browsers compatible
- [ ] Performance acceptable
- [ ] UX rating ≥ 4/5

### Issues Requiring Attention (if GO WITH ISSUES):
```
1. _____________________
2. _____________________
3. _____________________
```

### Recommended Actions Before Deployment:
```
1. [ ] Final code review
2. [ ] Security audit
3. [ ] Performance optimization
4. [ ] User acceptance testing
5. [ ] Documentation update
6. [ ] Deployment checklist
```

---

## SIGN-OFF

**QA Engineer:** ___________________  
**Date:** ___________________  
**Signature:** ___________________

**Technical Lead:** ___________________  
**Date:** ___________________  
**Signature:** ___________________

**Product Owner:** ___________________  
**Date:** ___________________  
**Signature:** ___________________

---

## APPENDIX A: Test Data Reference

### Expected Data Summary
- Total Fraud Cases: 64
- Date Range: Feb 11-14, 2026
- Canales: 5 (AGENTES, TELEFONICO VENTA, CAV, DIGITAL, TELEFONICO SERVICIO)
- Ciudades: 13
- Técnicos: 59 unique
- Asesores: 15 unique
- Nodos: 58 unique (top 20 displayed)
- Aliados: 3 (8301349713, 9003753252, 9001113432)

### Known Duplicate Coordinates
1. CB3 - POPAYAN: (-76.58827, 2.46458) - 2 cases
2. SEVIG7 - SEVILLA: (-75.93624, 4.27020) - 2 cases
3. 4SP - PALMIRA: (-76.28574, 3.53235) - 2 cases
4. SPU1 - NEIVA: (-75.26306, 2.92611) - 2 cases
5. CT13 - CARTAGO: (-75.93328, 4.76256) - 2 cases
6. VLK3F - FLANDES: (-74.83092, 4.27201) - 2 cases

---

## APPENDIX B: Console Log Reference

### Expected Success Messages
```
✅ Total registros procesados: 64
📍 Coordenadas únicas: 58
🔄 Coordenadas con duplicados: 6
📊 Máxima duplicación: 2 casos en misma ubicación
Agregando 64 marcadores al mapa...
✅ Total de marcadores agregados al mapa: 64
📊 Distribución por canal: AGENTES: 34, TELEFONICO VENTA: 18, CAV: 9, DIGITAL: 2, TELEFONICO SERVICIO: 1
Fraud Analytics Terminal initialized successfully
```

---

**END OF TEST PLAN**
