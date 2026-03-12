// ===================================
// Dashboard O&M y TRF Fijo - JavaScript
// ===================================

// Global state
let autoRefreshInterval = null;
let chartInstances = {};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    updateLastUpdateTime();
    initializeCharts();
    setupAutoRefresh();
    setupTableSearch();
    
    // Update time every minute
    setInterval(updateLastUpdateTime, 60000);
});

// Initialize dashboard
function initializeDashboard() {
    console.log('Dashboard initialized');
    
    // Load saved preferences from localStorage
    loadPreferences();
    
    // Check system status
    checkSystemStatus();
}

// Update last update time
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const element = document.getElementById('lastUpdate');
    if (element) {
        element.textContent = `Última actualización: ${timeString}`;
    }
}

// Initialize charts using Chart.js (placeholder for demo)
function initializeCharts() {
    // Line Chart - Trend
    const lineChartCanvas = document.getElementById('lineChart');
    if (lineChartCanvas) {
        createLineChart(lineChartCanvas);
    }
    
    // Donut Chart - Distribution
    const donutChartCanvas = document.getElementById('donutChart');
    if (donutChartCanvas) {
        createDonutChart(donutChartCanvas);
    }
    
    // Bar Chart - Top zones
    const barChartCanvas = document.getElementById('barChart');
    if (barChartCanvas) {
        createBarChart(barChartCanvas);
    }
    
    // Create heatmap
    const heatmapGrid = document.getElementById('heatmapGrid');
    if (heatmapGrid) {
        createHeatmap(heatmapGrid);
    }
}

// Create line chart (mock implementation)
function createLineChart(canvas) {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(52, 152, 219, 0.3)');
    gradient.addColorStop(1, 'rgba(52, 152, 219, 0.0)');
    
    // Simple line drawing
    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(0, 150);
    for (let i = 0; i < 30; i++) {
        const x = (canvas.width / 30) * i;
        const y = 150 - Math.random() * 80 - Math.sin(i * 0.5) * 30;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Fill area
    ctx.lineTo(canvas.width, 200);
    ctx.lineTo(0, 200);
    ctx.closePath();
    ctx.fill();
    
    // Add labels
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '11px Arial';
    ctx.fillText('Hace 30d', 10, 190);
    ctx.fillText('Hoy', canvas.width - 40, 190);
}

// Create donut chart (mock implementation)
function createDonutChart(canvas) {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const innerRadius = 50;
    
    const data = [
        { label: 'Calidad Fija', value: 35, color: '#3498db' },
        { label: 'Mantenimiento', value: 25, color: '#2ecc71' },
        { label: 'Soporte', value: 20, color: '#f39c12' },
        { label: 'Crítico', value: 12, color: '#e74c3c' },
        { label: 'Otros', value: 8, color: '#9b59b6' }
    ];
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach(segment => {
        const sliceAngle = (segment.value / 100) * 2 * Math.PI;
        
        // Draw outer arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = segment.color;
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
    
    // Add legend
    let legendY = 20;
    data.forEach((segment, index) => {
        ctx.fillStyle = segment.color;
        ctx.fillRect(210, legendY, 12, 12);
        ctx.fillStyle = '#2c3e50';
        ctx.font = '11px Arial';
        ctx.fillText(`${segment.label} (${segment.value}%)`, 226, legendY + 10);
        legendY += 20;
    });
}

// Create bar chart (mock implementation)
function createBarChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = [85, 72, 68, 55, 48, 42, 38, 35, 28, 22];
    const labels = ['Lima Centro', 'Callao', 'San Isidro', 'Miraflores', 'Surco', 
                    'La Molina', 'Barranco', 'San Borja', 'Lince', 'Jesús María'];
    const maxValue = Math.max(...data);
    const barWidth = canvas.width / data.length - 10;
    const barMaxHeight = canvas.height - 40;
    
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * barMaxHeight;
        const x = index * (barWidth + 10) + 5;
        const y = canvas.height - barHeight - 20;
        
        // Draw bar
        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw value
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value, x + barWidth / 2, y - 5);
    });
}

// Create heatmap
function createHeatmap(container) {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const hours = 24;
    
    for (let d = 0; d < 7; d++) {
        for (let h = 0; h < hours; h++) {
            const cell = document.createElement('div');
            const intensity = Math.random();
            
            let color;
            if (intensity < 0.3) {
                color = '#d4edda';
            } else if (intensity < 0.6) {
                color = '#fff3cd';
            } else if (intensity < 0.8) {
                color = '#f8d7da';
            } else {
                color = '#e74c3c';
            }
            
            cell.style.background = color;
            cell.style.borderRadius = '2px';
            cell.title = `${days[d]} ${h}:00 - Incidencias: ${Math.floor(intensity * 100)}`;
            container.appendChild(cell);
        }
    }
}

// Setup auto-refresh
function setupAutoRefresh() {
    const select = document.getElementById('autoRefresh');
    if (!select) return;
    
    select.addEventListener('change', function() {
        // Clear existing interval
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
            autoRefreshInterval = null;
        }
        
        const seconds = parseInt(this.value);
        if (seconds > 0) {
            autoRefreshInterval = setInterval(refreshData, seconds * 1000);
            console.log(`Auto-refresh enabled: every ${seconds} seconds`);
        }
    });
}

