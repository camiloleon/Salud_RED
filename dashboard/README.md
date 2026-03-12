# 📊 O&M Analytics Terminal - Professional Trading Dashboard

## 🎯 Overview

Professional-grade analytics dashboard with **Wall Street/NASDAQ/TRM inspired** terminal design for real-time O&M (Operations & Maintenance) and TRF (Network Operations) monitoring.

### ✨ Key Features

- 🖥️ **Trading Terminal Aesthetic**: Dark terminal theme with monospace fonts, inspired by Bloomberg/NASDAQ terminals
- 📈 **Advanced Visualizations**: Quartile scatter plots, bubble dispersion analysis, heatmaps, box plots, correlation matrices
- ⚡ **Real-Time Monitoring**: Live indicators, activity feeds, market-style order book depth view
- 🎨 **Professional Color Scheme**: Terminal green (#00d4aa), red (#ff4757), blue (#05a8f9) for data-driven insights
- 📱 **Responsive Design**: Fully responsive grid layout for any screen size
- 🔥 **Performance Metrics**: FPS counter, latency monitoring, system health indicators

---

## 🚀 Quick Start

### 1. Open the Dashboard

Simply open `index.html` in your web browser (Chrome, Firefox, Edge recommended):

```bash
# From the dashboard folder
start index.html     # Windows
open index.html      # macOS
xdg-open index.html  # Linux
```

### 2. No Setup Required

All dependencies are loaded via CDN:
- ✅ Chart.js 4.4.0
- ✅ Date-fns adapter for time series
- ✅ Google Fonts (Roboto Mono)

### 3. Files Structure

```
dashboard/
├── index.html              # Main trading terminal dashboard
├── styles_pro.css          # Professional terminal theme CSS
├── terminal-charts.js      # Chart.js implementations & logic
├── dashboard_om.html       # O&M detailed analytics
├── dashboard_trf.html      # TRF network operations
└── system_status.html      # System health monitoring
```

---

## 📊 Dashboard Components

### 🔴 Live Indicators

**Top Header Bar:**
- 🟢 **LIVE Indicator**: Real-time pulsing status
- 🕐 **Terminal Clock**: HH:MM:SS format with auto-update
- ✅ **System Health**: Current system status (OPERATIONAL/DEGRADED/DOWN)

### 📉 Market Ticker Bar

Six scrollable metrics with live updates:
1. **OM Total**: Total O&M tickets with % change
2. **TRF Total**: Total TRF tickets with % change
3. **Open Tickets**: Currently open tickets
4. **Avg Response**: Average response time
5. **Efficiency**: Overall efficiency percentage
6. **Critical**: Critical priority count

### 🎛️ Navigation

Terminal-style command buttons:
- **▣ MAIN**: Main overview (current page)
- **◈ O&M**: O&M analytics details
- **◆ TRF**: TRF operations details
- **◉ STATUS**: System health monitoring

**Controls:**
- Time range selector (24H, 7D, 30D, 90D, 1Y, ALL)
- Region filter
- Refresh button with rotation animation

---

## 📈 Advanced Visualizations

### 1. **Main Flow Chart** (Top Panel)
- **Type**: Time-series with switchable views
- **Options**: Line, Area, Candlestick
- **Purpose**: Ticket volume trends over time
- **Interaction**: Hover for details, click legend to toggle datasets
- **Style**: Terminal blue gradient fill with glow effects

### 2. **Quartile Scatter Plot** ⭐
- **Type**: 4-quadrant scatter analysis
- **Axes**: 
  - X: Efficiency (0-100%)
  - Y: Response Time (0-100h, inverted - lower is better)
- **Color Coding**:
  - 🔵 **Q1** (#1a73e8): High Efficiency + Low Response Time (BEST)
  - 🟢 **Q2** (#34a853): High Performance
  - 🟡 **Q3** (#fbbc04): Medium Performance
  - 🔴 **Q4** (#ea4335): Low Performance (NEEDS ATTENTION)
- **Purpose**: Identify performance zones and optimization opportunities

### 3. **24H Heatmap Matrix**
- **Type**: Time-based activity heatmap
- **Dimensions**: 24 hours × 7 days
- **Purpose**: Identify peak activity periods and patterns
- **Color Intensity**: Brighter = higher activity volume

### 4. **Top 10 Zones** (Leaderboard)
- **Type**: Ranked list with horizontal bars
- **Features**:
  - 🥇 Gold (1st), 🥈 Silver (2nd), 🥉 Bronze (3rd) ranks
  - Performance bars with gradient fills
  - Value display with % change indicators
- **Purpose**: Quick identification of top/bottom performers

### 5. **Multi-Variable Bubble Dispersion** ⭐
- **Type**: 3-dimensional bubble chart
- **Dimensions**:
  - X-axis: Response Time (hours)
  - Y-axis: Volume (tickets)
  - Z-axis (bubble size): Complexity/Priority
- **Color Coding**:
  - 🔴 High Priority (requires immediate attention)
  - 🟠 Medium Priority
  - 🔵 Low Priority
- **Purpose**: Multi-dimensional performance analysis

### 6. **Box Plot** (Statistical Distribution)
- **Type**: Statistical box-and-whisker plot
- **Components**:
  - Min/Max values (whiskers)
  - Q1/Q3 quartiles (box)
  - Median line
  - Outlier detection
- **Purpose**: Distribution analysis and anomaly detection

### 7. **Correlation Matrix**
- **Type**: 4×4 heatmap grid
- **Variables**: Key performance metrics correlation
- **Values**: -1.00 (negative) to +1.00 (positive)
- **Color Coding**:
  - 🔴 Negative correlation
  - 🔵 Neutral (1.00)
  - 🟢 Positive correlation
- **Purpose**: Identify metric relationships and dependencies

### 8. **Real-Time Activity Feed**
- **Type**: Live scrolling feed (Twitter/Exchange-style)
- **Columns**: Time, Type, ID, Description, Status, Priority
- **Filters**: ALL, O&M, TRF, CRITICAL
- **Chips**: Terminal-style filter buttons
- **Purpose**: Real-time operational events monitoring

### 9. **Market Depth** (Order Book Style)
- **Type**: Bid/Ask order book visualization
- **Sections**:
  - **ASKs**: Top half (higher response times) in red
  - **SPREAD**: Middle separator showing gap
  - **BIDs**: Bottom half (lower response times) in green
- **Columns**: Price (time), Volume Bar, Volume, Total
- **Purpose**: Visual depth analysis of response time distribution

---

## 🎨 Design System

### Color Palette

```css
--terminal-bg: #0a0e27           /* Main background */
--terminal-panel: #151920        /* Panel background */
--color-positive: #00d4aa        /* Green (gains, good) */
--color-negative: #ff4757        /* Red (losses, critical) */
--color-info: #05a8f9            /* Blue (neutral info) */
--color-warning: #ffa500         /* Orange (warnings) */
```

### Quartile Colors

```css
--q1-color: #1a73e8     /* Blue - Best performers */
--q2-color: #34a853     /* Green - Good performers */
--q3-color: #fbbc04     /* Yellow - Medium performers */
--q4-color: #ea4335     /* Red - Need improvement */
```

### Typography

Primary font: **Roboto Mono** (monospace) for authentic terminal feel
- Headers: 700 weight, letter-spacing: 2px
- Body: 400 weight, 13px base size
- Numbers: Tabular-nums for alignment

---

## ⚙️ Technical Stack

### Frontend Technologies

| Component | Technology | Version |
|-----------|-----------|---------|
| Charts | Chart.js | 4.4.0 |
| Date Adapter | chartjs-adapter-date-fns | 3.0.0 |
| Styling | Pure CSS3 | - |
| Layout | CSS Grid + Flexbox | - |
| Font | Roboto Mono (Google Fonts) | - |

### Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Edge 90+
✅ Safari 14+

---

## 🔧 Customization

### Update Data Source

Replace sample data in `terminal-charts.js`:

```javascript
// Current: Sample data generator
function generateSampleData() { ... }

// Replace with: Real data fetcher
async function fetchRealData() {
    const response = await fetch('YOUR_API_ENDPOINT');
    return await response.json();
}
```

### Change Color Theme

Edit `styles_pro.css` root variables:

```css
:root {
    --terminal-bg: #YOUR_BG_COLOR;
    --color-positive: #YOUR_GREEN;
    --color-negative: #YOUR_RED;
    /* ... more customization */
}
```

### Add New Chart

1. Add canvas in `index.html`:
```html
<div class="chart-panel">
    <div class="panel-header">
        <h3>YOUR CHART NAME</h3>
    </div>
    <div class="chart-body">
        <canvas id="yourChartId"></canvas>
    </div>
</div>
```

2. Initialize in `terminal-charts.js`:
```javascript
function initYourChart() {
    const ctx = document.getElementById('yourChartId');
    const chart = new Chart(ctx, yourConfig);
    return chart;
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Screen Width | Layout Changes |
|------------|--------------|----------------|
| Desktop | > 1400px | 2-3 column grid |
| Laptop | 1024-1400px | 2 column grid |
| Tablet | 768-1024px | 1 column stack |
| Mobile | < 768px | Single column + condensed header |

---

## 🎯 Performance Metrics

The footer displays real-time performance indicators:

- **Latency**: Server response time (ms)
- **FPS**: Frames per second (chart rendering)
- **System Status**: Overall health indicator

These update automatically via JavaScript timers.

---

## 🐛 Troubleshooting

### Charts not displaying?

1. Check browser console for errors (F12)
2. Verify Chart.js CDN is loading:
   ```javascript
   console.log(typeof Chart); // Should be 'function'
   ```
3. Clear browser cache and refresh

### Colors looking different?

- Ensure `styles_pro.css` is loaded (not old `styles.css`)
- Check CSS :root variables are not overridden
- Verify `terminal-theme` class is on `<body>` tag

### Responsive layout broken?

- Test in incognito/private mode (extensions can interfere)
- Check viewport meta tag is present
- Verify CSS Grid support in your browser

---

## 🔮 Future Enhancements

Planned features for next iterations:

- [ ] WebSocket integration for true real-time updates
- [ ] Export charts as PNG/SVG
- [ ] Dark/Light theme toggle
- [ ] Advanced filtering and search
- [ ] Historical data playback
- [ ] Alert notifications
- [ ] Custom dashboard builder
- [ ] Multi-language support

---

## 📄 License

Internal tool for O&M Analytics - Salud_RED project

---

## 👨‍💻 Developer Notes

### Chart.js Configuration Tips

- Use `maintainAspectRatio: false` for flexible sizing
- Enable `responsive: true` for auto-resizing
- Set `font.family` to match terminal theme
- Use `rgba()` colors for transparency effects
- Configure `animation.duration` for smooth transitions

### CSS Grid Best Practices

```css
.trading-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 12px;
}
```

This creates a responsive grid that adapts to container width.

### Performance Optimization

- Charts initialize only once on `DOMContentLoaded`
- Use `chart.update()` instead of recreating charts
- Limit tooltip callbacks to essential info
- Debounce resize events if adding custom handlers

---

## 📞 Support

For questions or issues:
1. Check browser console for error messages
2. Review this documentation
3. Inspect element to verify CSS classes
4. Test with sample data first before connecting real APIs

---

**Built with ❤️ for professional data analysis**

*Trading Terminal Dashboard v2.0 - Professional Edition*
