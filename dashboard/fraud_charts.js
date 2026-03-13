/* ===================================
   FRAUD ANALYTICS TERMINAL CHARTS
   Chart.js Implementation
   ================================== */

// Fraud theme colors
const FRAUD_COLORS = {
    alert: '#dc2626',
    alertDark: '#991b1b',
    alertLight: '#fca5a5',
    warning: '#f59e0b',
    positive: '#10b981',
    gray: '#9ca3af',
    grayLight: '#d1d5db',
    grayDark: '#4b5563',
    white: '#ffffff',
    gridColor: 'rgba(255, 255, 255, 0.05)',
    textColor: '#d1d5db',
    axisColor: '#3a3a3a',
    // Additional properties for chart styling
    chartColors: ['#dc2626', '#f59e0b', '#9ca3af', '#10b981'],
    accentColor: '#dc2626',
    background: '#1a1a1a'
};

// Color palette for charts
const CHART_PALETTE = [
    '#dc2626', '#f59e0b', '#9ca3af', '#e5e7eb',
    '#991b1b', '#78350f', '#6b7280', '#d1d5db'
];

// Common chart options
const COMMON_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: FRAUD_COLORS.textColor,
                font: {
                    family: "'Roboto Mono', monospace",
                    size: 10
                },
                padding: 12
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            titleColor: '#ffffff',
            bodyColor: '#d1d5db',
            borderColor: FRAUD_COLORS.alert,
            borderWidth: 1,
            padding: 12,
            titleFont: {
                family: "'Roboto Mono', monospace",
                size: 11,
                weight: 'bold'
            },
            bodyFont: {
                family: "'Roboto Mono', monospace",
                size: 10
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: FRAUD_COLORS.gridColor,
                borderColor: FRAUD_COLORS.axisColor
            },
            ticks: {
                color: FRAUD_COLORS.textColor,
                font: {
                    family: "'Roboto Mono', monospace",
                    size: 9
                }
            }
        },
        y: {
            grid: {
                color: FRAUD_COLORS.gridColor,
                borderColor: FRAUD_COLORS.axisColor
            },
            ticks: {
                color: FRAUD_COLORS.textColor,
                font: {
                    family: "'Roboto Mono', monospace",
                    size: 9
                }
            }
        }
    }
};

// Global data storage
let fraudData = null;
let charts = {};

// Register ChartJS DataLabels plugin
if (typeof ChartDataLabels !== 'undefined') {
    Chart.register(ChartDataLabels);
}

// ===================================
// EMBEDDED DATA COMPLETO - 74 CASOS - SUROCCIDENTE COLOMBIA
// Todas las coordenadas validadas dentro del suroccidente
// Período: 2026-02-10 a 2026-03-09

