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
  "geo_data": [
    {
      "orden": "465676178_O_CO_23",
      "external_id": "1113691108",
      "tecnico": "BRAYAN STEVEN GUERRON TORRES",
      "fecha": "2026-02-25",
      "inicio": "15:08",
      "fin": "16:13",
      "cliente": "WALTER LOZANO MARTINEZ",
      "direccion": "Calle: CR 15A Placa: 47D-48 Apto: PI1-IN101 Com: PAL Div: RVA",
      "ciudad": "PALMIRA",
      "nodo": "PBU",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 3.54421,
      "longitud": -76.28794,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "PDV",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "ANDREA CATALINA DE LA",
      "codigo_asesor": "298758",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 65,
      "tiempo_viaje_minutos": 29,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466199931_O_CO_7",
      "external_id": "1061701152",
      "tecnico": "DIDIER ENRIQUE PEREZ SARRIA",
      "fecha": "2026-03-06",
      "inicio": "14:39",
      "fin": "15:00",
      "cliente": "MILTON AUG MORALES",
      "direccion": "Calle: CL 32NORTE Placa: 8-142 Apto:  PISO2 Com: POP Div: RVA",
      "ciudad": "POPAYAN",
      "nodo": "CB3",
      "zona": 507572,
      "regional": "RVA",
      "latitud": 2.46458,
      "longitud": -76.58827,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "ANDRES MAURICIO MONTER",
      "codigo_asesor": "3215566",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "EN INCUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "26",
      "duracion_minutos": 21,
      "tiempo_viaje_minutos": 25,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "466199931_O_CO_7",
      "external_id": "1061701152",
      "tecnico": "DIDIER ENRIQUE PEREZ SARRIA",
      "fecha": "2026-03-05",
      "inicio": "14:28",
      "fin": "15:39",
      "cliente": "MILTON AUG MORALES TELLO",
      "direccion": "Calle: CL 32NORTE Placa: 8-142 Apto: PISO2 Com: POP Div: RVA",
      "ciudad": "POPAYAN",
      "nodo": "CB3",
      "zona": 507572,
      "regional": "RVA",
      "latitud": 2.46458,
      "longitud": -76.58827,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "ANDRES MAURICIO MONTER",
      "codigo_asesor": "3215566",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 71,
      "tiempo_viaje_minutos": 32,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "466055685_O_CO_7",
      "external_id": "1111540235",
      "tecnico": "YEINEY ALEXIS RIVERA MENESES",
      "fecha": "2026-03-04",
      "inicio": "07:45",
      "fin": "10:19",
      "cliente": "RIGOBERTO CAMPOO-",
      "direccion": "Calle: CR 100OESTE Placa: 1B-12 Apto:  502 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "ASE2F",
      "zona": 508584,
      "regional": "RVA",
      "latitud": 3.37223,
      "longitud": -76.5557,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "ANGEL DUBAN MEDINA GUE",
      "codigo_asesor": "16949707",
      "confirmacion": "no",
      "confir_resultado": "NO CONTACTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "EN INCUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "13",
      "duracion_minutos": 154,
      "tiempo_viaje_minutos": 4,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466055828_O_CO_7",
      "external_id": "1075238735",
      "tecnico": "JORGE LEONARDO REYES CASTILLO",
      "fecha": "2026-03-04",
      "inicio": "12:01",
      "fin": "12:54",
      "cliente": "JHOJAN AND CHAVEZ RODRIGUEZ",
      "direccion": "Calle: CL 18 Placa: 53-46 Apto: PISO1 Com: NEI Div: RCE",
      "ciudad": "NEIVA",
      "nodo": "PMS1",
      "zona": 506564,
      "regional": "RCE",
      "latitud": 2.94087,
      "longitud": -75.24624,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "ARDILA VAZQUEZ ALIX AL",
      "codigo_asesor": "26433289",
      "confirmacion": "si",
      "confir_resultado": "ADELANTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 53,
      "tiempo_viaje_minutos": 7,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465171981_O_CO_7",
      "external_id": "1112299805",
      "tecnico": "MILTON ANDRES AGUDELO RAMIREZ",
      "fecha": "2026-02-20",
      "inicio": "15:51",
      "fin": "18:13",
      "cliente": "MARTHA LIL RODRiGUEZ SANCHEZ",
      "direccion": "Calle: CL 22A Placa: 15-12 Apto: PISO3 Com: BUG Div: RVA",
      "ciudad": "BUGA",
      "nodo": "D2B",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 3.91341,
      "longitud": -76.29744,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "ARLEX ADEY PALACIOS LO",
      "codigo_asesor": "7585025",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 142,
      "tiempo_viaje_minutos": 15,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "465732324_O_CO_7",
      "external_id": "1070606593",
      "tecnico": "JESUS ALFREDO RODRIGUEZ MORA",
      "fecha": "2026-02-26",
      "inicio": "10:26",
      "fin": "11:36",
      "cliente": "LUZ MARIAN LOZANO ALVAREZ",
      "direccion": "Calle: QUINTAS DEFLANDES Placa: MZ35-C7 Apto: PI1-102 Com: FLA Div: RCE",
      "ciudad": "FLANDES",
      "nodo": "QTN",
      "zona": 506561,
      "regional": "RCE",
      "latitud": 4.27734,
      "longitud": -74.81586,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "ARLEX ADEY PALACIOS LO",
      "codigo_asesor": "7585025",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 70,
      "tiempo_viaje_minutos": 7,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "466342640_O_CO_761",
      "external_id": "1006009171",
      "tecnico": "ANDRES FELIPE VICUA GARCIA",
      "fecha": "2026-03-07",
      "inicio": "17:27",
      "fin": "18:39",
      "cliente": "CARLOS ELI MARTINEZ",
      "direccion": "Calle: CR 42C Placa: 48-75 Apto:  PI1-101 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "OBFL10",
      "zona": 508584,
      "regional": "RVA",
      "latitud": 3.40386,
      "longitud": -76.50768,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "AVILA ROMERO NILSE DIO",
      "codigo_asesor": "44169718",
      "confirmacion": "si",
      "confir_resultado": "NO CONTACTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "EN INCUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "5",
      "duracion_minutos": 72,
      "tiempo_viaje_minutos": 3,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466204260_O_CO_7",
      "external_id": "1002958746",
      "tecnico": "RICHAR ALIRIO PEA ZUIGA",
      "fecha": "2026-03-05",
      "inicio": "17:52",
      "fin": "18:58",
      "cliente": "LUIS EDUAR LOPEZ GUTIERREZ",
      "direccion": "Calle: CR 9 TORRE A Placa: 17N-47 Apto: 302 Com: POP Div: RVA",
      "ciudad": "POPAYAN",
      "nodo": "4SN",
      "zona": 507572,
      "regional": "RVA",
      "latitud": 2.45464,
      "longitud": -76.59865,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "DIGITAL",
      "canal2": "ECOMMERCE ASISTIDO",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "BARRERA RODRIGUEZ MAN",
      "codigo_asesor": "32412323",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 66,
      "tiempo_viaje_minutos": 43,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "464898468_O_CO_761",
      "external_id": "1068972003",
      "tecnico": "CARLOS ADRIAN ROJAS CRUZ",
      "fecha": "2026-02-14",
      "inicio": "14:35",
      "fin": "15:16",
      "cliente": "LUIS CARLO BLANDON ACEVEDO",
      "direccion": "Calle: CL 37 Placa: 1BN-76 Apto: PISO2 Com: CGO Div: REC",
      "ciudad": "CARTAGO",
      "nodo": "CT03",
      "zona": 507578,
      "regional": "REC",
      "latitud": 4.76154,
      "longitud": -75.93439,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "BOLIVAR PULGARIN YESSI",
      "codigo_asesor": "12780923",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 41,
      "tiempo_viaje_minutos": 25,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Luis carlos Blandon Acevedo"
    },
    {
      "orden": "466053908_O_CO_7",
      "external_id": "719199",
      "tecnico": "JOSE ADOLFO TORRES TORRES",
      "fecha": "2026-03-05",
      "inicio": "07:17",
      "fin": "08:57",
      "cliente": "JHON EDINS BOTINA",
      "direccion": "Calle: AV 4AOESTE Placa: 19-108 Apto:  PI1-102 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "AIA",
      "zona": 508584,
      "regional": "RVA",
      "latitud": 3.45252,
      "longitud": -76.56076,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "BUITRAGO GIRALDO VALEN",
      "codigo_asesor": "92771397",
      "confirmacion": "si",
      "confir_resultado": "ADELANTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "NODATA",
      "sla_horas": 36,
      "sla_cumplimiento": "NODATA",
      "duracion_minutos": 100,
      "tiempo_viaje_minutos": 7,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "464785224_O_CO_761",
      "external_id": "1107077888",
      "tecnico": "IJAJI SAMBONI EYSON FERNANDO",
      "fecha": "2026-02-12",
      "inicio": "13:41",
      "fin": "14:11",
      "cliente": "JOSEPH MAN FORIS CAICEDO",
      "direccion": "Calle: CR 43B Placa: 48A-30 Apto: PI1-101 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "OBFL08",
      "zona": 508584,
      "regional": "RVA",
      "latitud": 3.40235,
      "longitud": -76.50904,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "AGENTES",
      "canal2": "PDV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "CARDONA ZAPATA LUZ ARG",
      "codigo_asesor": "43652192",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 30,
      "tiempo_viaje_minutos": 61,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "JOSEPH MANUEL FORIS CAICEDO"
    },
    {
      "orden": "466384228_O_CO_761",
      "external_id": "11938207",
      "tecnico": "WILNER YESID RIASCOS MOSQUERA",
      "fecha": "2026-03-09",
      "inicio": "13:05",
      "fin": "13:05",
      "cliente": "ROSA MARIA MARTINEZ CRUZ",
      "direccion": "Calle: CL 47CNORTE Placa: 2AN-65 Apto: CASA Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "OBFM58",
      "zona": 508582,
      "regional": "RVA",
      "latitud": 3.47931,
      "longitud": -76.51211,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "DIGITAL",
      "canal2": "ECOMMERCE ASISTIDO",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "CASTILLO GARCIA JOHANN",
      "codigo_asesor": "14659626",
      "confirmacion": "si",
      "confir_resultado": "ADELANTO",
      "despac_causa": "Completar visita sistema",
      "despac_gestion": "Visita completada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 0,
      "tiempo_viaje_minutos": 0,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466462967_O_CO_761",
      "external_id": "10307215",
      "tecnico": "EVILEY ALBERTO SERNA OROZCO",
      "fecha": "2026-03-09",
      "inicio": "15:48",
      "fin": "16:27",
      "cliente": "ANTONIO DU HERNANDEZ QUIBONO",
      "direccion": "Calle: CL 29ANORTE Placa: 7A-09 Apto: CASA Com: POP Div: RVA",
      "ciudad": "POPAYAN",
      "nodo": "OBFO39",
      "zona": 507572,
      "regional": "RVA",
      "latitud": 2.46163,
      "longitud": -76.58711,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "CHITOYEISON EDUARDO",
      "codigo_asesor": "60988984",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 39,
      "tiempo_viaje_minutos": 41,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "466315586_O_CO_23",
      "external_id": "1113519426",
      "tecnico": "DIEGO FERNANDO LOPEZ ALTAMIRANO",
      "fecha": "2026-03-07",
      "inicio": "08:24",
      "fin": "09:51",
      "cliente": "JHOINER FORI",
      "direccion": "Calle: CL 55A Placa: 42B-57 Apto: PISO1 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "F4M1",
      "zona": 508584,
      "regional": "RVA",
      "latitud": 3.39966,
      "longitud": -76.50363,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "DIEGO ANDRES SOTO MART",
      "codigo_asesor": "34399048",
      "confirmacion": "si",
      "confir_resultado": "NO CONTACTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 87,
      "tiempo_viaje_minutos": 29,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "464883796_O_CO_7",
      "external_id": "1130644042",
      "tecnico": "JAIME IBARGUEN ANGULO",
      "fecha": "2026-02-17",
      "inicio": "16:22",
      "fin": "18:50",
      "cliente": "LILIANA MA BUENO",
      "direccion": "Calle: CL 31A Placa: 33B-11 Apto:  PI1-102 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "L3S",
      "zona": 508582,
      "regional": "RVA",
      "latitud": 3.42259,
      "longitud": -76.51298,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "EDWIN ANDRES HERNANDEZ",
      "codigo_asesor": "21828686",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Completar visita sistema",
      "despac_gestion": "Visita completada",
      "num_reprogramaciones": 1,
      "estado_sla": "NODATA",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 148,
      "tiempo_viaje_minutos": 33,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "465127332_O_CO_761",
      "external_id": "1112100607",
      "tecnico": "JORGE LUIS HENAO SALAZAR",
      "fecha": "2026-02-19",
      "inicio": "17:06",
      "fin": "18:15",
      "cliente": "MARiA FELI MOSQUERA",
      "direccion": "Calle: DG 1A Placa: T1-38 Apto: PISO2 Com: CGO Div: REC",
      "ciudad": "CARTAGO",
      "nodo": "CTDE15",
      "zona": 507578,
      "regional": "REC",
      "latitud": 4.75579,
      "longitud": -75.90071,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "ERIKA PAOLA ESPINOSA V",
      "codigo_asesor": "6294145",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 69,
      "tiempo_viaje_minutos": 0,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "464527565_O_CO_23",
      "external_id": "1061541436",
      "tecnico": "JHEFRY GABRIEL DUQUE MACA",
      "fecha": "2026-02-10",
      "inicio": "07:05",
      "fin": "08:23",
      "cliente": "LEANDRO CALDERON VELASCO",
      "direccion": "Calle: CL 72A Placa: 27A-04 Apto: PI1-101 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "CPE1",
      "zona": 508582,
      "regional": "RVA",
      "latitud": 3.43028,
      "longitud": -76.49539,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "ESTEBAN CALLE CHAVARRI",
      "codigo_asesor": "10066299",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 78,
      "tiempo_viaje_minutos": 12,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466078975_O_CO_23",
      "external_id": "1075270238",
      "tecnico": "JAVIER DELGADO CEDEO",
      "fecha": "2026-03-04",
      "inicio": "14:52",
      "fin": "16:46",
      "cliente": "EDNA VIOLE ZEA CHAVARRO",
      "direccion": "Calle: CL 31 Placa: 6-47 Apto: PI2-201 Com: NEI Div: RCE",
      "ciudad": "NEIVA",
      "nodo": "TM1",
      "zona": 506564,
      "regional": "RCE",
      "latitud": 2.94576,
      "longitud": -75.29134,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "FAVIO VEGA DOCTOR",
      "codigo_asesor": "7699003",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 114,
      "tiempo_viaje_minutos": 39,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "464838439_O_CO_12",
      "external_id": "1112229027",
      "tecnico": "ORTIZ SALAZAR JEAN CARLOS",
      "fecha": "2026-02-14",
      "inicio": "08:02",
      "fin": "08:46",
      "cliente": "JANER HURTADO",
      "direccion": "Calle: CL 10 Placa: 13A-07 Apto: PI1-LC101 Com: FLR Div: RVA",
      "ciudad": "FLORIDA",
      "nodo": "KAN2F",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 3.32337,
      "longitud": -76.23116,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Pymes",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Pymes",
      "asesor": "FLOREZ CARLOS ARTURO",
      "codigo_asesor": "21419971",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 44,
      "tiempo_viaje_minutos": 1,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465661452_O_CO_7",
      "external_id": "1070606593",
      "tecnico": "JESUS ALFREDO RODRIGUEZ MORA",
      "fecha": "2026-02-25",
      "inicio": "14:23",
      "fin": "15:20",
      "cliente": "JASMITH ROMERO",
      "direccion": "Calle: CR 5 Placa: 10-28 Apto:  PISO1 Com: FLA Div: RCE",
      "ciudad": "FLANDES",
      "nodo": "QTO3F",
      "zona": 506561,
      "regional": "RCE",
      "latitud": 4.28861,
      "longitud": -74.81186,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "GOMEZ VILLANUEVA HAROL",
      "codigo_asesor": "11205789",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "NODATA",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 57,
      "tiempo_viaje_minutos": 9,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "466189955_O_CO_1381",
      "external_id": "1077421194",
      "tecnico": "HERBIN ARLEY MURILLO MOSQUERA",
      "fecha": "2026-03-07",
      "inicio": "08:53",
      "fin": "09:18",
      "cliente": "AURA CECIL MUNOZ MARTINEZ",
      "direccion": "Calle: CR 1B3 Placa: 61A-31 Apto: CASA Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "B2Q3F",
      "zona": 508582,
      "regional": "RVA",
      "latitud": 3.47613,
      "longitud": -76.49524,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "TELEFONICO SERVICIO",
      "canal2": "SAC",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "BROWNFIELD",
      "asesor": "GONZALEZ CESPEDES JUAN",
      "codigo_asesor": "1060730",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 25,
      "tiempo_viaje_minutos": 27,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "464834143_O_CO_761",
      "external_id": "1193520340",
      "tecnico": "JHON JAIRO GARCIA TORRES",
      "fecha": "2026-02-17",
      "inicio": "13:00",
      "fin": "13:21",
      "cliente": "SANDRA MIL MURILLO",
      "direccion": "Calle: CL 57A Placa: 53-40 Apto:  CASA Com: SEV Div: RVA",
      "ciudad": "SEVILLA",
      "nodo": "SEVIG7",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 4.2702,
      "longitud": -75.93624,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK IN BOUND",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "GUZMAN VELA SEBASTIAN",
      "codigo_asesor": "1051831",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "NODATA",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 21,
      "tiempo_viaje_minutos": 0,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "464834143_O_CO_761",
      "external_id": "1144163538",
      "tecnico": "CARLOS FABIAN LEIVA CRUZ",
      "fecha": "2026-02-16",
      "inicio": "13:17",
      "fin": "15:11",
      "cliente": "SANDRA MIL MURILLO",
      "direccion": "Calle: CL 57A Placa: 53-40 Apto:  CASA Com: SEV Div: RVA",
      "ciudad": "SEVILLA",
      "nodo": "SEVIG7",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 4.2702,
      "longitud": -75.93624,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK IN BOUND",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "GUZMAN VELA SEBASTIAN",
      "codigo_asesor": "1051831",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "NODATA",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 114,
      "tiempo_viaje_minutos": 6,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "466175756_O_CO_23",
      "external_id": "1144175992",
      "tecnico": "JEFERSON ANDRES MORALES CIFUENTES",
      "fecha": "2026-03-05",
      "inicio": "12:33",
      "fin": "13:18",
      "cliente": "ALVARO JOS MINA ZAPATA",
      "direccion": "Calle: CL 49 TORRE 1 Placa: 112-25 Apto: 403 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "NVE1",
      "zona": 508584,
      "regional": "RVA",
      "latitud": 3.35569,
      "longitud": -76.51485,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "HAIDER DAVID MEDINA CA",
      "codigo_asesor": "39426478",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 45,
      "tiempo_viaje_minutos": 8,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "466279090_O_CO_23",
      "external_id": "10754848",
      "tecnico": "ALEX JOVANNY VICTORIA PECHENE",
      "fecha": "2026-03-07",
      "inicio": "16:00",
      "fin": "16:29",
      "cliente": "DARLYN SLE LIEBANO ORTIZ",
      "direccion": "Calle: CL 36 Placa: 13-03 Apto: PI2-201 Com: PAL Div: RVA",
      "ciudad": "PALMIRA",
      "nodo": "4SP",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 3.53235,
      "longitud": -76.28574,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "HERNANDEZ PERALTA JONA",
      "codigo_asesor": "14697794",
      "confirmacion": "si",
      "confir_resultado": "ADELANTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 29,
      "tiempo_viaje_minutos": 14,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465113594_O_CO_7",
      "external_id": "4668764",
      "tecnico": "ARY ROBERTO GOMEZ GUAMPE",
      "fecha": "2026-02-19",
      "inicio": "16:24",
      "fin": "17:43",
      "cliente": "GLORIA ESP VICTORIAA",
      "direccion": "Calle: CR 27 Placa: 16B-06 Apto: PISO1 Com: POP Div: RVA",
      "ciudad": "POPAYAN",
      "nodo": "VGE",
      "zona": 507572,
      "regional": "RVA",
      "latitud": 2.44524,
      "longitud": -76.62579,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "AGENTES",
      "canal2": "PDV",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "HOMEN BURBANO CLAUDIA",
      "codigo_asesor": "61751151",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 79,
      "tiempo_viaje_minutos": 57,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "464787498_O_CO_23",
      "external_id": "1085247057",
      "tecnico": "JAIME EDWIN CAMPAA",
      "fecha": "2026-02-13",
      "inicio": "10:29",
      "fin": "11:18",
      "cliente": "YAMILE FER RIVERA",
      "direccion": "Calle: LA MINGA Placa: MZ21-C12 Apto:  PISO2 Com: PAS Div: RVA",
      "ciudad": "PASTO",
      "nodo": "TOG3B",
      "zona": 507573,
      "regional": "RVA",
      "latitud": null,
      "longitud": null,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK IN BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "JAIR PALACIO NIEVES",
      "codigo_asesor": "2024061",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "NODATA",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 49,
      "tiempo_viaje_minutos": 48,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "464555634_O_CO_23",
      "external_id": "1130653107",
      "tecnico": "MONCAYO EDDIER MORA",
      "fecha": "2026-02-10",
      "inicio": "10:50",
      "fin": "11:47",
      "cliente": "SHIRLEY LI MAMIAN GOMEZ",
      "direccion": "Calle: CR 42A1 Placa: 38-82 Apto: CASA Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "UVU",
      "zona": 508584,
      "regional": "RVA",
      "latitud": 3.41161,
      "longitud": -76.51332,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "JANIRIA BERNAL JIMENEZ",
      "codigo_asesor": "29993967",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 57,
      "tiempo_viaje_minutos": 14,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "464934946_O_CO_7",
      "external_id": "1070606593",
      "tecnico": "JESUS ALFREDO RODRIGUEZ MORA",
      "fecha": "2026-02-16",
      "inicio": "09:50",
      "fin": "10:21",
      "cliente": "INDER IGNA IBANEZ",
      "direccion": "Calle: CR 11 Placa: 21-90 Apto:  PI1-101 Com: ESP Div: RCE",
      "ciudad": "ESPINAL",
      "nodo": "ESV",
      "zona": 506561,
      "regional": "RCE",
      "latitud": 4.14186,
      "longitud": -74.89393,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "JEFERSON RODRIGUEZ ROM",
      "codigo_asesor": "69925728",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "EN INCUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 31,
      "tiempo_viaje_minutos": 21,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "464824391_O_CO_23",
      "external_id": "1061719966",
      "tecnico": "DILERMANDO ULCUE ACHIPIZ",
      "fecha": "2026-02-14",
      "inicio": "16:58",
      "fin": "18:13",
      "cliente": "CARMELA DELGADO CARVAJAL",
      "direccion": "Calle: CR 12 Placa: 31-59 Apto: PI1-101 Com: POP Div: RVA",
      "ciudad": "POPAYAN",
      "nodo": "LMV1",
      "zona": 507572,
      "regional": "RVA",
      "latitud": 2.42284,
      "longitud": -76.61532,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "JHOANA PAOLA VARON BE",
      "codigo_asesor": "998039",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 75,
      "tiempo_viaje_minutos": 17,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "TT"
    },
    {
      "orden": "464767521_O_CO_7",
      "external_id": "1114837203",
      "tecnico": "ANGEL HERRERA GUZMAN LUIS",
      "fecha": "2026-02-16",
      "inicio": "09:28",
      "fin": "09:59",
      "cliente": "MARIA YUSL SANCHEZ",
      "direccion": "Calle: CL 55A Placa: 41-12 Apto:  PI1-101 Com: PAL Div: RVA",
      "ciudad": "PALMIRA",
      "nodo": "OS3",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 3.54705,
      "longitud": -76.31233,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "JHONN JAIRO ORTEGA PER",
      "codigo_asesor": "59907987",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "NODATA",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 31,
      "tiempo_viaje_minutos": 17,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "464892202_O_CO_7",
      "external_id": "11220981",
      "tecnico": "HECTOR VICENTE MARQUEZ BARRETO",
      "fecha": "2026-02-14",
      "inicio": "10:36",
      "fin": "11:22",
      "cliente": "JOSE AGUST LUNA",
      "direccion": "Calle: CONDOMINIO PAKISTAN1   Placa: 0-00 Apto:  CASA71 Com: FLA Div: RCE",
      "ciudad": "FLANDES",
      "nodo": "PAK",
      "zona": 506561,
      "regional": "RCE",
      "latitud": 4.2677,
      "longitud": -74.81443,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "PDV",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "JOAN MAURICIO GARCIA Q",
      "codigo_asesor": "17165567",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 46,
      "tiempo_viaje_minutos": 6,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "466055628_O_CO_23",
      "external_id": "16897444",
      "tecnico": "ZAMBRANO ALEXANDER MUNOZ",
      "fecha": "2026-03-04",
      "inicio": "12:03",
      "fin": "13:05",
      "cliente": "DARLYN SLE LIEVANO ORTIZ",
      "direccion": "Calle: CL 36 Placa: 13-03 Apto: PI2-201 Com: PAL Div: RVA",
      "ciudad": "PALMIRA",
      "nodo": "4SP",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 3.53235,
      "longitud": -76.28574,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "JOHANA ROSERO PERENGUE",
      "codigo_asesor": "13631959",
      "confirmacion": "si",
      "confir_resultado": "ADELANTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 62,
      "tiempo_viaje_minutos": 32,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465963361_O_CO_7",
      "external_id": "10754848",
      "tecnico": "ALEX JOVANNY VICTORIA PECHENE",
      "fecha": "2026-03-02",
      "inicio": "14:01",
      "fin": "15:52",
      "cliente": "MARIA LAUR ARAGON",
      "direccion": "Calle: CL 35A Placa: 9-61 Apto:  PI1-102 Com: PAL Div: RVA",
      "ciudad": "PALMIRA",
      "nodo": "JOS",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 3.5314,
      "longitud": -76.2825,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "JOHANA ROSERO PERENGUE",
      "codigo_asesor": "13631959",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "EN INCUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "2",
      "duracion_minutos": 111,
      "tiempo_viaje_minutos": 26,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "465076685_O_CO_23",
      "external_id": "1113638086",
      "tecnico": "MERA GIOVANNY TORRES",
      "fecha": "2026-02-19",
      "inicio": "15:16",
      "fin": "17:26",
      "cliente": "SANDRA MIL RUIZ",
      "direccion": "Calle: CL 54A Placa: 44-04 Apto:  PISO2 Com: PAL Div: RVA",
      "ciudad": "PALMIRA",
      "nodo": "OS4",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 3.54664,
      "longitud": -76.31572,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "JOHANA ROSERO PERENGUE",
      "codigo_asesor": "13631959",
      "confirmacion": "no",
      "confir_resultado": "REPROGRAMADA",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "NODATA",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 130,
      "tiempo_viaje_minutos": 43,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465707661_O_CO_23",
      "external_id": "1118364131",
      "tecnico": "JOEL ANDREY QUIROGA SANCHEZ",
      "fecha": "2026-02-25",
      "inicio": "16:35",
      "fin": "17:44",
      "cliente": "JOSE ANGEL GUAYARA",
      "direccion": "Calle: CR 9 Placa: 20-03 Apto:  CASA Com: FLE Div: RCE",
      "ciudad": "FLORENCIA",
      "nodo": "HPI",
      "zona": 506564,
      "regional": "RCE",
      "latitud": 1.61984,
      "longitud": -75.61236,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "JOSE LUIS OLARTE NOREN",
      "codigo_asesor": "1726",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "EN INCUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "1",
      "duracion_minutos": 69,
      "tiempo_viaje_minutos": 12,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "465797366_O_CO_761",
      "external_id": "1004134308",
      "tecnico": "JOHNNY RODRIGO DE LA CRUZ DIAZ",
      "fecha": "2026-02-27",
      "inicio": "11:13",
      "fin": "13:41",
      "cliente": "JONATHAN BOLANOS INSUASTY",
      "direccion": "Calle: LAS VIOLETAS2 Placa: MZB-C1 Apto: CASA Com: PAS Div: RVA",
      "ciudad": "PASTO",
      "nodo": "OBFJ39",
      "zona": 507573,
      "regional": "RVA",
      "latitud": null,
      "longitud": null,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "KATHERIN DAZA IBARRA",
      "codigo_asesor": "85283041",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 148,
      "tiempo_viaje_minutos": 35,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "466197423_O_CO_7",
      "external_id": "1006502950",
      "tecnico": "JANYER VALENZUELA GARZON",
      "fecha": "2026-03-05",
      "inicio": "14:02",
      "fin": "15:38",
      "cliente": "WILFREDO ESCARPETA CARVAJAL",
      "direccion": "Calle: TR 5B Placa: 11-58 Apto: CASA Com: FLE Div: RCE",
      "ciudad": "FLORENCIA",
      "nodo": "XX1",
      "zona": 506564,
      "regional": "RCE",
      "latitud": 1.61164,
      "longitud": -75.60822,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK IN BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "LEON RIANO JOHAN SAMUE",
      "codigo_asesor": "14267828",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 96,
      "tiempo_viaje_minutos": 8,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "464638513_O_CO_7",
      "external_id": "1113638086",
      "tecnico": "MERA GIOVANNY TORRES",
      "fecha": "2026-02-11",
      "inicio": "15:10",
      "fin": "15:43",
      "cliente": "BEATRIZ MURILLO",
      "direccion": "Calle: CL 58B Placa: 39-37 Apto:  PI1-101 Com: PAL Div: RVA",
      "ciudad": "PALMIRA",
      "nodo": "OS2",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 3.54879,
      "longitud": -76.31053,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "PDV",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "LUIS ADOLFO VALENCIA R",
      "codigo_asesor": "11789169",
      "confirmacion": "si",
      "confir_resultado": "NO CONTACTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "NODATA",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 33,
      "tiempo_viaje_minutos": 3,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466039842_O_CO_7",
      "external_id": "1081182143",
      "tecnico": "SANTIAGO ACUA LOSADA",
      "fecha": "2026-03-04",
      "inicio": "07:25",
      "fin": "08:19",
      "cliente": "ENI GUTIERREZ",
      "direccion": "Calle: CL 3A Placa: 34-58 Apto:  PI1-IN1 Com: NEI Div: RCE",
      "ciudad": "NEIVA",
      "nodo": "SPU1",
      "zona": 506564,
      "regional": "RCE",
      "latitud": 2.92611,
      "longitud": -75.26306,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "LUIS EDUARDO VILLAFANE",
      "codigo_asesor": "31644135",
      "confirmacion": "si",
      "confir_resultado": "NO CONTACTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "NODATA",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 54,
      "tiempo_viaje_minutos": 27,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466039842_O_CO_7",
      "external_id": "1075247468",
      "tecnico": "FREDDY AVILES SANCHEZ",
      "fecha": "2026-03-03",
      "inicio": "16:01",
      "fin": "17:58",
      "cliente": "ENI GUTIERREZ HERNANDEZ",
      "direccion": "Calle: CL 3A Placa: 34-58 Apto: PI1-IN1 Com: NEI Div: RCE",
      "ciudad": "NEIVA",
      "nodo": "SPU1",
      "zona": 506564,
      "regional": "RCE",
      "latitud": 2.92611,
      "longitud": -75.26306,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "LUIS EDUARDO VILLAFANE",
      "codigo_asesor": "31644135",
      "confirmacion": "si",
      "confir_resultado": "NO CONTACTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 117,
      "tiempo_viaje_minutos": 12,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466074185_O_CO_761",
      "external_id": "1086279119",
      "tecnico": "OSCAR ALONSO MONTOYA MANRIQUE",
      "fecha": "2026-03-04",
      "inicio": "10:31",
      "fin": "11:15",
      "cliente": "EDGAR QUIROGA BATISTA",
      "direccion": "Calle: CL 34 Placa: 1BN-61 Apto: CASA Com: CGO Div: REC",
      "ciudad": "CARTAGO",
      "nodo": "CT13",
      "zona": 507578,
      "regional": "REC",
      "latitud": 4.76256,
      "longitud": -75.93328,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "MAESTRE BIRRIEL ELISA",
      "codigo_asesor": "527496",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 44,
      "tiempo_viaje_minutos": 0,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "465992264_O_CO_761",
      "external_id": "1059706835",
      "tecnico": "SEBASTIAN GUTIERREZ MORALES",
      "fecha": "2026-03-03",
      "inicio": "14:27",
      "fin": "15:28",
      "cliente": "EDGAR QUIROGA BAUTISTA",
      "direccion": "Calle: CL 34 Placa: 1BN-61 Apto: CASA Com: CGO Div: REC",
      "ciudad": "CARTAGO",
      "nodo": "CT13",
      "zona": 507578,
      "regional": "REC",
      "latitud": 4.76256,
      "longitud": -75.93328,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "MAESTRE BIRRIEL ELISA",
      "codigo_asesor": "527496",
      "confirmacion": "si",
      "confir_resultado": "NO CONTACTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 61,
      "tiempo_viaje_minutos": 7,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "NO CONTACTO"
    },
    {
      "orden": "465130428_O_CO_23",
      "external_id": "1112299805",
      "tecnico": "MILTON ANDRES AGUDELO RAMIREZ",
      "fecha": "2026-02-20",
      "inicio": "10:22",
      "fin": "11:17",
      "cliente": "ANGIE ALEJ BALTAN",
      "direccion": "Calle: CR 15B Placa: 31-38 Apto:  PISO2 Com: BUG Div: RVA",
      "ciudad": "BUGA",
      "nodo": "MTN1",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 3.92005,
      "longitud": -76.29573,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "MARIA CAROLINA PENA RA",
      "codigo_asesor": "31640336",
      "confirmacion": "no",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "EN INCUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "19",
      "duracion_minutos": 55,
      "tiempo_viaje_minutos": 2,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465828876_O_CO_23",
      "external_id": "719199",
      "tecnico": "JOSE ADOLFO TORRES TORRES",
      "fecha": "2026-02-28",
      "inicio": "10:10",
      "fin": "12:13",
      "cliente": "JANETH MAMIAN",
      "direccion": "Calle: CR 26P Placa: 87-04 Apto: PI1-101 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "MQ2",
      "zona": 508582,
      "regional": "RVA",
      "latitud": 3.42595,
      "longitud": -76.4802,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Basica Bi",
      "asesor": "MIGUEL ANGEL LOPEZ ARE",
      "codigo_asesor": "15071076",
      "confirmacion": "si",
      "confir_resultado": "ADELANTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 123,
      "tiempo_viaje_minutos": 47,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465793910_O_CO_761",
      "external_id": "1085323870",
      "tecnico": "ANDERSON ALDAIR GUERRERO CHANA",
      "fecha": "2026-02-27",
      "inicio": "11:09",
      "fin": "11:53",
      "cliente": "MONICA VAN DAVILA CAICEDO",
      "direccion": "Calle: CR 22 Placa: 22-14 Apto: 505 Com: PAS Div: RVA",
      "ciudad": "PASTO",
      "nodo": "OBFX36",
      "zona": 507573,
      "regional": "RVA",
      "latitud": 1.21386,
      "longitud": -77.27452,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "MILLER SANTACRUZ NARVA",
      "codigo_asesor": "85298071",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 44,
      "tiempo_viaje_minutos": 28,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "465285415_O_CO_761",
      "external_id": "1113529388",
      "tecnico": "ANDERSON ELESVAN VALENCIA AGUIRRE",
      "fecha": "2026-02-24",
      "inicio": "07:32",
      "fin": "09:30",
      "cliente": "DEICY YINE CARDOZO LOZANO",
      "direccion": "Calle: CL 20A Placa: 14-125 Apto: PI1-101 Com: CAN Div: RVA",
      "ciudad": "CANDELARIA",
      "nodo": "OCDIQB",
      "zona": 507578,
      "regional": "RVA",
      "latitud": null,
      "longitud": null,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "MINGAN PERALTA ESTEFAN",
      "codigo_asesor": "12464812",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 118,
      "tiempo_viaje_minutos": 43,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465687278_O_CO_761",
      "external_id": "1002922640",
      "tecnico": "CENEN LEONARDO ESCOBEDO IDROBO",
      "fecha": "2026-02-27",
      "inicio": "14:20",
      "fin": "15:28",
      "cliente": "CAROLINA NAVARRETE SALAZAR",
      "direccion": "Calle: CR 81D Placa: 35-24 Apto: PI1-101 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "OCDJOQ",
      "zona": 508584,
      "regional": "RVA",
      "latitud": 3.38667,
      "longitud": -76.52164,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "MORALES BRITNEY DAYAN",
      "codigo_asesor": "5927609",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 68,
      "tiempo_viaje_minutos": 18,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "CAROLINA NAVARRETE SALAZAR"
    },
    {
      "orden": "465959703_O_CO_761",
      "external_id": "1112100607",
      "tecnico": "JORGE LUIS HENAO SALAZAR",
      "fecha": "2026-03-02",
      "inicio": "14:20",
      "fin": "16:14",
      "cliente": "JESSICA AN MONTOYA CASTRILLON",
      "direccion": "Calle: EL LIMONAR Placa: MZG-C1 Apto: CASA Com: CGO Div: REC",
      "ciudad": "CARTAGO",
      "nodo": "CTCG93",
      "zona": 507578,
      "regional": "REC",
      "latitud": 4.74291,
      "longitud": -75.92473,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "MORALES HERNANDEZ MONI",
      "codigo_asesor": "309774",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 114,
      "tiempo_viaje_minutos": 11,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "464836953_O_CO_7",
      "external_id": "12747298",
      "tecnico": "JORGE ALEXANDER LOPEZ ORTEGA",
      "fecha": "2026-02-14",
      "inicio": "12:41",
      "fin": "13:04",
      "cliente": "ARIANA ARENDS ROBLES",
      "direccion": "Calle: VILLA COLOMBIA Placa: MZC-C7 Apto: PI2-201 Com: PAS Div: RVA",
      "ciudad": "PASTO",
      "nodo": "DIA",
      "zona": 507573,
      "regional": "RVA",
      "latitud": null,
      "longitud": null,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "MOSQUERA AREVALO JOHN",
      "codigo_asesor": "12745688",
      "confirmacion": "si",
      "confir_resultado": "NO CONTACTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "4",
      "duracion_minutos": 23,
      "tiempo_viaje_minutos": 20,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466221197_O_CO_761",
      "external_id": "1061822538",
      "tecnico": "BRAYAN ANDRES PEA ZUIGA",
      "fecha": "2026-03-06",
      "inicio": "07:51",
      "fin": "09:04",
      "cliente": "JESSICA MOLANO",
      "direccion": "Calle: CR 6   Placa: 45N-73 Apto:  PI2-203 Com: POP Div: RVA",
      "ciudad": "POPAYAN",
      "nodo": "OBFO24",
      "zona": 507572,
      "regional": "RVA",
      "latitud": 2.46825,
      "longitud": -76.57873,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "ONATE MEJIA JESUS ALEX",
      "codigo_asesor": "87101846",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 73,
      "tiempo_viaje_minutos": 47,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465165360_O_CO_761",
      "external_id": "1085942474",
      "tecnico": "MARC ANTONY INAGAN PINCHAO",
      "fecha": "2026-02-23",
      "inicio": "08:04",
      "fin": "08:52",
      "cliente": "LUIS FELIP SALCEDO",
      "direccion": "Calle: CL 29 Placa: 6E-53 Apto:  101 Com: IPI Div: RVA",
      "ciudad": "IPIALES",
      "nodo": "IPIPE9",
      "zona": 507573,
      "regional": "RVA",
      "latitud": 0.82757,
      "longitud": -77.65905,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "OSCAR LEONARDO PARRADO",
      "codigo_asesor": "85928553",
      "confirmacion": "no",
      "confir_resultado": "ADELANTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "NODATA",
      "sla_horas": 36,
      "sla_cumplimiento": "NODATA",
      "duracion_minutos": 48,
      "tiempo_viaje_minutos": 62,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465165360_O_CO_761",
      "external_id": "1085942474",
      "tecnico": "MARC ANTONY INAGAN PINCHAO",
      "fecha": "2026-02-20",
      "inicio": "16:30",
      "fin": "17:25",
      "cliente": "LUIS FELIP SALCEDO VELASCO",
      "direccion": "Calle: CL 29 Placa: 6E-53 Apto: 101 Com: IPI Div: RVA",
      "ciudad": "IPIALES",
      "nodo": "IPIPE9",
      "zona": 507573,
      "regional": "RVA",
      "latitud": 0.82757,
      "longitud": -77.65905,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "OSCAR LEONARDO PARRADO",
      "codigo_asesor": "85928553",
      "confirmacion": "si",
      "confir_resultado": "NO CONTACTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 55,
      "tiempo_viaje_minutos": 16,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466025766_O_CO_7",
      "external_id": "1061822538",
      "tecnico": "BRAYAN ANDRES PEA ZUIGA",
      "fecha": "2026-03-03",
      "inicio": "15:54",
      "fin": "16:41",
      "cliente": "MARIA JOSE RINCON",
      "direccion": "Calle: CR 30 Placa: 6-86 Apto:  PI1-102 Com: POP Div: RVA",
      "ciudad": "POPAYAN",
      "nodo": "JSE2D",
      "zona": 507572,
      "regional": "RVA",
      "latitud": 2.44794,
      "longitud": -76.62684,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "PENA MORENO DANIEL FEL",
      "codigo_asesor": "10029962",
      "confirmacion": "no",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "EN INCUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "5",
      "duracion_minutos": 47,
      "tiempo_viaje_minutos": 57,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "464993367_O_CO_7",
      "external_id": "1075270238",
      "tecnico": "JAVIER DELGADO CEDEO",
      "fecha": "2026-02-17",
      "inicio": "14:21",
      "fin": "15:49",
      "cliente": "AMPARO CHAVARRO PEREZ",
      "direccion": "Calle: CR 13 Placa: 12-47 Apto: PISO1 Com: NEI Div: RCE",
      "ciudad": "NEIVA",
      "nodo": "1LT",
      "zona": 506564,
      "regional": "RCE",
      "latitud": 2.93216,
      "longitud": -75.28245,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "POLANIA MONTERO LUISA",
      "codigo_asesor": "75249868",
      "confirmacion": "si",
      "confir_resultado": "ADELANTO",
      "despac_causa": "Completar visita sistema",
      "despac_gestion": "Visita completada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 88,
      "tiempo_viaje_minutos": 43,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465449332_O_CO_12",
      "external_id": "1113620334",
      "tecnico": "JHON JAIRO MAMIAN VELASCO",
      "fecha": "2026-02-25",
      "inicio": "07:13",
      "fin": "08:39",
      "cliente": "SEBASTIAN BOCANEGRA PANIAGUA",
      "direccion": "Calle: CL 21A Placa: 31-43 Apto: PI1-LC101 Com: PAL Div: RVA",
      "ciudad": "PALMIRA",
      "nodo": "NBN1",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 3.52025,
      "longitud": -76.30338,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Pymes",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Pymes",
      "asesor": "POTES BEDOYA LUZ AIDEE",
      "codigo_asesor": "66776076",
      "confirmacion": "si",
      "confir_resultado": "ADELANTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 86,
      "tiempo_viaje_minutos": 16,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "464799786_O_CO_761",
      "external_id": "1061768705",
      "tecnico": "CRISTIAN DANILO URRESTY ORDOEZ",
      "fecha": "2026-02-12",
      "inicio": "16:29",
      "fin": "16:57",
      "cliente": "EMMA CASTRO MEJIA",
      "direccion": "Calle: CR 15N TORRE G Placa: 8N-188 Apto: CS13-PI1 Com: POP Div: RVA",
      "ciudad": "POPAYAN",
      "nodo": "PYBF78",
      "zona": 507572,
      "regional": "RVA",
      "latitud": 2.45796,
      "longitud": -76.60547,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "PULIDO RODRIGUEZ DANIE",
      "codigo_asesor": "468127",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 28,
      "tiempo_viaje_minutos": 38,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "465956232_O_CO_761",
      "external_id": "1144163538",
      "tecnico": "CARLOS FABIAN LEIVA CRUZ",
      "fecha": "2026-03-02",
      "inicio": "11:20",
      "fin": "13:49",
      "cliente": "LEIDY TATI QUICENO TELLEZ",
      "direccion": "Calle: CL 7 Placa: 14-27 Apto: PI1-102 Com: CAI Div: RVA",
      "ciudad": "CAICEDONIA",
      "nodo": "CACE80",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 4.33081,
      "longitud": -75.82796,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "PDV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "RODAS GIRALDO JHON ALE",
      "codigo_asesor": "94903554",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 149,
      "tiempo_viaje_minutos": 28,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "465741185_O_CO_7",
      "external_id": "1110530540",
      "tecnico": "OSORIO ANTOLINEZ FRANCISCO JAVIER",
      "fecha": "2026-02-26",
      "inicio": "15:12",
      "fin": "16:28",
      "cliente": "CAROLINA GONZALEZ CASTAEDA",
      "direccion": "Calle: LOS ALPES Placa: MZF-C15 Apto: CASA Com: IBA Div: RCE",
      "ciudad": "IBAGUE",
      "nodo": "RUE",
      "zona": 506561,
      "regional": "RCE",
      "latitud": 4.45691,
      "longitud": -75.20331,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "RODRIGUEZ HERRERA ANDR",
      "codigo_asesor": "65786685",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 76,
      "tiempo_viaje_minutos": 21,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465732955_O_CO_7",
      "external_id": "1075321497",
      "tecnico": "MIGUEL ANGEL VILLARREAL MEDINA",
      "fecha": "2026-02-26",
      "inicio": "12:18",
      "fin": "12:57",
      "cliente": "JUAN SALVA ARDILA MALPICA",
      "direccion": "Calle: CL 3A Placa: 19-60 Apto: PI1-103 Com: NEI Div: RCE",
      "ciudad": "NEIVA",
      "nodo": "N1Q1",
      "zona": 506564,
      "regional": "RCE",
      "latitud": 2.92569,
      "longitud": -75.27438,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "SALINAS MORENO MARIA F",
      "codigo_asesor": "89601755",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 39,
      "tiempo_viaje_minutos": 40,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "465829823_O_CO_761",
      "external_id": "10347366",
      "tecnico": "TRUQUE RIVERA GERSAIN ANDRES",
      "fecha": "2026-02-28",
      "inicio": "11:00",
      "fin": "11:28",
      "cliente": "PAOLA ANDR MARIN BEJARANO",
      "direccion": "Calle: CR 41C Placa: 17-08 Apto: PISO2 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "XO132C",
      "zona": 508584,
      "regional": "RVA",
      "latitud": 3.41542,
      "longitud": -76.52345,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "SANCHEZ CASTILLO MARY",
      "codigo_asesor": "59447282",
      "confirmacion": "si",
      "confir_resultado": "ADELANTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 28,
      "tiempo_viaje_minutos": 37,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466211133_O_CO_761",
      "external_id": "1087130962",
      "tecnico": "JUAN CARLOS ORDOEZ SILVA",
      "fecha": "2026-03-06",
      "inicio": "15:21",
      "fin": "15:59",
      "cliente": "JHON DANNY MELO",
      "direccion": "Calle: CL 36 Placa: 34-58 Apto:  PI3-301 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "CNCLG4",
      "zona": 508582,
      "regional": "RVA",
      "latitud": 3.4205,
      "longitud": -76.50734,
      "aliado": "TABASCO OC, LLC. SUCURSAL COLOMBIA",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "SANCHEZ CUENO LUZ DAR",
      "codigo_asesor": "59165444",
      "confirmacion": "si",
      "confir_resultado": "NO CONTACTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "EN INCUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "22",
      "duracion_minutos": 38,
      "tiempo_viaje_minutos": 57,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "464730992_O_CO_761",
      "external_id": "1107085335",
      "tecnico": "EYVAR ANDRES SUAREZ VELASCO",
      "fecha": "2026-02-11",
      "inicio": "14:07",
      "fin": "14:28",
      "cliente": "CONSTANZA OSPINA SEPULVEDA",
      "direccion": "Calle: CL 33F Placa: 20-28 Apto: PISO2 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "XK1277",
      "zona": 508582,
      "regional": "RVA",
      "latitud": 3.43874,
      "longitud": -76.50871,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "SERNA VELEZ ERNESTO",
      "codigo_asesor": "7554141",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 21,
      "tiempo_viaje_minutos": 35,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "465763846_O_CO_761",
      "external_id": "1143995495",
      "tecnico": "BRAYAN ESTIVEN ARAGN KLINGER",
      "fecha": "2026-02-27",
      "inicio": "07:07",
      "fin": "10:21",
      "cliente": "JONATHAN PIEDRAHITAA BERNAL",
      "direccion": "Calle: CR 1F TORRE A Placa: 58-50 Apto: 106 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "XH0914",
      "zona": 508582,
      "regional": "RVA",
      "latitud": 3.47069,
      "longitud": -76.49701,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "PDV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "SOELIA DE JESUS MONSAL",
      "codigo_asesor": "31231151",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 194,
      "tiempo_viaje_minutos": 21,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "464898824_O_CO_7",
      "external_id": "1070614715",
      "tecnico": "MIGUEL ANGEL RODRIGUEZ ORTIZ",
      "fecha": "2026-02-17",
      "inicio": "16:52",
      "fin": "18:48",
      "cliente": "JOSE ALBER CAICEDO",
      "direccion": "Calle: VILLA LUCIA Placa: MZD-C86 Apto:  PI1-101 Com: FLA Div: RCE",
      "ciudad": "FLANDES",
      "nodo": "VLK3F",
      "zona": 506561,
      "regional": "RCE",
      "latitud": 4.27201,
      "longitud": -74.83092,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "SUAREZ RIVERA PAOLA AN",
      "codigo_asesor": "65820708",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "EN INCUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "78",
      "duracion_minutos": 116,
      "tiempo_viaje_minutos": 29,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "464898824_O_CO_7",
      "external_id": "1070598482",
      "tecnico": "OSCAR DOREL MORENO ARENAS",
      "fecha": "2026-02-16",
      "inicio": "07:46",
      "fin": "09:24",
      "cliente": "JOSE ALBER CAICEDO MSRTINEZ",
      "direccion": "Calle: VILLA LUCIA Placa: MZD-C86 Apto: PI1-101 Com: FLA Div: RCE",
      "ciudad": "FLANDES",
      "nodo": "VLK3F",
      "zona": 506561,
      "regional": "RCE",
      "latitud": 4.27201,
      "longitud": -74.83092,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "AGENTES",
      "canal2": "CALLE",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "SUAREZ RIVERA PAOLA AN",
      "codigo_asesor": "65820708",
      "confirmacion": "si",
      "confir_resultado": "NO CONTACTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 98,
      "tiempo_viaje_minutos": 2,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "464607985_O_CO_12",
      "external_id": "1070614715",
      "tecnico": "MIGUEL ANGEL RODRIGUEZ ORTIZ",
      "fecha": "2026-02-10",
      "inicio": "15:06",
      "fin": "15:42",
      "cliente": "KEVIN ANDR GERENA GALINDO",
      "direccion": "Calle: CL 11A Placa: 13-29 Apto: PI1-102 Com: ESP Div: RCE",
      "ciudad": "ESPINAL",
      "nodo": "ESZ",
      "zona": 506561,
      "regional": "RCE",
      "latitud": 4.14312,
      "longitud": -74.88407,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "Pymes",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Pymes",
      "asesor": "TORRES JIMENEZ KATHERI",
      "codigo_asesor": "23895362",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 36,
      "tiempo_viaje_minutos": 36,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466421650_O_CO_761",
      "external_id": "1002958746",
      "tecnico": "RICHAR ALIRIO PEA ZUIGA",
      "fecha": "2026-03-09",
      "inicio": "14:14",
      "fin": "15:11",
      "cliente": "MARIA CLAR SALAZAR YUTERSONKE",
      "direccion": "Calle: CR 9NORTE Placa: 14-08 Apto: PI1-101 Com: POP Div: RVA",
      "ciudad": "POPAYAN",
      "nodo": "OBFV69",
      "zona": 507572,
      "regional": "RVA",
      "latitud": 2.45355,
      "longitud": -76.6008,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK OUT BOUND",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "TORRES PAEZ LAURA SOFI",
      "codigo_asesor": "11201758",
      "confirmacion": "no",
      "confir_resultado": "",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 57,
      "tiempo_viaje_minutos": 49,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": ""
    },
    {
      "orden": "465118099_O_CO_12",
      "external_id": "16897444",
      "tecnico": "ZAMBRANO ALEXANDER MUNOZ",
      "fecha": "2026-02-20",
      "inicio": "11:44",
      "fin": "12:03",
      "cliente": "GLORIA CEC LLANO HENAO",
      "direccion": "Calle: CL 37A Placa: 27-58 Apto: PORTERIA Com: PAL Div: RVA",
      "ciudad": "PALMIRA",
      "nodo": "C96",
      "zona": 507578,
      "regional": "RVA",
      "latitud": 3.53424,
      "longitud": -76.29739,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "Pymes",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Pymes",
      "asesor": "VELANDIA MORENO ANGIE",
      "codigo_asesor": "92780057",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 72,
      "sla_cumplimiento": "0",
      "duracion_minutos": 19,
      "tiempo_viaje_minutos": 30,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466225497_O_CO_761",
      "external_id": "1047496373",
      "tecnico": "LAFISAID JIMENEZ OJEDA",
      "fecha": "2026-03-06",
      "inicio": "07:58",
      "fin": "11:09",
      "cliente": "DEICY YINE CARDOZO LOZANO",
      "direccion": "Calle: CL 20A Placa: 14-125 Apto: PI1-101 Com: CAN Div: RVA",
      "ciudad": "CANDELARIA",
      "nodo": "OCDIQB",
      "zona": 507578,
      "regional": "RVA",
      "latitud": null,
      "longitud": null,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "TELEFONICO VENTA",
      "canal2": "TMK IN BOUND",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "YESSICA ALEJANDRA AYA",
      "codigo_asesor": "26293729",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 191,
      "tiempo_viaje_minutos": 11,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "466078238_O_CO_7",
      "external_id": "1000780290",
      "tecnico": "JOSE FERNANDO GUTIERREZ CONTRERAS",
      "fecha": "2026-03-04",
      "inicio": "14:32",
      "fin": "15:28",
      "cliente": "YUSSI PAOL PALOMINO",
      "direccion": "Calle: CR 35 Placa: 38-12 Apto: PI3-301 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "1LP",
      "zona": 508582,
      "regional": "RVA",
      "latitud": 3.41942,
      "longitud": -76.50607,
      "aliado": "CICSA COLOMBIA S.A.",
      "canal": "AGENTES",
      "canal2": "EYN",
      "tipo_red": "Masivo Bidireccional",
      "tipo_actividad": "Instalaciones",
      "subtipo_orden": "Instalacion Empaquetada Bi",
      "asesor": "ZULUAGA FAJARDO LOREN",
      "codigo_asesor": "43991801",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 56,
      "tiempo_viaje_minutos": 30,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465218191_O_CO_761",
      "external_id": "1005831497",
      "tecnico": "SARA LEYDI ORTIZ OJEDA",
      "fecha": "2026-02-23",
      "inicio": "07:08",
      "fin": "08:25",
      "cliente": "VALERIA ESCOBAR",
      "direccion": "Calle: CL 75 Placa: 7BIS-83 Apto:  PI1-102 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "OBF273",
      "zona": 508582,
      "regional": "RVA",
      "latitud": null,
      "longitud": null,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "ZUNIGA RIVERA ANGELICA",
      "codigo_asesor": "44152270",
      "confirmacion": "si",
      "confir_resultado": "CONFIRMADO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 1,
      "estado_sla": "NODATA",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 77,
      "tiempo_viaje_minutos": 19,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    },
    {
      "orden": "465218191_O_CO_761",
      "external_id": "1042849412",
      "tecnico": "HAAHALI HABID MIER DE LA HOZ",
      "fecha": "2026-02-21",
      "inicio": "14:16",
      "fin": "16:02",
      "cliente": "VALERIA ESCOBAR",
      "direccion": "Calle: CL 75 Placa: 7BIS-83 Apto: PI1-102 Com: CAL Div: RVA",
      "ciudad": "CALI",
      "nodo": "OBF273",
      "zona": 508582,
      "regional": "RVA",
      "latitud": null,
      "longitud": null,
      "aliado": "CONECTAR TV S.A.S.",
      "canal": "CAV",
      "canal2": "CAV",
      "tipo_red": "FTTH",
      "tipo_actividad": "INSTALACIONES FTTH",
      "subtipo_orden": "Instalacion FTTH_",
      "asesor": "ZUNIGA RIVERA ANGELICA",
      "codigo_asesor": "44152270",
      "confirmacion": "si",
      "confir_resultado": "ADELANTO",
      "despac_causa": "Validación razon",
      "despac_gestion": "Razon validada",
      "num_reprogramaciones": 0,
      "estado_sla": "EN CUMPLIMIENTO",
      "sla_horas": 36,
      "sla_cumplimiento": "0",
      "duracion_minutos": 106,
      "tiempo_viaje_minutos": 18,
      "razon": "UNIDAD POSIBLE FRAUDE",
      "estado": "No completado",
      "persona_confirma": "Gestion IVR"
    }
  ],
  "total_casos": 74,
  "total_registros": 74,
  "confirmados": 41,
  "tasa_confirmacion": 55.4,
  "no_confirmados": 33,
  "en_cumplimiento_sla": 52,
  "tasa_cumplimiento_sla": 70.3,
  "en_incumplimiento_sla": 10,
  "con_reprogramaciones": 22,
  "tasa_reprogramacion": 29.7,
  "sin_reprogramaciones": 52,
  "aliados": {
    "CONECTAR TV S.A.S.": 39,
    "TABASCO OC, LLC. SUCURSAL COLOMBIA": 22,
    "CICSA COLOMBIA S.A.": 13
  },
  "companias": {
    "CONECTAR TV S.A.S.": 39,
    "TABASCO OC, LLC. SUCURSAL COLOMBIA": 22,
    "CICSA COLOMBIA S.A.": 13
  },
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
  "tipo_red": {
    "Masivo Bidireccional": 41,
    "FTTH": 29,
    "Pymes": 4
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
  "zonas": {
    "507578": 22,
    "507572": 10,
    "508584": 9,
    "506564": 8,
    "506561": 8,
    "508582": 11,
    "507573": 6
  },
  "regionales": {
    "RVA": 53,
    "RCE": 16,
    "REC": 5
  },
  "confir_resultados": {
    "CONFIRMADO": 23,
    "": 28,
    "NO CONTACTO": 11,
    "ADELANTO": 11,
    "REPROGRAMADA": 1
  },
  "estados_sla": {
    "EN CUMPLIMIENTO": 52,
    "EN INCUMPLIMIENTO": 10,
    "NODATA": 12
  },
  "subtipos_orden": {
    "Instalacion Basica Bi": 14,
    "Instalacion Empaquetada Bi": 27,
    "Instalacion FTTH_": 28,
    "Instalacion Pymes": 4,
    "BROWNFIELD": 1
  }
};

