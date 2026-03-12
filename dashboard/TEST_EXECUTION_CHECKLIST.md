# FRAUD DASHBOARD - TEST EXECUTION CHECKLIST

**Test Date:** __________  
**Tester:** __________  
**Browser:** __________ **Version:** __________  
**Screen Resolution:** __________  

---

## ✅ QUICK STATUS TRACKER

| Category | Tests | Pass | Fail | Block | % |
|----------|-------|------|------|-------|---|
| 1. Chart Type Switcher | 6 | ___ | ___ | ___ | ___% |
| 2. Map Interactions | 9 | ___ | ___ | ___ | ___% |
| 3. Dynamic Metrics | 5 | ___ | ___ | ___ | ___% |
| 4. Chart Interactions | 8 | ___ | ___ | ___ | ___% |
| 5. Data Accuracy | 10 | ___ | ___ | ___ | ___% |
| 6. Responsive Behavior | 3 | ___ | ___ | ___ | ___% |
| 7. Error Scenarios | 4 | ___ | ___ | ___ | ___% |
| **TOTAL** | **58** | **___** | **___** | **___** | **___%** |

---

## 1. CHART TYPE SWITCHER (6 tests)

### CTS-001: BAR button
- [ ] Chart switches to horizontal bar
- [ ] Button shows active state
- [ ] Data shows: AGENTES=34, TELEFONICO VENTA=18, CAV=9, DIGITAL=2, TELEFONICO SERVICIO=1
- [ ] Colors correct (red/orange/gray)
- [ ] X-axis labeled "Número de Casos"
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### CTS-002: PIE button
- [ ] Chart switches to pie
- [ ] PIE button active, BAR inactive
- [ ] Legend on right side
- [ ] All 5 segments visible
- [ ] Data persists
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### CTS-003: DONUT button
- [ ] Chart switches to doughnut
- [ ] Center hole visible
- [ ] DONUT button active
- [ ] Legend displays correctly
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### CTS-004: LINE button
- [ ] Chart switches to line
- [ ] X-axis shows Feb 11-14, 2026
- [ ] Y-axis shows "Casos por Día"
- [ ] 5 colored lines visible
- [ ] Legend at top
- [ ] Lines curved with fill
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### CTS-005: Data persistence
- [ ] BAR total = 64
- [ ] PIE total = 64
- [ ] DONUT total = 64
- [ ] LINE total = 64
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### CTS-006: Active states
- [ ] Active button has green accent
- [ ] Only ONE button active at a time
- [ ] Smooth transitions
- **Result:** [ PASS / FAIL ] **Notes:** _______________

---

## 2. MAP INTERACTIONS (9 tests)

### MAP-001: Zoom controls
- [ ] Zoom in (+) works 3x
- [ ] Zoom out (-) works 3x
- [ ] Mouse wheel zoom works
- [ ] Map stays centered on Colombia
- [ ] No tile errors
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### MAP-002: Marker popups
- [ ] Clicked 10 markers
- [ ] All popups opened
- [ ] Popups positioned correctly
- [ ] Popups close when clicking outside
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### MAP-003: Popup content
Tested markers: _____ verified fields present:
- [ ] Canal
- [ ] Tipo Red
- [ ] Ciudad
- [ ] Zona
- [ ] Nodo
- [ ] Técnico (full name)
- [ ] Asesor
- [ ] ID Aliado
- [ ] Coordinates
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### MAP-004: Filter dropdown
- [ ] TODOS LOS CANALES: 64 markers
- [ ] AGENTES: 34 markers
- [ ] TELEFONICO VENTA: 18 markers
- [ ] CAV: 9 markers
- [ ] DIGITAL: 2 markers
- [ ] TELEFONICO SERVICIO: 1 marker
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### MAP-005: Filter updates
- [ ] Markers matching filter remain
- [ ] Non-matching markers removed
- [ ] Popups close when marker hidden
- [ ] No console errors
- [ ] Smooth transition
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### MAP-006: Duplicate offsets
Verified locations (2 markers each, offset applied):
- [ ] CB3 - POPAYAN
- [ ] SEVIG7 - SEVILLA
- [ ] 4SP - PALMIRA
- [ ] SPU1 - NEIVA
- [ ] CT13 - CARTAGO
- [ ] VLK3F - FLANDES
- [ ] Duplicate markers larger (14px)
- [ ] Popup shows "Ubicación ajustada" warning
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### MAP-007: Legend
- [ ] Legend in bottom-right
- [ ] Black background with red border
- [ ] All 5 canales listed
- [ ] Colors match markers
- [ ] Roboto Mono font
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### MAP-008: Total markers
Console output:
- [ ] "Total registros procesados: 64"
- [ ] "Coordenadas únicas: 58"
- [ ] "Coordenadas con duplicados: 6"
- [ ] "Total de marcadores agregados: 64"
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### MAP-009: Coordinate validation
- [ ] All coordinates within Colombian range
- [ ] No invalid coordinate warnings
- [ ] Map centered properly
- **Result:** [ PASS / FAIL ] **Notes:** _______________