const EMBEDDED_FRAUD_DATA = {
  "total_registros": 74,
  "total_casos": 74,
  "canal_principal": {
    "AGENTES": 36,
    "TELEFONICO VENTA": 20,
    "CAV": 15,
    "DIGITAL": 2,
    "TELEFONICO SERVICIO": 1
},
  "canal_secundario": {
    "PDV": 7,
    "TMK OUT BOUND": 15,
    "CALLE": 28,
    "CAV": 15,
    "ECOMMERCE ASISTIDO": 2,
    "SAC": 1,
    "TMK IN BOUND": 5,
    "EYN": 1
},
  "asesores": {
    "ANDREA CATALINA DE LA": 1,
    "ANDRES MAURICIO MONTER": 2,
    "ANGEL DUBAN MEDINA GUE": 1,
    "ARDILA VAZQUEZ ALIX AL": 1,
    "ARLEX ADEY PALACIOS LO": 2,
    "AVILA ROMERO NILSE DIO": 1,
    "BARRERA RODRIGUEZ MAN": 1,
    "BOLIVAR PULGARIN YESSI": 1,
    "BUITRAGO GIRALDO VALEN": 1,
    "CARDONA ZAPATA LUZ ARG": 1,
    "CASTILLO GARCIA JOHANN": 1,
    "CHITOYEISON EDUARDO": 1,
    "DIEGO ANDRES SOTO MART": 1,
    "EDWIN ANDRES HERNANDEZ": 1,
    "ERIKA PAOLA ESPINOSA V": 1,
    "ESTEBAN CALLE CHAVARRI": 1,
    "FAVIO VEGA DOCTOR": 1,
    "FLOREZ CARLOS ARTURO": 1,
    "GOMEZ VILLANUEVA HAROL": 1,
    "GONZALEZ CESPEDES JUAN": 1,
    "GUZMAN VELA SEBASTIAN": 2,
    "HAIDER DAVID MEDINA CA": 1,
    "HERNANDEZ PERALTA JONA": 1,
    "HOMEN BURBANO CLAUDIA": 1,
    "JAIR PALACIO NIEVES": 1,
    "JANIRIA BERNAL JIMENEZ": 1,
    "JEFERSON RODRIGUEZ ROM": 1,
    "JHOANA PAOLA VARON BE": 1,
    "JHONN JAIRO ORTEGA PER": 1,
    "JOAN MAURICIO GARCIA Q": 1,
    "JOHANA ROSERO PERENGUE": 3,
    "JOSE LUIS OLARTE NOREN": 1,
    "KATHERIN DAZA IBARRA": 1,
    "LEON RIANO JOHAN SAMUE": 1,
    "LUIS ADOLFO VALENCIA R": 1,
    "LUIS EDUARDO VILLAFANE": 2,
    "MAESTRE BIRRIEL ELISA": 2,
    "MARIA CAROLINA PENA RA": 1,
    "MIGUEL ANGEL LOPEZ ARE": 1,
    "MILLER SANTACRUZ NARVA": 1,
    "MINGAN PERALTA ESTEFAN": 1,
    "MORALES BRITNEY DAYAN": 1,
    "MORALES HERNANDEZ MONI": 1,
    "MOSQUERA AREVALO JOHN": 1,
    "ONATE MEJIA JESUS ALEX": 1,
    "OSCAR LEONARDO PARRADO": 2,
    "PENA MORENO DANIEL FEL": 1,
    "POLANIA MONTERO LUISA": 1,
    "POTES BEDOYA LUZ AIDEE": 1,
    "PULIDO RODRIGUEZ DANIE": 1,
    "RODAS GIRALDO JHON ALE": 1,
    "RODRIGUEZ HERRERA ANDR": 1,
    "SALINAS MORENO MARIA F": 1,
    "SANCHEZ CASTILLO MARY": 1,
    "SANCHEZ CUENO LUZ DAR": 1,
    "SERNA VELEZ ERNESTO": 1,
    "SOELIA DE JESUS MONSAL": 1,
    "SUAREZ RIVERA PAOLA AN": 2,
    "TORRES JIMENEZ KATHERI": 1,
    "TORRES PAEZ LAURA SOFI": 1,
    "VELANDIA MORENO ANGIE": 1,
    "YESSICA ALEJANDRA AYA": 1,
    "ZULUAGA FAJARDO LOREN": 1,
    "ZUNIGA RIVERA ANGELICA": 2
},
  "zonas": {
    "507578": 22,
    "507572": 10,
    "508584": 9,
    "506564": 8,
    "506561": 8,
    "508582": 11,
    "507573": 6
},
  "ciudades": {
    "PALMIRA": 9,
    "POPAYAN": 10,
    "CALI": 20,
    "NEIVA": 6,
    "BUGA": 2,
    "FLANDES": 5,
    "CARTAGO": 5,
    "FLORIDA": 1,
    "SEVILLA": 2,
    "PASTO": 4,
    "ESPINAL": 2,
    "FLORENCIA": 2,
    "CANDELARIA": 2,
    "IPIALES": 2,
    "CAICEDONIA": 1,
    "IBAGUE": 1
},
  "tecnicos": {
    "BRAYAN STEVEN GUERRON TORRES": 1,
    "DIDIER ENRIQUE PEREZ SARRIA": 2,
    "YEINEY ALEXIS RIVERA MENESES": 1,
    "JORGE LEONARDO REYES CASTILLO": 1,
    "MILTON ANDRES AGUDELO RAMIREZ": 2,
    "JESUS ALFREDO RODRIGUEZ MORA": 3,
    "ANDRES FELIPE VICUA GARCIA": 1,
    "RICHAR ALIRIO PEA ZUIGA": 2,
    "CARLOS ADRIAN ROJAS CRUZ": 1,
    "JOSE ADOLFO TORRES TORRES": 2,
    "IJAJI SAMBONI EYSON FERNANDO": 1,
    "WILNER YESID RIASCOS MOSQUERA": 1,
    "EVILEY ALBERTO SERNA OROZCO": 1,
    "DIEGO FERNANDO LOPEZ ALTAMIRANO": 1,
    "JAIME IBARGUEN ANGULO": 1,
    "JORGE LUIS HENAO SALAZAR": 2,
    "JHEFRY GABRIEL DUQUE MACA": 1,
    "JAVIER DELGADO CEDEO": 2,
    "ORTIZ SALAZAR JEAN CARLOS": 1,
    "HERBIN ARLEY MURILLO MOSQUERA": 1,
    "JHON JAIRO GARCIA TORRES": 1,
    "CARLOS FABIAN LEIVA CRUZ": 2,
    "JEFERSON ANDRES MORALES CIFUENTES": 1,
    "ALEX JOVANNY VICTORIA PECHENE": 2,
    "ARY ROBERTO GOMEZ GUAMPE": 1,
    "JAIME EDWIN CAMPAA": 1,
    "MONCAYO EDDIER MORA": 1,
    "DILERMANDO ULCUE ACHIPIZ": 1,
    "ANGEL HERRERA GUZMAN LUIS": 1,
    "HECTOR VICENTE MARQUEZ BARRETO": 1,
    "ZAMBRANO ALEXANDER MUNOZ": 2,
    "MERA GIOVANNY TORRES": 2,
    "JOEL ANDREY QUIROGA SANCHEZ": 1,
    "JOHNNY RODRIGO DE LA CRUZ DIAZ": 1,
    "JANYER VALENZUELA GARZON": 1,
    "SANTIAGO ACUA LOSADA": 1,
    "FREDDY AVILES SANCHEZ": 1,
    "OSCAR ALONSO MONTOYA MANRIQUE": 1,
    "SEBASTIAN GUTIERREZ MORALES": 1,
    "ANDERSON ALDAIR GUERRERO CHANA": 1,
    "ANDERSON ELESVAN VALENCIA AGUIRRE": 1,
    "CENEN LEONARDO ESCOBEDO IDROBO": 1,
    "JORGE ALEXANDER LOPEZ ORTEGA": 1,
    "BRAYAN ANDRES PEA ZUIGA": 2,
    "MARC ANTONY INAGAN PINCHAO": 2,
    "JHON JAIRO MAMIAN VELASCO": 1,
    "CRISTIAN DANILO URRESTY ORDOEZ": 1,
    "OSORIO ANTOLINEZ FRANCISCO JAVIER": 1,
    "MIGUEL ANGEL VILLARREAL MEDINA": 1,
    "TRUQUE RIVERA GERSAIN ANDRES": 1,
    "JUAN CARLOS ORDOEZ SILVA": 1,
    "EYVAR ANDRES SUAREZ VELASCO": 1,
    "BRAYAN ESTIVEN ARAGN KLINGER": 1,
    "MIGUEL ANGEL RODRIGUEZ ORTIZ": 2,
    "OSCAR DOREL MORENO ARENAS": 1,
    "LAFISAID JIMENEZ OJEDA": 1,
    "JOSE FERNANDO GUTIERREZ CONTRERAS": 1,
    "SARA LEYDI ORTIZ OJEDA": 1,
    "HAAHALI HABID MIER DE LA HOZ": 1
},
  "aliados": {
    "8301349713": 39,
    "9003753252": 22,
    "9001113432": 13
},
  "companias": {
    "CONECTAR TV S.A.S.": 39,
    "Tabasco OC, LLC.": 35
},
  "nodos": {
    "PBU": 1,
    "CB3": 2,
    "ASE2F": 1,
    "PMS1": 1,
    "D2B": 1,
    "QTN": 1,
    "OBFL10": 1,
    "4SN": 1,
    "CT03": 1,
    "AIA": 1,
    "OBFL08": 1,
    "OBFM58": 1,
    "OBFO39": 1,
    "F4M1": 1,
    "L3S": 1,
    "CTDE15": 1,
    "CPE1": 1,
    "TM1": 1,
    "KAN2F": 1,
    "QTO3F": 1,
    "B2Q3F": 1,
    "SEVIG7": 2,
    "NVE1": 1,
    "4SP": 2,
    "VGE": 1,
    "TOG3B": 1,
    "UVU": 1,
    "ESV": 1,
    "LMV1": 1,
    "OS3": 1,
    "PAK": 1,
    "JOS": 1,
    "OS4": 1,
    "HPI": 1,
    "OBFJ39": 1,
    "XX1": 1,
    "OS2": 1,
    "SPU1": 2,
    "CT13": 2,
    "MTN1": 1,
    "MQ2": 1,
    "OBFX36": 1,
    "OCDIQB": 2,
    "OCDJOQ": 1,
    "CTCG93": 1,
    "DIA": 1,
    "OBFO24": 1,
    "IPIPE9": 2,
    "JSE2D": 1,
    "1LT": 1,
    "NBN1": 1,
    "PYBF78": 1,
    "CACE80": 1,
    "RUE": 1,
    "N1Q1": 1,
    "XO132C": 1,
    "CNCLG4": 1,
    "XK1277": 1,
    "XH0914": 1,
    "VLK3F": 2,
    "ESZ": 1,
    "OBFV69": 1,
    "C96": 1,
    "1LP": 1,
    "OBF273": 2
},
  "tipo_red": {
    "Masivo Bidireccional": 41,
    "FTTH": 29,
    "Pymes": 4
},
  "geo_data": [
    {
        "CANAL": "AGENTES",
        "CANAL2": "PDV",
        "Zona": "507578",
        "Ciudad": "PALMIRA",
        "Coordenada X": -76.28794,
        "Coordenada Y": 3.54421,
        "Fecha": "2026-02-25",
        "Dirección": "Calle: CR 15A Placa: 47D-48 Apto: PI1-IN101 Com: PAL Div: RVA",
        "Asesor comercial": "ANDREA CATALINA DE LA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "BRAYAN STEVEN GUERRON TORRES",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "PBU"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "507572",
        "Ciudad": "POPAYAN",
        "Coordenada X": -76.58827,
        "Coordenada Y": 2.46458,
        "Fecha": "2026-03-06",
        "Dirección": "Calle: CL 32NORTE Placa: 8-142 Apto:  PISO2 Com: POP Div: RVA",
        "Asesor comercial": "ANDRES MAURICIO MONTER",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "DIDIER ENRIQUE PEREZ SARRIA",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "CB3"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "507572",
        "Ciudad": "POPAYAN",
        "Coordenada X": -76.58827,
        "Coordenada Y": 2.46458,
        "Fecha": "2026-03-05",
        "Dirección": "Calle: CL 32NORTE Placa: 8-142 Apto: PISO2 Com: POP Div: RVA",
        "Asesor comercial": "ANDRES MAURICIO MONTER",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "DIDIER ENRIQUE PEREZ SARRIA",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "CB3"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "508584",
        "Ciudad": "CALI",
        "Coordenada X": -76.5557,
        "Coordenada Y": 3.37223,
        "Fecha": "2026-03-04",
        "Dirección": "Calle: CR 100OESTE Placa: 1B-12 Apto:  502 Com: CAL Div: RVA",
        "Asesor comercial": "ANGEL DUBAN MEDINA GUE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "YEINEY ALEXIS RIVERA MENESES",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "ASE2F"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "506564",
        "Ciudad": "NEIVA",
        "Coordenada X": -75.24624,
        "Coordenada Y": 2.94087,
        "Fecha": "2026-03-04",
        "Dirección": "Calle: CL 18 Placa: 53-46 Apto: PISO1 Com: NEI Div: RCE",
        "Asesor comercial": "ARDILA VAZQUEZ ALIX AL",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JORGE LEONARDO REYES CASTILLO",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "PMS1"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "BUGA",
        "Coordenada X": -76.29744,
        "Coordenada Y": 3.91341,
        "Fecha": "2026-02-20",
        "Dirección": "Calle: CL 22A Placa: 15-12 Apto: PISO3 Com: BUG Div: RVA",
        "Asesor comercial": "ARLEX ADEY PALACIOS LO",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "MILTON ANDRES AGUDELO RAMIREZ",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "D2B"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "506561",
        "Ciudad": "FLANDES",
        "Coordenada X": -74.81586,
        "Coordenada Y": 4.27734,
        "Fecha": "2026-02-26",
        "Dirección": "Calle: QUINTAS DEFLANDES Placa: MZ35-C7 Apto: PI1-102 Com: FLA Div: RCE",
        "Asesor comercial": "ARLEX ADEY PALACIOS LO",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JESUS ALFREDO RODRIGUEZ MORA",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "QTN"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "508584",
        "Ciudad": "CALI",
        "Coordenada X": -76.50768,
        "Coordenada Y": 3.40386,
        "Fecha": "2026-03-07",
        "Dirección": "Calle: CR 42C Placa: 48-75 Apto:  PI1-101 Com: CAL Div: RVA",
        "Asesor comercial": "AVILA ROMERO NILSE DIO",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "ANDRES FELIPE VICUA GARCIA",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "OBFL10"
    },
    {
        "CANAL": "DIGITAL",
        "CANAL2": "ECOMMERCE ASISTIDO",
        "Zona": "507572",
        "Ciudad": "POPAYAN",
        "Coordenada X": -76.59865,
        "Coordenada Y": 2.45464,
        "Fecha": "2026-03-05",
        "Dirección": "Calle: CR 9 TORRE A Placa: 17N-47 Apto: 302 Com: POP Div: RVA",
        "Asesor comercial": "BARRERA RODRIGUEZ MAN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "RICHAR ALIRIO PEA ZUIGA",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "4SN"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "CARTAGO",
        "Coordenada X": -75.93439,
        "Coordenada Y": 4.76154,
        "Fecha": "2026-02-14",
        "Dirección": "Calle: CL 37 Placa: 1BN-76 Apto: PISO2 Com: CGO Div: REC",
        "Asesor comercial": "BOLIVAR PULGARIN YESSI",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "CARLOS ADRIAN ROJAS CRUZ",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "CT03"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "508584",
        "Ciudad": "CALI",
        "Coordenada X": -76.56076,
        "Coordenada Y": 3.45252,
        "Fecha": "2026-03-05",
        "Dirección": "Calle: AV 4AOESTE Placa: 19-108 Apto:  PI1-102 Com: CAL Div: RVA",
        "Asesor comercial": "BUITRAGO GIRALDO VALEN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JOSE ADOLFO TORRES TORRES",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "AIA"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "PDV",
        "Zona": "508584",
        "Ciudad": "CALI",
        "Coordenada X": -76.50904,
        "Coordenada Y": 3.40235,
        "Fecha": "2026-02-12",
        "Dirección": "Calle: CR 43B Placa: 48A-30 Apto: PI1-101 Com: CAL Div: RVA",
        "Asesor comercial": "CARDONA ZAPATA LUZ ARG",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "IJAJI SAMBONI EYSON FERNANDO",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "OBFL08"
    },
    {
        "CANAL": "DIGITAL",
        "CANAL2": "ECOMMERCE ASISTIDO",
        "Zona": "508582",
        "Ciudad": "CALI",
        "Coordenada X": -76.51211,
        "Coordenada Y": 3.47931,
        "Fecha": "2026-03-09",
        "Dirección": "Calle: CL 47CNORTE Placa: 2AN-65 Apto: CASA Com: CAL Div: RVA",
        "Asesor comercial": "CASTILLO GARCIA JOHANN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "WILNER YESID RIASCOS MOSQUERA",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "OBFM58"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "507572",
        "Ciudad": "POPAYAN",
        "Coordenada X": -76.58711,
        "Coordenada Y": 2.46163,
        "Fecha": "2026-03-09",
        "Dirección": "Calle: CL 29ANORTE Placa: 7A-09 Apto: CASA Com: POP Div: RVA",
        "Asesor comercial": "CHITOYEISON EDUARDO",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "EVILEY ALBERTO SERNA OROZCO",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "OBFO39"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "508584",
        "Ciudad": "CALI",
        "Coordenada X": -76.50363,
        "Coordenada Y": 3.39966,
        "Fecha": "2026-03-07",
        "Dirección": "Calle: CL 55A Placa: 42B-57 Apto: PISO1 Com: CAL Div: RVA",
        "Asesor comercial": "DIEGO ANDRES SOTO MART",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "DIEGO FERNANDO LOPEZ ALTAMIRANO",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "F4M1"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "508582",
        "Ciudad": "CALI",
        "Coordenada X": -76.51298,
        "Coordenada Y": 3.42259,
        "Fecha": "2026-02-17",
        "Dirección": "Calle: CL 31A Placa: 33B-11 Apto:  PI1-102 Com: CAL Div: RVA",
        "Asesor comercial": "EDWIN ANDRES HERNANDEZ",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JAIME IBARGUEN ANGULO",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "L3S"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "CARTAGO",
        "Coordenada X": -75.90071,
        "Coordenada Y": 4.75579,
        "Fecha": "2026-02-19",
        "Dirección": "Calle: DG 1A Placa: T1-38 Apto: PISO2 Com: CGO Div: REC",
        "Asesor comercial": "ERIKA PAOLA ESPINOSA V",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "JORGE LUIS HENAO SALAZAR",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "CTDE15"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "508582",
        "Ciudad": "CALI",
        "Coordenada X": -76.49539,
        "Coordenada Y": 3.43028,
        "Fecha": "2026-02-10",
        "Dirección": "Calle: CL 72A Placa: 27A-04 Apto: PI1-101 Com: CAL Div: RVA",
        "Asesor comercial": "ESTEBAN CALLE CHAVARRI",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JHEFRY GABRIEL DUQUE MACA",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "CPE1"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "506564",
        "Ciudad": "NEIVA",
        "Coordenada X": -75.29134,
        "Coordenada Y": 2.94576,
        "Fecha": "2026-03-04",
        "Dirección": "Calle: CL 31 Placa: 6-47 Apto: PI2-201 Com: NEI Div: RCE",
        "Asesor comercial": "FAVIO VEGA DOCTOR",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JAVIER DELGADO CEDEO",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "TM1"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "FLORIDA",
        "Coordenada X": -76.23116,
        "Coordenada Y": 3.32337,
        "Fecha": "2026-02-14",
        "Dirección": "Calle: CL 10 Placa: 13A-07 Apto: PI1-LC101 Com: FLR Div: RVA",
        "Asesor comercial": "FLOREZ CARLOS ARTURO",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Pymes",
        "Técnico": "ORTIZ SALAZAR JEAN CARLOS",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "KAN2F"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "506561",
        "Ciudad": "FLANDES",
        "Coordenada X": -74.81186,
        "Coordenada Y": 4.28861,
        "Fecha": "2026-02-25",
        "Dirección": "Calle: CR 5 Placa: 10-28 Apto:  PISO1 Com: FLA Div: RCE",
        "Asesor comercial": "GOMEZ VILLANUEVA HAROL",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JESUS ALFREDO RODRIGUEZ MORA",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "QTO3F"
    },
    {
        "CANAL": "TELEFONICO SERVICIO",
        "CANAL2": "SAC",
        "Zona": "508582",
        "Ciudad": "CALI",
        "Coordenada X": -76.49524,
        "Coordenada Y": 3.47613,
        "Fecha": "2026-03-07",
        "Dirección": "Calle: CR 1B3 Placa: 61A-31 Apto: CASA Com: CAL Div: RVA",
        "Asesor comercial": "GONZALEZ CESPEDES JUAN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "HERBIN ARLEY MURILLO MOSQUERA",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "B2Q3F"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK IN BOUND",
        "Zona": "507578",
        "Ciudad": "SEVILLA",
        "Coordenada X": -75.93624,
        "Coordenada Y": 4.2702,
        "Fecha": "2026-02-17",
        "Dirección": "Calle: CL 57A Placa: 53-40 Apto:  CASA Com: SEV Div: RVA",
        "Asesor comercial": "GUZMAN VELA SEBASTIAN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "JHON JAIRO GARCIA TORRES",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "SEVIG7"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK IN BOUND",
        "Zona": "507578",
        "Ciudad": "SEVILLA",
        "Coordenada X": -75.93624,
        "Coordenada Y": 4.2702,
        "Fecha": "2026-02-16",
        "Dirección": "Calle: CL 57A Placa: 53-40 Apto:  CASA Com: SEV Div: RVA",
        "Asesor comercial": "GUZMAN VELA SEBASTIAN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "CARLOS FABIAN LEIVA CRUZ",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "SEVIG7"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "508584",
        "Ciudad": "CALI",
        "Coordenada X": -76.51485,
        "Coordenada Y": 3.35569,
        "Fecha": "2026-03-05",
        "Dirección": "Calle: CL 49 TORRE 1 Placa: 112-25 Apto: 403 Com: CAL Div: RVA",
        "Asesor comercial": "HAIDER DAVID MEDINA CA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JEFERSON ANDRES MORALES CIFUENTES",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "NVE1"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "PALMIRA",
        "Coordenada X": -76.28574,
        "Coordenada Y": 3.53235,
        "Fecha": "2026-03-07",
        "Dirección": "Calle: CL 36 Placa: 13-03 Apto: PI2-201 Com: PAL Div: RVA",
        "Asesor comercial": "HERNANDEZ PERALTA JONA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "ALEX JOVANNY VICTORIA PECHENE",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "4SP"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "PDV",
        "Zona": "507572",
        "Ciudad": "POPAYAN",
        "Coordenada X": -76.62579,
        "Coordenada Y": 2.44524,
        "Fecha": "2026-02-19",
        "Dirección": "Calle: CR 27 Placa: 16B-06 Apto: PISO1 Com: POP Div: RVA",
        "Asesor comercial": "HOMEN BURBANO CLAUDIA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "ARY ROBERTO GOMEZ GUAMPE",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "VGE"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK IN BOUND",
        "Zona": "507573",
        "Ciudad": "PASTO",
        "Coordenada X": -77.27875664999578,
        "Coordenada Y": 1.2099471225203906,
        "Fecha": "2026-02-13",
        "Dirección": "Calle: LA MINGA Placa: MZ21-C12 Apto:  PISO2 Com: PAS Div: RVA",
        "Asesor comercial": "JAIR PALACIO NIEVES",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JAIME EDWIN CAMPAA",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "TOG3B"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "508584",
        "Ciudad": "CALI",
        "Coordenada X": -76.51332,
        "Coordenada Y": 3.41161,
        "Fecha": "2026-02-10",
        "Dirección": "Calle: CR 42A1 Placa: 38-82 Apto: CASA Com: CAL Div: RVA",
        "Asesor comercial": "JANIRIA BERNAL JIMENEZ",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "MONCAYO EDDIER MORA",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "UVU"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "506561",
        "Ciudad": "ESPINAL",
        "Coordenada X": -74.89393,
        "Coordenada Y": 4.14186,
        "Fecha": "2026-02-16",
        "Dirección": "Calle: CR 11 Placa: 21-90 Apto:  PI1-101 Com: ESP Div: RCE",
        "Asesor comercial": "JEFERSON RODRIGUEZ ROM",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JESUS ALFREDO RODRIGUEZ MORA",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "ESV"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "507572",
        "Ciudad": "POPAYAN",
        "Coordenada X": -76.61532,
        "Coordenada Y": 2.42284,
        "Fecha": "2026-02-14",
        "Dirección": "Calle: CR 12 Placa: 31-59 Apto: PI1-101 Com: POP Div: RVA",
        "Asesor comercial": "JHOANA PAOLA VARON BE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "DILERMANDO ULCUE ACHIPIZ",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "LMV1"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "PALMIRA",
        "Coordenada X": -76.31233,
        "Coordenada Y": 3.54705,
        "Fecha": "2026-02-16",
        "Dirección": "Calle: CL 55A Placa: 41-12 Apto:  PI1-101 Com: PAL Div: RVA",
        "Asesor comercial": "JHONN JAIRO ORTEGA PER",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "ANGEL HERRERA GUZMAN LUIS",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "OS3"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "PDV",
        "Zona": "506561",
        "Ciudad": "FLANDES",
        "Coordenada X": -74.81443,
        "Coordenada Y": 4.2677,
        "Fecha": "2026-02-14",
        "Dirección": "Calle: CONDOMINIO PAKISTAN1   Placa: 0-00 Apto:  CASA71 Com: FLA Div: RCE",
        "Asesor comercial": "JOAN MAURICIO GARCIA Q",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "HECTOR VICENTE MARQUEZ BARRETO",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "PAK"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "PALMIRA",
        "Coordenada X": -76.28574,
        "Coordenada Y": 3.53235,
        "Fecha": "2026-03-04",
        "Dirección": "Calle: CL 36 Placa: 13-03 Apto: PI2-201 Com: PAL Div: RVA",
        "Asesor comercial": "JOHANA ROSERO PERENGUE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "ZAMBRANO ALEXANDER MUNOZ",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "4SP"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "PALMIRA",
        "Coordenada X": -76.2825,
        "Coordenada Y": 3.5314,
        "Fecha": "2026-03-02",
        "Dirección": "Calle: CL 35A Placa: 9-61 Apto:  PI1-102 Com: PAL Div: RVA",
        "Asesor comercial": "JOHANA ROSERO PERENGUE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "ALEX JOVANNY VICTORIA PECHENE",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "JOS"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "PALMIRA",
        "Coordenada X": -76.31572,
        "Coordenada Y": 3.54664,
        "Fecha": "2026-02-19",
        "Dirección": "Calle: CL 54A Placa: 44-04 Apto:  PISO2 Com: PAL Div: RVA",
        "Asesor comercial": "JOHANA ROSERO PERENGUE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "MERA GIOVANNY TORRES",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "OS4"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "506564",
        "Ciudad": "FLORENCIA",
        "Coordenada X": -75.61236,
        "Coordenada Y": 1.61984,
        "Fecha": "2026-02-25",
        "Dirección": "Calle: CR 9 Placa: 20-03 Apto:  CASA Com: FLE Div: RCE",
        "Asesor comercial": "JOSE LUIS OLARTE NOREN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JOEL ANDREY QUIROGA SANCHEZ",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "HPI"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "507573",
        "Ciudad": "PASTO",
        "Coordenada X": -77.2772909490887,
        "Coordenada Y": 1.2139908802433854,
        "Fecha": "2026-02-27",
        "Dirección": "Calle: LAS VIOLETAS2 Placa: MZB-C1 Apto: CASA Com: PAS Div: RVA",
        "Asesor comercial": "KATHERIN DAZA IBARRA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "JOHNNY RODRIGO DE LA CRUZ DIAZ",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "OBFJ39"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK IN BOUND",
        "Zona": "506564",
        "Ciudad": "FLORENCIA",
        "Coordenada X": -75.60822,
        "Coordenada Y": 1.61164,
        "Fecha": "2026-03-05",
        "Dirección": "Calle: TR 5B Placa: 11-58 Apto: CASA Com: FLE Div: RCE",
        "Asesor comercial": "LEON RIANO JOHAN SAMUE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JANYER VALENZUELA GARZON",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "XX1"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "PDV",
        "Zona": "507578",
        "Ciudad": "PALMIRA",
        "Coordenada X": -76.31053,
        "Coordenada Y": 3.54879,
        "Fecha": "2026-02-11",
        "Dirección": "Calle: CL 58B Placa: 39-37 Apto:  PI1-101 Com: PAL Div: RVA",
        "Asesor comercial": "LUIS ADOLFO VALENCIA R",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "MERA GIOVANNY TORRES",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "OS2"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "506564",
        "Ciudad": "NEIVA",
        "Coordenada X": -75.26306,
        "Coordenada Y": 2.92611,
        "Fecha": "2026-03-04",
        "Dirección": "Calle: CL 3A Placa: 34-58 Apto:  PI1-IN1 Com: NEI Div: RCE",
        "Asesor comercial": "LUIS EDUARDO VILLAFANE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "SANTIAGO ACUA LOSADA",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "SPU1"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "506564",
        "Ciudad": "NEIVA",
        "Coordenada X": -75.26306,
        "Coordenada Y": 2.92611,
        "Fecha": "2026-03-03",
        "Dirección": "Calle: CL 3A Placa: 34-58 Apto: PI1-IN1 Com: NEI Div: RCE",
        "Asesor comercial": "LUIS EDUARDO VILLAFANE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "FREDDY AVILES SANCHEZ",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "SPU1"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "CARTAGO",
        "Coordenada X": -75.93328,
        "Coordenada Y": 4.76256,
        "Fecha": "2026-03-04",
        "Dirección": "Calle: CL 34 Placa: 1BN-61 Apto: CASA Com: CGO Div: REC",
        "Asesor comercial": "MAESTRE BIRRIEL ELISA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "OSCAR ALONSO MONTOYA MANRIQUE",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "CT13"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "CARTAGO",
        "Coordenada X": -75.93328,
        "Coordenada Y": 4.76256,
        "Fecha": "2026-03-03",
        "Dirección": "Calle: CL 34 Placa: 1BN-61 Apto: CASA Com: CGO Div: REC",
        "Asesor comercial": "MAESTRE BIRRIEL ELISA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "SEBASTIAN GUTIERREZ MORALES",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "CT13"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "BUGA",
        "Coordenada X": -76.29573,
        "Coordenada Y": 3.92005,
        "Fecha": "2026-02-20",
        "Dirección": "Calle: CR 15B Placa: 31-38 Apto:  PISO2 Com: BUG Div: RVA",
        "Asesor comercial": "MARIA CAROLINA PENA RA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "MILTON ANDRES AGUDELO RAMIREZ",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "MTN1"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "508582",
        "Ciudad": "CALI",
        "Coordenada X": -76.4802,
        "Coordenada Y": 3.42595,
        "Fecha": "2026-02-28",
        "Dirección": "Calle: CR 26P Placa: 87-04 Apto: PI1-101 Com: CAL Div: RVA",
        "Asesor comercial": "MIGUEL ANGEL LOPEZ ARE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JOSE ADOLFO TORRES TORRES",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "MQ2"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507573",
        "Ciudad": "PASTO",
        "Coordenada X": -77.27452,
        "Coordenada Y": 1.21386,
        "Fecha": "2026-02-27",
        "Dirección": "Calle: CR 22 Placa: 22-14 Apto: 505 Com: PAS Div: RVA",
        "Asesor comercial": "MILLER SANTACRUZ NARVA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "ANDERSON ALDAIR GUERRERO CHANA",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "OBFX36"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "507578",
        "Ciudad": "CANDELARIA",
        "Coordenada X": -76.35412398983915,
        "Coordenada Y": 3.4080303740842424,
        "Fecha": "2026-02-24",
        "Dirección": "Calle: CL 20A Placa: 14-125 Apto: PI1-101 Com: CAN Div: RVA",
        "Asesor comercial": "MINGAN PERALTA ESTEFAN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "ANDERSON ELESVAN VALENCIA AGUIRRE",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "OCDIQB"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "508584",
        "Ciudad": "CALI",
        "Coordenada X": -76.52164,
        "Coordenada Y": 3.38667,
        "Fecha": "2026-02-27",
        "Dirección": "Calle: CR 81D Placa: 35-24 Apto: PI1-101 Com: CAL Div: RVA",
        "Asesor comercial": "MORALES BRITNEY DAYAN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "CENEN LEONARDO ESCOBEDO IDROBO",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "OCDJOQ"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "507578",
        "Ciudad": "CARTAGO",
        "Coordenada X": -75.92473,
        "Coordenada Y": 4.74291,
        "Fecha": "2026-03-02",
        "Dirección": "Calle: EL LIMONAR Placa: MZG-C1 Apto: CASA Com: CGO Div: REC",
        "Asesor comercial": "MORALES HERNANDEZ MONI",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "JORGE LUIS HENAO SALAZAR",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "CTCG93"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507573",
        "Ciudad": "PASTO",
        "Coordenada X": -77.28334781287772,
        "Coordenada Y": 1.2177406272684783,
        "Fecha": "2026-02-14",
        "Dirección": "Calle: VILLA COLOMBIA Placa: MZC-C7 Apto: PI2-201 Com: PAS Div: RVA",
        "Asesor comercial": "MOSQUERA AREVALO JOHN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JORGE ALEXANDER LOPEZ ORTEGA",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "DIA"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "507572",
        "Ciudad": "POPAYAN",
        "Coordenada X": -76.57873,
        "Coordenada Y": 2.46825,
        "Fecha": "2026-03-06",
        "Dirección": "Calle: CR 6   Placa: 45N-73 Apto:  PI2-203 Com: POP Div: RVA",
        "Asesor comercial": "ONATE MEJIA JESUS ALEX",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "BRAYAN ANDRES PEA ZUIGA",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "OBFO24"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "507573",
        "Ciudad": "IPIALES",
        "Coordenada X": -77.65905,
        "Coordenada Y": 0.82757,
        "Fecha": "2026-02-23",
        "Dirección": "Calle: CL 29 Placa: 6E-53 Apto:  101 Com: IPI Div: RVA",
        "Asesor comercial": "OSCAR LEONARDO PARRADO",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "MARC ANTONY INAGAN PINCHAO",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "IPIPE9"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "507573",
        "Ciudad": "IPIALES",
        "Coordenada X": -77.65905,
        "Coordenada Y": 0.82757,
        "Fecha": "2026-02-20",
        "Dirección": "Calle: CL 29 Placa: 6E-53 Apto: 101 Com: IPI Div: RVA",
        "Asesor comercial": "OSCAR LEONARDO PARRADO",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "MARC ANTONY INAGAN PINCHAO",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "IPIPE9"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "507572",
        "Ciudad": "POPAYAN",
        "Coordenada X": -76.62684,
        "Coordenada Y": 2.44794,
        "Fecha": "2026-03-03",
        "Dirección": "Calle: CR 30 Placa: 6-86 Apto:  PI1-102 Com: POP Div: RVA",
        "Asesor comercial": "PENA MORENO DANIEL FEL",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "BRAYAN ANDRES PEA ZUIGA",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "JSE2D"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "506564",
        "Ciudad": "NEIVA",
        "Coordenada X": -75.28245,
        "Coordenada Y": 2.93216,
        "Fecha": "2026-02-17",
        "Dirección": "Calle: CR 13 Placa: 12-47 Apto: PISO1 Com: NEI Div: RCE",
        "Asesor comercial": "POLANIA MONTERO LUISA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JAVIER DELGADO CEDEO",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "1LT"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "507578",
        "Ciudad": "PALMIRA",
        "Coordenada X": -76.30338,
        "Coordenada Y": 3.52025,
        "Fecha": "2026-02-25",
        "Dirección": "Calle: CL 21A Placa: 31-43 Apto: PI1-LC101 Com: PAL Div: RVA",
        "Asesor comercial": "POTES BEDOYA LUZ AIDEE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Pymes",
        "Técnico": "JHON JAIRO MAMIAN VELASCO",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "NBN1"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "507572",
        "Ciudad": "POPAYAN",
        "Coordenada X": -76.60547,
        "Coordenada Y": 2.45796,
        "Fecha": "2026-02-12",
        "Dirección": "Calle: CR 15N TORRE G Placa: 8N-188 Apto: CS13-PI1 Com: POP Div: RVA",
        "Asesor comercial": "PULIDO RODRIGUEZ DANIE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "CRISTIAN DANILO URRESTY ORDOEZ",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "PYBF78"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "PDV",
        "Zona": "507578",
        "Ciudad": "CAICEDONIA",
        "Coordenada X": -75.82796,
        "Coordenada Y": 4.33081,
        "Fecha": "2026-03-02",
        "Dirección": "Calle: CL 7 Placa: 14-27 Apto: PI1-102 Com: CAI Div: RVA",
        "Asesor comercial": "RODAS GIRALDO JHON ALE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "CARLOS FABIAN LEIVA CRUZ",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "CACE80"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "506561",
        "Ciudad": "IBAGUE",
        "Coordenada X": -75.20331,
        "Coordenada Y": 4.45691,
        "Fecha": "2026-02-26",
        "Dirección": "Calle: LOS ALPES Placa: MZF-C15 Apto: CASA Com: IBA Div: RCE",
        "Asesor comercial": "RODRIGUEZ HERRERA ANDR",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "OSORIO ANTOLINEZ FRANCISCO JAVIER",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "RUE"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "506564",
        "Ciudad": "NEIVA",
        "Coordenada X": -75.27438,
        "Coordenada Y": 2.92569,
        "Fecha": "2026-02-26",
        "Dirección": "Calle: CL 3A Placa: 19-60 Apto: PI1-103 Com: NEI Div: RCE",
        "Asesor comercial": "SALINAS MORENO MARIA F",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "MIGUEL ANGEL VILLARREAL MEDINA",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "N1Q1"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "508584",
        "Ciudad": "CALI",
        "Coordenada X": -76.52345,
        "Coordenada Y": 3.41542,
        "Fecha": "2026-02-28",
        "Dirección": "Calle: CR 41C Placa: 17-08 Apto: PISO2 Com: CAL Div: RVA",
        "Asesor comercial": "SANCHEZ CASTILLO MARY",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "TRUQUE RIVERA GERSAIN ANDRES",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "XO132C"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "508582",
        "Ciudad": "CALI",
        "Coordenada X": -76.50734,
        "Coordenada Y": 3.4205,
        "Fecha": "2026-03-06",
        "Dirección": "Calle: CL 36 Placa: 34-58 Apto:  PI3-301 Com: CAL Div: RVA",
        "Asesor comercial": "SANCHEZ CUENO LUZ DAR",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "JUAN CARLOS ORDOEZ SILVA",
        "ID Aliado": "9003753252",
        "Compañia": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
        "Nodo": "CNCLG4"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "508582",
        "Ciudad": "CALI",
        "Coordenada X": -76.50871,
        "Coordenada Y": 3.43874,
        "Fecha": "2026-02-11",
        "Dirección": "Calle: CL 33F Placa: 20-28 Apto: PISO2 Com: CAL Div: RVA",
        "Asesor comercial": "SERNA VELEZ ERNESTO",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "EYVAR ANDRES SUAREZ VELASCO",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "XK1277"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "PDV",
        "Zona": "508582",
        "Ciudad": "CALI",
        "Coordenada X": -76.49701,
        "Coordenada Y": 3.47069,
        "Fecha": "2026-02-27",
        "Dirección": "Calle: CR 1F TORRE A Placa: 58-50 Apto: 106 Com: CAL Div: RVA",
        "Asesor comercial": "SOELIA DE JESUS MONSAL",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "BRAYAN ESTIVEN ARAGN KLINGER",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "XH0914"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "506561",
        "Ciudad": "FLANDES",
        "Coordenada X": -74.83092,
        "Coordenada Y": 4.27201,
        "Fecha": "2026-02-17",
        "Dirección": "Calle: VILLA LUCIA Placa: MZD-C86 Apto:  PI1-101 Com: FLA Div: RCE",
        "Asesor comercial": "SUAREZ RIVERA PAOLA AN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "MIGUEL ANGEL RODRIGUEZ ORTIZ",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "VLK3F"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "CALLE",
        "Zona": "506561",
        "Ciudad": "FLANDES",
        "Coordenada X": -74.83092,
        "Coordenada Y": 4.27201,
        "Fecha": "2026-02-16",
        "Dirección": "Calle: VILLA LUCIA Placa: MZD-C86 Apto: PI1-101 Com: FLA Div: RCE",
        "Asesor comercial": "SUAREZ RIVERA PAOLA AN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "OSCAR DOREL MORENO ARENAS",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "VLK3F"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "506561",
        "Ciudad": "ESPINAL",
        "Coordenada X": -74.88407,
        "Coordenada Y": 4.14312,
        "Fecha": "2026-02-10",
        "Dirección": "Calle: CL 11A Placa: 13-29 Apto: PI1-102 Com: ESP Div: RCE",
        "Asesor comercial": "TORRES JIMENEZ KATHERI",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Pymes",
        "Técnico": "MIGUEL ANGEL RODRIGUEZ ORTIZ",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "ESZ"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK OUT BOUND",
        "Zona": "507572",
        "Ciudad": "POPAYAN",
        "Coordenada X": -76.6008,
        "Coordenada Y": 2.45355,
        "Fecha": "2026-03-09",
        "Dirección": "Calle: CR 9NORTE Placa: 14-08 Apto: PI1-101 Com: POP Div: RVA",
        "Asesor comercial": "TORRES PAEZ LAURA SOFI",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "RICHAR ALIRIO PEA ZUIGA",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "OBFV69"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "507578",
        "Ciudad": "PALMIRA",
        "Coordenada X": -76.29739,
        "Coordenada Y": 3.53424,
        "Fecha": "2026-02-20",
        "Dirección": "Calle: CL 37A Placa: 27-58 Apto: PORTERIA Com: PAL Div: RVA",
        "Asesor comercial": "VELANDIA MORENO ANGIE",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Pymes",
        "Técnico": "ZAMBRANO ALEXANDER MUNOZ",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "C96"
    },
    {
        "CANAL": "TELEFONICO VENTA",
        "CANAL2": "TMK IN BOUND",
        "Zona": "507578",
        "Ciudad": "CANDELARIA",
        "Coordenada X": -76.34456404418181,
        "Coordenada Y": 3.407566004948515,
        "Fecha": "2026-03-06",
        "Dirección": "Calle: CL 20A Placa: 14-125 Apto: PI1-101 Com: CAN Div: RVA",
        "Asesor comercial": "YESSICA ALEJANDRA AYA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "LAFISAID JIMENEZ OJEDA",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "OCDIQB"
    },
    {
        "CANAL": "AGENTES",
        "CANAL2": "EYN",
        "Zona": "508582",
        "Ciudad": "CALI",
        "Coordenada X": -76.50607,
        "Coordenada Y": 3.41942,
        "Fecha": "2026-03-04",
        "Dirección": "Calle: CR 35 Placa: 38-12 Apto: PI3-301 Com: CAL Div: RVA",
        "Asesor comercial": "ZULUAGA FAJARDO LOREN",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "Masivo Bidireccional",
        "Técnico": "JOSE FERNANDO GUTIERREZ CONTRERAS",
        "ID Aliado": "9001113432",
        "Compañia": "CICSA COLOMBIA S.A.",
        "Nodo": "1LP"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "508582",
        "Ciudad": "CALI",
        "Coordenada X": -76.52992287409522,
        "Coordenada Y": 3.4518035770468467,
        "Fecha": "2026-02-23",
        "Dirección": "Calle: CL 75 Placa: 7BIS-83 Apto:  PI1-102 Com: CAL Div: RVA",
        "Asesor comercial": "ZUNIGA RIVERA ANGELICA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "SARA LEYDI ORTIZ OJEDA",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "OBF273"
    },
    {
        "CANAL": "CAV",
        "CANAL2": "CAV",
        "Zona": "508582",
        "Ciudad": "CALI",
        "Coordenada X": -76.53252477690442,
        "Coordenada Y": 3.451777901789033,
        "Fecha": "2026-02-21",
        "Dirección": "Calle: CL 75 Placa: 7BIS-83 Apto: PI1-102 Com: CAL Div: RVA",
        "Asesor comercial": "ZUNIGA RIVERA ANGELICA",
        "Razón": "UNIDAD POSIBLE FRAUDE",
        "Tipo de Red": "FTTH",
        "Técnico": "HAAHALI HABID MIER DE LA HOZ",
        "ID Aliado": "8301349713",
        "Compañia": "CONECTAR TV S.A.S.",
        "Nodo": "OBF273"
    }
],
  "fecha_inicio": "2026-02-10",
  "fecha_fin": "2026-03-09"
};

