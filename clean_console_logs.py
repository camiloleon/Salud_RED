import re

# Leer el archivo
with open('dashboard/fraud_charts.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Patrones a eliminar
patterns_to_remove = [
    r"console\.log\('Inicializando.*?'\);\n",
    r"console\.log\('Mapa redimensionado.*?'\);\n",
]

# Eliminar patrones simples
for pattern in patterns_to_remove:
    content = re.sub(pattern, '', content)

# Reemplazar la sección de estadísticas con versión simplificada
content = re.sub(
    r"console\.log\(`✅ Total registros procesados.*?\n.*?console\.log\(`📊 Máxima duplicación.*?\n",
    "",
    content,
    flags=re.DOTALL
)

# Escribir archivo actualizado
with open('dashboard/fraud_charts.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("[OK] Console.log statements limpiados exitosamente")
