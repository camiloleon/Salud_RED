import pandas as pd
import json

# Leer Excel original
df = pd.read_excel('fuentes_dashboard/Razones Fraude.xlsx')

print(f'Total registros en Excel: {len(df)}')
print(f'\nColumnas clave encontradas:')
print(f'- Técnico: {df["Técnico"].nunique()} valores únicos')
print(f'- ID Aliado: {df["ID Aliado"].nunique()} valores únicos')
print(f'- CANAL: {df["CANAL"].nunique()} valores únicos')
print(f'- Zona: {df["Zona"].nunique()} valores únicos')

# Crear estructura de datos actualizada
geo_data = []
for idx, row in df.iterrows():
    # Validar coordenadas
    lat = row['Coordenada Y']
    lon = row['Coordenada X']
    
    if pd.notna(lat) and pd.notna(lon):
        try:
            lat_val = float(lat)
            lon_val = float(lon)
            
            # Validar rango suroccidente Colombia
            if 1.5 <= lat_val <= 5.5 and -78 <= lon_val <= -74:
                geo_data.append({
                    'CANAL': str(row['CANAL']) if pd.notna(row['CANAL']) else '',
                    'CANAL2': str(row['CANAL2']) if pd.notna(row['CANAL2']) else '',
                    'Zona': str(row['Zona']) if pd.notna(row['Zona']) else '',
                    'Ciudad': str(row['Ciudad']) if pd.notna(row['Ciudad']) else '',
                    'Coordenada X': lon_val,
                    'Coordenada Y': lat_val,
                    'Asesor comercial': str(row['Asesor comercial']) if pd.notna(row['Asesor comercial']) else '',
                    'Razón': str(row['Razón']) if pd.notna(row['Razón']) else '',
                    'Tipo de Red': str(row['Tipo de Red']) if pd.notna(row['Tipo de Red']) else '',
                    'Técnico': str(row['Técnico']) if pd.notna(row['Técnico']) else '',
                    'ID Aliado': str(int(row['ID Aliado'])) if pd.notna(row['ID Aliado']) else '',
                    'Compañia': str(row['Compañia']) if pd.notna(row['Compañia']) else '',
                    'Nodo': str(row['Nodo']) if pd.notna(row['Nodo']) else ''
                })
        except Exception as e:
            print(f'Error en fila {idx}: {e}')
            pass

print(f'\nRegistros con coordenadas válidas: {len(geo_data)}')

# Contar distribuciones
tecnicos = {}
aliados = {}
companias = {}
nodos = {}
tipo_red = {}
for item in geo_data:
    tec = item['Técnico']
    if tec and tec != 'nan':
        tecnicos[tec] = tecnicos.get(tec, 0) + 1
    
    ali = item['ID Aliado']
    if ali and ali != 'nan':
        aliados[ali] = aliados.get(ali, 0) + 1
    
    comp = item['Compañia']
    if comp and comp != 'nan':
        companias[comp] = companias.get(comp, 0) + 1
    
    nod = item['Nodo']
    if nod and nod != 'nan':
        nodos[nod] = nodos.get(nod, 0) + 1
    
    red = item['Tipo de Red']
    if red and red != 'nan':
        tipo_red[red] = tipo_red.get(red, 0) + 1

print(f'\n=== DISTRIBUCIÓN TÉCNICOS (Top 15) ===')
for tec, count in sorted(tecnicos.items(), key=lambda x: x[1], reverse=True)[:15]:
    print(f'{tec[:40]:40s}: {count:3d} casos')

print(f'\n=== DISTRIBUCIÓN ALIADOS ===')
for ali, count in sorted(aliados.items(), key=lambda x: x[1], reverse=True):
    print(f'{ali:15s}: {count:3d} casos')

print(f'\n=== DISTRIBUCIÓN COMPAÑÍAS ===')
for comp, count in sorted(companias.items(), key=lambda x: x[1], reverse=True):
    print(f'{comp[:50]:50s}: {count:3d} casos')

print(f'\n=== DISTRIBUCION NODOS (Top 15) ===')
for nod, count in sorted(nodos.items(), key=lambda x: x[1], reverse=True)[:15]:
    print(f'{nod:15s}: {count:3d} casos')

print(f'\n=== TIPO DE RED ===')
for red, count in sorted(tipo_red.items(), key=lambda x: x[1], reverse=True):
    print(f'{red:30s}: {count:3d} casos')

# Guardar JSON actualizado
output = {
    'total_casos': len(geo_data),
    'tecnicos': tecnicos,
    'aliados': aliados,
    'companias': companias,
    'nodos': nodos,
    'tipo_red': tipo_red,
    'geo_data': geo_data
}

with open('dashboard/fraud_data_updated.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f'\n[OK] Archivo generado: dashboard/fraud_data_updated.json')