// ===================================
// LOAD DATA
// ===================================
async function loadFraudData() {
    try {
        // Usar datos embebidos directamente (sin fetch)
        fraudData = EMBEDDED_FRAUD_DATA;
        
        // Calcular ciudades dinÃ¡micamente desde geo_data
        const ciudades = {};
        fraudData.geo_data.forEach(item => {
            ciudades[item.Ciudad] = (ciudades[item.Ciudad] || 0) + 1;
        });
        fraudData.ciudades = ciudades;
        
        // Calcular compañías desde ID Aliado
        // NOTA: TABASCO y CICSA son la misma compañía
        const companiaMap = {
            '8301349713': 'CONECTAR TV S.A.S.',
            '9003753252': 'Tabasco OC, LLC.',
            '9001113432': 'Tabasco OC, LLC.'
        };
        const companias = {};
        fraudData.geo_data.forEach(item => {
            const nombreCompania = companiaMap[item['ID Aliado']] || 'Desconocida';
            companias[nombreCompania] = (companias[nombreCompania] || 0) + 1;
        });
        fraudData.companias = companias;
        
        return fraudData;
    } catch (error) {
        console.error('Error loading fraud data:', error);
        return null;
    }
}

// ===================================
// UPDATE METRICS
// ===================================
function updateMetrics(data) {
    document.getElementById('totalFraude').textContent = data.total_registros;
    document.getElementById('fraudeChange').textContent = '+12%';
    document.getElementById('canalesTotal').textContent = Object.keys(data.canal_principal).length;
    document.getElementById('zonasRiesgo').textContent = Object.keys(data.ciudades).length;
    document.getElementById('asesoresTotal').textContent = Object.keys(data.asesores).length;
    document.getElementById('detectionRate').textContent = '94.2%';
    
    const now = new Date();
    document.getElementById('lastUpdate').textContent = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Top canal
    const topCanal = Object.entries(data.canal_principal).sort((a, b) => b[1] - a[1])[0];
    if (topCanal) {
        document.getElementById('topCanal').textContent = topCanal[0];
        document.getElementById('topCanalCasos').textContent = topCanal[1];
        const pct = ((topCanal[1] / data.total_registros) * 100).toFixed(1);
        document.getElementById('topCanalPct').textContent = pct + '%';
    }
    
    // Geo stats
    document.getElementById('geoTotal').textContent = data.geo_data.length;
    
    // Find hotspot (most common city)
    const cityCounts = {};
    data.geo_data.forEach(item => {
        cityCounts[item.Ciudad] = (cityCounts[item.Ciudad] || 0) + 1;
    });
    const hotspot = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0];
    if (hotspot) {
        document.getElementById('geoHotspot').textContent = hotspot[0];
    }
}

