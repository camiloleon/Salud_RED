import pandas as pd

df = pd.read_excel('fuentes_dashboard/Razones Fraude.xlsx')

# Buscar columna Nodo
nodo_col = [c for c in df.columns if 'nodo' in c.lower()]

if nodo_col:
    print(f'Columna Nodo encontrada: {nodo_col[0]}')
    print(f'Valores unicos: {df[nodo_col[0]].nunique()}')
    print(f'\nTop 10 nodos:')
    print(df[nodo_col[0]].value_counts().head(10))
    
    # Contar ocurrencias de cada nodo con coordenadas validas
    df_valid = df.dropna(subset=['Coordenada X', 'Coordenada Y'])
    print(f'\nNodos con coordenadas validas: {df_valid[nodo_col[0]].nunique()}')
    
    # Crear distribucion de nodos
    nodo_counts = df_valid[nodo_col[0]].value_counts()
    print(f'\nDistribucion de fraudes por nodo (primeros 15):')
    for nodo, count in nodo_counts.head(15).items():
        print(f'  {str(nodo)[:30]:30s}: {count:3d} casos')
else:
    print('No se encontro columna Nodo')
    print('Columnas disponibles:', list(df.columns[:20]))
