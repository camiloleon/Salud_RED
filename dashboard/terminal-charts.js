/* ===================================
   PROFESSIONAL TRADING CHARTS
   Chart.js 4.4.0 Implementation
   ================================== */

// Chart color configuration
const CHART_COLORS = {
    positive: '#00d4aa',
    negative: '#ff4757',
    info: '#05a8f9',
    warning: '#ffa500',
    purple: '#9b59b6',
    cyan: '#00d9ff',
    q1: '#1a73e8',
    q2: '#34a853',
    q3: '#fbbc04',
    q4: '#ea4335',
    gridColor: 'rgba(255, 255, 255, 0.05)',
    textColor: '#9ca3af',
    axisColor: '#1e2530'
};

// Common chart options
const COMMON_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: CHART_COLORS.textColor,
                font: {
                    family: "'Roboto Mono', monospace",
                    size: 10
                },
                padding: 12
            }
        },
        tooltip: {
            backgroundColor: 'rgba(10, 14, 39, 0.95)',
            titleColor: '#e6e6e6',
            bodyColor: '#9ca3af',
            borderColor: CHART_COLORS.info,
            borderWidth: 1,
            padding: 12,
            titleFont: {
                family: "'Roboto Mono', monospace",
                size: 11,
                weight: 'bold'
            },
            bodyFont: {
                family: "'Roboto Mono', monospace",
                size: 10
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: CHART_COLORS.gridColor,
                borderColor: CHART_COLORS.axisColor
            },
            ticks: {
                color: CHART_COLORS.textColor,
                font: {
                    family: "'Roboto Mono', monospace",
                    size: 9
                }
            }
        },
        y: {
            grid: {
                color: CHART_COLORS.gridColor,
                borderColor: CHART_COLORS.axisColor
            },
            ticks: {
                color: CHART_COLORS.textColor,
                font: {
                    family: "'Roboto Mono', monospace",
                    size: 9
                }
            }
        }
    }
};

// Generate sample data (replace with real data later)
function generateSampleData() {
    const zones = ['ITA-NE-01', 'ITA-NE-02', 'ITA-NE-03', 'ITA-NE-04', 'ITA-NE-05',
                   'ITA-NO-01', 'ITA-NO-02', 'ITA-SU-01', 'ITA-SU-02', 'ITA-OE-01'];
    
    const data = {
        zones: zones,
        timeSeries: generateTimeSeries(30),
        quartiles: generateQuartileData(50),
        heatmap: generateHeatmapData(),
        bubble: generateBubbleData(40),
        boxPlot: generateBoxPlotData(),
        correlation: generateCorrelationMatrix()
    };
    
    return data;
}

function generateTimeSeries(days) {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        
        const open = 100 + Math.random() * 50;
        const close = open + (Math.random() - 0.5) * 20;
        const high = Math.max(open, close) + Math.random() * 10;
        const low = Math.min(open, close) - Math.random() * 10;
        
        data.push({
            x: date,
            o: open,
            h: high,
            l: low,
            c: close
        });
    }
    
    return data;
}

function generateQuartileData(count) {
    const data = [];
    const zones = ['ITA-NE-01', 'ITA-NE-02', 'ITA-NE-03', 'ITA-NE-04', 'ITA-NE-05',
                   'ITA-NO-01', 'ITA-NO-02', 'ITA-SU-01', 'ITA-SU-02', 'ITA-OE-01'];
    
    for (let i = 0; i < count; i++) {
        const efficiency = Math.random() * 100;
        const responseTime = Math.random() * 100;
        
        let quartile;
        if (efficiency >= 75 && responseTime <= 25) quartile = 'Q1';
        else if (efficiency >= 75 || responseTime <= 25) quartile = 'Q2';
        else if (efficiency >= 50 || responseTime <= 50) quartile = 'Q3';
        else quartile = 'Q4';
        
        data.push({
            x: efficiency,
            y: responseTime,
            zone: zones[Math.floor(Math.random() * zones.length)],
            quartile: quartile
        });
    }
    
    return data;
}