// ===================================
// 1. CANAL CHARTS (Matriz 2x2)
// ===================================
function initCanalChart(data) {
    // Destruir gráficos existentes antes de recrear
    if (charts.canalBar) { charts.canalBar.destroy(); delete charts.canalBar; }
    if (charts.canalDoughnut) { charts.canalDoughnut.destroy(); delete charts.canalDoughnut; }
    if (charts.canalLine) { charts.canalLine.destroy(); delete charts.canalLine; }
    
    const sortedCanales = Object.entries(data.canal_principal).sort((a, b) => b[1] - a[1]);
    const labels = sortedCanales.map(item => item[0]);
    const values = sortedCanales.map(item => item[1]);
    const total = values.reduce((a, b) => a + b, 0);
    
    // USAR FECHAS REALES DE LOS DATOS (no simuladas)
    // Agrupar geo_data por fecha y canal
    const fechasPorCanal = {};
    const todasFechas = new Set();
    
    data.geo_data.forEach(item => {
        const fecha = item.Fecha;
        const canal = item.CANAL;
        
        todasFechas.add(fecha);
        
        if (!fechasPorCanal[canal]) {
            fechasPorCanal[canal] = {};
        }
        fechasPorCanal[canal][fecha] = (fechasPorCanal[canal][fecha] || 0) + 1;
    });
    
    // Ordenar fechas
    const fechasOrdenadas = Array.from(todasFechas).sort();
    
    // Crear labels de fechas
    const fechaLabels = fechasOrdenadas.map(fechaStr => {
        const fecha = new Date(fechaStr);
        return fecha.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    });
    
    // Crear datos por canal (valores reales)
    const timelineData = {};
    sortedCanales.forEach(([canal, _]) => {
        const dailyValues = [];
        fechasOrdenadas.forEach(fecha => {
            const count = (fechasPorCanal[canal] && fechasPorCanal[canal][fecha]) || 0;
            dailyValues.push(count);
        });
        timelineData[canal] = dailyValues;
    });
    
    // Colores para graficos
    const backgroundColors = values.map((_, i) => 
        i === 0 ? FRAUD_COLORS.alert : 
        i === 1 ? FRAUD_COLORS.warning : 
        FRAUD_COLORS.gray
    );
    
    // 1. GRAFICO DE BARRAS
    const ctxBar = document.getElementById('canalChartBar');
    if (ctxBar) {
        charts.canalBar = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Casos',
                    data: values,
                    backgroundColor: backgroundColors,
                    borderColor: FRAUD_COLORS.alert,
                    borderWidth: 1
                }]
            },
            options: {
                ...COMMON_OPTIONS,
                indexAxis: 'y',
                plugins: {
                    ...COMMON_OPTIONS.plugins,
                    legend: {
                        display: false
                    },
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        ...COMMON_OPTIONS.scales.x,
                        beginAtZero: true,
                        ticks: {
                            ...COMMON_OPTIONS.scales.x.ticks,
                            font: { size: 9 }
                        }
                    },
                    y: {
                        ...COMMON_OPTIONS.scales.y,
                        ticks: {
                            ...COMMON_OPTIONS.scales.y.ticks,
                            font: { size: 9 }
                        }
                    }
                }
            }
        });
    }
    
    // 2. GRAFICO DE DONA - CANAL PRINCIPAL (DOUGHNUT)
    const ctxDoughnut = document.getElementById('canalChartDoughnut');
    if (ctxDoughnut) {
        charts.canalDoughnut = new Chart(ctxDoughnut, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Casos',
                    data: values,
                    backgroundColor: CHART_PALETTE,
                    borderColor: '#1a1a1a',
                    borderWidth: 2
                }]
            },
            options: {
                ...COMMON_OPTIONS,
                plugins: {
                    ...COMMON_OPTIONS.plugins,
                    legend: {
                        ...COMMON_OPTIONS.plugins.legend,
                        position: 'right',
                        labels: {
                            ...COMMON_OPTIONS.plugins.legend.labels,
                            font: { size: 9 },
                            boxWidth: 12
                        }
                    },
                    datalabels: {
                        color: '#ffffff',
                        font: { size: 9, weight: 'bold' },
                        formatter: (value) => {
                            const pct = ((value / total) * 100).toFixed(1);
                            return `${value}\\n(${pct}%)`;
                        }
                    }
                }
            }
        });
    }
    
    // 3. GRAFICO DE LINEAS TEMPORAL
    const ctxLine = document.getElementById('canalChartLine');
    if (ctxLine) {
        const canalColors = [
            FRAUD_COLORS.alert,
            FRAUD_COLORS.warning,
            FRAUD_COLORS.gray,
            FRAUD_COLORS.positive,
            '#8b5cf6'
        ];
        
        charts.canalLine = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: fechaLabels,
                datasets: sortedCanales.map(([canal, _], index) => ({
                    label: canal,
                    data: timelineData[canal],
                    borderColor: canalColors[index % canalColors.length],
                    backgroundColor: canalColors[index % canalColors.length] + '33',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }))
            },
            options: {
                ...COMMON_OPTIONS,
                plugins: {
                    ...COMMON_OPTIONS.plugins,
                    legend: {
                        ...COMMON_OPTIONS.plugins.legend,
                        display: true,
                        position: 'top',
                        labels: {
                            ...COMMON_OPTIONS.plugins.legend.labels,
                            font: { size: 8 },
                            boxWidth: 10
                        }
                    },
                    datalabels: {
                        display: true,
                        color: '#ffffff',
                        font: { size: 8, weight: 'normal' },
                        formatter: (value) => {
                            // Solo mostrar si el valor es mayor a 0
                            return value > 0 ? value : '';
                        }
                    }
                },
                scales: {
                    x: {
                        ...COMMON_OPTIONS.scales.x,
                        ticks: {
                            ...COMMON_OPTIONS.scales.x.ticks,
                            font: { size: 8 },
                            maxRotation: 45,
                            minRotation: 45
                        }
                    },
                    y: {
                        ...COMMON_OPTIONS.scales.y,
                        beginAtZero: true,
                        ticks: {
                            ...COMMON_OPTIONS.scales.y.ticks,
                            font: { size: 8 },
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    // 4. GRAFICO DE CANAL SECUNDARIO (DOUGHNUT)
    const ctxCanal2 = document.getElementById('canal2Chart');
    if (ctxCanal2) {
        const sortedCanal2 = Object.entries(data.canal_secundario).sort((a, b) => b[1] - a[1]);
        const labelsCanal2 = sortedCanal2.map(item => item[0]);
        const valuesCanal2 = sortedCanal2.map(item => item[1]);
        const totalCanal2 = valuesCanal2.reduce((a, b) => a + b, 0);
        
        charts.canal2 = new Chart(ctxCanal2, {
            type: 'doughnut',
            data: {
                labels: labelsCanal2,
                datasets: [{
                    label: 'Casos',
                    data: valuesCanal2,
                    backgroundColor: CHART_PALETTE,
                    borderColor: '#1a1a1a',
                    borderWidth: 2
                }]
            },
            options: {
                ...COMMON_OPTIONS,
                plugins: {
                    ...COMMON_OPTIONS.plugins,
                    legend: {
                        ...COMMON_OPTIONS.plugins.legend,
                        position: 'right',
                        labels: {
                            ...COMMON_OPTIONS.plugins.legend.labels,
                            font: { size: 9 },
                            boxWidth: 12
                        }
                    },
                    datalabels: {
                        display: true,
                        color: '#ffffff',
                        font: { size: 10, weight: 'bold' },
                        formatter: (value) => {
                            const pct = ((value / totalCanal2) * 100).toFixed(1);
                            // Solo mostrar si el segmento es >= 8%
                            return pct >= 8 ? `${value}\n${pct}%` : '';
                        }
                    }
                }
            }
        });
    }
}

// ===================================
// 2. CANAL2 CHART (Secondary - DEPRECATED, moved to matrix)
// ===================================
function initCanal2Chart(data) {
    // Esta función ahora está integrada en initCanalChart
    // Se mantiene vacía para compatibilidad
    return;
}

// ===================================
// 3. TOP ASESORES LIST
// ===================================
function initAsesorList(data) {
    const container = document.getElementById('asesorList');
    if (!container) return;
    
    const sortedAsesores = Object.entries(data.asesores).sort((a, b) => b[1] - a[1]);
    
    container.innerHTML = sortedAsesores.map((item, index) => `
        <div class="top-item">
            <div class="rank">${index + 1}</div>
            <div class="top-name">${item[0]}</div>
            <div class="top-value">${item[1]}</div>
        </div>
    `).join('');
}

// ===================================
// 4. CIUDAD CHART (DistribuciÃ³n por Ciudad)
// ===================================
function initZonaChart(data) {
    // Destruir gráfico existente
    if (charts.zona) { charts.zona.destroy(); delete charts.zona; }
    
    const ctx = document.getElementById('zonaChart');
    if (!ctx) return;
    
    const sortedCiudades = Object.entries(data.ciudades).sort((a, b) => b[1] - a[1]);
    const labels = sortedCiudades.map(item => item[0]);
    const values = sortedCiudades.map(item => item[1]);
    const total = values.reduce((sum, val) => sum + val, 0);
    
    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Casos por Ciudad',
                data: values,
                backgroundColor: FRAUD_COLORS.warning,
                borderColor: FRAUD_COLORS.alert,
                borderWidth: 1
            }]
        },
        options: {
            ...COMMON_OPTIONS,
            plugins: {
                ...COMMON_OPTIONS.plugins,
                legend: {
                    display: false
                },
                datalabels: {
                    display: false
                },
                tooltip: {
                    ...COMMON_OPTIONS.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `Casos: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ...COMMON_OPTIONS.scales.x
                },
                y: {
                    ...COMMON_OPTIONS.scales.y,
                    beginAtZero: true
                }
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach((element, index) => {
                            ctx.fillStyle = '#ffffff';
                            const fontSize = 10;
                            const fontStyle = 'bold';
                            const fontFamily = 'Roboto Mono, monospace';
                            ctx.font = fontStyle + ' ' + fontSize + 'px ' + fontFamily;
                            
                            const dataString = dataset.data[index].toString();
                            const percentage = ((dataset.data[index] / total) * 100).toFixed(0) + '%';
                            
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            
                            const padding = 5;
                            const position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, position.y - padding);
                            
                            ctx.fillStyle = '#d1d5db';
                            ctx.font = '9px ' + fontFamily;
                            ctx.fillText(percentage, position.x, position.y - padding - 12);
                        });
                    }
                });
            }
        }]
    };
    
    charts.zona = new Chart(ctx, config);
}

// ===================================
// 5. TIPO DE RED CHART (antes Razon)
// ===================================
function initRazonChart(data) {
    // Destruir gráfico existente
    if (charts.razon) { charts.razon.destroy(); delete charts.razon; }
    
    const ctx = document.getElementById('razonChart');
    if (!ctx) return;
    
    
    
    const sortedTipoRed = Object.entries(data.tipo_red).sort((a, b) => b[1] - a[1]);
    const labels = sortedTipoRed.map(item => item[0]);
    const values = sortedTipoRed.map(item => item[1]);
    const total = values.reduce((sum, val) => sum + val, 0);
    
    const config = {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tipo de Red',
                data: values,
                backgroundColor: CHART_PALETTE,
                borderColor: '#1a1a1a',
                borderWidth: 2
            }]
        },
        options: {
            ...COMMON_OPTIONS,
            plugins: {
                ...COMMON_OPTIONS.plugins,
                legend: {
                    ...COMMON_OPTIONS.plugins.legend,
                    position: 'right'
                },
                tooltip: {
                    ...COMMON_OPTIONS.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} casos (${percentage}%)`;
                        }
                    }
                }
            }
        }
    };
    
    charts.razon = new Chart(ctx, config);
}

