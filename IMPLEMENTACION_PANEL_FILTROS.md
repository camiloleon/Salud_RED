# 🛠️ IMPLEMENTACIÓN TÉCNICA: PANEL DE FILTROS

## 📋 ARQUITECTURA DE COMPONENTES

### **Estructura de Archivos**
```
fraud_dashboard/
├── fraud_dashboard.html       (existente - modificar)
├── fraud_charts.js            (existente - extender)
├── fraud_styles.css           (existente - añadir estilos)
├── fraud_filters.js           (NUEVO - lógica de filtros)
└── fraud_filters.css          (NUEVO - estilos del panel)
```

---

## 🎨 DISEÑO HTML DEL PANEL DE FILTROS

### **Posición en el Layout**

El panel de filtros se insertará **ANTES** del contenedor principal:

```html
<!DOCTYPE html>
<html>
<head><!-- head existente --></head>
<body>
    <!-- NUEVO: Panel de Filtros -->
    <aside id="filterPanel" class="filter-sidebar">
        <!-- Contenido del panel -->
    </aside>
    
    <!-- Overlay para mobile -->
    <div id="filterOverlay" class="filter-overlay"></div>
    
    <!-- Dashboard existente -->
    <div id="dashboardContainer" class="dashboard-main">
        <div class="header"><!-- header existente --></div>
        <div class="trading-grid"><!-- gráficos existentes --></div>
    </div>
</body>
</html>
```

### **Estructura Completa del Panel**

