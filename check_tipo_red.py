import pandas as pd

df = pd.read_excel('fuentes_dashboard/Razones Fraude.xlsx')
print('Valores únicos en Tipo de Red:')
print(df['Tipo de Red'].value_counts())
print(f'\nTotal únicos: {df["Tipo de Red"].nunique()}')
print(f'Valores nulos: {df["Tipo de Red"].isnull().sum()}')