---

## 3. DYNAMIC METRICS (5 tests)

### MET-001: Clock
- [ ] Clock ticks every second
- [ ] HH:MM:SS format (24-hour)
- [ ] Time accurate
- [ ] No lag
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### MET-002: FPS counter
- [ ] FPS displays in footer
- [ ] Updates every ~1.5 seconds
- [ ] Range: 58-62 FPS
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### MET-003: Latency
- [ ] Latency displays in footer
- [ ] Updates every ~1.5 seconds
- [ ] Range: 35-60ms
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### MET-004: Alert ticker
- [ ] CASOS FRAUDE: 64 (red)
- [ ] Fraud change: +12% ↑
- [ ] CANALES AFECTADOS: 5
- [ ] CIUDADES EN RIESGO: 13
- [ ] ASESORES INVOLUCRADOS: 15
- [ ] TASA DE DETECCIÓN: 94.2% (green)
- [ ] ÚLTIMA ACTUALIZACIÓN: HH:MM
- [ ] Separators "|" visible
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### MET-005: Metric counters
- [ ] Top Canal: AGENTES
- [ ] Top Canal Cases: 34
- [ ] Top Canal %: 53.1%
- [ ] Geo Total: 64
- [ ] Geo Hotspot: CALI
- **Result:** [ PASS / FAIL ] **Notes:** _______________

---

## 4. CHART INTERACTIONS (8 tests)

### CHT-001: Canal chart tooltips
- [ ] Tooltip appears on hover
- [ ] Dark background with red border
- [ ] AGENTES: 34
- [ ] TELEFONICO VENTA: 18
- [ ] CAV: 9
- [ ] Roboto Mono font
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### CHT-002: Canal2 tooltips
- [ ] Doughnut tooltips show [Canal]: [count] casos ([%]%)
- [ ] CALLE: 26 casos
- [ ] TMK OUT BOUND: 15 casos
- [ ] All sum to 64
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### CHT-003: Ciudad tooltips
- [ ] Tooltip: "Casos: [value] ([%]%)"
- [ ] CALI: 18 casos (28.1%)
- [ ] POPAYAN: 10 casos (15.6%)
- [ ] Labels visible on bars
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### CHT-004: Técnico scatter tooltips
- [ ] Total points: 59 ✓
- [ ] X-axis: 1 to 59
- [ ] Y-axis: 1, 2, 3
- [ ] Highest (y=3): JESUS ALFREDO RODRIGUEZ MORA
- [ ] Tooltip shows name + fraud count
- [ ] Orange points with red border
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### CHT-005: Asesor scatter tooltips
- [ ] Total points: 15 ✓
- [ ] X-axis: 1 to 15
- [ ] Y-axis: 1, 2, 3
- [ ] Highest (y=3): JOHANA ROSERO PERENGUE
- [ ] Tooltip shows name + fraud count
- [ ] Red points
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### CHT-006: Nodo tooltips
- [ ] Total bars: 20
- [ ] Tooltip: "Nodo: [code]" + "Casos: [count]"
- [ ] CB3, SEVIG7, 4SP, SPU1, CT13, VLK3F = 2 casos
- [ ] Others = 1 caso
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### CHT-007: Matrix tooltips
- [ ] Stacked bar chart visible
- [ ] Tooltip shows canal + zona + count
- [ ] Bars sum to 64
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### CHT-008: Hover animations
- [ ] Bars/segments change opacity
- [ ] Scatter points enlarge (6px → 8px)
- [ ] Smooth transitions
- [ ] Cursor changes to pointer
- **Result:** [ PASS / FAIL ] **Notes:** _______________

---

## 5. DATA ACCURACY (10 tests)

