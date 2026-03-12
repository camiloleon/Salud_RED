"""
Script de validación adicional para identificar problemas específicos en el mapa
"""

import json
import re

def check_js_map_code():
    print("=" * 80)
    print("VERIFICACIÓN DE CÓDIGO JAVASCRIPT DEL MAPA")
    print("=" * 80)
    
    try:
        with open('dashboard/fraud_charts.js', 'r', encoding='utf-8') as f:
            js_content = f.read()
        
        # 1. Verificar que la función initGeoHeatmap existe
        print("\n1️⃣ Verificando función initGeoHeatmap...")
        if 'function initGeoHeatmap(data)' in js_content:
            print("   ✅ Función initGeoHeatmap encontrada")
        else:
            print("   ❌ Función initGeoHeatmap NO encontrada")
        
        # 2. Verificar que se llama la función
        print("\n2️⃣ Verificando llamada a initGeoHeatmap...")
        if 'initGeoHeatmap(data)' in js_content or 'initGeoHeatmap(fraudData)' in js_content:
            print("   ✅ Llamada a initGeoHeatmap encontrada")
        else:
            print("   ❌ Llamada a initGeoHeatmap NO encontrada")
        
        # 3. Verificar inicialización de Leaflet
        print("\n3️⃣ Verificando inicialización de Leaflet...")
        if "L.map('geoHeatmap')" in js_content:
            print("   ✅ Inicialización de Leaflet encontrada")
        else:
            print("   ❌ Inicialización de Leaflet NO encontrada")
        
        # 4. Verificar que se agregan marcadores
        print("\n4️⃣ Verificando código de marcadores...")
        if 'L.marker' in js_content:
            print("   ✅ Código de marcadores L.marker encontrado")
        else:
            print("   ❌ Código de marcadores NO encontrado")
        
        # 5. Buscar posibles filtros que limiten los marcadores
        print("\n5️⃣ Buscando posibles filtros limitantes...")
        
        # Extraer la función completa initGeoHeatmap
        match = re.search(r'function initGeoHeatmap\(data\)\s*{([\s\S]*?)(?=\nfunction|\n//\s*===|$)', js_content)
        if match:
            func_content = match.group(1)
            
            # Buscar filtros
            filters = []
            
            if '.filter(' in func_content:
                filter_matches = re.findall(r'\.filter\([^)]+\)', func_content)
                if filter_matches:
                    filters.extend(filter_matches)
            
            if '.slice(' in func_content:
                slice_matches = re.findall(r'\.slice\([^)]+\)', func_content)
                if slice_matches:
                    filters.extend(slice_matches)
            
            if 'if (' in func_content and 'continue' in func_content:
                print("   ⚠️ Hay condiciones if con 'continue' que podrían omitir registros")
            
            if 'if (' in func_content and 'return null' in func_content:
                print("   ⚠️ Hay condiciones if con 'return null' que podrían omitir registros")
            
            if filters:
                print(f"   ⚠️ Se encontraron {len(filters)} filtros:")
                for f in filters:
                    print(f"      {f}")
            else:
                print("   ✅ No se encontraron filtros limitantes obvios")
            
            # 6. Verificar el forEach que agrega marcadores
            print("\n6️⃣ Verificando loop de marcadores...")
            if 'processedData.forEach' in func_content or 'data.geo_data.forEach' in func_content:
                print("   ✅ Loop forEach para procesar datos encontrado")
                
                # Ver si se usa .addTo(map)
                if '.addTo(map)' in func_content:
                    print("   ✅ Marcadores se agregan al mapa con .addTo(map)")
                else:
                    print("   ❌ WARNING: No se encontró .addTo(map) - marcadores podrían no agregarse")
            else:
                print("   ❌ Loop forEach NO encontrado")
            
            # 7. Verificar logs de debug
            print("\n7️⃣ Verificando logs de debug...")
            console_logs = re.findall(r'console\.log\([^)]+\)', func_content)
            if console_logs:
                print(f"   ✅ Se encontraron {len(console_logs)} console.log para debugging:")
                for log in console_logs[:5]:  # Mostrar primeros 5
                    print(f"      {log[:80]}...")
            else:
                print("   ⚠️ No se encontraron console.log para debugging")
        
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Verificar HTML
    print("\n" + "=" * 80)
    print("VERIFICACIÓN DE HTML")
    print("=" * 80)
    
    try:
        with open('dashboard/fraud_dashboard.html', 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        print("\n1️⃣ Verificando contenedor del mapa...")
        if 'id="geoHeatmap"' in html_content:
            print("   ✅ Contenedor geoHeatmap encontrado")
            
            # Extraer el contenedor completo
            match = re.search(r'<div[^>]*id="geoHeatmap"[^>]*>(.*?)</div>', html_content)
            if match:
                print(f"   Contenedor: {match.group(0)}")
        else:
            print("   ❌ Contenedor geoHeatmap NO encontrado")
        
        print("\n2️⃣ Verificando carga de Leaflet.js...")
        if 'leaflet' in html_content.lower():
            print("   ✅ Referencia a Leaflet encontrada")
            leaflet_matches = re.findall(r'<script[^>]*leaflet[^>]*>|<link[^>]*leaflet[^>]*>', html_content, re.IGNORECASE)
            for match in leaflet_matches:
                print(f"      {match}")
        else:
            print("   ❌ Referencia a Leaflet NO encontrada")
        
        print("\n3️⃣ Verificando carga de fraud_charts.js...")
        if 'fraud_charts.js' in html_content:
            print("   ✅ fraud_charts.js está incluido")
        else:
            print("   ❌ fraud_charts.js NO está incluido")
        
    except Exception as e:
        print(f"❌ Error leyendo HTML: {e}")

if __name__ == "__main__":
    check_js_map_code()