function generateHeatmapData() {
    const hours = 24;
    const days = 7;
    const data = [];
    
    for (let day = 0; day < days; day++) {
        for (let hour = 0; hour < hours; hour++) {
            data.push({
                x: hour,
                y: day,
                v: Math.floor(Math.random() * 100)
            });
        }
    }
    
    return data;
}

function generateBubbleData(count) {
    const data = [];
    const zones = ['ITA-NE-01', 'ITA-NE-02', 'ITA-NE-03', 'ITA-NE-04', 'ITA-NE-05',
                   'ITA-NO-01', 'ITA-NO-02', 'ITA-SU-01', 'ITA-SU-02', 'ITA-OE-01'];
    
    for (let i = 0; i < count; i++) {
        data.push({
            x: Math.random() * 100,
            y: Math.random() * 100,
            r: Math.random() * 20 + 5,
            zone: zones[Math.floor(Math.random() * zones.length)],
            priority: ['Alta', 'Media', 'Baja'][Math.floor(Math.random() * 3)]
        });
    }
    
    return data;
}

function generateBoxPlotData() {
    return {
        min: 45,
        q1: 62,
        median: 78,
        q3: 89,
        max: 98,
        outliers: [15, 22, 105, 112]
    };
}

function generateCorrelationMatrix() {
    return [
        [1.00, 0.75, -0.45, 0.32],
        [0.75, 1.00, -0.38, 0.41],
        [-0.45, -0.38, 1.00, -0.67],
        [0.32, 0.41, -0.67, 1.00]
    ];
}

// ===================================
// 1. MAIN FLOW CHART (Time Series)
// ===================================
function initMainFlowChart() {
    const ctx = document.getElementById('mainFlowChart');
    if (!ctx) return;
    
    const data = generateSampleData();
    let chartType = 'line'; // Default type
    
    const config = {
        type: chartType,
        data: {
            datasets: [{
                label: 'Tickets Volume',
                data: data.timeSeries.map(d => ({ x: d.x, y: d.c })),
                borderColor: CHART_COLORS.info,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(5, 168, 249, 0.3)');
                    gradient.addColorStop(1, 'rgba(5, 168, 249, 0.0)');
                    return gradient;
                },
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: CHART_COLORS.info
            }]
        },
        options: {
            ...COMMON_OPTIONS,
            plugins: {
                ...COMMON_OPTIONS.plugins,
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ...COMMON_OPTIONS.scales.x,
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'MMM dd'
                        }
                    }
                },
                y: {
                    ...COMMON_OPTIONS.scales.y,
                    beginAtZero: true
                }
            }
        }
    };
    
    const chart = new Chart(ctx, config);
    
    // Chart type switcher
    const chartTypeBtns = document.querySelectorAll('.main-chart .chart-type-btn');
    chartTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chartTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const type = btn.textContent.toLowerCase();
            
            if (type === 'candlestick') {
                // Candlestick representation
                chart.config.type = 'candlestick';
                chart.update();
            } else if (type === 'line') {
                chart.config.type = 'line';
                chart.data.datasets[0].fill = false;
                chart.update();
            } else if (type === 'area') {
                chart.config.type = 'line';
                chart.data.datasets[0].fill = true;
                chart.update();
            }
        });
    });
    
    return chart;
}