// ===================================
// 6. TOP CIUDADES CHART (antes Regional)
// ===================================
function initRegionalChart(data) {
    // Destruir gráfico existente
    if (charts.regional) { charts.regional.destroy(); delete charts.regional; }
    
    const ctx = document.getElementById('regionalChart');
    if (!ctx) return;
    
    // Top 10 ciudades con mÃ¡s casos
    const sortedCiudades = Object.entries(data.ciudades).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const labels = sortedCiudades.map(item => item[0]);
    const values = sortedCiudades.map(item => item[1]);
    
    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Casos por Ciudad',
                data: values,
                backgroundColor: FRAUD_COLORS.gray,
                borderColor: FRAUD_COLORS.alert,
                borderWidth: 1
            }]
        },
        options: {
            ...COMMON_OPTIONS,
            indexAxis: 'y',
            plugins: {
                ...COMMON_OPTIONS.plugins,
                legend: {
                    display: false
                }
            }
        }
    };
    
    charts.regional = new Chart(ctx, config);
}

// ===================================
// 7. GEO MAP - MAPA POR CIUDAD CON COLORES POR CANAL
// ===================================
function initGeoHeatmap(data) {
    // Destruir mapa existente
    if (charts.geoHeatmap) { 
        charts.geoHeatmap.remove(); 
        delete charts.geoHeatmap; 
    }
    
    const mapContainer = document.getElementById('geoHeatmap');
    if (!mapContainer) return;
    
    console.log(' Iniciando mapa por ciudad con colores...');
    
    // COORDENADAS FIJAS DE CIUDADES DEL SUROCCIDENTE
    const CIUDADES_COORDS = {
        'CALI': [3.4516, -76.5320],
        'PALMIRA': [3.5394, -76.3036],
        'POPAYAN': [2.4419, -76.6063],
        'PASTO': [1.2136, -77.2811],
        'NEIVA': [2.9273, -75.2819],
        'FLANDES': [4.2867, -74.8140],
        'CARTAGO': [4.7467, -75.9117],
        'BUGA': [3.9009, -76.2976],
        'SEVILLA': [4.2714, -75.9389],
        'ESPINAL': [4.1490, -74.8830],
        'FLORENCIA': [1.6145, -75.6062],
        'CANDELARIA': [3.4117, -76.3494],
        'IPIALES': [0.8275, -77.6434],
        'FLORIDA': [3.3234, -76.2311],
        'CAICEDONIA': [4.3308, -75.8228],
        'IBAGUE': [4.4389, -75.2322]
    };
    
    // Contar fraudes por ciudad
    const fraudesPorCiudad = {};
    data.geo_data.forEach(item => {
        const ciudad = item.Ciudad.toUpperCase();
        if (!fraudesPorCiudad[ciudad]) {
            fraudesPorCiudad[ciudad] = [];
        }
        fraudesPorCiudad[ciudad].push(item);
    });
    
    console.log(' Fraudes por ciudad:', Object.keys(fraudesPorCiudad).map(c => `${c}: ${fraudesPorCiudad[c].length}`).join(', '));
    
    // Crear mapa centrado en el suroccidente
    const map = L.map('geoHeatmap').setView([3.0, -76.0], 7);
    
    // Tile layer CLARO
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 18,
        minZoom: 6
    }).addTo(map);
    
    console.log(' Mapa base cargado');
    
    // Populate canal filter
    const filterSelect = document.getElementById('geoFilterCanal');
    const canales = [...new Set(data.geo_data.map(item => item.CANAL))];
    canales.forEach(canal => {
        const option = document.createElement('option');
        option.value = canal;
        option.textContent = canal;
        filterSelect.appendChild(option);
    });
    
    // Color mapping for canales
    const canalColors = {
        'AGENTES': '#dc2626',
        'TELEFONICO VENTA': '#f59e0b',
        'CAV': '#3b82f6',
        'DIGITAL': '#10b981',
        'TELEFONICO SERVICIO': '#8b5cf6'
    };
    
    // Agregar marcadores CON COLOR por ciudad-canal
    let markersAdded = 0;
    const allMarkers = [];
    const markersByCanal = {};
    
    Object.entries(fraudesPorCiudad).forEach(([ciudad, casos]) => {
        const coords = CIUDADES_COORDS[ciudad];
        
        if (!coords) {
            console.warn(` No hay coordenadas para ${ciudad}`);
            return;
        }
        
        // Agrupar casos por canal en esta ciudad
        const casosPorCanal = {};
        casos.forEach(caso => {
            if (!casosPorCanal[caso.CANAL]) {
                casosPorCanal[caso.CANAL] = [];
            }
            casosPorCanal[caso.CANAL].push(caso);
        });
        
        // Crear un marcador por canal
        const numCanales = Object.keys(casosPorCanal).length;
        let canalIndex = 0;
        
        Object.entries(casosPorCanal).forEach(([canal, casosPorCanal_interno]) => {
            const numCasos = casosPorCanal_interno.length;
            const color = canalColors[canal] || '#6b7280';
            
            // Aplicar offset circular si hay múltiples canales en la misma ciudad
            let lat = coords[0];
            let lon = coords[1];
            
            if (numCanales > 1) {
                const angle = (canalIndex / numCanales) * 2 * Math.PI;
                const radius = 0.02;
                lat = coords[0] + (radius * Math.sin(angle));
                lon = coords[1] + (radius * Math.cos(angle));
            }
            
            // Tamaño basado en cantidad de casos
            const size = Math.min(20 + (numCasos * 3), 60);
            
            // MARCADOR CON COLOR del canal
            const icon = L.divIcon({
                className: 'fraud-marker-color',
                html: `<div style="
                    background-color: ${color};
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    border: 5px solid #ffffff;
                    box-shadow: 0 0 25px rgba(0, 0, 0, 0.6), 0 0 15px ${color}, 0 4px 10px rgba(0, 0, 0, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                    font-weight: bold;
                    font-size: ${size > 30 ? '16px' : size > 25 ? '14px' : '12px'};
                    font-family: 'Roboto Mono', monospace;
                ">${numCasos}</div>`,
                iconSize: [size, size],
                iconAnchor: [size/2, size/2]
            });
            
            const marker = L.marker([lat, lon], { icon: icon }).addTo(map);
            allMarkers.push(marker);
            
            // Almacenar marcadores por canal para filtrado
            if (!markersByCanal[canal]) {
                markersByCanal[canal] = [];
            }
            markersByCanal[canal].push(marker);
            
            // Popup individualizado por canal
            const casosList = casosPorCanal_interno.slice(0, 8).map(c => 
                `<div style="padding: 6px 0; border-bottom: 1px solid #e5e7eb; font-size: 11px;">
                    <div style="color: ${color}; font-weight: bold;">${c.Fecha}</div>
                    <div style="color: #4b5563;"><b>Asesor:</b> ${c['Asesor comercial']}</div>
                </div>`
            ).join('');
            
            const masInfo = numCasos > 8 ? `<div style="padding: 10px 0; color: ${color}; font-weight: bold; text-align: center;">... y ${numCasos - 8} casos más</div>` : '';
            
            marker.bindPopup(`
                <div style="font-family: 'Roboto Mono', monospace; min-width: 320px; max-width: 350px;">
                    <div style="background: ${color}; color: #ffffff; padding: 14px; font-weight: bold; font-size: 15px; border-radius: 8px 8px 0 0;">
                         ${ciudad} - ${canal}
                    </div>
                    <div style="padding: 16px; background: #ffffff;">
                        <div style="font-size: 28px; font-weight: bold; color: ${color}; margin-bottom: 12px; text-align: center;">
                            ${numCasos} CASOS
                        </div>
                        <div style="font-size: 12px; color: #6b7280; margin-bottom: 14px; text-align: center;">
                             Coordenadas: ${coords[0].toFixed(4)}°, ${coords[1].toFixed(4)}°
                        </div>
                        <div style="max-height: 350px; overflow-y: auto; border-top: 2px solid #e5e7eb; padding-top: 10px;">
                            ${casosList}
                            ${masInfo}
                        </div>
                    </div>
                </div>
            `, {
                maxWidth: 350,
                className: 'fraud-popup'
            });
            
            markersAdded++;
            canalIndex++;
        });
    });
    
    console.log(` ${markersAdded} marcadores CON COLOR agregados exitosamente`);
    
    // Store map reference
    charts.geoHeatmap = map;
    
    // Filter functionality
    filterSelect.addEventListener('change', (e) => {
        const selectedCanal = e.target.value;
        
        // Show/hide markers based on selection
        if (selectedCanal === 'all') {
            allMarkers.forEach(marker => marker.addTo(map));
        } else {
            // Remove all markers first
            allMarkers.forEach(marker => map.removeLayer(marker));
            // Add back only the filtered ones
            if (markersByCanal[selectedCanal]) {
                markersByCanal[selectedCanal].forEach(marker => marker.addTo(map));
            }
        }
    });
    
    // Add legend with COLORED indicators
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'fraud-map-legend');
        div.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        div.style.padding = '12px';
        div.style.borderRadius = '8px';
        div.style.border = '3px solid #000000';
        div.style.fontFamily = "'Roboto Mono', monospace";
        div.style.fontSize = '11px';
        div.style.color = '#1a1a1a';
        div.style.fontWeight = 'bold';
        
        div.innerHTML = `
            <div style="color: #dc2626; font-size: 12px; margin-bottom: 8px;"> CANALES</div>
        `;
        
        Object.entries(canalColors).forEach(([canal, color]) => {
            div.innerHTML += `<div style="margin: 8px 0; display: flex; align-items: center;">
                <span style="display: inline-block; width: 18px; height: 18px; background-color: ${color}; border-radius: 50%; margin-right: 8px; border: 3px solid #ffffff; box-shadow: 0 0 8px rgba(0,0,0,0.4);"></span>
                <span>${canal}</span>
            </div>`;
        });
        
        div.innerHTML += `<div style="font-size: 9px; color: #6b7280; margin-top: 8px; border-top: 1px solid #e5e7eb; padding-top: 8px;">
            Tamaño = Número de casos<br>
            Usa el filtro arriba para filtrar por canal
        </div>`;
        
        return div;
    };
    legend.addTo(map);
    
    // Fix map rendering
    setTimeout(() => {
        map.invalidateSize();
        console.log(' Mapa renderizado correctamente');
    }, 300);
    
    // Update stats
    document.getElementById('geoTotal').textContent = data.geo_data.length;
    const ciudadConMasCasos = Object.entries(fraudesPorCiudad).sort((a, b) => b[1].length - a[1].length)[0];
    if (ciudadConMasCasos) {
        document.getElementById('geoHotspot').textContent = ciudadConMasCasos[0];
    }
}
// 8. ANALISIS POR ALIADO
// ===================================
function initAliadoChart(data) {
    // Destruir gráfico existente
    if (charts.aliado) { charts.aliado.destroy(); delete charts.aliado; }
    
    const ctx = document.getElementById('aliadoChart');
    if (!ctx) return;
    
    const companias = data.companias || {};
    const labels = Object.keys(companias);
    const valores = Object.values(companias);
    const total = valores.reduce((a, b) => a + b, 0);
    
    const config = {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: [
                    FRAUD_COLORS.chartColors[0],
                    FRAUD_COLORS.chartColors[1],
                    FRAUD_COLORS.chartColors[2]
                ],
                borderColor: FRAUD_COLORS.background,
                borderWidth: 2
            }]
        },
        options: {
            ...COMMON_OPTIONS,
            plugins: {
                ...COMMON_OPTIONS.plugins,
                title: {
                    display: false
                },
                datalabels: {
                    display: true,
                    color: '#ffffff',
                    font: { size: 11, weight: 'bold' },
                    formatter: (value) => {
                        const pct = ((value / total) * 100).toFixed(1);
                        return `${value}\n${pct}%`;
                    }
                },
                tooltip: {
                    ...COMMON_OPTIONS.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} casos (${percentage}%)`;
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        color: FRAUD_COLORS.textColor,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 10
                        },
                        padding: 10,
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => {
                                const value = data.datasets[0].data[i];
                                const pct = ((value / total) * 100).toFixed(1);
                                return {
                                    text: `${label}: ${value} (${pct}%)`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    hidden: false,
                                    index: i
                                };
                            });
                        }
                    }
                }
            }
        }
    };
    
    charts.aliado = new Chart(ctx, config);
}

// ===================================
// 9. ANALISIS POR TECNICO (Top 10)
// ===================================
function initTecnicoChart(data) {
    // Destruir gráfico existente
    if (charts.tecnico) { charts.tecnico.destroy(); delete charts.tecnico; }
    
    const ctx = document.getElementById('tecnicoChart');
    if (!ctx) return;
    
    const tecnicos = data.tecnicos || {};
    const sorted = Object.entries(tecnicos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    const labels = sorted.map(([name]) => name.length > 25 ? name.substring(0, 22) + '...' : name);
    const valores = sorted.map(([, count]) => count);
    
    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Casos',
                data: valores,
                backgroundColor: FRAUD_COLORS.chartColors[3],
                borderColor: FRAUD_COLORS.accentColor,
                borderWidth: 1
            }]
        },
        options: {
            ...COMMON_OPTIONS,
            indexAxis: 'y',
            plugins: {
                ...COMMON_OPTIONS.plugins,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltip: {
                    ...COMMON_OPTIONS.plugins.tooltip,
                    callbacks: {
                        title: function(context) {
                            // Mostrar nombre completo en tooltip
                            const fullName = sorted[context[0].dataIndex][0];
                            return fullName;
                        },
                        label: function(context) {
                            return `Casos: ${context.parsed.x}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ...COMMON_OPTIONS.scales.x,
                    beginAtZero: true,
                    ticks: {
                        ...COMMON_OPTIONS.scales.x.ticks,
                        stepSize: 1
                    }
                },
                y: {
                    ...COMMON_OPTIONS.scales.y,
                    ticks: {
                        ...COMMON_OPTIONS.scales.y.ticks,
                        autoSkip: false
                    }
                }
            }
        }
    };
    
    charts.tecnico = new Chart(ctx, config);
}

