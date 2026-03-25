import pandas as pd
import json
from datetime import datetime

print("=" * 80)
print("EXTRACCIÓN Y TRANSFORMACIÓN DE DATOS DE FRAUDE")
print("=" * 80)

# Leer el archivo de Excel con todos los datos
df = pd.read_excel('fuentes_dashboard/Razones Fraude.xlsx')

print(f"\n✓ Cargados {len(df)} registros del archivo Excel")

# Función para convertir duración "HH:MM" a minutos
def duration_to_minutes(duration_str):
    if pd.isna(duration_str):
        return 0
    try:
        if isinstance(duration_str, str) and ':' in duration_str:
            h, m = duration_str.split(':')
            return int(h) * 60 + int(m)
        return 0
    except:
        return 0

# Crear estructura de datos para el dashboard
geo_data = []

for idx, row in df.iterrows():
    # Validar que tiene coordenadas
    lat = row.get('Coordenada Y', None)
    lon = row.get('Coordenada X', None)
    
    # Convertir fechas a string
    fecha = row['Fecha']
    if isinstance(fecha, pd.Timestamp):
        fecha = fecha.strftime('%Y-%m-%d')
    
    # Preparar registro
    record = {
        # Identificación
        'orden': str(row['Orden de trabajo']),
        'external_id': str(row['External ID']) if pd.notna(row['External ID']) else '',
        'tecnico': str(row['Técnico']),
        
        # Temporal
        'fecha': fecha,
        'inicio': str(row['Inicio']) if pd.notna(row['Inicio']) else '',
        'fin': str(row['Fin']) if pd.notna(row['Fin']) else '',
        
        # Cliente
        'cliente': str(row['Nombre']),
        'direccion': str(row['Dirección campo 1']) if pd.notna(row['Dirección campo 1']) else '',
        
        # Geográfico
        'ciudad': str(row['Ciudad']),
        'nodo': str(row['Nodo']),
        'zona': int(row['Zona']) if pd.notna(row['Zona']) else 0,
        'regional': str(row['Regional']),
        'latitud': float(lat) if pd.notna(lat) else None,
        'longitud': float(lon) if pd.notna(lon) else None,
        
        # Operacional
        'aliado': str(row['Compañia']),
        'canal': str(row['CANAL']),
        'canal2': str(row['CANAL2']),
        'tipo_red': str(row['Tipo de Red']),
        'tipo_actividad': str(row['Tipo de Actividad']),
        'subtipo_orden': str(row['Subtipo de la Orden de Trabajo']),
        
        # Asesor
        'asesor': str(row['Asesor comercial']),
        'codigo_asesor': str(row['Código Asesor comercial']) if pd.notna(row['Código Asesor comercial']) else '',
        
        # === CAMPOS NUEVOS ===
        
        # Confirmación
        'confirmacion': str(row['CONFIRMACION']) if pd.notna(row['CONFIRMACION']) else 'no',
        'confir_resultado': str(row['CONFIR_RESULTADO']) if pd.notna(row['CONFIR_RESULTADO']) else '',
        
        # Despacho
        'despac_causa': str(row['DESPAC_CAUSA']) if pd.notna(row['DESPAC_CAUSA']) else '',
        'despac_gestion': str(row['DESPAC_GESTION']) if pd.notna(row['DESPAC_GESTION']) else '',
        
        # Reprogramaciones
        'num_reprogramaciones': int(row['Numero de Reprogramaciones']) if pd.notna(row['Numero de Reprogramaciones']) else 0,
        
        # SLA
        'estado_sla': str(row['Estado SLA']) if pd.notna(row['Estado SLA']) else 'NODATA',
        'sla_horas': int(row['SLA Suscriptor']) if pd.notna(row['SLA Suscriptor']) else 0,
        'sla_cumplimiento': str(row['SLA Cumplimiento']) if pd.notna(row['SLA Cumplimiento']) else '0',
        
        # Métricas de tiempo
        'duracion_minutos': duration_to_minutes(row.get('Duración', '')),
        'tiempo_viaje_minutos': duration_to_minutes(row.get('Tiempo de viaje', '')),
        
        # Otros
        'razon': str(row['Razón']),
        'estado': str(row['Estado']),
        'persona_confirma': str(row['Persona que Confirma']) if pd.notna(row['Persona que Confirma']) else '',
    }
    
    geo_data.append(record)

print(f"✓ Procesados {len(geo_data)} registros")

# Calcular agregaciones
print("\n📊 Calculando agregaciones...")

# Agregaciones básicas
total_casos = len(geo_data)
confirmados = sum(1 for r in geo_data if r['confirmacion'] == 'si')
tasa_confirmacion = round((confirmados / total_casos) * 100, 1)

en_cumplimiento = sum(1 for r in geo_data if r['estado_sla'] == 'EN CUMPLIMIENTO')
tasa_cumplimiento_sla = round((en_cumplimiento / total_casos) * 100, 1)

con_reprogramaciones = sum(1 for r in geo_data if r['num_reprogramaciones'] > 0)
tasa_reprogramacion = round((con_reprogramaciones / total_casos) * 100, 1)