```html
<aside id="filterPanel" class="filter-sidebar">
    <!-- Header del Panel -->
    <div class="filter-header">
        <div class="filter-title">
            <span class="filter-icon">🔍</span>
            <h2>Filtros</h2>
        </div>
        <div class="filter-actions">
            <button id="saveFilters" class="btn-icon" title="Guardar vista">
                <span>💾</span>
            </button>
            <button id="resetFilters" class="btn-icon" title="Resetear">
                <span>🔄</span>
            </button>
            <button id="closeFilters" class="btn-icon hide-desktop" title="Cerrar">
                <span>❌</span>
            </button>
        </div>
    </div>

    <!-- Contador de Resultados -->
    <div class="filter-results">
        <div class="results-count">
            <span id="filteredCount" class="count-number">74</span>
            <span class="count-label">casos encontrados</span>
        </div>
        <div id="activeFiltersChips" class="active-filters">
            <!-- Se llenará dinámicamente con chips de filtros activos -->
        </div>
    </div>

    <!-- Filtros - Nivel 1: CRÍTICOS -->
    <div class="filter-section active">
        <div class="section-header">
            <h3>📅 Período</h3>
        </div>
        <div class="section-content">
            <!-- Date Range Picker -->
            <div class="date-range-picker">
                <div class="date-input-group">
                    <label>Desde</label>
                    <input type="date" id="dateStart" value="2026-02-10" />
                </div>
                <div class="date-input-group">
                    <label>Hasta</label>
                    <input type="date" id="dateEnd" value="2026-03-09" />
                </div>
            </div>
            <!-- Presets -->
            <div class="date-presets">
                <button class="preset-btn" data-preset="today">Hoy</button>
                <button class="preset-btn" data-preset="7d">7 días</button>
                <button class="preset-btn" data-preset="30d">30 días</button>
                <button class="preset-btn active" data-preset="all">Todo</button>
            </div>
        </div>
    </div>

    <div class="filter-section active">
        <div class="section-header">
            <h3>🏭 Canal de Venta</h3>
            <span class="selection-count" id="canalCount">5 de 5</span>
        </div>
        <div class="section-content">
            <div class="checkbox-grid">
                <label class="checkbox-card">
                    <input type="checkbox" name="canal" value="AGENTES" checked />
                    <span class="card-content">
                        <span class="card-icon">🔴</span>
                        <span class="card-label">AGENTES</span>
                        <span class="card-badge" data-count="agentes">22</span>
                    </span>
                </label>
                <label class="checkbox-card">
                    <input type="checkbox" name="canal" value="TELEFONICO VENTA" checked />
                    <span class="card-content">
                        <span class="card-icon">🟠</span>
                        <span class="card-label">TELEFÓNICO</span>
                        <span class="card-badge" data-count="telefonico">18</span>
                    </span>
                </label>
                <label class="checkbox-card">
                    <input type="checkbox" name="canal" value="CAV" checked />
                    <span class="card-content">
                        <span class="card-icon">⚪</span>
                        <span class="card-label">CAV</span>
                        <span class="card-badge" data-count="cav">15</span>
                    </span>
                </label>
                <label class="checkbox-card">
                    <input type="checkbox" name="canal" value="DIGITAL" checked />
                    <span class="card-content">
                        <span class="card-icon">🔵</span>
                        <span class="card-label">DIGITAL</span>
                        <span class="card-badge" data-count="digital">12</span>
                    </span>
                </label>
                <label class="checkbox-card">
                    <input type="checkbox" name="canal" value="TELEFONICO SERVICIO" checked />
                    <span class="card-content">
                        <span class="card-icon">🟢</span>
                        <span class="card-label">SERVICIO</span>
                        <span class="card-badge" data-count="servicio">7</span>
                    </span>
                </label>
            </div>
        </div>
    </div>

    <div class="filter-section active">
        <div class="section-header">
            <h3>🗺️ Ubicación</h3>
            <span class="selection-count" id="ciudadCount">Todas</span>
        </div>
        <div class="section-content">
            <!-- Search -->
            <div class="search-box">
                <input type="text" id="ciudadSearch" placeholder="🔍 Buscar ciudad..." />
            </div>
            <!-- Top ciudades -->
            <div class="ciudad-list">
                <label class="checkbox-list-item">
                    <input type="checkbox" name="ciudad" value="CALI" />
                    <span class="item-label">CALI</span>
                    <span class="item-badge">20</span>
                    <span class="item-bar" style="width: 100%"></span>
                </label>
                <label class="checkbox-list-item">
                    <input type="checkbox" name="ciudad" value="POPAYAN" />
                    <span class="item-label">POPAYÁN</span>
                    <span class="item-badge">10</span>
                    <span class="item-bar" style="width: 50%"></span>
                </label>
                <label class="checkbox-list-item">
                    <input type="checkbox" name="ciudad" value="PALMIRA" />
                    <span class="item-label">PALMIRA</span>
                    <span class="item-badge">9</span>
                    <span class="item-bar" style="width: 45%"></span>
                </label>
                <label class="checkbox-list-item">
                    <input type="checkbox" name="ciudad" value="NEIVA" />
                    <span class="item-label">NEIVA</span>
                    <span class="item-badge">6</span>
                    <span class="item-bar" style="width: 30%"></span>
                </label>
                <!-- Más ciudades colapsadas -->
                <button class="expand-btn" id="expandCiudades">
                    <span>+12 ciudades más</span>
                </button>
            </div>
            <!-- Ver Mapa -->
            <button class="secondary-btn full-width" id="viewMapFilter">
                <span>🗺️ Ver en Mapa</span>
            </button>
        </div>
    </div>

    <!-- Filtros - Nivel 2: OPERATIVOS -->
    <div class="filter-section collapsible">
        <div class="section-header clickable" data-collapse="operativos">
            <h3>⚙️ Filtros Operativos</h3>
            <span class="collapse-icon">▼</span>
        </div>
        <div class="section-content" id="operativos">
            <!-- Técnico -->
            <div class="filter-group">
                <label class="filter-label">👤 Técnico</label>
                <div class="input-with-actions">
                    <select id="tecnicoSelect" class="searchable-select" multiple>
                        <option value="">Búsqueda Inteligente...</option>
                        <!-- Se llenará dinámicamente -->
                    </select>
                    <div class="quick-filters">
                        <button class="quick-btn" data-quick="top10-tecnicos">Top 10</button>
                        <button class="quick-btn" data-quick="criticos-tecnicos">🔴 Críticos</button>
                    </div>
                </div>
            </div>

            <!-- Aliado -->
            <div class="filter-group">
                <label class="filter-label">🤝 Aliado</label>
                <div class="radio-group-cards">
                    <label class="radio-card">
                        <input type="radio" name="aliado" value="" checked />
                        <span>Todos</span>
                        <span class="radio-badge">74</span>
                    </label>
                    <label class="radio-card">
                        <input type="radio" name="aliado" value="8301349713" />
                        <span>CONECTAR TV</span>
                        <span class="radio-badge">39</span>
                    </label>
                    <label class="radio-card">
                        <input type="radio" name="aliado" value="9003753252" />
                        <span>Tabasco</span>
                        <span class="radio-badge">22</span>
                    </label>
                    <label class="radio-card">
                        <input type="radio" name="aliado" value="9001113432" />
                        <span>Otro</span>
                        <span class="radio-badge">13</span>
                    </label>
                </div>
            </div>

            <!-- Tipo de Red -->
            <div class="filter-group">
                <label class="filter-label">🔧 Tipo de Red</label>
                <div class="segmented-control">
                    <input type="radio" name="tipoRed" value="" id="red-todos" checked />
                    <label for="red-todos">Todos</label>
                    
                    <input type="radio" name="tipoRed" value="Masivo Bidireccional" id="red-masivo" />
                    <label for="red-masivo">Masivo (41)</label>
                    
                    <input type="radio" name="tipoRed" value="FTTH" id="red-ftth" />
                    <label for="red-ftth">FTTH (29)</label>
                    
                    <input type="radio" name="tipoRed" value="Pymes" id="red-pymes" />
                    <label for="red-pymes">Pymes (4)</label>
                </div>
            </div>
        </div>
    </div>

    <!-- Filtros - Nivel 3: AVANZADOS -->
    <button class="advanced-filters-btn" id="openAdvancedFilters">
        <span>🔬 Filtros Avanzados</span>
        <span class="badge" id="advancedActiveCount">0</span>
    </button>

    <!-- Botón de Aplicar (sticky) -->
    <div class="filter-footer">
        <button class="apply-btn" id="applyFilters">
            <span>📊 Aplicar Filtros</span>
        </button>
    </div>
</aside>
```

---

## 🎨 ESTILOS CSS (fraud_filters.css)

