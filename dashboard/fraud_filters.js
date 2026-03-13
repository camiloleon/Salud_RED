/**
 * FRAUD FILTERS MANAGER
 * Sistema de filtros para el dashboard de fraude
 * Terminal Theme Adapted
 */

// ====================================
// ESTADO GLOBAL DE FILTROS
// ====================================
let filterState = {
    dateRange: {
        start: '2026-02-10',
        end: '2026-03-09'
    },
    canales: [],  // vacío = todos
    ciudades: [],
    tecnicos: [],
    aliados: [],
    tipoRed: null,
    nodos: [],
    active: false,
    resultCount: 74
};

// Datos originales sin filtrar
let originalData = null;
let isFilteringEnabled = false;

// ====================================
// INICIALIZACIÓN
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('[FILTERS] Iniciando sistema de filtros...');
    
    // Guardar datos originales
    if (typeof fraudData !== 'undefined') {
        originalData = JSON.parse(JSON.stringify(fraudData));
        console.log('[FILTERS] Datos originales guardados:', originalData.total_casos, 'casos');
    }
    
    // Esperar a que chart.js esté listo
    setTimeout(() => {
        initFilterPanel();
        initDatePickers();
        initCanalFilters();
        initCiudadFilters();
        initOperativeFilters();
        initEventListeners();
        updateFilterCounts();
        isFilteringEnabled = true;
        console.log('[FILTERS] Sistema de filtros listo');
    }, 1000);
});

// ====================================
// PANEL - FUNCIONES GENERALES
// ====================================
function initFilterPanel() {
    // Toggle panel en mobile
    const closeBtn = document.getElementById('closeFilters');
    const overlay = document.getElementById('filterOverlay');
    const filterPanel = document.getElementById('filterPanel');
    const container = document.querySelector('.terminal-container');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            filterPanel.classList.toggle('hidden');
            container.classList.toggle('filters-hidden');
            if (overlay) overlay.classList.remove('visible');
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            filterPanel.classList.remove('visible');
            overlay.classList.remove('visible');
        });
    }
    
    // Botón toggle desktop
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'toggleFilters';
    toggleBtn.className = 'filter-toggle-btn';
    toggleBtn.innerHTML = '🔍 FILTROS';
    toggleBtn.addEventListener('click', () => {
        filterPanel.classList.toggle('hidden');
        container.classList.toggle('filters-hidden');
        toggleBtn.textContent = filterPanel.classList.contains('hidden') ? '🔍 FILTROS' : '✕ CERRAR';
    });
    document.body.appendChild(toggleBtn);
    
    // Collapsible sections
    document.querySelectorAll('.section-header.clickable').forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('collapsed');
        });
    });
    
    console.log('[FILTERS] Panel inicializado con toggle');
}

// ====================================
// FILTRO DE FECHAS
// ====================================
function initDatePickers() {
    const dateStart = document.getElementById('dateStart');
    const dateEnd = document.getElementById('dateEnd');
    
    if (!dateStart || !dateEnd) {
        console.warn('[FILTERS] Date pickers no encontrados');
        return;
    }
    
    // Presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const preset = this.dataset.preset;
            const today = new Date('2026-03-09'); // Usar última fecha del dataset
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
    
    console.log('[FILTERS] Date pickers inicializados');
}

// ====================================
// FILTRO DE CANALES
// ====================================
function initCanalFilters() {
    const canalCheckboxes = document.querySelectorAll('input[name="canal"]');
    
    if (canalCheckboxes.length === 0) {
        console.warn('[FILTERS] Canal checkboxes no encontrados');
        return;
    }
    
    canalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateCanalSelection();
        });
    });
    
    updateCanalSelection();
    console.log('[FILTERS] Filtros de canal inicializados');
}

function updateCanalSelection() {
    const selected = [];
    document.querySelectorAll('input[name="canal"]:checked').forEach(cb => {
        selected.push(cb.value);
    });
    
    // Si todos están seleccionados o ninguno, significa "todos"
    const totalCanales = document.querySelectorAll('input[name="canal"]').length;
    filterState.canales = (selected.length === 0 || selected.length === totalCanales) ? [] : selected;
    
    // Actualizar contador
    const count = selected.length;
    const countEl = document.getElementById('canalCount');
    if (countEl) {
        countEl.textContent = `${count} de ${totalCanales}`;
    }
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
                const label = item.querySelector('.item-label')?.textContent.toLowerCase();
                if (label) {
                    item.style.display = label.includes(query) ? 'grid' : 'none';
                }
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
            const hiddenItems = document.querySelectorAll('.ciudad-list .checkbox-list-item[style*="display: none"]');
            hiddenItems.forEach(item => item.style.display = 'grid');
            this.style.display = 'none';
        });
    }
    
    updateCiudadSelection();
    console.log('[FILTERS] Filtros de ciudad inicializados');
}

