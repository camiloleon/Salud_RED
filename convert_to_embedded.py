import json
import sys

with open('dashboard/fraud_data_updated.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Redirigir salida a archivo
output = open('dashboard/embedded_data_new.js', 'w', encoding='utf-8')
sys.stdout = output

print('// EMBEDDED DATA ACTUALIZADO CON TECNICO Y ALIADO')
print('const EMBEDDED_FRAUD_DATA = {')
print(f'  "total_registros": {data["total_casos"]},')

# Calcular canal_principal y canal_secundario
canal_principal = {}
canal_secundario = {}
asesores = {}
zonas = {}
ciudades = {}

for item in data['geo_data']:
    canal_principal[item['CANAL']] = canal_principal.get(item['CANAL'], 0) + 1
    canal_secundario[item['CANAL2']] = canal_secundario.get(item['CANAL2'], 0) + 1
    asesor = item.get('Asesor comercial', '')
    if asesor:
        asesores[asesor] = asesores.get(asesor, 0) + 1
    zona = str(item.get('Zona', ''))
    if zona:
        zonas[zona] = zonas.get(zona, 0) + 1
    ciudad = item.get('Ciudad', '')
    if ciudad:
        ciudades[ciudad] = ciudades.get(ciudad, 0) + 1

print('  "canal_principal": {')
for i, (k, v) in enumerate(sorted(canal_principal.items(), key=lambda x: x[1], reverse=True)):
    comma = ',' if i < len(canal_principal) - 1 else ''
    print(f'    "{k}": {v}{comma}')
print('  },')

print('  "canal_secundario": {')
for i, (k, v) in enumerate(sorted(canal_secundario.items(), key=lambda x: x[1], reverse=True)):
    comma = ',' if i < len(canal_secundario) - 1 else ''
    print(f'    "{k}": {v}{comma}')
print('  },')

print('  "asesores": {')
top_asesores = sorted(asesores.items(), key=lambda x: x[1], reverse=True)[:15]
for i, (k, v) in enumerate(top_asesores):
    comma = ',' if i < len(top_asesores) - 1 else ''
    print(f'    "{k}": {v}{comma}')
print('  },')

print('  "zonas": {')
for i, (k, v) in enumerate(sorted(zonas.items(), key=lambda x: x[1], reverse=True)):
    comma = ',' if i < len(zonas) - 1 else ''
    print(f'    "{k}": {v}{comma}')
print('  },')

print('  "ciudades": {')
for i, (k, v) in enumerate(sorted(ciudades.items(), key=lambda x: x[1], reverse=True)):
    comma = ',' if i < len(ciudades) - 1 else ''
    print(f'    "{k}": {v}{comma}')
print('  },')

print('  "tecnicos": {')
top_tecnicos = sorted(data['tecnicos'].items(), key=lambda x: x[1], reverse=True)[:15]
for i, (k, v) in enumerate(top_tecnicos):
    comma = ',' if i < len(top_tecnicos) - 1 else ''
    print(f'    "{k}": {v}{comma}')
print('  },')

print('  "aliados": {')
for i, (k, v) in enumerate(sorted(data['aliados'].items(), key=lambda x: x[1], reverse=True)):
    comma = ',' if i < len(data['aliados']) - 1 else ''
    print(f'    "{k}": {v}{comma}')
print('  },')

print('  "companias": {')
for i, (k, v) in enumerate(sorted(data['companias'].items(), key=lambda x: x[1], reverse=True)):
    comma = ',' if i < len(data['companias']) - 1 else ''
    print(f'    "{k}": {v}{comma}')
print('  },')

print('  "nodos": {')
top_nodos = sorted(data['nodos'].items(), key=lambda x: x[1], reverse=True)[:20]
for i, (k, v) in enumerate(top_nodos):
    comma = ',' if i < len(top_nodos) - 1 else ''
    print(f'    "{k}": {v}{comma}')
print('  },')

print('  "tipo_red": {')
for i, (k, v) in enumerate(sorted(data['tipo_red'].items(), key=lambda x: x[1], reverse=True)):
    comma = ',' if i < len(data['tipo_red']) - 1 else ''
    print(f'    "{k}": {v}{comma}')
print('  },')

print('  "geo_data": [')
for i, item in enumerate(data['geo_data']):
    comma = ',' if i < len(data['geo_data']) - 1 else ''
    print(f'    {json.dumps(item, ensure_ascii=False)}{comma}')
print('  ],')

print('  "fecha_inicio": "2026-02-11",')
print('  "fecha_fin": "2026-02-14"')
print('};')

output.close()
print('Archivo generado exitosamente', file=sys.__stdout__)