```css
/* ====================================
   VARIABLES DE DISEÑO
   ==================================== */
:root {
    --filter-width: 320px;
    --filter-header-height: 60px;
    --filter-footer-height: 80px;
    --primary-color: #3b82f6;
    --danger-color: #ef4444;
    --success-color: #22c55e;
    --warning-color: #f59e0b;
    --border-color: #e5e7eb;
    --bg-light: #f9fafb;
    --bg-dark: #1f2937;
    --text-primary: #111827;
    --text-secondary: #6b7280;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --border-radius: 8px;
}

/* ====================================
   LAYOUT PRINCIPAL
   ==================================== */
body {
    margin: 0;
    overflow-x: hidden;
}

.dashboard-main {
    margin-left: var(--filter-width);
    transition: margin-left 0.3s ease;
}

.dashboard-main.filters-hidden {
    margin-left: 0;
}

/* ====================================
   PANEL LATERAL DE FILTROS
   ==================================== */
.filter-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: var(--filter-width);
    height: 100vh;
    background: white;
    border-right: 1px solid var(--border-color);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateX(0);
    transition: transform 0.3s ease;
    box-shadow: var(--shadow-md);
}

.filter-sidebar.hidden {
    transform: translateX(-100%);
}

/* ====================================
   HEADER DEL PANEL
   ==================================== */
.filter-header {
    height: var(--filter-header-height);
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, var(--primary-color) 0%, #2563eb 100%);
    color: white;
}

.filter-title {
    display: flex;
    align-items: center;
    gap: 12px;
}

.filter-icon {
    font-size: 24px;
}

.filter-title h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
}

.filter-actions {
    display: flex;
    gap: 8px;
}

.btn-icon {
    width: 36px;
    height: 36px;
    border: none;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    font-size: 18px;
}

.btn-icon:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
}

/* ====================================
   CONTADOR DE RESULTADOS
   ==================================== */
.filter-results {
    padding: 16px;
    background: var(--bg-light);
    border-bottom: 1px solid var(--border-color);
}

.results-count {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 12px;
}

.count-number {
    font-size: 32px;
    font-weight: 700;
    color: var(--primary-color);
    line-height: 1;
}

.count-label {
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 4px;
}

.active-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    min-height: 24px;
}

.filter-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    font-size: 12px;
    color: var(--text-primary);
    animation: chipIn 0.3s ease;
}

@keyframes chipIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.filter-chip .chip-remove {
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
}

.filter-chip .chip-remove:hover {
    opacity: 1;
}

/* ====================================
   CONTENIDO SCROLLABLE
   ==================================== */
.filter-sidebar > div:nth-child(3) {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: var(--filter-footer-height);
}

/* Custom Scrollbar */
.filter-sidebar::-webkit-scrollbar {
    width: 6px;
}

.filter-sidebar::-webkit-scrollbar-track {
    background: var(--bg-light);
}

.filter-sidebar::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
}

.filter-sidebar::-webkit-scrollbar-thumb:hover {
    background: #d1d5db;
}

/* ====================================
   SECCIONES DE FILTROS
   ==================================== */
.filter-section {
    border-bottom: 1px solid var(--border-color);
    background: white;
}

.section-header {
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: default;
    background: white;
    transition: background 0.2s;
}

.section-header.clickable {
    cursor: pointer;
    user-select: none;
}

.section-header.clickable:hover {
    background: var(--bg-light);
}

.section-header h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 8px;
}

.selection-count {
    font-size: 12px;
    color: var(--text-secondary);
    padding: 2px 8px;
    background: var(--bg-light);
    border-radius: 10px;
}

.collapse-icon {
    font-size: 12px;
    transition: transform 0.3s;
}

.filter-section.collapsible.collapsed .collapse-icon {
    transform: rotate(-90deg);
}

.section-content {
    padding: 12px 16px 16px;
    max-height: 1000px;
    overflow: hidden;
    transition: max-height 0.4s ease, padding 0.4s ease;
}

.filter-section.collapsible.collapsed .section-content {
    max-height: 0;
    padding: 0 16px;
}

/* ====================================
   DATE RANGE PICKER
   ==================================== */
.date-range-picker {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 12px;
}

.date-input-group label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    color: var(--text-secondary);
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.date-input-group input[type="date"] {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 13px;
    transition: var(--transition);
}

.date-input-group input[type="date"]:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.date-presets {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.preset-btn {
    flex: 1;
    min-width: 60px;
    padding: 6px 12px;
    border: 1px solid var(--border-color);
    background: white;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    transition: var(--transition);
    white-space: nowrap;
}

.preset-btn:hover {
    background: var(--bg-light);
}

.preset-btn.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

/* ====================================
   CHECKBOX GRID (Canales)
   ==================================== */
.checkbox-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
}

.checkbox-card {
    position: relative;
    cursor: pointer;
}

.checkbox-card input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.card-content {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    background: white;
    transition: var(--transition);
}

.checkbox-card:hover .card-content {
    border-color: var(--primary-color);
    background: rgba(59, 130, 246, 0.02);
}

.checkbox-card input:checked ~ .card-content {
    border-color: var(--primary-color);
    background: rgba(59, 130, 246, 0.08);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.card-icon {
    font-size: 20px;
}

.card-label {
    flex: 1;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
}

.card-badge {
    background: var(--bg-light);
    color: var(--text-secondary);
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
}

.checkbox-card input:checked ~ .card-content .card-badge {
    background: var(--primary-color);
    color: white;
}

/* ====================================
   SEARCH BOX
   ==================================== */
.search-box {
    margin-bottom: 12px;
}

.search-box input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 13px;
    transition: var(--transition);
}

.search-box input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* ====================================
   CHECKBOX LIST (Ciudades)
   ==================================== */
.ciudad-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
}

.checkbox-list-item {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
}

.checkbox-list-item:hover {
    background: var(--bg-light);
}

.checkbox-list-item input[type="checkbox"] {
    cursor: pointer;
}

.item-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
    z-index: 1;
}

.item-badge {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    z-index: 1;
}

.item-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.02));
    border-radius: 6px;
    transition: width 0.3s ease;
}

.checkbox-list-item input:checked ~ .item-bar {
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05));
}

.expand-btn {
    width: 100%;
    padding: 8px;
    border: 1px dashed var(--border-color);
    background: transparent;
    border-radius: 6px;
    color: var(--text-secondary);
    font-size: 12px;
    cursor: pointer;
    transition: var(--transition);
}

.expand-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    background: rgba(59, 130, 246, 0.02);
}

/* ====================================
   BOTONES SECUNDARIOS
   ==================================== */
.secondary-btn {
    padding: 10px 16px;
    border: 1px solid var(--border-color);
    background: white;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.secondary-btn:hover {
    background: var(--bg-light);
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.full-width {
    width: 100%;
}

/* ====================================
   FILTROS OPERATIVOS
   ==================================== */
.filter-group {
    margin-bottom: 20px;
}

.filter-group:last-child {
    margin-bottom: 0;
}

.filter-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
}

.searchable-select {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 13px;
    margin-bottom: 8px;
}

.quick-filters {
    display: flex;
    gap: 6px;
}

.quick-btn {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid var(--border-color);
    background: white;
    border-radius: 6px;
    font-size: 11px;
    cursor: pointer;
    transition: var(--transition);
}

.quick-btn:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

/* ====================================
   RADIO GROUP CARDS (Aliados)
   ==================================== */
.radio-group-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.radio-card {
    position: relative;
    cursor: pointer;
}

.radio-card input[type="radio"] {
    position: absolute;
    opacity: 0;
}

.radio-card > span:not(.radio-badge) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px 8px;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    background: white;
    font-size: 11px;
    font-weight: 500;
    text-align: center;
    transition: var(--transition);
}

.radio-card:hover > span:not(.radio-badge) {
    border-color: var(--primary-color);
}

.radio-card input:checked ~ span:not(.radio-badge) {
    border-color: var(--primary-color);
    background: rgba(59, 130, 246, 0.08);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.radio-badge {
    position: absolute;
    top: 4px;
    right: 4px;
    background: var(--bg-light);
    color: var(--text-secondary);
    padding: 2px 6px;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 600;
}

.radio-card input:checked ~ .radio-badge {
    background: var(--primary-color);
    color: white;
}

/* ====================================
   SEGMENTED CONTROL (Tipo de Red)
   ==================================== */
.segmented-control {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    background: var(--bg-light);
    padding: 4px;
    border-radius: 8px;
}

.segmented-control input[type="radio"] {
    display: none;
}

.segmented-control label {
    padding: 8px 4px;
    text-align: center;
    font-size: 11px;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    border-radius: 6px;
    transition: var(--transition);
}

.segmented-control input:checked + label {
    background: white;
    color: var(--primary-color);
    box-shadow: var(--shadow-sm);
}

/* ====================================
   BOTÓN DE FILTROS AVANZADOS
   ==================================== */
.advanced-filters-btn {
    margin: 16px;
    padding: 12px 16px;
    border: 1px dashed var(--border-color);
    background: white;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: var(--transition);
}

.advanced-filters-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    background: rgba(59, 130, 246, 0.02);
}

.advanced-filters-btn .badge {
    background: var(--primary-color);
    color: white;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
}

/* ====================================
   FOOTER CON BOTÓN APLICAR
   ==================================== */
.filter-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: var(--filter-width);
    height: var(--filter-footer-height);
    padding: 16px;
    background: white;
    border-top: 1px solid var(--border-color);
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.05);
    z-index: 1001;
}

.apply-btn {
    width: 100%;
    padding: 14px;
    border: none;
    background: linear-gradient(135deg, var(--primary-color) 0%, #2563eb 100%);
    color: white;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow-md);
}

.apply-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.apply-btn:active {
    transform: translateY(0);
}

/* ====================================
   RESPONSIVE - MOBILE
   ==================================== */
@media (max-width: 768px) {
    .dashboard-main {
        margin-left: 0;
    }
    
    .filter-sidebar {
        width: 100%;
        max-width: 400px;
        transform: translateX(-100%);
    }
    
    .filter-sidebar.visible {
        transform: translateX(0);
    }
    
    .filter-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
    
    .filter-overlay.visible {
        display: block;
    }
    
    .hide-desktop {
        display: flex !important;
    }
    
    .filter-footer {
        width: 100%;
        max-width: 400px;
    }
    
    /* Botón flotante para abrir filtros en mobile */
    .mobile-filter-trigger {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 998;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

@media (min-width: 769px) {
    .hide-desktop {
        display: none !important;
    }
}

/* ====================================
   ANIMACIONES
   ==================================== */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.filter-sidebar.visible {
    animation: slideIn 0.3s ease;
}

.filter-overlay.visible {
    animation: fadeIn 0.3s ease;
}
```