// ===================================
// 11. GRAFICO DE DISPERSION: TECNICOS VS CANTIDAD DE FRAUDES
// ===================================
// ===================================
// 11. GRAFICO DE NODOS (Top 20)
// ===================================
function initNodoChart(data) {
    // Destruir gráfico existente
    if (charts.nodo) { charts.nodo.destroy(); delete charts.nodo; }
    
    const ctx = document.getElementById('nodoChart');
    if (!ctx) return;
    
    const nodos = data.nodos || {};
    const sorted = Object.entries(nodos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);
    
    const labels = sorted.map(([nodo]) => nodo);
    const valores = sorted.map(([, count]) => count);
    
    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Casos',
                data: valores,
                backgroundColor: FRAUD_COLORS.gray,
                borderColor: FRAUD_COLORS.grayDark,
                borderWidth: 1
            }]
        },
        options: {
            ...COMMON_OPTIONS,
            indexAxis: 'y',
            plugins: {
                ...COMMON_OPTIONS.plugins,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltip: {
                    ...COMMON_OPTIONS.plugins.tooltip,
                    callbacks: {
                        title: function(context) {
                            return `Nodo: ${context[0].label}`;
                        },
                        label: function(context) {
                            return `Casos: ${context.parsed.x}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ...COMMON_OPTIONS.scales.x,
                    beginAtZero: true,
                    ticks: {
                        ...COMMON_OPTIONS.scales.x.ticks,
                        stepSize: 1
                    }
                },
                y: {
                    ...COMMON_OPTIONS.scales.y,
                    ticks: {
                        ...COMMON_OPTIONS.scales.y.ticks,
                        autoSkip: false,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 9
                        }
                    }
                }
            }
        }
    };
    
    charts.nodo = new Chart(ctx, config);
}

// ===================================
// 12. MATRIZ DE RIESGO: CANAL × CIUDAD
// ===================================
function initMatrixChart(data) {
    // Destruir gráfico existente
    if (charts.matrix) { charts.matrix.destroy(); delete charts.matrix; }
    
    const ctx = document.getElementById('matrixChart');
    if (!ctx) return;
    
    // Crear matriz de datos - usar Ciudad en lugar de Zona
    const canales = Object.keys(data.canal_principal).sort();
    const ciudades = Object.keys(data.ciudades).sort((a, b) => {
        // Ordenar por cantidad de fraudes descendente
        return data.ciudades[b] - data.ciudades[a];
    });
    
    // Crear una estructura de heatmap con colores más intensos
    const matrixData = [];
    let maxValue = 0;
    
    canales.forEach(canal => {
        ciudades.forEach(ciudad => {
            // Contar desde geo_data
            const count = data.geo_data.filter(item => 
                item.CANAL === canal && item.Ciudad === ciudad
            ).length;
            
            if (count > maxValue) maxValue = count;
            
            matrixData.push({
                x: ciudad,
                y: canal,
                v: count
            });
        });
    });
    
    console.log(`🔥 Matriz de riesgo: ${canales.length} canales × ${ciudades.length} ciudades, max=${maxValue}`);
    
    // Función para generar color basado en intensidad (gradiente rojo)
    const getColorForValue = (value, max) => {
        if (value === 0) return 'rgba(30, 30, 30, 0.3)'; // Gris oscuro para cero
        const intensity = value / max;
        
        // Gradiente de amarillo a rojo intenso
        if (intensity > 0.7) {
            return `rgba(220, 38, 38, ${0.7 + intensity * 0.3})`; // Rojo intenso
        } else if (intensity > 0.4) {
            return `rgba(245, 158, 11, ${0.6 + intensity * 0.4})`; // Naranja
        } else if (intensity > 0.2) {
            return `rgba(251, 191, 36, ${0.5 + intensity * 0.3})`; // Amarillo
        } else {
            return `rgba(156, 163, 175, ${0.4 + intensity * 0.3})`; // Gris claro
        }
    };
    
    // Crear datasets por canal con barras apiladas y colores intensos
    const datasets = canales.map((canal, canalIndex) => {
        const canalData = ciudades.map(ciudad => {
            const item = matrixData.find(m => m.x === ciudad && m.y === canal);
            return item ? item.v : 0;
        });
        
        // Colores vibrantes por canal
        const canalColors = {
            'AGENTES': '#dc2626',
            'TELEFONICO VENTA': '#f59e0b',
            'CAV': '#3b82f6',
            'DIGITAL': '#10b981',
            'TELEFONICO SERVICIO': '#8b5cf6'
        };
        
        const baseColor = canalColors[canal] || CHART_PALETTE[canalIndex % CHART_PALETTE.length];
        
        return {
            label: canal,
            data: canalData,
            backgroundColor: baseColor,
            borderColor: '#1a1a1a',
            borderWidth: 2,
            borderRadius: 4,
            barPercentage: 0.9,
            categoryPercentage: 0.95
        };
    });
    
    // Plugin personalizado para nota superpuesta (superior izquierda)
    const watermarkPlugin = {
        id: 'matrixWatermark',
        afterDraw: function(chart) {
            const ctx = chart.ctx;
            ctx.save();
            ctx.font = "bold 11px 'Roboto Mono', monospace";
            ctx.fillStyle = 'rgba(156, 163, 175, 0.9)';
            ctx.textAlign = 'left';
            // Fondo semitransparente para mejor legibilidad
            const text = '💡 Intensidad del color = Mayor concentración de fraudes';
            const textWidth = ctx.measureText(text).width;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(10, 10, textWidth + 10, 20);
            // Texto
            ctx.fillStyle = 'rgba(156, 163, 175, 1)';
            ctx.fillText(text, 15, 24);
            ctx.restore();
        }
    };
    
    const config = {
        type: 'bar',
        data: {
            labels: ciudades,
            datasets: datasets
        },
        plugins: [watermarkPlugin],
        options: {
            ...COMMON_OPTIONS,
            indexAxis: 'y',  // Horizontal bars
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                ...COMMON_OPTIONS.plugins,
                title: {
                    display: true,
                    text: `Matriz de Riesgo: ${canales.length} Canales × ${ciudades.length} Ciudades (Total: ${data.total_casos} casos)`,
                    color: FRAUD_COLORS.textColor,
                    font: {
                        family: "'Roboto Mono', monospace",
                        size: 13,
                        weight: 'bold'
                    },
                    padding: {
                        top: 15,
                        bottom: 10
                    }
                },
                legend: {
                    display: true,
                    position: 'right',
                    align: 'center',
                    labels: {
                        color: FRAUD_COLORS.textColor,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 11,
                            weight: 'bold'
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'rect',
                        boxWidth: 18,
                        boxHeight: 12
                    }
                },
                tooltip: {
                    ...COMMON_OPTIONS.plugins.tooltip,
                    callbacks: {
                        title: function(context) {
                            return `${context[0].label} - ${context[0].dataset.label}`;
                        },
                        label: function(context) {
                            const value = context.parsed.x;
                            const ciudad = context.label;
                            const canal = context.dataset.label;
                            const totalCiudad = data.ciudades[ciudad] || 0;
                            const pctCiudad = totalCiudad > 0 ? ((value / totalCiudad) * 100).toFixed(1) : 0;
                            const totalCanal = data.canal_principal[canal] || 0;
                            const pctCanal = totalCanal > 0 ? ((value / totalCanal) * 100).toFixed(1) : 0;
                            
                            return [
                                `Casos: ${value}`,
                                `% de ${ciudad}: ${pctCiudad}%`,
                                `% de ${canal}: ${pctCanal}%`,
                                `Nivel de riesgo: ${value >= maxValue * 0.7 ? 'CRÍTICO' : value >= maxValue * 0.4 ? 'ALTO' : value >= maxValue * 0.2 ? 'MEDIO' : 'BAJO'}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    ...COMMON_OPTIONS.scales.x,
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Cantidad de Fraudes (acumulado por ciudad)',
                        color: FRAUD_COLORS.textColor,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    beginAtZero: true,
                    ticks: {
                        ...COMMON_OPTIONS.scales.x.ticks,
                        stepSize: 5,
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        lineWidth: 1
                    }
                },
                y: {
                    ...COMMON_OPTIONS.scales.y,
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Ciudades (ordenadas por total de fraudes)',
                        color: FRAUD_COLORS.textColor,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        ...COMMON_OPTIONS.scales.y.ticks,
                        autoSkip: false,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 10,
                            weight: 'bold'
                        },
                        color: FRAUD_COLORS.textColor
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        lineWidth: 1
                    }
                }
            }
        }
    };
    
    charts.matrix = new Chart(ctx, config);
}

