// SOLUCIÓN SIMPLE: Mapa de fraudes por ciudad con marcadores negros

function initGeoHeatmap(data) {
    const mapContainer = document.getElementById('geoHeatmap');
    if (!mapContainer) {
        console.error('❌ No se encontró el contenedor del mapa');
        return;
    }
    
    console.log('🗺️ Iniciando mapa simple...');
    
    // COORDENADAS FIJAS DE CIUDADES DEL SUROCCIDENTE
    const CIUDADES_COORDS = {
        'CALI': [3.4516, -76.5320],
        'PALMIRA': [3.5394, -76.3036],
        'POPAYAN': [2.4419, -76.6063],
        'PASTO': [1.2136, -77.2811],
        'NEIVA': [2.9273, -75.2819],
        'FLANDES': [4.2867, -74.8140],
        'CARTAGO': [4.7467, -75.9117],
        'BUGA': [3.9009, -76.2976],
        'SEVILLA': [4.2714, -75.9389],
        'ESPINAL': [4.1490, -74.8830],
        'FLORENCIA': [1.6145, -75.6062],
        'CANDELARIA': [3.4117, -76.3494],
        'IPIALES': [0.8275, -77.6434],
        'FLORIDA': [3.3234, -76.2311],
        'CAICEDONIA': [4.3308, -75.8228],
        'IBAGUE': [4.4389, -75.2322]
    };
    
    // Contar fraudes por ciudad
    const fraudesPorCiudad = {};
    data.geo_data.forEach(item => {
        const ciudad = item.Ciudad.toUpperCase();
        if (!fraudesPorCiudad[ciudad]) {
            fraudesPorCiudad[ciudad] = [];
        }
        fraudesPorCiudad[ciudad].push(item);
    });
    
    console.log('📊 Fraudes por ciudad:', Object.keys(fraudesPorCiudad).map(c => `${c}: ${fraudesPorCiudad[c].length}`).join(', '));
    
    // Crear mapa centrado en el suroccidente
    const map = L.map('geoHeatmap').setView([3.0, -76.0], 7);
    
    // Tile layer CLARO para mejor visibilidad
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 18,
        minZoom: 6
    }).addTo(map);
    
    console.log('✅ Mapa base cargado');
    
    // Agregar marcadores NEGROS por ciudad
    let markersAdded = 0;
    
    Object.entries(fraudesPorCiudad).forEach(([ciudad, casos]) => {
        const coords = CIUDADES_COORDS[ciudad];
        
        if (!coords) {
            console.warn(`⚠️ No hay coordenadas para ${ciudad}`);
            return;
        }
        
        const numCasos = casos.length;
        
        // Tamaño basado en cantidad de casos
        const size = 16 + (numCasos * 2); // Más casos = marcador más grande
        
        // MARCADOR NEGRO con borde blanco
        const icon = L.divIcon({
            className: 'fraud-marker-black',
            html: `<div style="
                background-color: #000000;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                border: 4px solid #ffffff;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #ffffff;
                font-weight: bold;
                font-size: ${size > 25 ? '14px' : '11px'};
                font-family: 'Roboto Mono', monospace;
            ">${numCasos}</div>`,
            iconSize: [size, size],
            iconAnchor: [size/2, size/2]
        });
        
        const marker = L.marker(coords, { icon: icon }).addTo(map);
        
        // Popup con información
        const casosList = casos.slice(0, 5).map(c => 
            `<div style="padding: 4px 0; border-bottom: 1px solid #e5e7eb;">
                <b>${c.Fecha}</b> - ${c.CANAL} - ${c['Asesor comercial']}
            </div>`
        ).join('');
        
        const masInfo = numCasos > 5 ? `<div style="padding: 8px 0; color: #6b7280;">... y ${numCasos - 5} casos más</div>` : '';
        
        marker.bindPopup(`
            <div style="font-family: 'Roboto Mono', monospace; min-width: 300px;">
                <div style="background: #dc2626; color: #ffffff; padding: 12px; font-weight: bold; font-size: 14px; border-radius: 6px 6px 0 0;">
                    ⚠️ ${ciudad}
                </div>
                <div style="padding: 14px; background: #ffffff;">
                    <div style="font-size: 24px; font-weight: bold; color: #dc2626; margin-bottom: 10px;">
                        ${numCasos} CASOS DE FRAUDE
                    </div>
                    <div style="font-size: 12px; color: #4b5563; margin-bottom: 12px;">
                        Coordenadas: ${coords[0].toFixed(4)}°, ${coords[1].toFixed(4)}°
                    </div>
                    <div style="max-height: 300px; overflow-y: auto; font-size: 11px;">
                        ${casosList}
                        ${masInfo}
                    </div>
                </div>
            </div>
        `, {
            maxWidth: 350
        });
        
        markersAdded++;
    });
    
    console.log(`✅ ${markersAdded} marcadores negros agregados al mapa`);
    
    // Guardar referencia
    charts.geoHeatmap = map;
    
    // Actualizar estadísticas
    document.getElementById('geoTotal').textContent = data.geo_data.length;
    const ciudadConMasCasos = Object.entries(fraudesPorCiudad).sort((a, b) => b[1].length - a[1].length)[0];
    if (ciudadConMasCasos) {
        document.getElementById('geoHotspot').textContent = ciudadConMasCasos[0];
    }
}