---

## ⚙️ LÓGICA JAVASCRIPT (fraud_filters.js)

```javascript
/**
 * FRAUD FILTERS MANAGER
 * Gestiona el estado y la lógica de los filtros del dashboard
 */

// ====================================
// ESTADO GLOBAL DE FILTROS
// ====================================
let filterState = {
    dateRange: {
        start: '2026-02-10',
        end: '2026-03-09'
    },
    canales: [],  // vacío = todos seleccionados
    ciudades: [],  // vacío = todas
    zonas: [],
    tecnicos: [],
    aliados: [],  // vacío = todos
    companias: [],
    tipoRed: null,  // null = todas
    nodos: [],
    asesores: [],
    active: false,  // false = sin filtros aplicados
    resultCount: 74
};

// Datos originales sin filtrar
let originalData = null;

// ====================================
// INICIALIZACIÓN
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    // Guardar datos originales
    if (typeof fraudData !== 'undefined') {
        originalData = JSON.parse(JSON.stringify(fraudData));
    }
    
    // Inicializar componentes
    initFilterPanel();
    initDatePickers();
    initCanalFilters();
    initCiudadFilters();
    initOperativeFilters();
    initEventListeners();
    
    // Cargar datos iniciales
    updateFilterCounts();
});

// ====================================
// PANEL - FUNCIONES GENERALES
// ====================================
function initFilterPanel() {
    // Toggle panel en mobile
    const closeBtn = document.getElementById('closeFilters');
    const overlay = document.getElementById('filterOverlay');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('filterPanel').classList.remove('visible');
            overlay.classList.remove('visible');
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            document.getElementById('filterPanel').classList.remove('visible');
            overlay.classList.remove('visible');
        });
    }
    
    // Botón flotante mobile
    const mobileBtn = document.createElement('button');
    mobileBtn.className = 'mobile-filter-trigger hide-desktop';
    mobileBtn.innerHTML = '🔍';
    mobileBtn.addEventListener('click', () => {
        document.getElementById('filterPanel').classList.add('visible');
        document.getElementById('filterOverlay').classList.add('visible');
    });
    document.body.appendChild(mobileBtn);
    
    // Collapsible sections
    document.querySelectorAll('.section-header.clickable').forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('collapsed');
        });
    });
}

// ====================================
// FILTRO DE FECHAS
// ====================================
function initDatePickers() {
    const dateStart = document.getElementById('dateStart');
    const dateEnd = document.getElementById('dateEnd');
    
    // Presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover active de todos
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const preset = this.dataset.preset;
            const today = new Date();
            let start, end;
            
            switch(preset) {
                case 'today':
                    start = end = today.toISOString().split('T')[0];
                    break;
                case '7d':
                    start = new Date(today.getTime() - 7*24*60*60*1000).toISOString().split('T')[0];
                    end = today.toISOString().split('T')[0];
                    break;
                case '30d':
                    start = new Date(today.getTime() - 30*24*60*60*1000).toISOString().split('T')[0];
                    end = today.toISOString().split('T')[0];
                    break;
                case 'all':
                default:
                    start = '2026-02-10';
                    end = '2026-03-09';
            }
            
            dateStart.value = start;
            dateEnd.value = end;
            filterState.dateRange = { start, end };
        });
    });
    
    // Cambios manuales
    dateStart.addEventListener('change', () => {
        filterState.dateRange.start = dateStart.value;
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    });
    
    dateEnd.addEventListener('change', () => {
        filterState.dateRange.end = dateEnd.value;
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    });
}

// ====================================
// FILTRO DE CANALES
// ====================================
function initCanalFilters() {
    const canalCheckboxes = document.querySelectorAll('input[name="canal"]');
    
    canalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateCanalSelection();
        });
    });
    
    updateCanalSelection();
}

function updateCanalSelection() {
    const selected = [];
    document.querySelectorAll('input[name="canal"]:checked').forEach(cb => {
        selected.push(cb.value);
    });
    
    filterState.canales = selected.length === 5 ? [] : selected;  // vacío = todos
    
    // Actualizar contador
    const count = selected.length;
    document.getElementById('canalCount').textContent = `${count} de 5`;
}

// ====================================
// FILTRO DE CIUDADES
// ====================================
function initCiudadFilters() {
    const searchBox = document.getElementById('ciudadSearch');
    const ciudadCheckboxes = document.querySelectorAll('input[name="ciudad"]');
    const expandBtn = document.getElementById('expandCiudades');
    
    // Búsqueda
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            document.querySelectorAll('.checkbox-list-item').forEach(item => {
                const label = item.querySelector('.item-label').textContent.toLowerCase();
                item.style.display = label.includes(query) ? 'grid' : 'none';
            });
        });
    }
    
    // Checkboxes
    ciudadCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateCiudadSelection();
        });
    });
    
    // Expandir lista
    if (expandBtn) {
        expandBtn.addEventListener('click', function() {
            // TODO: Mostrar modal con todas las ciudades
            alert('Mostrar modal con las 16 ciudades completas');
        });
    }
    
    updateCiudadSelection();
}

function updateCiudadSelection() {
    const selected = [];
    document.querySelectorAll('input[name="ciudad"]:checked').forEach(cb => {
        selected.push(cb.value);
    });
    
    filterState.ciudades = selected;
    
    // Actualizar contador
    const count = selected.length;
    const countLabel = count === 0 ? 'Todas' : `${count} Ciudad${count > 1 ? 'es' : ''}`;
    document.getElementById('ciudadCount').textContent = countLabel;
}

// ====================================
// FILTROS OPERATIVOS
// ====================================
function initOperativeFilters() {
    // Aliados
    document.querySelectorAll('input[name="aliado"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            filterState.aliados = e.target.value ? [e.target.value] : [];
        });
    });
    
    // Tipo de Red
    document.querySelectorAll('input[name="tipoRed"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            filterState.tipoRed = e.target.value || null;
        });
    });
    
    // TODO: Inicializar select de técnicos con librería multiselect
    // Ejemplo: Choices.js, Select2, Tom Select, etc.
}

// ====================================
// EVENT LISTENERS
// ====================================
function initEventListeners() {
    // Botón Aplicar Filtros
    document.getElementById('applyFilters').addEventListener('click', () => {
        applyFilters();
    });
    
    // Botón Reset Filtros
    document.getElementById('resetFilters').addEventListener('click', () => {
        resetFilters();
    });
    
    // Botón Guardar Vista
    document.getElementById('saveFilters').addEventListener('click', () => {
        saveFilterView();
    });
    
    // Ver mapa
    const mapBtn = document.getElementById('viewMapFilter');
    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            // Scroll al mapa
            document.getElementById('panel-mapa').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ====================================
// APLICAR FILTROS
// ====================================
function applyFilters() {
    console.log('Aplicando filtros:', filterState);
    
    // Filtrar datos
    const filtered = filterFraudData(originalData, filterState);
    
    // Actualizar estado
    filterState.resultCount = filtered.geo_data.length;
    filterState.active = true;
    
    // Actualizar UI
    updateFilteredCount(filtered.geo_data.length);
    updateActiveFiltersChips();
    
    // Actualizar gráficos
    updateAllCharts(filtered);
    
    // Animación visual
    showFilterAppliedFeedback();
}

// ====================================
// LÓGICA DE FILTRADO
// ====================================
function filterFraudData(data, filters) {
    let filtered = { ...data };
    let filteredGeoData = [...data.geo_data];
    
    // Filtro de fecha
    if (filters.dateRange) {
        filteredGeoData = filteredGeoData.filter(caso => {
            return caso.Fecha >= filters.dateRange.start && caso.Fecha <= filters.dateRange.end;
        });
    }
    
    // Filtro de canal
    if (filters.canales && filters.canales.length > 0) {
        filteredGeoData = filteredGeoData.filter(caso => {
            return filters.canales.includes(caso.CANAL);
        });
    }
    
    // Filtro de ciudad
    if (filters.ciudades && filters.ciudades.length > 0) {
        filteredGeoData = filteredGeoData.filter(caso => {
            return filters.ciudades.includes(caso.Ciudad);
        });
    }
    
    // Filtro de aliado
    if (filters.aliados && filters.aliados.length > 0) {
        filteredGeoData = filteredGeoData.filter(caso => {
            return filters.aliados.includes(caso["ID Aliado"]);
        });
    }
    
    // Filtro de tipo de red
    if (filters.tipoRed) {
        filteredGeoData = filteredGeoData.filter(caso => {
            return caso["Tipo de Red"] === filters.tipoRed;
        });
    }
    
    // Filtro de técnicos
    if (filters.tecnicos && filters.tecnicos.length > 0) {
        filteredGeoData = filteredGeoData.filter(caso => {
            return filters.tecnicos.includes(caso.Técnico);
        });
    }
    
    // Recalcular agregaciones
    filtered.geo_data = filteredGeoData;
    filtered.total_casos = filteredGeoData.length;
    filtered = recalculateAggregations(filtered);
    
    return filtered;
}

// Recalcular agregaciones (zonas, ciudades, técnicos, etc.)
function recalculateAggregations(data) {
    const aggregated = { ...data };
    
    // Resetear contadores
    aggregated.zonas = {};
    aggregated.ciudades = {};
    aggregated.tecnicos = {};
    aggregated.aliados = {};
    aggregated.companias = {};
    aggregated.nodos = {};
    aggregated.tipo_red = {};
    
    // Recalcular desde geo_data
    data.geo_data.forEach(caso => {
        // Zonas
        aggregated.zonas[caso.Zona] = (aggregated.zonas[caso.Zona] || 0) + 1;
        
        // Ciudades
        aggregated.ciudades[caso.Ciudad] = (aggregated.ciudades[caso.Ciudad] || 0) + 1;
        
        // Técnicos
        aggregated.tecnicos[caso.Técnico] = (aggregated.tecnicos[caso.Técnico] || 0) + 1;
        
        // Aliados
        aggregated.aliados[caso["ID Aliado"]] = (aggregated.aliados[caso["ID Aliado"]] || 0) + 1;
        
        // Compañías
        aggregated.companias[caso.Compañía] = (aggregated.companias[caso.Compañía] || 0) + 1;
        
        // Nodos
        aggregated.nodos[caso.Nodo] = (aggregated.nodos[caso.Nodo] || 0) + 1;
        
        // Tipo de Red
        aggregated.tipo_red[caso["Tipo de Red"]] = (aggregated.tipo_red[caso["Tipo de Red"]] || 0) + 1;
    });
    
    return aggregated;
}

// ====================================
// ACTUALIZAR GRÁFICOS
// ====================================
function updateAllCharts(filteredData) {
    // Actualizar variable global
    fraudData = filteredData;
    
    // Reinicializar cada gráfico con los datos filtrados
    if (typeof initMapChart === 'function') initMapChart(filteredData);
    if (typeof initZonaChart === 'function') initZonaChart(filteredData);
    if (typeof initRazonChart === 'function') initRazonChart(filteredData);
    if (typeof initRegionalChart === 'function') initRegionalChart(filteredData);
    if (typeof initAliadoChart === 'function') initAliadoChart(filteredData);
    if (typeof initTecnicosChart === 'function') initTecnicosChart(filteredData);
    if (typeof initNodosChart === 'function') initNodosChart(filteredData);
    if (typeof initRiskMatrix === 'function') initRiskMatrix(filteredData);
    if (typeof initFraudFeed === 'function') initFraudFeed(filteredData);
}

// ====================================
// RESET FILTROS
// ====================================
function resetFilters() {
    // Resetear estado
    filterState = {
        dateRange: { start: '2026-02-10', end: '2026-03-09' },
        canales: [],
        ciudades: [],
        zonas: [],
        tecnicos: [],
        aliados: [],
        companias: [],
        tipoRed: null,
        nodos: [],
        asesores: [],
        active: false,
        resultCount: 74
    };
    
    // Resetear UI
    document.getElementById('dateStart').value = '2026-02-10';
    document.getElementById('dateEnd').value = '2026-03-09';
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-preset="all"]').classList.add('active');
    
    document.querySelectorAll('input[name="canal"]').forEach(cb => cb.checked = true);
    document.querySelectorAll('input[name="ciudad"]').forEach(cb => cb.checked = false);
    document.querySelector('input[name="aliado"][value=""]').checked = true;
    document.querySelector('input[name="tipoRed"][value=""]').checked = true;
    
    // Aplicar reset
    applyFilters();
    
    // Feedback
    alert('Filtros reseteados');
}

// ====================================
// GUARDAR VISTA
// ====================================
function saveFilterView() {
    const viewName = prompt('Nombre para esta vista de filtros:');
    if (!viewName) return;
    
    // Guardar en LocalStorage
    const savedViews = JSON.parse(localStorage.getItem('fraudFilterViews') || '[]');
    savedViews.push({
        name: viewName,
        filters: { ...filterState },
        created: new Date().toISOString()
    });
    localStorage.setItem('fraudFilterViews', JSON.stringify(savedViews));
    
    alert(`Vista "${viewName}" guardada exitosamente`);
}

// ====================================
// ACTUALIZAR CONTADORES
// ====================================
function updateFilterCounts() {
    if (!originalData) return;
    
    // Actualizar badges dinámicos basados en filtros actuales
    const filtered = filterFraudData(originalData, filterState);
    
    // Canales
    Object.keys(filtered.canales || {}).forEach(canal => {
        const badge = document.querySelector(`[data-count="${canal.toLowerCase().replace(' ', '-')}"]`);
        if (badge) {
            badge.textContent = filtered.canales[canal];
        }
    });
}

function updateFilteredCount(count) {
    document.getElementById('filteredCount').textContent = count;
    document.getElementById('filteredCount').parentElement.classList.add('updated');
    setTimeout(() => {
        document.getElementById('filteredCount').parentElement.classList.remove('updated');
    }, 500);
}

function updateActiveFiltersChips() {
    const container = document.getElementById('activeFiltersChips');
    container.innerHTML = '';
    
    if (!filterState.active) return;
    
    // Fecha
    if (filterState.dateRange.start !== '2026-02-10' || filterState.dateRange.end !== '2026-03-09') {
        addFilterChip('📅 ' + filterState.dateRange.start + ' - ' + filterState.dateRange.end, 'dateRange');
    }
    
    // Canales
    if (filterState.canales.length > 0 && filterState.canales.length < 5) {
        filterState.canales.forEach(canal => {
            addFilterChip('🏭 ' + canal, 'canal', canal);
        });
    }
    
    // Ciudades
    filterState.ciudades.forEach(ciudad => {
        addFilterChip('🗺️ ' + ciudad, 'ciudad', ciudad);
    });
    
    // Aliados
    if (filterState.aliados.length > 0) {
        const aliadoName = filterState.aliados[0] === '8301349713' ? 'CONECTAR TV' : 'Tabasco';
        addFilterChip('🤝 ' + aliadoName, 'aliado', filterState.aliados[0]);
    }
    
    // Tipo de Red
    if (filterState.tipoRed) {
        addFilterChip('🔧 ' + filterState.tipoRed, 'tipoRed');
    }
}

function addFilterChip(text, filterType, value) {
    const chip = document.createElement('div');
    chip.className = 'filter-chip';
    chip.innerHTML = `
        <span>${text}</span>
        <span class="chip-remove" data-filter="${filterType}" data-value="${value || ''}">×</span>
    `;
    
    chip.querySelector('.chip-remove').addEventListener('click', function() {
        removeFilter(this.dataset.filter, this.dataset.value);
    });
    
    document.getElementById('activeFiltersChips').appendChild(chip);
}

function removeFilter(filterType, value) {
    switch(filterType) {
        case 'dateRange':
            filterState.dateRange = { start: '2026-02-10', end: '2026-03-09' };
            document.getElementById('dateStart').value = '2026-02-10';
            document.getElementById('dateEnd').value = '2026-03-09';
            break;
        case 'canal':
            filterState.canales = filterState.canales.filter(c => c !== value);
            document.querySelector(`input[name="canal"][value="${value}"]`).checked = false;
            break;
        case 'ciudad':
            filterState.ciudades = filterState.ciudades.filter(c => c !== value);
            document.querySelector(`input[name="ciudad"][value="${value}"]`).checked = false;
            break;
        case 'aliado':
            filterState.aliados = [];
            document.querySelector('input[name="aliado"][value=""]').checked = true;
            break;
        case 'tipoRed':
            filterState.tipoRed = null;
            document.querySelector('input[name="tipoRed"][value=""]').checked = true;
            break;
    }
    
    applyFilters();
}

// ====================================
// FEEDBACK VISUAL
// ====================================
function showFilterAppliedFeedback() {
    const btn = document.getElementById('applyFilters');
    btn.textContent = '✓ Filtros Aplicados';
    btn.style.background = 'var(--success-color)';
    
    setTimeout(() => {
        btn.innerHTML = '<span>📊 Aplicar Filtros</span>';
        btn.style.background = '';
    }, 2000);
}

// ====================================
// EXPORTAR ESTADO
// ====================================
function exportFilterState() {
    return {
        url: window.location.pathname + '?' + new URLSearchParams({
            start: filterState.dateRange.start,
            end: filterState.dateRange.end,
            canales: filterState.canales.join(','),
            ciudades: filterState.ciudades.join(','),
            aliado: filterState.aliados[0] || '',
            tipoRed: filterState.tipoRed || ''
        }).toString()
    };
}

// Cargar desde URL
function loadFilterFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('start')) {
        filterState.dateRange.start = params.get('start');
        filterState.dateRange.end = params.get('end');
        filterState.canales = params.get('canales')?.split(',').filter(Boolean) || [];
        filterState.ciudades = params.get('ciudades')?.split(',').filter(Boolean) || [];
        filterState.aliados = params.get('aliado') ? [params.get('aliado')] : [];
        filterState.tipoRed = params.get('tipoRed') || null;
        
        // Aplicar inmediatamente
        applyFilters();
    }
}

// Ejecutar al cargar
window.addEventListener('load', () => {
    loadFilterFromURL();
});
```