function updateCiudadSelection() {
    const selected = [];
    document.querySelectorAll('input[name="ciudad"]:checked').forEach(cb => {
        selected.push(cb.value);
    });
    
    filterState.ciudades = selected;
    
    // Actualizar contador
    const count = selected.length;
    const countLabel = count === 0 ? 'Todas' : `${count} ${count === 1 ? 'Ciudad' : 'Ciudades'}`;
    const countEl = document.getElementById('ciudadCount');
    if (countEl) {
        countEl.textContent = countLabel;
    }
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
    
    console.log('[FILTERS] Filtros operativos inicializados');
}

// ====================================
// EVENT LISTENERS
// ====================================
function initEventListeners() {
    // Botón Aplicar Filtros
    const applyBtn = document.getElementById('applyFilters');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            applyFilters();
        });
    }
    
    // Botón Reset Filtros
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetFilters();
        });
    }
    
    // Botón Guardar Vista
    const saveBtn = document.getElementById('saveFilters');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveFilterView();
        });
    }
    
    // Ver mapa
    const mapBtn = document.getElementById('viewMapFilter');
    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            const mapaPanel = document.querySelector('[id*="mapa"], [id*="Mapa"]');
            if (mapaPanel) {
                mapaPanel.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    console.log('[FILTERS] Event listeners configurados');
}

// ====================================
// APLICAR FILTROS
// ====================================
function applyFilters() {
    if (!originalData) {
        console.error('[FILTERS] No hay datos originales');
        return;
    }
    
    console.log('[FILTERS] Aplicando filtros:', filterState);
    
    // Filtrar datos
    const filtered = filterFraudData(originalData, filterState);
    
    // Actualizar estado
    filterState.resultCount = filtered.geo_data.length;
    filterState.active = (
        filterState.canales.length > 0 ||
        filterState.ciudades.length > 0 ||
        filterState.aliados.length > 0 ||
        filterState.tipoRed !== null ||
        filterState.dateRange.start !== '2026-02-10' ||
        filterState.dateRange.end !== '2026-03-09'
    );
    
    console.log('[FILTERS] Resultados filtrados:', filtered.geo_data.length, 'casos');
    
    // Actualizar UI
    updateFilteredCount(filtered.geo_data.length);
    updateActiveFiltersChips();
    
    // Actualizar gráficos
    updateAllCharts(filtered);
    
    // Feedback visual
    showFilterAppliedFeedback();
}

// ====================================
// LÓGICA DE FILTRADO
// ====================================
function filterFraudData(data, filters) {
    let filtered = { ...data };
    let filteredGeoData = [...data.geo_data];
    
    console.log('[FILTERS] Filtrando desde', filteredGeoData.length, 'casos');
    
    // Filtro de fecha
    if (filters.dateRange) {
        const before = filteredGeoData.length;
        filteredGeoData = filteredGeoData.filter(caso => {
            return caso.Fecha >= filters.dateRange.start && caso.Fecha <= filters.dateRange.end;
        });
        console.log('[FILTERS] Fecha:', before, '→', filteredGeoData.length);
    }
    
    // Filtro de canal
    if (filters.canales && filters.canales.length > 0) {
        const before = filteredGeoData.length;
        filteredGeoData = filteredGeoData.filter(caso => {
            return filters.canales.includes(caso.CANAL);
        });
        console.log('[FILTERS] Canal:', before, '→', filteredGeoData.length);
    }
    
    // Filtro de ciudad
    if (filters.ciudades && filters.ciudades.length > 0) {
        const before = filteredGeoData.length;
        filteredGeoData = filteredGeoData.filter(caso => {
            return filters.ciudades.includes(caso.Ciudad);
        });
        console.log('[FILTERS] Ciudad:', before, '→', filteredGeoData.length);
    }
    
    // Filtro de aliado
    if (filters.aliados && filters.aliados.length > 0) {
        const before = filteredGeoData.length;
        filteredGeoData = filteredGeoData.filter(caso => {
            return filters.aliados.includes(caso["ID Aliado"]);
        });
        console.log('[FILTERS] Aliado:', before, '→', filteredGeoData.length);
    }
    
    // Filtro de tipo de red
    if (filters.tipoRed) {
        const before = filteredGeoData.length;
        filteredGeoData = filteredGeoData.filter(caso => {
            return caso["Tipo de Red"] === filters.tipoRed;
        });
        console.log('[FILTERS] Tipo Red:', before, '→', filteredGeoData.length);
    }
    
    // Recalcular agregaciones
    filtered.geo_data = filteredGeoData;
    filtered.total_casos = filteredGeoData.length;
    filtered = recalculateAggregations(filtered);
    
    return filtered;
}