// Refresh data
function refreshData() {
    console.log('Refreshing data...');
    
    // Simulate data refresh
    updateKPIValues();
    updateLastUpdateTime();
    
    // Show notification
    showNotification('Datos actualizados correctamente', 'success');
}

// Update KPI values with animation
function updateKPIValues() {
    const kpiValues = document.querySelectorAll('.kpi-value');
    kpiValues.forEach(element => {
        // Add pulse animation
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'pulse 0.5s';
        }, 10);
    });
}

// Export data
function exportData() {
    console.log('Exporting data...');
    showNotification('Preparando exportación...', 'info');
    
    // In production, this would trigger a CSV/Excel export
    setTimeout(() => {
        showNotification('Datos exportados exitosamente', 'success');
    }, 1500);
}

// Table search functionality
function setupTableSearch() {
    const searchInputs = ['searchTable', 'searchOMTable', 'searchTRFTable'];
    
    searchInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('keyup', function() {
                filterTable(this);
            });
        }
    });
}

// Filter table rows
function filterTable(input) {
    if (!input) {
        input = document.getElementById('searchTable');
    }
    if (!input) return;
    
    const filter = input.value.toUpperCase();
    const table = input.closest('.data-table-section').querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = tbody.getElementsByTagName('tr');
    
    let visibleCount = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let found = false;
        
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
                found = true;
                break;
            }
        }
        
        if (found) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    }
    
    console.log(`Filtered: ${visibleCount} of ${rows.length} rows visible`);
}

// Apply filters
function applyFilters() {
    console.log('Applying filters...');
    showNotification('Aplicando filtros...', 'info');
    
    // Collect filter values
    const filters = {
        startDate: document.getElementById('startDate')?.value,
        endDate: document.getElementById('endDate')?.value,
        zone: document.getElementById('zoneFilter')?.value,
        priority: document.getElementById('priorityFilter')?.value,
        period: document.getElementById('periodFilter')?.value
    };
    
    console.log('Filters:', filters);
    
    // In production, this would make an API call
    setTimeout(() => {
        showNotification('Filtros aplicados correctamente', 'success');
        updateKPIValues();
    }, 1000);
}

// Export specific data
function exportOMData() {
    console.log('Exporting O&M data...');
    showNotification('Exportando datos O&M...', 'info');
}

// Print report
function printReport() {
    window.print();
}

// View details
function viewDetails(id) {
    console.log('Viewing details for:', id);
    showNotification(`Cargando detalles de ${id}...`, 'info');
    
    // In production, this would open a modal or navigate to detail page
}

// Edit incident
function editIncident(id) {
    console.log('Editing incident:', id);
    showNotification(`Abriendo editor para ${id}...`, 'info');
}

// Assign urgent
function assignUrgent(id) {
    if (confirm(`¿Asignar incidencia urgente ${id} a técnico disponible?`)) {
        showNotification(`Incidencia ${id} asignada exitosamente`, 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style it
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        fontSize: '14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease',
        minWidth: '250px'
    });
    
    // Set background color based on type
    const colors = {
        success: '#2ecc71',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    notification.style.background = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Check system status
function checkSystemStatus() {
    // In production, this would make an API call to check system health
    const statusElement = document.getElementById('systemStatus');
    if (statusElement) {
        // Simulate checking
        setTimeout(() => {
            const isHealthy = Math.random() > 0.1; // 90% healthy
            if (isHealthy) {
                statusElement.textContent = '🟢 Sistema Activo';
                statusElement.style.background = 'rgba(46, 204, 113, 0.9)';
            } else {
                statusElement.textContent = '🔴 Sistema con Problemas';
                statusElement.style.background = 'rgba(231, 76, 60, 0.9)';
            }
        }, 500);
    }
}

// Load preferences from localStorage
function loadPreferences() {
    try {
        const autoRefresh = localStorage.getItem('autoRefresh');
        if (autoRefresh) {
            const select = document.getElementById('autoRefresh');
            if (select) select.value = autoRefresh;
        }
        
        const periodFilter = localStorage.getItem('periodFilter');
        if (periodFilter) {
            const select = document.getElementById('periodFilter');
            if (select) select.value = periodFilter;
        }
    } catch (e) {
        console.error('Error loading preferences:', e);
    }
}

// Save preferences to localStorage
function savePreferences() {
    try {
        const autoRefresh = document.getElementById('autoRefresh')?.value;
        if (autoRefresh) localStorage.setItem('autoRefresh', autoRefresh);
        
        const periodFilter = document.getElementById('periodFilter')?.value;
        if (periodFilter) localStorage.setItem('periodFilter', periodFilter);
    } catch (e) {
        console.error('Error saving preferences:', e);
    }
}

// Save preferences on change
document.addEventListener('change', function(e) {
    if (e.target.id === 'autoRefresh' || e.target.id === 'periodFilter') {
        savePreferences();
    }
});

// Tab switching
function showTab(tabName) {
    console.log('Switching to tab:', tabName);
    // In production, this would switch content sections
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c Dashboard O&M y TRF Fijo ', 'background: #667eea; color: white; font-size: 16px; padding: 5px 10px; border-radius: 5px;');
console.log('%c Sistema de visualización 360° ', 'color: #667eea; font-size: 12px;');
console.log('Versión 1.0.0 | © 2026 CLARO IT');
