aimport pandas as pd
import numpy as np
from datetime import datetime

print("=" * 80)
print("ANÁLISIS DETALLADO DE ARCHIVOS DE FRAUDE")
print("=" * 80)

# 1. Explorar archivo RR con todas las hojas
print("\n📁 Explorando 'Fraudes Cancelados en RR Marzo.xlsx'...")
try:
    # Leer todas las hojas
    xl_file = pd.ExcelFile('fuentes_dashboard/Fraudes Cancelados en RR Marzo.xlsx')
    print(f"   Hojas disponibles: {xl_file.sheet_names}")
    
    for sheet_name in xl_file.sheet_names:
        print(f"\n   === Hoja: {sheet_name} ===")
        df = pd.read_excel(xl_file, sheet_name=sheet_name)
        print(f"   Dimensiones: {df.shape} (filas x columnas)")
        print(f"   Columnas: {list(df.columns)}")
        print(f"\n   Primeras 10 filas:")
        print(df.head(10).to_string())
        
except Exception as e:
    print(f"   ✗ Error: {e}")

# 2. Análisis profundo del archivo de Razones
print("\n\n📁 Análisis profundo 'Razones Fraude.xlsx'...")
try:
    df_razones = pd.read_excel('fuentes_dashboard/Razones Fraude.xlsx')
    
    print(f"\n   Total registros: {len(df_razones)}")
    print(f"   Total columnas: {len(df_razones.columns)}")
    
    # Campos clave para análisis
    print("\n   🔑 CAMPOS CLAVE IDENTIFICADOS:")
    
    key_fields = {
        'Identificación': ['Orden de trabajo', 'External ID', 'Técnico', 'ID Aliado'],
        'Geográficos': ['Ciudad', 'Departamento', 'Nodo', 'Zona', 'Regional'],
        'Temporales': ['Fecha', 'Inicio', 'Fin', 'Fecha de agendamiento'],
        'Operacionales': ['Compañia', 'Tipo de Red', 'CANAL', 'CANAL2', 'Asesor comercial'],
        'Métricas': ['Duración', 'Tiempo de viaje', 'SLA Cumplimiento', 'Estado SLA'],
        'Gestión': ['Razón', 'DESPAC_CAUSA', 'DESPAC_GESTION', 'CONFIRMACION', 'CONFIR_RESULTADO'  ],
        'Reprogramaciones': ['Numero de Reprogramaciones', 'Num Reprogramaciones']
    }
    
    for category, fields in key_fields.items():
        print(f"\n      {category}:")
        for field in fields:
            if field in df_razones.columns:
                unique_count = df_razones[field].nunique()
                null_count = df_razones[field].isna().sum()
                print(f"         • {field}: {unique_count} valores únicos, {null_count} nulos")
    
    # Análisis específico de campos importantes
    print("\n   📊 ANÁLISIS DE VALORES:")
    
    # Técnicos
    print(f"\n      Técnicos ({df_razones['Técnico'].nunique()} únicos):")
    print(df_razones['Técnico'].value_counts().head(10).to_dict())
    
    # Compañías (Aliados)
    print(f"\n      Compañías/Aliados ({df_razones['Compañia'].nunique()} únicos):")
    print(df_razones['Compañia'].value_counts().to_dict())
    
    # Ciudades
    print(f"\n      Ciudades ({df_razones['Ciudad'].nunique()} únicos):")
    print(df_razones['Ciudad'].value_counts().to_dict())
    
    # Canales
    print(f"\n      CANAL Principal ({df_razones['CANAL'].nunique()} únicos):")
    print(df_razones['CANAL'].value_counts().to_dict())
    
    print(f"\n      CANAL Secundario ({df_razones['CANAL2'].nunique()} únicos):")
    print(df_razones['CANAL2'].value_counts().to_dict())
    
    # Razón de fraude
    print(f"\n      Razón ({df_razones['Razón'].nunique()} únicos):")
    print(df_razones['Razón'].value_counts().to_dict())
    
    # Causa de despacho
    print(f"\n      DESPAC_CAUSA ({df_razones['DESPAC_CAUSA'].nunique()} únicos):")
    print(df_razones['DESPAC_CAUSA'].value_counts().to_dict())
    
    # Gestión de despacho
    print(f"\n      DESPAC_GESTION ({df_razones['DESPAC_GESTION'].nunique()} únicos):")
    print(df_razones['DESPAC_GESTION'].value_counts().to_dict())
    
    # Confirmación
    print(f"\n      CONFIRMACION ({df_razones['CONFIRMACION'].nunique()} únicos):")
    print(df_razones['CONFIRMACION'].value_counts().to_dict())
    
    print(f"\n      CONFIR_RESULTADO ({df_razones['CONFIR_RESULTADO'].nunique()} únicos):")
    print(df_razones['CONFIR_RESULTADO'].value_counts().to_dict())
    
    # Reprogramaciones
    print(f"\n      Numero de Reprogramaciones ({df_razones['Numero de Reprogramaciones'].nunique()} únicos):")
    print(df_razones['Numero de Reprogramaciones'].value_counts().to_dict())
    
    # Estado SLA
    print(f"\n      Estado SLA ({df_razones['Estado SLA'].nunique()} únicos):")
    print(df_razones['Estado SLA'].value_counts().to_dict())
    
    # Tipo de Red
    print(f"\n      Tipo de Red ({df_razones['Tipo de Red'].nunique()} únicos):")
    print(df_razones['Tipo de Red'].value_counts().to_dict())
    
    # Tipo de Actividad
    print(f"\n      Tipo de Actividad ({df_razones['Tipo de Actividad'].nunique()} únicos):")
    print(df_razones['Tipo de Actividad'].value_counts().to_dict())
    
    # Subtipo de OT
    print(f"\n      Subtipo de la Orden de Trabajo ({df_razones['Subtipo de la Orden de Trabajo'].nunique()} únicos):")
    print(df_razones['Subtipo de la Orden de Trabajo'].value_counts().to_dict())
    
    # Análisis temporal
    print("\n   📅 ANÁLISIS TEMPORAL:")
    df_razones['Fecha'] = pd.to_datetime(df_razones['Fecha'])
    print(f"      Rango de fechas: {df_razones['Fecha'].min()} a {df_razones['Fecha'].max()}")
    print(f"      Casos por día:")
    casos_por_dia = df_razones['Fecha'].value_counts().sort_index()
    for fecha, count in casos_por_dia.items():
        print(f"         {fecha.strftime('%Y-%m-%d')}: {count} casos")
    
    # Asesores comerciales
    print(f"\n      Asesores Comerciales ({df_razones['Asesor comercial'].nunique()} únicos):")
    print(df_razones['Asesor comercial'].value_counts().head(10).to_dict())
    
    # Análisis de coordenadas
    coordenadas_validas = df_razones[['Coordenada X', 'Coordenada Y']].dropna()
    print(f"\n      Registros con coordenadas: {len(coordenadas_validas)}/{len(df_razones)}")
    
    print("\n\n" + "=" * 80)
    print("ANÁLISIS COMPLETADO")
    print("=" * 80)
    
except Exception as e:
    print(f"   ✗ Error: {e}")
    import traceback
    traceback.print_exc()