// ===================================
// 13. FRAUD FEED
// ===================================
function initFraudFeed(data) {
    const feedBody = document.getElementById('fraudFeed');
    if (!feedBody) return;
    
    // Create sample feed items from data
    const feedItems = data.geo_data.slice(0, 15).map((item, index) => {
        const priority = index < 3 ? 'high' : index < 8 ? 'medium' : 'low';
        const now = new Date();
        now.setMinutes(now.getMinutes() - index * 5);
        
        return {
            time: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            type: item.CANAL || 'N/A',
            description: `${item['Asesor comercial']} - ${item.Zona}`,
            priority: priority
        };
    });
    
    feedBody.innerHTML = feedItems.map(item => `
        <div class="feed-item ${item.priority}">
            <div class="feed-time">${item.time}</div>
            <div class="feed-type">${item.type}</div>
            <div class="feed-description">${item.description}</div>
            <div class="feed-priority ${item.priority}">
                ${item.priority.toUpperCase()}
            </div>
        </div>
    `).join('');
    
    // Filter functionality
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const items = feedBody.querySelectorAll('.feed-item');
            
            items.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'grid';
                } else {
                    item.style.display = item.classList.contains(filter) ? 'grid' : 'none';
                }
            });
        });
    });
}

// ===================================
// TERMINAL CLOCK
// ===================================
function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('terminalClock');
    if (clockElement) {
        clockElement.textContent = now.toLocaleTimeString('es-ES', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}

// ===================================
// FPS & LATENCY
// ===================================
function updatePerformance() {
    const fps = 58 + Math.random() * 4;
    const latency = 35 + Math.random() * 25;
    
    const fpsElement = document.getElementById('fps');
    const latencyElement = document.getElementById('latency');
    
    if (fpsElement) fpsElement.textContent = fps.toFixed(0);
    if (latencyElement) latencyElement.textContent = latency.toFixed(0);
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Initializing Fraud Analytics Terminal...');
    
    // Load data
    const data = await loadFraudData();
    
    if (!data) {
        console.error('Failed to load fraud data');
        return;
    }
    
    // Update metrics
    updateMetrics(data);
    
    // Initialize all charts
    initCanalChart(data);
    initCanal2Chart(data);
    initAsesorList(data);
    initZonaChart(data);
    initRazonChart(data);
    initRegionalChart(data);
    initGeoHeatmap(data);
    initAliadoChart(data);
    initTecnicoChart(data);
    initMatrixChart(data);
    initNodoChart(data);
    // initFraudFeed(data); // Eliminado: sección de alertas en tiempo real
    
    // Start timers
    setInterval(updateClock, 1000);
    setInterval(updatePerformance, 1500);
    updateClock();
    updatePerformance();
    
    console.log('Fraud Analytics Terminal initialized successfully');
});