// Recalcular agregaciones
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
    aggregated.canales = {};
    
    // Recalcular desde geo_data
    data.geo_data.forEach(caso => {
        aggregated.zonas[caso.Zona] = (aggregated.zonas[caso.Zona] || 0) + 1;
        aggregated.ciudades[caso.Ciudad] = (aggregated.ciudades[caso.Ciudad] || 0) + 1;
        aggregated.tecnicos[caso.Técnico] = (aggregated.tecnicos[caso.Técnico] || 0) + 1;
        aggregated.aliados[caso["ID Aliado"]] = (aggregated.aliados[caso["ID Aliado"]] || 0) + 1;
        aggregated.companias[caso.Compañía] = (aggregated.companias[caso.Compañía] || 0) + 1;
        aggregated.nodos[caso.Nodo] = (aggregated.nodos[caso.Nodo] || 0) + 1;
        aggregated.tipo_red[caso["Tipo de Red"]] = (aggregated.tipo_red[caso["Tipo de Red"]] || 0) + 1;
        aggregated.canales[caso.CANAL] = (aggregated.canales[caso.CANAL] || 0) + 1;
    });
    
    return aggregated;
}

// ====================================
// ACTUALIZAR GRÁFICOS
// ====================================
function updateAllCharts(filteredData) {
    console.log('[FILTERS] Actualizando gráficos con datos filtrados:', filteredData.total_casos, 'casos');
    
    // Actualizar variable global
    fraudData = filteredData;
    
    // Destruir gráficos existentes primero
    Object.keys(charts).forEach(key => {
        if (charts[key] && typeof charts[key].destroy === 'function') {
            charts[key].destroy();
        }
    });
    charts = {};
    
    // Reinicializar cada gráfico con los datos filtrados
    try {
        // Actualizar métricas del ticker
        if (typeof updateMetrics === 'function') updateMetrics(filteredData);
        
        // Reinicializar todos los gráficos
        if (typeof initCanalChart === 'function') initCanalChart(filteredData);
        if (typeof initCanal2Chart === 'function') initCanal2Chart(filteredData);
        if (typeof initAsesorList === 'function') initAsesorList(filteredData);
        if (typeof initZonaChart === 'function') initZonaChart(filteredData);
        if (typeof initRazonChart === 'function') initRazonChart(filteredData);
        if (typeof initRegionalChart === 'function') initRegionalChart(filteredData);
        if (typeof initGeoHeatmap === 'function') initGeoHeatmap(filteredData);
        if (typeof initAliadoChart === 'function') initAliadoChart(filteredData);
        if (typeof initTecnicoChart === 'function') initTecnicoChart(filteredData);
        if (typeof initMatrixChart === 'function') initMatrixChart(filteredData);
        if (typeof initNodoChart === 'function') initNodoChart(filteredData);
        
        console.log('[FILTERS] ✓ Gráficos actualizados correctamente');
    } catch (error) {
        console.error('[FILTERS] ✗ Error al actualizar gráficos:', error);
    }
}

// ====================================
// RESET FILTROS
// ====================================
function resetFilters() {
    console.log('[FILTERS] Reseteando filtros');
    
    // Resetear estado
    filterState = {
        dateRange: { start: '2026-02-10', end: '2026-03-09' },
        canales: [],
        ciudades: [],
        tecnicos: [],
        aliados: [],
        tipoRed: null,
        nodos: [],
        active: false,
        resultCount: 74
    };
    
    // Resetear UI
    const dateStart = document.getElementById('dateStart');
    const dateEnd = document.getElementById('dateEnd');
    if (dateStart) dateStart.value = '2026-02-10';
    if (dateEnd) dateEnd.value = '2026-03-09';
    
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    const allPreset = document.querySelector('[data-preset="all"]');
    if (allPreset) allPreset.classList.add('active');
    
    document.querySelectorAll('input[name="canal"]').forEach(cb => cb.checked = true);
    document.querySelectorAll('input[name="ciudad"]').forEach(cb => cb.checked = false);
    
    const aliadoTodos = document.querySelector('input[name="aliado"][value=""]');
    if (aliadoTodos) aliadoTodos.checked = true;
    
    const tipoRedTodos = document.querySelector('input[name="tipoRed"][value=""]');
    if (tipoRedTodos) tipoRedTodos.checked = true;
    
    // Aplicar reset
    applyFilters();
}

