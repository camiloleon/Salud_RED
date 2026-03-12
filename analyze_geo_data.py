"""
Análisis de datos de georeferenciación del dashboard de fraude
Diagnóstico: Por qué el mapa solo muestra un punto cuando debería mostrar 64
"""

import json
import re
from collections import Counter

def analyze_fraud_geo_data():
    print("=" * 80)
    print("DIAGNÓSTICO DE GEOREFERENCIACIÓN - DASHBOARD DE FRAUDE")
    print("=" * 80)
    
    # 1. Leer fraud_data_updated.json
    print("\n📂 Leyendo fraud_data_updated.json...")
    try:
        with open('dashboard/fraud_data_updated.json', 'r', encoding='utf-8') as f:
            json_data = json.load(f)
        geo_data_json = json_data.get('geo_data', [])
        print(f"✅ Registros encontrados en JSON: {len(geo_data_json)}")
    except Exception as e:
        print(f"❌ Error leyendo JSON: {e}")
        geo_data_json = []
    
    # 2. Extraer datos embebidos de fraud_charts.js
    print("\n📂 Leyendo datos embebidos de fraud_charts.js...")
    try:
        with open('dashboard/fraud_charts.js', 'r', encoding='utf-8') as f:
            js_content = f.read()
        
        # Buscar la sección de EMBEDDED_FRAUD_DATA
        match = re.search(r'const EMBEDDED_FRAUD_DATA\s*=\s*({[\s\S]*?"geo_data":\s*\[([\s\S]*?)\]\s*,\s*"fecha_inicio")', js_content)
        if match:
            # Extraer el array geo_data específicamente
            geo_match = re.search(r'"geo_data":\s*\[([\s\S]*?)\]\s*,\s*"fecha_inicio"', match.group(0))
            if geo_match:
                geo_json_str = '[' + geo_match.group(1) + ']'
                geo_data_embedded = json.loads(geo_json_str)
                print(f"✅ Registros encontrados en JS embebido: {len(geo_data_embedded)}")
            else:
                print("⚠️ No se pudo extraer geo_data del JS")
                geo_data_embedded = []
        else:
            print("⚠️ No se encontró EMBEDDED_FRAUD_DATA")
            geo_data_embedded = []
    except Exception as e:
        print(f"❌ Error leyendo JS: {e}")
        geo_data_embedded = []
    
    # 3. Analizar coordenadas
    print("\n" + "=" * 80)
    print("ANÁLISIS DE COORDENADAS")
    print("=" * 80)
    
    def analyze_coords(data, source_name):
        print(f"\n📊 Análisis de {source_name}:")
        print(f"   Total de registros: {len(data)}")
        
        if not data:
            print("   ❌ No hay datos para analizar")
            return
        
        # Validar coordenadas
        valid_coords = []
        invalid_coords = []
        
        # Rango válido suroccidente Colombia
        valid_range = {
            'lat_min': 1.5,
            'lat_max': 5.5,
            'lon_min': -78.0,
            'lon_max': -74.0
        }
        
        coords_counter = Counter()
        
        for idx, item in enumerate(data):
            lat = item.get('Coordenada Y')
            lon = item.get('Coordenada X')
            ciudad = item.get('Ciudad', 'N/A')
            
            if lat is None or lon is None:
                invalid_coords.append({
                    'index': idx,
                    'ciudad': ciudad,
                    'razón': 'Coordenadas faltantes',
                    'lat': lat,
                    'lon': lon
                })
                continue
            
            # Convertir a float si es necesario
            try:
                lat = float(lat)
                lon = float(lon)
            except:
                invalid_coords.append({
                    'index': idx,
                    'ciudad': ciudad,
                    'razón': 'Coordenadas no numéricas',
                    'lat': lat,
                    'lon': lon
                })
                continue
            
            # Validar rango
            if (lat < valid_range['lat_min'] or lat > valid_range['lat_max'] or 
                lon < valid_range['lon_min'] or lon > valid_range['lon_max']):
                invalid_coords.append({
                    'index': idx,
                    'ciudad': ciudad,
                    'razón': 'Fuera de rango Colombia',
                    'lat': lat,
                    'lon': lon
                })
            
            valid_coords.append({
                'index': idx,
                'lat': lat,
                'lon': lon,
                'ciudad': ciudad
            })
            
            # Contar coordenadas únicas/duplicadas
            coord_key = f"{lat:.5f},{lon:.5f}"
            coords_counter[coord_key] += 1
        
        print(f"\n   ✅ Coordenadas válidas: {len(valid_coords)}")
        print(f"   ❌ Coordenadas inválidas: {len(invalid_coords)}")
        
        if invalid_coords:
            print(f"\n   ⚠️ Registros con coordenadas inválidas:")
            for inv in invalid_coords[:5]:  # Mostrar primeros 5
                print(f"      Índice {inv['index']}: {inv['ciudad']} - {inv['razón']}")
                print(f"         Lat: {inv['lat']}, Lon: {inv['lon']}")
        
        if valid_coords:
            # Estadísticas de coordenadas
            lats = [c['lat'] for c in valid_coords]
            lons = [c['lon'] for c in valid_coords]
            
            print(f"\n   📍 Rango de coordenadas:")
            print(f"      Latitud:  {min(lats):.5f} a {max(lats):.5f}")
            print(f"      Longitud: {min(lons):.5f} a {max(lons):.5f}")
            
            # Coordenadas únicas vs duplicadas
            unique_coords = len(coords_counter)
            duplicate_coords = sum(1 for count in coords_counter.values() if count > 1)
            
            print(f"\n   🔍 Análisis de duplicación:")
            print(f"      Coordenadas únicas: {unique_coords}")
            print(f"      Ubicaciones con duplicados: {duplicate_coords}")
            
            # Top ubicaciones más repetidas
            top_duplicates = coords_counter.most_common(5)
            if top_duplicates[0][1] > 1:
                print(f"\n   🔝 Top ubicaciones más repetidas:")
                for coord_key, count in top_duplicates:
                    if count > 1:
                        lat_str, lon_str = coord_key.split(',')
                        # Buscar ciudades en esta ubicación
                        ciudades = set([c['ciudad'] for c in valid_coords 
                                      if f"{c['lat']:.5f},{c['lon']:.5f}" == coord_key])
                        print(f"      {coord_key}: {count} casos - Ciudades: {', '.join(ciudades)}")
            
            # Distribución por ciudad
            ciudad_counter = Counter([c['ciudad'] for c in valid_coords])
            print(f"\n   🌆 Top ciudades con más casos:")
            for ciudad, count in ciudad_counter.most_common(5):
                print(f"      {ciudad}: {count} casos")
    
    # Analizar ambas fuentes
    analyze_coords(geo_data_json, "fraud_data_updated.json")
    analyze_coords(geo_data_embedded, "fraud_charts.js (EMBEDDED_FRAUD_DATA)")
    
    # 4. Comparar ambas fuentes
    print("\n" + "=" * 80)
    print("COMPARACIÓN ENTRE ARCHIVOS")
    print("=" * 80)
    
    if len(geo_data_json) != len(geo_data_embedded):
        print(f"⚠️ DIFERENCIA DETECTADA:")
        print(f"   JSON: {len(geo_data_json)} registros")
        print(f"   JS embebido: {len(geo_data_embedded)} registros")
        print(f"   Diferencia: {abs(len(geo_data_json) - len(geo_data_embedded))} registros")
    else:
        print(f"✅ Ambos archivos tienen {len(geo_data_json)} registros")
    
    # 5. Verificar si todos los puntos están en la misma ubicación
    print("\n" + "=" * 80)
    print("DIAGNÓSTICO DEL PROBLEMA")
    print("=" * 80)
    
    if geo_data_embedded:
        coords_set = set()
        for item in geo_data_embedded:
            lat = item.get('Coordenada Y')
            lon = item.get('Coordenada X')
            if lat is not None and lon is not None:
                coords_set.add(f"{float(lat):.5f},{float(lon):.5f}")
        
        if len(coords_set) == 1:
            print("❌ PROBLEMA ENCONTRADO: TODOS LOS PUNTOS ESTÁN EN LA MISMA COORDENADA")
            print(f"   Coordenada única: {list(coords_set)[0]}")
            print(f"   {len(geo_data_embedded)} registros apuntando a la misma ubicación")
        elif len(coords_set) < 10:
            print(f"⚠️ PROBLEMA POTENCIAL: Solo {len(coords_set)} ubicaciones únicas para {len(geo_data_embedded)} registros")
            print(f"   Esto podría verse como un solo punto si están muy cerca")
        else:
            print(f"✅ Se detectaron {len(coords_set)} ubicaciones únicas")
            print(f"   El problema podría estar en el código JavaScript del mapa")
    
    print("\n" + "=" * 80)
    print("RECOMENDACIONES")
    print("=" * 80)
    
    print("""
1. Verifica la consola del navegador al cargar fraud_dashboard.html
2. Busca estos mensajes en la consola:
   - "✅ Total registros procesados: X"
   - "🔍 Coordenadas únicas: X"
   - "✅ Total de marcadores agregados al mapa: X"
   
3. Si los logs muestran 64 registros pero solo 1 marcador visible:
   - Puede ser un problema de zoom del mapa
   - Los puntos podrían estar superpuestos
   - Verifica que Leaflet.js esté cargando correctamente
   
4. Si los logs muestran menos de 64 registros:
   - Revisa los filtros aplicados
   - Verifica que no haya errores de JavaScript
    """)

if __name__ == "__main__":
    analyze_fraud_geo_data()