### DAT-001: Técnicos scatter points
- [ ] Total: 59 points ✓ (not 10)
- [ ] X-axis: 1 to 59
- [ ] Y-axis: 1, 2, 3
- [ ] Distribution: 1@y=3, 12@y=2, 46@y=1
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### DAT-002: Asesores scatter points
- [ ] Total: 15 points ✓
- [ ] X-axis: 1 to 15
- [ ] Distribution: 1@y=3, 6@y=2, 8@y=1
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### DAT-003: X-axis ordinal
- [ ] Técnicos: 0, 5, 10, 15... 59
- [ ] Asesores: 0, 5, 10, 15
- [ ] Step size: 5
- [ ] Title present
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### DAT-004: Y-axis counts
- [ ] Y-axis: 0, 1, 2, 3
- [ ] Step size: 1
- [ ] Title: "Cantidad de Fraudes"
- [ ] No decimals
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### DAT-005: Topmost points
- [ ] Top técnico: JESUS ALFREDO RODRIGUEZ MORA (3)
- [ ] Top asesor: JOHANA ROSERO PERENGUE (3)
- [ ] No points above y=3
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### DAT-006: Nodo top 20
- [ ] Exactly 20 bars
- [ ] CB3, SEVIG7, 4SP, SPU1, CT13, VLK3F visible
- [ ] Sorted descending
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### DAT-007: Nodo case counts
- [ ] CB3: 2
- [ ] SEVIG7: 2
- [ ] 4SP: 2
- [ ] SPU1: 2
- [ ] CT13: 2
- [ ] VLK3F: 2
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### DAT-008: Map total markers
- [ ] Console: 64 markers added
- [ ] Visual count: 64 markers (with filter ALL)
- [ ] No duplicates at exact same position
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### DAT-009: No overlap
- [ ] Zoomed in on duplicate locations
- [ ] Markers offset, not overlapping
- [ ] All markers clickable
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### DAT-010: Colombian coordinates
- [ ] All lat: 1.5° to 5.5°
- [ ] All lon: -78.0° to -74.0°
- [ ] No console warnings
- [ ] All markers in bounds
- **Result:** [ PASS / FAIL ] **Notes:** _______________

---

## 6. RESPONSIVE BEHAVIOR (3 tests)

### RES-001: Window resize
Tested resolutions:
- [ ] 1920x1080: [ OK / BROKEN ]
- [ ] 1366x768: [ OK / BROKEN ]
- [ ] 1280x720: [ OK / BROKEN ]
- [ ] Charts resize smoothly
- [ ] No overflow
- [ ] Text legible
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### RES-002: Aspect ratio
- [ ] Charts fill container properly
- [ ] No distortion
- [ ] Proportions maintained
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### RES-003: Map resize
- [ ] Map resizes immediately
- [ ] No gray areas
- [ ] Tiles reload correctly
- [ ] Markers positioned correctly
- **Result:** [ PASS / FAIL ] **Notes:** _______________

---

## 7. ERROR SCENARIOS (4 tests)

### ERR-001: Console errors
- [ ] No JavaScript errors
- [ ] No unhandled rejections
- [ ] No "undefined"/"null" errors
- [ ] Only success logs (green ✅)
- **Console Screenshot:** [ Attached: Y/N ]
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### ERR-002: Resource loading
- [ ] Chart.js loaded (CDN)
- [ ] Leaflet CSS loaded
- [ ] Leaflet JS loaded
- [ ] Roboto Mono loaded
- [ ] fraud_charts.js loaded
- [ ] fraud_styles.css loaded
- [ ] No 404 errors
- **Network Screenshot:** [ Attached: Y/N ]
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### ERR-003: Font loading
- [ ] Roboto Mono loaded from Google
- [ ] Font applied to all text
- [ ] Weights: 400, 600, 700
- [ ] Monospace appearance consistent
- **Result:** [ PASS / FAIL ] **Notes:** _______________

### ERR-004: CORS errors
- [ ] No CORS errors in console
- [ ] Embedded data works
- [ ] Map tiles load correctly
- **Result:** [ PASS / FAIL ] **Notes:** _______________

---

## ⚡ PERFORMANCE BENCHMARKS

### PERF-001: Initial load
- **DOMContentLoaded:** _____ ms (target: < 2000ms)
- **Page Load:** _____ ms (target: < 4000ms)
- **Charts Rendered:** _____ ms (target: < 5000ms)
- **Result:** [ PASS / FAIL ]

### PERF-002: Chart switch
- **Transition Time:** _____ ms (target: < 300ms)
- **Animation:** [ SMOOTH / LAGGY ]
- **Result:** [ PASS / FAIL ]

### PERF-003: Map interactions
- **Marker Click:** _____ ms (target: < 100ms)
- **Zoom FPS:** _____ (target: ~60fps)
- **Filter Change:** _____ ms (target: < 200ms)
- **Result:** [ PASS / FAIL ]

### PERF-004: Memory usage
- **Initial:** _____ MB
- **After 5 min:** _____ MB
- **Memory Leak:** [ YES / NO ]
- **Result:** [ PASS / FAIL ] (target: < 200 MB)

---

## 🌐 BROWSER COMPATIBILITY

### Chrome
- **Version:** _________
- [ ] All features work
- [ ] Charts render correctly
- [ ] Map displays properly
- [ ] No console errors
- [ ] Fonts load
- **Result:** [ PASS / FAIL ]