// ====================================
// GUARDAR VISTA
// ====================================
function saveFilterView() {
    const viewName = prompt('Nombre para esta vista de filtros:');
    if (!viewName) return;
    
    try {
        const savedViews = JSON.parse(localStorage.getItem('fraudFilterViews') || '[]');
        savedViews.push({
            name: viewName,
            filters: { ...filterState },
            created: new Date().toISOString()
        });
        localStorage.setItem('fraudFilterViews', JSON.stringify(savedViews));
        
        alert(`✓ Vista "${viewName}" guardada exitosamente`);
        console.log('[FILTERS] Vista guardada:', viewName);
    } catch (error) {
        console.error('[FILTERS] Error al guardar vista:', error);
        alert('Error al guardar la vista');
    }
}

// ====================================
// ACTUALIZAR CONTADORES
// ====================================
function updateFilterCounts() {
    if (!originalData) return;
    
    // Los contadores se actualizan dinámicamente al filtrar
    console.log('[FILTERS] Contadores inicializados');
}

function updateFilteredCount(count) {
    const countEl = document.getElementById('filteredCount');
    if (countEl) {
        countEl.textContent = count;
        countEl.parentElement.classList.add('updated');
        setTimeout(() => {
            countEl.parentElement.classList.remove('updated');
        }, 500);
    }
}

function updateActiveFiltersChips() {
    const container = document.getElementById('activeFiltersChips');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!filterState.active) return;
    
    // Fecha
    if (filterState.dateRange.start !== '2026-02-10' || filterState.dateRange.end !== '2026-03-09') {
        addFilterChip('📅 ' + filterState.dateRange.start + ' - ' + filterState.dateRange.end, 'dateRange');
    }
    
    // Canales
    if (filterState.canales.length > 0) {
        filterState.canales.forEach(canal => {
            addFilterChip('🏭 ' + canal.substring(0, 15) + '...', 'canal', canal);
        });
    }
    
    // Ciudades
    filterState.ciudades.forEach(ciudad => {
        addFilterChip('🗺️ ' + ciudad, 'ciudad', ciudad);
    });
    
    // Aliados
    if (filterState.aliados.length > 0) {
        const aliadoNames = {
            '8301349713': 'CONECTAR TV',
            '9003753252': 'Tabasco',
            '9001113432': 'Otro'
        };
        const aliadoName = aliadoNames[filterState.aliados[0]] || filterState.aliados[0];
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
    
    const container = document.getElementById('activeFiltersChips');
    if (container) {
        container.appendChild(chip);
    }
}

function removeFilter(filterType, value) {
    console.log('[FILTERS] Removiendo filtro:', filterType, value);
    
    switch(filterType) {
        case 'dateRange':
            filterState.dateRange = { start: '2026-02-10', end: '2026-03-09' };
            const dateStart = document.getElementById('dateStart');
            const dateEnd = document.getElementById('dateEnd');
            if (dateStart) dateStart.value = '2026-02-10';
            if (dateEnd) dateEnd.value = '2026-03-09';
            break;
        case 'canal':
            filterState.canales = filterState.canales.filter(c => c !== value);
            const canalCb = document.querySelector(`input[name="canal"][value="${value}"]`);
            if (canalCb) canalCb.checked = false;
            updateCanalSelection();
            break;
        case 'ciudad':
            filterState.ciudades = filterState.ciudades.filter(c => c !== value);
            const ciudadCb = document.querySelector(`input[name="ciudad"][value="${value}"]`);
            if (ciudadCb) ciudadCb.checked = false;
            updateCiudadSelection();
            break;
        case 'aliado':
            filterState.aliados = [];
            const aliadoTodos = document.querySelector('input[name="aliado"][value=""]');
            if (aliadoTodos) aliadoTodos.checked = true;
            break;
        case 'tipoRed':
            filterState.tipoRed = null;
            const tipoRedTodos = document.querySelector('input[name="tipoRed"][value=""]');
            if (tipoRedTodos) tipoRedTodos.checked = true;
            break;
    }
    
    applyFilters();
}

// ====================================
// FEEDBACK VISUAL
// ====================================
function showFilterAppliedFeedback() {
    const btn = document.getElementById('applyFilters');
    if (!btn) return;
    
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>✓ FILTROS APLICADOS</span>';
    btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
    }, 2000);
}

// ====================================
// LOGGING
// ====================================
console.log('[FILTERS] Fraud Filters Manager cargado');
