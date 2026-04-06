import json
from collections import Counter, defaultdict

# Cargar datos actualizados
with open('dashboard/fraud_data_updated.json', encoding='utf-8') as f:
    updated = json.load(f)

# Estructura base para fraud_data.json
result = {}



# Copiar todos los campos presentes en fraud_data_updated.json
for key, value in updated.items():
    result[key] = value

# Asegurar que geo_data existe aunque esté vacío
if 'geo_data' not in result:
    result['geo_data'] = []

# Asegurar que total_registros existe y es igual a total_casos
result['total_registros'] = result.get('total_casos', len(result['geo_data']))

# Mantener campos vacíos para compatibilidad si no existen
for key in ['canal_principal','canal_secundario','ciudades','tipo_red','asesores','tecnicos','nodos','zonas','regionales','confir_resultados','estados_sla','subtipos_orden']:
    if key not in result:
        result[key] = {}

# Recalcular agregados desde geo_data (canal_principal, canal_secundario, ciudades, asesores)
canal_principal = {}
canal_secundario = {}
ciudades = {}
asesores = {}
for item in result.get('geo_data', []):
    canal = item.get('CANAL', '')
    canal2 = item.get('CANAL2', '')
    ciudad = item.get('Ciudad', '')
    asesor = item.get('Asesor comercial', '')
    if canal:
        canal_principal[canal] = canal_principal.get(canal, 0) + 1
    if canal2:
        canal_secundario[canal2] = canal_secundario.get(canal2, 0) + 1
    if ciudad:
        ciudades[ciudad] = ciudades.get(ciudad, 0) + 1
    if asesor:
        asesores[asesor] = asesores.get(asesor, 0) + 1
result['canal_principal'] = canal_principal
result['canal_secundario'] = canal_secundario
result['ciudades'] = ciudades
result['asesores'] = asesores

# Fechas (si no existen)
if 'fecha_inicio' not in result:
    result['fecha_inicio'] = ''
if 'fecha_fin' not in result:
    result['fecha_fin'] = ''

with open('dashboard/fraud_data.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print('fraud_data.json actualizado con la nueva data (estructura mínima)')