### Firefox
- **Version:** _________
- [ ] All features work
- [ ] Charts identical to Chrome
- [ ] Map smooth
- [ ] Tooltips work
- **Result:** [ PASS / FAIL ]

### Edge
- **Version:** _________
- [ ] All features work
- [ ] Charts render correctly
- [ ] Map displays properly
- [ ] No issues
- **Result:** [ PASS / FAIL ]

---

## 🎯 USER EXPERIENCE RATINGS

### Visual Design
**Rating:** [ ⭐⭐⭐⭐⭐ ] / 5
- [ ] Fraud theme consistent
- [ ] Professional terminal aesthetic
- [ ] Clear visual hierarchy
- [ ] Good color contrast
**Comments:** _______________

### Usability
**Rating:** [ ⭐⭐⭐⭐⭐ ] / 5
- [ ] Intuitive navigation
- [ ] Clear labels
- [ ] Tooltips helpful
- [ ] Easy to use
**Comments:** _______________

### Information Architecture
**Rating:** [ ⭐⭐⭐⭐⭐ ] / 5
- [ ] Logical grouping
- [ ] Important metrics prominent
- [ ] Data flow clear
**Comments:** _______________

### Performance Perception
**Rating:** [ ⭐⭐⭐⭐⭐ ] / 5
- [ ] Feels fast
- [ ] No lag
- [ ] Smooth animations
**Comments:** _______________

### Data Clarity
**Rating:** [ ⭐⭐⭐⭐⭐ ] / 5
- [ ] Data easy to understand
- [ ] No ambiguous values
- [ ] Good context
**Comments:** _______________

**Overall UX Score:** _____ / 5

---

## 🐛 DEFECTS FOUND

### Defect 1
- **ID:** DEF-001
- **Severity:** [ CRITICAL / HIGH / MEDIUM / LOW ]
- **Component:** _______________
- **Description:** _______________
- **Steps to Reproduce:** _______________
- **Expected:** _______________
- **Actual:** _______________
- **Status:** [ OPEN / FIXED ]

### Defect 2
- **ID:** DEF-002
- **Severity:** [ CRITICAL / HIGH / MEDIUM / LOW ]
- **Component:** _______________
- **Description:** _______________
- **Status:** [ OPEN / FIXED ]

### Defect 3
- **ID:** DEF-003
- **Severity:** [ CRITICAL / HIGH / MEDIUM / LOW ]
- **Component:** _______________
- **Description:** _______________
- **Status:** [ OPEN / FIXED ]

*(Continue on separate sheet if needed)*

---

## 📊 FINAL RESULTS

### Test Statistics
- **Total Tests:** 58
- **Executed:** _____/58
- **Passed:** _____
- **Failed:** _____
- **Blocked:** _____
- **Skipped:** _____
- **Pass Rate:** _____%

### Critical Path Results
- [ ] Chart Switcher: [ PASS / FAIL ]
- [ ] Map Functionality: [ PASS / FAIL ]
- [ ] Data Accuracy: [ PASS / FAIL ]
- [ ] Error-Free Execution: [ PASS / FAIL ]

### Performance Summary
- [ ] Page Load: [ PASS / FAIL ]
- [ ] Chart Interactions: [ PASS / FAIL ]
- [ ] Map Interactions: [ PASS / FAIL ]
- [ ] Memory Usage: [ PASS / FAIL ]

### Browser Compatibility
- [ ] Chrome: [ PASS / FAIL ]
- [ ] Firefox: [ PASS / FAIL ]
- [ ] Edge: [ PASS / FAIL ]

---

## 🚦 FINAL VERDICT

**Overall Score:** _____ / 100

**DEPLOYMENT DECISION:** [ ✅ GO / ⚠️ GO WITH ISSUES / ❌ NO-GO ]

### All GO Criteria Met?
- [ ] All critical tests passed (18/18)
- [ ] No blocking defects
- [ ] Data accuracy verified
- [ ] No console errors
- [ ] All browsers compatible
- [ ] Performance acceptable
- [ ] UX rating ≥ 4/5

### Issues Requiring Attention:
1. _______________
2. _______________
3. _______________

### Recommended Actions:
- [ ] Final code review
- [ ] Security audit
- [ ] Performance optimization
- [ ] User acceptance testing
- [ ] Documentation update
- [ ] Deployment checklist

---

## ✍️ SIGN-OFF

**QA Engineer**  
Name: _______________  
Date: _______________  
Signature: _______________

**Technical Lead**  
Name: _______________  
Date: _______________  
Signature: _______________

**Product Owner**  
Name: _______________  
Date: _______________  
Signature: _______________

---

**Test Duration:** _____ hours  
**Testing Completed:** _____ / _____ / _____  
**Next Steps:** _______________

---

**END OF CHECKLIST**