# Agregaciones por categoría
def aggregate_by_field(data, field):
    counts = {}
    for record in data:
        value = record.get(field, 'N/A')
        counts[value] = counts.get(value, 0) + 1
    return counts

aliados = aggregate_by_field(geo_data, 'aliado')
canales = aggregate_by_field(geo_data, 'canal')
canal_secundario = aggregate_by_field(geo_data, 'canal2')
ciudades = aggregate_by_field(geo_data, 'ciudad')
tipo_red = aggregate_by_field(geo_data, 'tipo_red')
asesores = aggregate_by_field(geo_data, 'asesor')
tecnicos = aggregate_by_field(geo_data, 'tecnico')
nodos = aggregate_by_field(geo_data, 'nodo')
zonas = aggregate_by_field(geo_data, 'zona')
regionales = aggregate_by_field(geo_data, 'regional')

# Resultados de confirmación
confir_resultados = aggregate_by_field(geo_data, 'confir_resultado')

# Estados SLA
estados_sla = aggregate_by_field(geo_data, 'estado_sla')

# Subtipo de orden
subtipos_orden = aggregate_by_field(geo_data, 'subtipo_orden')

# Crear estructura final
fraud_data = {
    "geo_data": geo_data,
    
    # Métricas principales
    "total_casos": total_casos,
    "total_registros": total_casos,
    
    # Nuevas métricas de confirmación
    "confirmados": confirmados,
    "tasa_confirmacion": tasa_confirmacion,
    "no_confirmados": total_casos - confirmados,
    
    # Métricas de SLA
    "en_cumplimiento_sla": en_cumplimiento,
    "tasa_cumplimiento_sla": tasa_cumplimiento_sla,
    "en_incumplimiento_sla": sum(1 for r in geo_data if r['estado_sla'] == 'EN INCUMPLIMIENTO'),
    
    # Métricas de reprogramación
    "con_reprogramaciones": con_reprogramaciones,
    "tasa_reprogramacion": tasa_reprogramacion,
    "sin_reprogramaciones": total_casos - con_reprogramaciones,
    
    # Agregaciones existentes
    "aliados": aliados,
    "companias": aliados,  # Alias
    "canal_principal": canales,
    "canal_secundario": canal_secundario,
    "ciudades": ciudades,
    "tipo_red": tipo_red,
    "asesores": asesores,
    "tecnicos": tecnicos,
    "nodos": nodos,
    "zonas": zonas,
    "regionales": regionales,
    
    # Nuevas agregaciones
    "confir_resultados": confir_resultados,
    "estados_sla": estados_sla,
    "subtipos_orden": subtipos_orden,
}

# Guardar en JSON
output_file = 'fraud_data_completo.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(fraud_data, f, indent=2, ensure_ascii=False)

print(f"✓ Datos guardados en: {output_file}")

# Mostrar resumen
print("\n" + "=" * 80)
print("RESUMEN DE DATOS EXTRAÍDOS")
print("=" * 80)
print(f"\n📊 MÉTRICAS PRINCIPALES:")
print(f"   Total casos: {total_casos}")
print(f"   Confirmados: {confirmados} ({tasa_confirmacion}%)")
print(f"   No confirmados: {total_casos - confirmados} ({100 - tasa_confirmacion}%)")
print(f"   En cumplimiento SLA: {en_cumplimiento} ({tasa_cumplimiento_sla}%)")
print(f"   Con reprogramaciones: {con_reprogramaciones} ({tasa_reprogramacion}%)")

print(f"\n🏢 ALIADOS:")
for aliado, count in sorted(aliados.items(), key=lambda x: x[1], reverse=True):
    print(f"   {aliado}: {count} ({round(count/total_casos*100, 1)}%)")

print(f"\n📡 CANALES PRINCIPALES:")
for canal, count in sorted(canales.items(), key=lambda x: x[1], reverse=True):
    print(f"   {canal}: {count} ({round(count/total_casos*100, 1)}%)")

print(f"\n✅ RESULTADOS DE CONFIRMACIÓN:")
for resultado, count in sorted(confir_resultados.items(), key=lambda x: x[1], reverse=True):
    if resultado:  # Excluir vacíos
        print(f"   {resultado}: {count} ({round(count/total_casos*100, 1)}%)")

print(f"\n⏱️ ESTADOS SLA:")
for estado, count in sorted(estados_sla.items(), key=lambda x: x[1], reverse=True):
    print(f"   {estado}: {count} ({round(count/total_casos*100, 1)}%)")

print(f"\n🏙️ TOP 10 CIUDADES:")
for ciudad, count in sorted(ciudades.items(), key=lambda x: x[1], reverse=True)[:10]:
    print(f"   {ciudad}: {count} ({round(count/total_casos*100, 1)}%)")

print(f"\n📍 REGISTROS CON COORDENADAS:")
registros_con_coords = sum(1 for r in geo_data if r['latitud'] is not None and r['longitud'] is not None)
print(f"   {registros_con_coords}/{total_casos} ({round(registros_con_coords/total_casos*100, 1)}%)")

print("\n" + "=" * 80)
print("EXTRACCIÓN COMPLETADA")
print("=" * 80)