// ===================================
// LOAD DATA
// ===================================
async function loadFraudData() {
    try {
        // Intentar cargar datos desde JSON externo
        let response = await fetch('fraud_data.json');
        if (!response.ok) {
            // Si falla (por CORS/local), usar datos embebidos como fallback
            console.warn('No se pudo cargar fraud_data.json, usando datos embebidos');
            fraudData = EMBEDDED_FRAUD_DATA;
        } else {
            fraudData = await response.json();
        }

        // Normalizar registros para compatibilidad (camel/caps y minúsculas)
        fraudData.geo_data = (fraudData.geo_data || []).map(item => {
            const ciudad = item.Ciudad || item.ciudad || 'N/A';
            const canal = item.CANAL || item.canal || 'N/A';
            const asesor = item['Asesor comercial'] || item.asesor || 'N/A';
            const fecha = item.Fecha || item.fecha || 'N/A';
            const zona = item.Zona || item.zona || ciudad;
            const idAliado = item['ID Aliado'] || item.id_aliado || item.idAliado || '';

            return {
                ...item,
                Ciudad: ciudad,
                ciudad,
                CANAL: canal,
                canal,
                Fecha: fecha,
                fecha,
                Zona: zona,
                zona,
                'Asesor comercial': asesor,
                asesor,
                'ID Aliado': idAliado
            };
        });

        // Hacer disponible globalmente para filtros
        if (typeof window !== 'undefined') {
            window.fraudData = fraudData;
        }

        // Calcular ciudades dinámicamente desde geo_data
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
            const nombreCompania = item.aliado || companiaMap[item['ID Aliado']] || 'Desconocida';
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
    const totalRegistros = data.total_registros || data.total_casos || (data.geo_data ? data.geo_data.length : 0);
    document.getElementById('totalFraude').textContent = totalRegistros;
    document.getElementById('fraudeChange').textContent = '+12%';
    document.getElementById('canalesTotal').textContent = Object.keys(data.canal_principal).length;
    document.getElementById('zonasRiesgo').textContent = Object.keys(data.ciudades).length;
    document.getElementById('asesoresTotal').textContent = Object.keys(data.asesores).length;
    document.getElementById('detectionRate').textContent = '94.2%';
    
    // Tasa de confirmación con colores
    const tasaConf = data.tasa_confirmacion || 0;
    const tasaConfElem = document.getElementById('tasaConfirmacionTicker');
    if (tasaConfElem) {
        tasaConfElem.textContent = tasaConf.toFixed(1) + '%';
        // Color coding: < 60% = rojo, 60-80% = amarillo, > 80% = verde
        tasaConfElem.classList.remove('alert', 'warning', 'positive');
        if (tasaConf < 60) {
            tasaConfElem.classList.add('alert');
        } else if (tasaConf < 80) {
            tasaConfElem.classList.add('warning');
        } else {
            tasaConfElem.classList.add('positive');
        }
    }
    
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
        const pct = totalRegistros > 0 ? ((topCanal[1] / totalRegistros) * 100).toFixed(1) : '0.0';
        document.getElementById('topCanalPct').textContent = pct + '%';
    }
    
    // Geo stats
    document.getElementById('geoTotal').textContent = data.geo_data.length;
    
    // Find hotspot (most common city)
    const cityCounts = {};
    data.geo_data.forEach(item => {
        const ciudad = item.Ciudad || item.ciudad;
        if (ciudad) {
            cityCounts[ciudad] = (cityCounts[ciudad] || 0) + 1;
        }
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
// 6. EMBUDO DE CONFIRMACIÓN
// ===================================
function initEmbudoConfirmacion(data) {
    // Destruir gráfico existente
    if (charts.embudo) { charts.embudo.destroy(); delete charts.embudo; }
    
    const ctx = document.getElementById('embudoChart');
    if (!ctx) return;
    
    // Calcular datos del embudo
    const totalCasos = data.total_casos || 0;
    const confirmados = data.confirmados || 0;
    const confResultados = data.confir_resultados || {};
    
    // Datos para el embudo: Total → Confirmados → Resultados específicos
    const embudoData = {
        labels: ['TOTAL CASOS', 'CONFIRMADOS', 'VALIDADOS', 'SIN CONTACTO', 'ADELANTO'],
        datasets: [{
            label: 'Casos',
            data: [
                totalCasos,
                confirmados,
                confResultados['CONFIRMADO'] || 0,
                confResultados['NO CONTACTO'] || 0,
                confResultados['ADELANTO'] || 0
            ],
            backgroundColor: [
                '#6366f1',  // Total - azul
                '#10b981',  // Confirmados - verde
                '#22c55e',  // Validados - verde claro
                '#ef4444',  // Sin contacto - rojo
                '#f59e0b'   // Adelanto - naranja
            ],
            borderColor: '#1a1a1a',
            borderWidth: 2
        }]
    };
    
    const config = {
        type: 'bar',
        data: embudoData,
        options: {
            ...COMMON_OPTIONS,
            indexAxis: 'y',
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                }
            },
            plugins: {
                ...COMMON_OPTIONS.plugins,
                legend: {
                    display: false
                },
                tooltip: {
                    ...COMMON_OPTIONS.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.x;
                            const percentage = ((value / totalCasos) * 100).toFixed(1);
                            return `${value} casos (${percentage}%)`;
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: '#ffffff',
                    font: {
                        size: 11,
                        weight: 'bold',
                        family: 'Roboto Mono, monospace'
                    },
                    formatter: function(value, context) {
                        const percentage = ((value / totalCasos) * 100).toFixed(0);
                        return `${value} (${percentage}%)`;
                    },
                    anchor: 'center',
                    align: 'center'
                }
            },
            scales: {
                x: {
                    ...COMMON_OPTIONS.scales.x,
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                y: {
                    ...COMMON_OPTIONS.scales.y,
                    grid: {
                        display: false
                    },
                    ticks: {
                        ...COMMON_OPTIONS.scales.y.ticks,
                        autoSkip: false,
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    };
    
    charts.embudo = new Chart(ctx, config);
    
    // Actualizar estadísticas del footer
    const tasaConfirmacion = ((confirmados / totalCasos) * 100).toFixed(1);
    const sinContacto = confResultados['NO CONTACTO'] || 0;
    
    updateElementById('tasaConfirmacion', tasaConfirmacion + '%');
    updateElementById('sinContacto', sinContacto);
    updateElementById('confirmadosTotal', confirmados);
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

    if (typeof L === 'undefined') {
        console.warn('Leaflet no está disponible, se omite inicialización del mapa');
        updateElementById('geoTotal', (data.geo_data || []).length);
        updateElementById('geoHotspot', '--');
        return;
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
        const ciudadRaw = item.Ciudad || item.ciudad || 'N/A';
        const ciudad = String(ciudadRaw).toUpperCase();
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
    } else {
        document.getElementById('geoHotspot').textContent = '--';
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
// 8A. MATRIZ ALIADO × SLA
// ===================================
function initMatrizSlaChart(data) {
    // Destruir gráfico existente
    if (charts.matrizSla) { charts.matrizSla.destroy(); delete charts.matrizSla; }
    
    const ctx = document.getElementById('matrizSlaChart');
    if (!ctx) return;
    
    // Crear matriz cruzada de Aliado × Estado SLA
    const aliados = ['CONECTAR TV', 'TABASCO LTDA', 'CICSA'];
    const estadosSla = ['EN CUMPLIMIENTO', 'EN INCUMPLIMIENTO', 'NODATA'];
    
    // Inicializar matriz de contadores
    const matriz = {};
    aliados.forEach(aliado => {
        matriz[aliado] = {};
        estadosSla.forEach(estado => {
            matriz[aliado][estado] = 0;
        });
    });
    
    // Contar casos por aliado y estado SLA
    data.geo_data.forEach(item => {
        const aliado = item.aliado;
        const estado = item.estado_sla;
        if (matriz[aliado] && estadosSla.includes(estado)) {
            matriz[aliado][estado]++;
        }
    });
    
    // Preparar datos para gráfico de barras agrupadas
    const datasets = estadosSla.map((estado, idx) => {
        const colores = {
            'EN CUMPLIMIENTO': '#10b981',
            'EN INCUMPLIMIENTO': '#ef4444',
            'NODATA': '#6b7280'
        };
        
        return {
            label: estado,
            data: aliados.map(aliado => matriz[aliado][estado]),
            backgroundColor: colores[estado],
            borderColor: '#1a1a1a',
            borderWidth: 1
        };
    });
    
    const config = {
        type: 'bar',
        data: {
            labels: aliados,
            datasets: datasets
        },
        options: {
            ...COMMON_OPTIONS,
            plugins: {
                ...COMMON_OPTIONS.plugins,
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: FRAUD_COLORS.textColor,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 10
                        },
                        padding: 10
                    }
                },
                tooltip: {
                    ...COMMON_OPTIONS.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const estado = context.dataset.label;
                            const value = context.parsed.y;
                            return `${estado}: ${value} casos`;
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: '#ffffff',
                    font: {
                        size: 10,
                        weight: 'bold',
                        family: 'Roboto Mono, monospace'
                    },
                    formatter: function(value) {
                        return value > 0 ? value : '';
                    },
                    anchor: 'center',
                    align: 'center'
                }
            },
            scales: {
                x: {
                    ...COMMON_OPTIONS.scales.x,
                    stacked: false
                },
                y: {
                    ...COMMON_OPTIONS.scales.y,
                    beginAtZero: true,
                    stacked: false,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    };
    
    charts.matrizSla = new Chart(ctx, config);
    
    // Actualizar estadísticas del footer
    const totalIncumplimientos = data.estados_sla && data.estados_sla['EN INCUMPLIMIENTO'] || 0;
    const totalCumplimiento = data.estados_sla && data.estados_sla['EN CUMPLIMIENTO'] || 0;
    const tasaSla = totalCumplimiento + totalIncumplimientos > 0 
        ? ((totalCumplimiento / (totalCumplimiento + totalIncumplimientos)) * 100).toFixed(1) 
        : 0;
    
    updateElementById('totalIncumplimientos', totalIncumplimientos);
    updateElementById('totalCumplimiento', totalCumplimiento);
    updateElementById('tasaSla', tasaSla + '%');
}

// ===================================
// 8B. DISTRIBUCIÓN DE REPROGRAMACIONES
// ===================================
function initReprogramacionesChart(data) {
    // Destruir gráfico existente
    if (charts.reprogramaciones) { charts.reprogramaciones.destroy(); delete charts.reprogramaciones; }
    
    const ctx = document.getElementById('reprogramacionesChart');
    if (!ctx) return;
    
    // Contar reprogramaciones por aliado
    const aliados = ['CONECTAR TV', 'TABASCO LTDA', 'CICSA'];
    const reprogPorAliado = {};
    
    aliados.forEach(aliado => {
        reprogPorAliado[aliado] = {
            sin_reprog: 0,
            con_reprog: 0
        };
    });
    
    data.geo_data.forEach(item => {
        const aliado = item.aliado;
        const numReprog = item.num_reprogramaciones || 0;
        
        if (reprogPorAliado[aliado]) {
            if (numReprog > 0) {
                reprogPorAliado[aliado].con_reprog++;
            } else {
                reprogPorAliado[aliado].sin_reprog++;
            }
        }
    });
    
    const datasets = [
        {
            label: 'Sin Reprogramación',
            data: aliados.map(aliado => reprogPorAliado[aliado].sin_reprog),
            backgroundColor: '#10b981',
            borderColor: '#1a1a1a',
            borderWidth: 1
        },
        {
            label: 'Con Reprogramación',
            data: aliados.map(aliado => reprogPorAliado[aliado].con_reprog),
            backgroundColor: '#f59e0b',
            borderColor: '#1a1a1a',
            borderWidth: 1
        }
    ];
    
    const config = {
        type: 'bar',
        data: {
            labels: aliados,
            datasets: datasets
        },
        options: {
            ...COMMON_OPTIONS,
            plugins: {
                ...COMMON_OPTIONS.plugins,
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: FRAUD_COLORS.textColor,
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 10
                        },
                        padding: 10
                    }
                },
                tooltip: {
                    ...COMMON_OPTIONS.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label;
                            const value = context.parsed.y;
                            const allValues = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / allValues) * 100).toFixed(1);
                            return `${label}: ${value} casos (${percentage}%)`;
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: '#ffffff',
                    font: {
                        size: 11,
                        weight: 'bold',
                        family: 'Roboto Mono, monospace'
                    },
                    formatter: function(value) {
                        return value > 0 ? value : '';
                    },
                    anchor: 'center',
                    align: 'center'
                }
            },
            scales: {
                x: {
                    ...COMMON_OPTIONS.scales.x,
                    stacked: true
                },
                y: {
                    ...COMMON_OPTIONS.scales.y,
                    beginAtZero: true,
                    stacked: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    };
    
    charts.reprogramaciones = new Chart(ctx, config);
    
    // Actualizar estadísticas del footer
    const conReprog = data.con_reprogramaciones || 0;
    const sinReprog = data.total_casos - conReprog;
    const tasaReprog = ((conReprog / data.total_casos) * 100).toFixed(1);
    
    updateElementById('conReprog', conReprog);
    updateElementById('sinReprog', sinReprog);
    updateElementById('tasaReprog', tasaReprog + '%');
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
// 11. TABLA DE CASOS CRÍTICOS
// ===================================
function initTablaCasosCriticos(data) {
    const tbody = document.getElementById('tablaCasosCriticosBody');
    if (!tbody) return;
    
    // Filtrar casos críticos:
    // - SLA en INCUMPLIMIENTO, O
    // - Confirmación resultado = NO CONTACTO, O
    // - Número de reprogramaciones > 0
    const casosCriticos = data.geo_data.filter(item => {
        return item.estado_sla === 'EN INCUMPLIMIENTO' ||
               item.confir_resultado === 'NO CONTACTO' ||
               (item.num_reprogramaciones && item.num_reprogramaciones > 0);
    });
    
    // Ordenar por criticidad (primero los que tienen múltiples problemas)
    casosCriticos.sort((a, b) => {
        const scoreA = (a.estado_sla === 'EN INCUMPLIMIENTO' ? 1 : 0) +
                      (a.confir_resultado === 'NO CONTACTO' ? 1 : 0) +
                      ((a.num_reprogramaciones && a.num_reprogramaciones > 0) ? 1 : 0);
        const scoreB = (b.estado_sla === 'EN INCUMPLIMIENTO' ? 1 : 0) +
                      (b.confir_resultado === 'NO CONTACTO' ? 1 : 0) +
                      ((b.num_reprogramaciones && b.num_reprogramaciones > 0) ? 1 : 0);
        return scoreB - scoreA;
    });
    
    // Generar filas de la tabla
    tbody.innerHTML = casosCriticos.map((item, index) => {
        const slaClass = item.estado_sla === 'EN INCUMPLIMIENTO' ? 'style="color: #ef4444; font-weight: bold;"' : '';
        const confirClass = item.confir_resultado === 'NO CONTACTO' ? 'style="color: #f59e0b; font-weight: bold;"' : '';
        const reprogClass = item.num_reprogramaciones > 0 ? 'style="color: #f59e0b; font-weight: bold;"' : '';
        
        return `
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); ${index % 2 === 0 ? 'background: rgba(255, 255, 255, 0.02);' : ''}">
                <td style="padding: 8px;">${item.orden || 'N/A'}</td>
                <td style="padding: 8px;">${item.fecha || 'N/A'}</td>
                <td style="padding: 8px;">${item.ciudad || 'N/A'}</td>
                <td style="padding: 8px;">${item.aliado || 'N/A'}</td>
                <td style="padding: 8px;" ${slaClass}>${item.estado_sla || 'NODATA'}</td>
                <td style="padding: 8px;" ${confirClass}>${item.confir_resultado || 'N/A'}</td>
                <td style="padding: 8px;" ${reprogClass}>${item.num_reprogramaciones || 0}</td>
                <td style="padding: 8px;">${item.canal || 'N/A'}</td>
                <td style="padding: 8px; font-size: 10px;">${item.asesor ? (item.asesor.length > 20 ? item.asesor.substring(0, 18) + '...' : item.asesor) : 'N/A'}</td>
            </tr>
        `;
    }).join('');
    
    // Actualizar estadísticas
    const slaIncumplidos = casosCriticos.filter(c => c.estado_sla === 'EN INCUMPLIMIENTO').length;
    const sinContacto = casosCriticos.filter(c => c.confir_resultado === 'NO CONTACTO').length;
    const reprogramados = casosCriticos.filter(c => c.num_reprogramaciones > 0).length;
    
    updateElementById('totalCasosCriticos', casosCriticos.length);
    updateElementById('criticosSla', slaIncumplidos);
    updateElementById('criticosSinContacto', sinContacto);
    updateElementById('criticosReprog', reprogramados);
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
// HELPER FUNCTIONS
// ===================================
function updateElementById(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    } else {
        console.warn(`Element with ID '${elementId}' not found`);
    }
}

function safeInitChart(name, initFn, data) {
    try {
        initFn(data);
    } catch (error) {
        console.error(`Error inicializando ${name}:`, error);
    }
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
    safeInitChart('CanalChart', initCanalChart, data);
    safeInitChart('Canal2Chart', initCanal2Chart, data);
    safeInitChart('AsesorList', initAsesorList, data);
    safeInitChart('RazonChart', initRazonChart, data);
    safeInitChart('EmbudoConfirmacion', initEmbudoConfirmacion, data);
    safeInitChart('GeoHeatmap', initGeoHeatmap, data);
    safeInitChart('AliadoChart', initAliadoChart, data);
    safeInitChart('MatrizSlaChart', initMatrizSlaChart, data);
    safeInitChart('ReprogramacionesChart', initReprogramacionesChart, data);
    safeInitChart('TecnicoChart', initTecnicoChart, data);
    safeInitChart('NodoChart', initNodoChart, data);
    safeInitChart('TablaCasosCriticos', initTablaCasosCriticos, data);
    safeInitChart('MatrixChart', initMatrixChart, data);
    // initFraudFeed(data); // Eliminado: sección de alertas en tiempo real
    
    // Start timers
    setInterval(updateClock, 1000);
    setInterval(updatePerformance, 1500);
    updateClock();
    updatePerformance();
    
    console.log('Fraud Analytics Terminal initialized successfully');
});

// ===================================
// REFRESH / RELOAD DATA
// ===================================
async function refreshDashboard() {
    const btn = document.getElementById('refreshBtn');
    if (btn) {
        btn.disabled = true;
        btn.textContent = '⟳ Actualizando...';
    }
    try {
        // Reusar loadFraudData (incluye normalización y cache-bust via ?_ no necesario pues el browser lo cachea igual)
        const data = await loadFraudData();
        if (!data) throw new Error('loadFraudData returned null');

        // Redibujar todo
        updateMetrics(data);
        safeInitChart('CanalChart', initCanalChart, data);
        safeInitChart('Canal2Chart', initCanal2Chart, data);
        safeInitChart('AsesorList', initAsesorList, data);
        safeInitChart('RazonChart', initRazonChart, data);
        safeInitChart('EmbudoConfirmacion', initEmbudoConfirmacion, data);
        safeInitChart('GeoHeatmap', initGeoHeatmap, data);
        safeInitChart('AliadoChart', initAliadoChart, data);
        safeInitChart('MatrizSlaChart', initMatrizSlaChart, data);
        safeInitChart('ReprogramacionesChart', initReprogramacionesChart, data);
        safeInitChart('TecnicoChart', initTecnicoChart, data);
        safeInitChart('NodoChart', initNodoChart, data);
        safeInitChart('TablaCasosCriticos', initTablaCasosCriticos, data);
        safeInitChart('MatrixChart', initMatrixChart, data);

        console.log('Dashboard refreshed:', data.total_casos, 'casos');
        if (btn) btn.textContent = '✓ Actualizado';
        setTimeout(() => { if (btn) { btn.textContent = '⟳ Actualizar'; btn.disabled = false; } }, 2000);
    } catch (e) {
        console.error('Error al actualizar:', e);
        if (btn) { btn.textContent = '✗ Error'; btn.disabled = false; }
        setTimeout(() => { if (btn) btn.textContent = '⟳ Actualizar'; }, 2000);
    }
}







