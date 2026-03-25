"""
Convierte fraud_data_completo.json a formato JavaScript para fraud_charts.js
"""
import json

# Leer JSON
with open('fraud_data_completo.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Convertir a JavaScript
js_content = "const EMBEDDED_FRAUD_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";"

# Guardar como archivo JS
with open('fraud_data_embedded.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("✓ Archivo JavaScript generado: fraud_data_embedded.js")
print(f"  Total casos: {data['total_casos']}")
print(f"  Tasa confirmación: {data['tasa_confirmacion']}%")
print(f"  Campos por registro: {len(data['geo_data'][0])} campos")