// ===================================
// 2. QUARTILE SCATTER PLOT
// ===================================
function initQuartileScatter() {
    const ctx = document.getElementById('quartileScatter');
    if (!ctx) return;
    
    const data = generateSampleData();
    
    // Separate data by quartile
    const q1Data = data.quartiles.filter(d => d.quartile === 'Q1');
    const q2Data = data.quartiles.filter(d => d.quartile === 'Q2');
    const q3Data = data.quartiles.filter(d => d.quartile === 'Q3');
    const q4Data = data.quartiles.filter(d => d.quartile === 'Q4');
    
    const config = {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Q1: High Eff / Low Time',
                    data: q1Data,
                    backgroundColor: CHART_COLORS.q1,
                    borderColor: CHART_COLORS.q1,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Q2: High Performance',
                    data: q2Data,
                    backgroundColor: CHART_COLORS.q2,
                    borderColor: CHART_COLORS.q2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Q3: Medium Performance',
                    data: q3Data,
                    backgroundColor: CHART_COLORS.q3,
                    borderColor: CHART_COLORS.q3,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Q4: Low Performance',
                    data: q4Data,
                    backgroundColor: CHART_COLORS.q4,
                    borderColor: CHART_COLORS.q4,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ]
        },
        options: {
            ...COMMON_OPTIONS,
            plugins: {
                ...COMMON_OPTIONS.plugins,
                legend: {
                    display: false // Using custom legend in HTML
                },
                tooltip: {
                    ...COMMON_OPTIONS.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const point = context.raw;
                            return [
                                `Zone: ${point.zone}`,
                                `Efficiency: ${point.x.toFixed(1)}%`,
                                `Response Time: ${point.y.toFixed(1)}h`,
                                `Quartile: ${point.quartile}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    ...COMMON_OPTIONS.scales.x,
                    title: {
                        display: true,
                        text: 'Efficiency (%)',
                        color: CHART_COLORS.textColor,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 10,
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100
                },
                y: {
                    ...COMMON_OPTIONS.scales.y,
                    title: {
                        display: true,
                        text: 'Response Time (hours)',
                        color: CHART_COLORS.textColor,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 10,
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    reverse: true // Lower is better
                }
            }
        }
    };
    
    return new Chart(ctx, config);
}

// ===================================
// 3. HEATMAP MATRIX (24H Activity)
// ===================================
function initHeatmapMatrix() {
    const ctx = document.getElementById('heatmapMatrix');
    if (!ctx) return;
    
    const data = generateSampleData();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Convert heatmap data to matrix format
    const matrix = [];
    for (let day = 0; day < 7; day++) {
        matrix[day] = data.heatmap.filter(d => d.y === day).map(d => d.v);
    }
    
    const config = {
        type: 'bar',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
            datasets: days.map((day, index) => ({
                label: day,
                data: matrix[index],
                backgroundColor: function(context) {
                    const value = context.parsed.y;
                    const alpha = (value / 100) * 0.8 + 0.2;
                    return `rgba(5, 168, 249, ${alpha})`;
                },
                borderColor: CHART_COLORS.axisColor,
                borderWidth: 1
            }))
        },
        options: {
            ...COMMON_OPTIONS,
            indexAxis: 'x',
            scales: {
                x: {
                    ...COMMON_OPTIONS.scales.x,
                    stacked: false
                },
                y: {
                    ...COMMON_OPTIONS.scales.y,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Activity Volume',
                        color: CHART_COLORS.textColor,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 10
                        }
                    }
                }
            },
            plugins: {
                ...COMMON_OPTIONS.plugins,
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        ...COMMON_OPTIONS.plugins.legend.labels,
                        boxWidth: 12
                    }
                }
            }
        }
    };
    
    return new Chart(ctx, config);
}

// ===================================
// 4. BUBBLE DISPERSION (Multi-variable)
// ===================================
function initBubbleDispersion() {
    const ctx = document.getElementById('bubbleDispersion');
    if (!ctx) return;
    
    const data = generateSampleData();
    
    // Separate by priority
    const highPriority = data.bubble.filter(d => d.priority === 'Alta');
    const medPriority = data.bubble.filter(d => d.priority === 'Media');
    const lowPriority = data.bubble.filter(d => d.priority === 'Baja');
    
    const config = {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: 'High Priority',
                    data: highPriority,
                    backgroundColor: 'rgba(255, 71, 87, 0.6)',
                    borderColor: CHART_COLORS.negative,
                    borderWidth: 2
                },
                {
                    label: 'Medium Priority',
                    data: medPriority,
                    backgroundColor: 'rgba(255, 165, 0, 0.6)',
                    borderColor: CHART_COLORS.warning,
                    borderWidth: 2
                },
                {
                    label: 'Low Priority',
                    data: lowPriority,
                    backgroundColor: 'rgba(5, 168, 249, 0.6)',
                    borderColor: CHART_COLORS.info,
                    borderWidth: 2
                }
            ]
        },
        options: {
            ...COMMON_OPTIONS,
            scales: {
                x: {
                    ...COMMON_OPTIONS.scales.x,
                    title: {
                        display: true,
                        text: 'Response Time (hours)',
                        color: CHART_COLORS.textColor,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 10,
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    ...COMMON_OPTIONS.scales.y,
                    title: {
                        display: true,
                        text: 'Volume (tickets)',
                        color: CHART_COLORS.textColor,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 10,
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                ...COMMON_OPTIONS.plugins,
                tooltip: {
                    ...COMMON_OPTIONS.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const point = context.raw;
                            return [
                                `Zone: ${point.zone}`,
                                `Response: ${point.x.toFixed(1)}h`,
                                `Volume: ${point.y.toFixed(0)} tickets`,
                                `Size: ${point.r.toFixed(0)} (complexity)`,
                                `Priority: ${point.priority}`
                            ];
                        }
                    }
                }
            }
        }
    };
    
    return new Chart(ctx, config);
}

// ===================================
// 5. BOX PLOT (Statistical Distribution)
// ===================================
function initBoxPlot() {
    const ctx = document.getElementById('boxPlotChart');
    if (!ctx) return;
    
    const data = generateSampleData();
    const boxData = data.boxPlot;
    
    // Box plot represented as error bars / custom drawing
    const config = {
        type: 'bar',
        data: {
            labels: ['Efficiency Distribution'],
            datasets: [
                {
                    label: 'Q1-Q3 (IQR)',
                    data: [boxData.q3 - boxData.q1],
                    backgroundColor: 'rgba(5, 168, 249, 0.3)',
                    borderColor: CHART_COLORS.info,
                    borderWidth: 2,
                    base: boxData.q1
                },
                {
                    label: 'Median',
                    data: [0.5],
                    backgroundColor: CHART_COLORS.positive,
                    borderWidth: 3,
                    base: boxData.median
                }
            ]
        },
        options: {
            ...COMMON_OPTIONS,
            indexAxis: 'y',
            scales: {
                x: {
                    ...COMMON_OPTIONS.scales.x,
                    min: 0,
                    max: 120,
                    title: {
                        display: true,
                        text: 'Efficiency Score',
                        color: CHART_COLORS.textColor,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 10
                        }
                    }
                },
                y: {
                    ...COMMON_OPTIONS.scales.y,
                    display: true
                }
            },
            plugins: {
                ...COMMON_OPTIONS.plugins,
                legend: {
                    display: false
                }
            }
        }
    };
    
    return new Chart(ctx, config);
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing trading terminal charts...');
    
    // Initialize all charts
    const charts = {
        mainFlow: initMainFlowChart(),
        quartile: initQuartileScatter(),
        heatmap: initHeatmapMatrix(),
        bubble: initBubbleDispersion(),
        boxPlot: initBoxPlot()
    };
    
    // Update terminal clock
    function updateClock() {
        const now = new Date();
        const clockElement = document.getElementById('terminalClock');
        if (clockElement) {
            clockElement.textContent = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    }
    
    setInterval(updateClock, 1000);
    updateClock();
    
    // Simulate FPS counter
    let fps = 60;
    function updateFPS() {
        fps = 58 + Math.random() * 4;
        const fpsElement = document.querySelector('.fps-value');
        if (fpsElement) {
            fpsElement.textContent = fps.toFixed(0);
        }
    }
    
    setInterval(updateFPS, 1000);
    
    // Simulate latency
    let latency = 45;
    function updateLatency() {
        latency = 40 + Math.random() * 20;
        const latencyElement = document.querySelector('.latency-value');
        if (latencyElement) {
            latencyElement.textContent = latency.toFixed(0);
        }
    }
    
    setInterval(updateLatency, 2000);
    
    // Activity feed filters
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            console.log('Filtering activity by:', filter);
            // Implement filtering logic here
        });
    });
    
    console.log('Trading terminal initialized successfully');
});

// Export charts for external access
window.tradingCharts = window.tradingCharts || {};
