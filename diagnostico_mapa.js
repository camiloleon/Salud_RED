// Script de diagnóstico del mapa
console.log('\n🔍 === DIAGNÓSTICO DEL MAPA ===\n');

// Verificar que EMBEDDED_FRAUD_DATA existe
if (typeof EMBEDDED_FRAUD_DATA === 'undefined') {
    console.error('❌ EMBEDDED_FRAUD_DATA no está definido');
} else {
    console.log('✅ EMBEDDED_FRAUD_DATA está definido');
    console.log(`📊 Total registros: ${EMBEDDED_FRAUD_DATA.total_registros || EMBEDDED_FRAUD_DATA.total_casos}`);
    
    if (EMBEDDED_FRAUD_DATA.geo_data) {
        console.log(`📍 geo_data tiene ${EMBEDDED_FRAUD_DATA.geo_data.length} registros`);
        
        // Verificar estructura de primeros 3 registros
        console.log('\n📋 Primeros 3 registros:');
        EMBEDDED_FRAUD_DATA.geo_data.slice(0, 3).forEach((item, i) => {
            console.log(`\n#${i+1}:`);
            console.log(`  Ciudad: ${item.Ciudad}`);
            console.log(`  Coord X (lon): ${item['Coordenada X']}`);
            console.log(`  Coord Y (lat): ${item['Coordenada Y']}`);
            console.log(`  Canal: ${item.CANAL}`);
        });
        
        // Verificar coordenadas válidas
        let validCoords = 0;
        let invalidCoords = 0;
        
        EMBEDDED_FRAUD_DATA.geo_data.forEach(item => {
            const lat = parseFloat(item['Coordenada Y']);
            const lon = parseFloat(item['Coordenada X']);
            
            if (!isNaN(lat) && !isNaN(lon)) {
                validCoords++;
            } else {
                invalidCoords++;
                console.warn(`⚠️ Coordenadas inválidas en ${item.Ciudad}: lat=${lat}, lon=${lon}`);
            }
        });
        
        console.log(`\n✅ Coordenadas válidas: ${validCoords}`);
        console.log(`❌ Coordenadas inválidas: ${invalidCoords}`);
        
        // Verificar rango
        const coords = EMBEDDED_FRAUD_DATA.geo_data.map(item => ({
            lat: parseFloat(item['Coordenada Y']),
            lon: parseFloat(item['Coordenada X'])
        })).filter(c => !isNaN(c.lat) && !isNaN(c.lon));
        
        const latMin = Math.min(...coords.map(c => c.lat));
        const latMax = Math.max(...coords.map(c => c.lat));
        const lonMin = Math.min(...coords.map(c => c.lon));
        const lonMax = Math.max(...coords.map(c => c.lon));
        
        console.log(`\n📏 Rango de coordenadas:`);
        console.log(`  Latitud: ${latMin.toFixed(3)}° a ${latMax.toFixed(3)}°`);
        console.log(`  Longitud: ${lonMin.toFixed(3)}° a ${lonMax.toFixed(3)}°`);
        
        // Verificar si Leaflet está cargado
        if (typeof L === 'undefined') {
            console.error('❌ Leaflet (L) no está cargado');
        } else {
            console.log('✅ Leaflet está cargado correctamente');
        }
        
    } else {
        console.error('❌ geo_data no existe en EMBEDDED_FRAUD_DATA');
    }
}

console.log('\n=== FIN DEL DIAGNÓSTICO ===\n');