---

## 📝 INTEGRACIÓN EN `fraud_dashboard.html`

**Agregar en `<head>`:**

```html
<link rel="stylesheet" href="fraud_filters.css">
```

**Agregar antes de `</body>`:**

```html
<script src="fraud_filters.js"></script>
```

**Insertar HTML del panel** justo después de `<body>`:

```html
<body>
    <!-- PANEL DE FILTROS (copiar estructura completa de arriba) -->
    <aside id="filterPanel" class="filter-sidebar">
        ...
    </aside>
    
    <!-- OVERLAY MOBILE -->
    <div id="filterOverlay" class="filter-overlay"></div>
    
    <!-- Dashboard existente -->
    <div id="dashboardContainer" class="dashboard-main">
        ...
    </div>
</body>
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Crear `fraud_filters.css`
- [ ] Crear `fraud_filters.js`
- [ ] Modificar `fraud_dashboard.html` (agregar panel + links)
- [ ] Ajustar ancho de dashboard principal (`margin-left: 320px`)
- [ ] Probar en desktop (>1200px)
- [ ] Probar en tablet (768-1200px)
- [ ] Probar en mobile (<768px)
- [ ] Validar funcionalidad de todos los filtros
- [ ] Validar reset de filtros
- [ ] Validar guardar vistas en LocalStorage
- [ ] Validar URL con parámetros de filtros
- [ ] Probar sincronización con gráficos Chart.js
- [ ] Optimizar rendimiento con datasets grandes
- [ ] Añadir transiciones y animaciones
- [ ] Documentar casos de uso principales
- [ ] Preparar para futura integración de filtros avanzados (Nodo, Asesor)

---

## 🚀 PRÓXIMOS PASOS: FASE 2

1. **Filtros Avanzados Modal**
   - Selector de Nodos con topología visual
   - Búsqueda de Asesores comerciales
   - Filtro por rango de casos por técnico
   - Coordenadas geográficas (radio/polígono)

2. **Vistas Guardadas**
   - Panel de "Mis Vistas"
   - Compartir URL con filtros
   - Vistas públicas/privadas

3. **Inteligencia Artificial**
   - Sugerencias de filtros automáticas
   - Detección de anomalías en combinaciones
   - Predicción de patrones temporales

4. **Exportación Avanzada**
   - PDF con gráficos filtrados
   - Excel con datos filtrados
   - Integración con Power BI
   - API REST para consumo externo

---

**Documento técnico preparado por:** GitHub Copilot  
**Versión:** 1.0  
**Estado:** ✅ Listo para implementar

¿Deseas que proceda con la implementación del código ahora?
