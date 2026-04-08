import type { Licitacion, RubroStat, GestionOrg, Comuna, Sector } from "./types";

export const oportunidades: Licitacion[] = [
  { id: "1057846-22-LR26", org: "Hospital Barros Luco", desc: "Equipamiento médico UCI neonatal", monto: 245000000, rubro: "Salud", region: "RM", estado: "Publicada", oferentes: 0, cierre: "12 Abr 2026", tipo: "LP" },
  { id: "750301-8-LE26", org: "SERVIU Metropolitano", desc: "Mantención áreas verdes sector oriente", monto: 89500000, rubro: "Mantención", region: "RM", estado: "Publicada", oferentes: 3, cierre: "14 Abr 2026", tipo: "LE" },
  { id: "612930-41-LP26", org: "Municipalidad de Temuco", desc: "Construcción multicancha techada", monto: 320000000, rubro: "Construcción", region: "Araucanía", estado: "Publicada", oferentes: 1, cierre: "18 Abr 2026", tipo: "LP" },
  { id: "432100-12-LE26", org: "Min. Educación", desc: "Textos escolares enseñanza básica 2027", monto: 4500000000, rubro: "Educación", region: "Nacional", estado: "Publicada", oferentes: 2, cierre: "25 Abr 2026", tipo: "LP" },
  { id: "289310-3-L126", org: "Municipalidad de Viña del Mar", desc: "Servicio de aseo industrial edificios municipales", monto: 42000000, rubro: "Aseo", region: "Valparaíso", estado: "Publicada", oferentes: 0, cierre: "15 Abr 2026", tipo: "L1" },
  { id: "991204-7-LE26", org: "Hospital Regional Temuco", desc: "Insumos clínicos traumatología", monto: 156000000, rubro: "Salud", region: "Araucanía", estado: "Publicada", oferentes: 4, cierre: "11 Abr 2026", tipo: "LE" },
  { id: "553210-19-LP26", org: "JUNAEB", desc: "Alimentación escolar región del Maule", monto: 890000000, rubro: "Alimentos", region: "Maule", estado: "Publicada", oferentes: 2, cierre: "20 Abr 2026", tipo: "LP" },
  { id: "118700-2-L126", org: "Carabineros de Chile", desc: "Servicio mantención vehículos policiales", monto: 67000000, rubro: "Mantención", region: "RM", estado: "Publicada", oferentes: 0, cierre: "16 Abr 2026", tipo: "L1" },
];

export const rubros = ["Todos", "Salud", "Construcción", "Mantención", "Educación", "Aseo", "Alimentos", "Informática", "Transporte"];
export const regiones = ["Todas", "RM", "Valparaíso", "Biobío", "Araucanía", "Maule", "Los Lagos"];

export const rubroStats: RubroStat[] = [
  { rubro: "Salud", licitaciones: 8900, monto: 52000, proveedoresActivos: 4200, montoPromedio: 58, topGanador: "Comercial Médica S.A.", pctTopGanador: 8, oferentesPromedio: 5.2, adjudicacion: 78 },
  { rubro: "Construcción", licitaciones: 6100, monto: 68000, proveedoresActivos: 3100, montoPromedio: 111, topGanador: "Constructora Aconcagua", pctTopGanador: 4, oferentesPromedio: 6.8, adjudicacion: 74 },
  { rubro: "Informática", licitaciones: 7200, monto: 34000, proveedoresActivos: 5800, montoPromedio: 47, topGanador: "Sonda S.A.", pctTopGanador: 12, oferentesPromedio: 4.1, adjudicacion: 81 },
  { rubro: "Alimentos", licitaciones: 4300, monto: 28000, proveedoresActivos: 2600, montoPromedio: 65, topGanador: "Sodexo Chile", pctTopGanador: 15, oferentesPromedio: 3.4, adjudicacion: 69 },
  { rubro: "Aseo", licitaciones: 3800, monto: 12000, proveedoresActivos: 2900, montoPromedio: 32, topGanador: "ISS Chile", pctTopGanador: 9, oferentesPromedio: 4.8, adjudicacion: 76 },
  { rubro: "Mantención", licitaciones: 5400, monto: 22000, proveedoresActivos: 4100, montoPromedio: 41, topGanador: "Sodimac Empresas", pctTopGanador: 6, oferentesPromedio: 5.5, adjudicacion: 77 },
];

export const rubroTrend = [
  { mes: "Ene", Salud: 4200, Construcción: 5100, Informática: 2800, Alimentos: 2100 },
  { mes: "Feb", Salud: 3900, Construcción: 4800, Informática: 3100, Alimentos: 1900 },
  { mes: "Mar", Salud: 5100, Construcción: 6200, Informática: 3400, Alimentos: 2400 },
  { mes: "Abr", Salud: 4800, Construcción: 5500, Informática: 2900, Alimentos: 2200 },
  { mes: "May", Salud: 5400, Construcción: 7100, Informática: 3200, Alimentos: 2600 },
  { mes: "Jun", Salud: 4600, Construcción: 5800, Informática: 3000, Alimentos: 2300 },
];

export const transparenciaData = {
  concentracion: [
    { org: "Min. Salud", pct1Proveedor: 22, totalLicit: 3200 },
    { org: "Gendarmería", pct1Proveedor: 31, totalLicit: 1200 },
    { org: "Carabineros", pct1Proveedor: 18, totalLicit: 1500 },
    { org: "JUNAEB", pct1Proveedor: 28, totalLicit: 920 },
    { org: "Min. Educación", pct1Proveedor: 15, totalLicit: 2900 },
    { org: "Ejército", pct1Proveedor: 26, totalLicit: 1800 },
  ],
  anomalias: [
    { tipo: "1 solo oferente", cantidad: 10400, pct: 18, riesgo: "alto" },
    { tipo: "Desiertas", cantidad: 5187, pct: 9, riesgo: "medio" },
    { tipo: "Adjudicada mismo día", cantidad: 2340, pct: 4, riesgo: "alto" },
    { tipo: "Monto sobre estimado >50%", cantidad: 1890, pct: 3.3, riesgo: "medio" },
    { tipo: "Revocada post-adjudicación", cantidad: 720, pct: 1.3, riesgo: "bajo" },
  ],
  tratosDirectos: [
    { mes: "Ene", licitacion: 3400, tratoDirecto: 800 },
    { mes: "Feb", licitacion: 3100, tratoDirecto: 700 },
    { mes: "Mar", licitacion: 4200, tratoDirecto: 900 },
    { mes: "Abr", licitacion: 3800, tratoDirecto: 850 },
    { mes: "May", licitacion: 4400, tratoDirecto: 920 },
    { mes: "Jun", licitacion: 4000, tratoDirecto: 880 },
  ],
  mipyme: [
    { mes: "Ene", pct: 68 }, { mes: "Feb", pct: 70 }, { mes: "Mar", pct: 72 },
    { mes: "Abr", pct: 69 }, { mes: "May", pct: 74 }, { mes: "Jun", pct: 71 },
  ],
};

export const gestionData: { benchmark: GestionOrg[] } = {
  benchmark: [
    { org: "Min. Salud", diasAdjudicacion: 28, pctDesiertas: 8, pctMipyme: 72 },
    { org: "Min. Obras Públicas", diasAdjudicacion: 42, pctDesiertas: 12, pctMipyme: 58 },
    { org: "Min. Educación", diasAdjudicacion: 35, pctDesiertas: 11, pctMipyme: 81 },
    { org: "Carabineros", diasAdjudicacion: 22, pctDesiertas: 9, pctMipyme: 45 },
    { org: "SERVIU", diasAdjudicacion: 38, pctDesiertas: 7, pctMipyme: 76 },
    { org: "Gendarmería", diasAdjudicacion: 45, pctDesiertas: 14, pctMipyme: 62 },
    { org: "Ejército", diasAdjudicacion: 19, pctDesiertas: 6, pctMipyme: 38 },
  ],
};

export const comunas: Comuna[] = [
  { nombre: "Santiago", licitaciones: 890, monto: 8200, topCompra: "Aseo y seguridad", pctMipyme: 74 },
  { nombre: "Puente Alto", licitaciones: 620, monto: 4100, topCompra: "Mantención vías", pctMipyme: 81 },
  { nombre: "Maipú", licitaciones: 580, monto: 3800, topCompra: "Áreas verdes", pctMipyme: 79 },
  { nombre: "Las Condes", licitaciones: 510, monto: 5200, topCompra: "Informática", pctMipyme: 62 },
  { nombre: "Viña del Mar", licitaciones: 470, monto: 3400, topCompra: "Obras civiles", pctMipyme: 71 },
  { nombre: "Temuco", licitaciones: 410, monto: 2900, topCompra: "Alimentos", pctMipyme: 85 },
  { nombre: "Concepción", licitaciones: 390, monto: 3100, topCompra: "Construcción", pctMipyme: 68 },
  { nombre: "La Serena", licitaciones: 340, monto: 2200, topCompra: "Mantención", pctMipyme: 77 },
];

export const sectoresData: Sector[] = [
  { id: "salud", nombre: "Sector Salud", icon: "🏥", color: "#34C759", organismos: 82, monto: 52000, licitaciones: 8900 },
  { id: "educacion", nombre: "Educación", icon: "📚", color: "#FF9500", organismos: 68, monto: 34000, licitaciones: 6200 },
  { id: "defensa", nombre: "Defensa y Seguridad", icon: "🛡️", color: "#FF3B30", organismos: 28, monto: 45000, licitaciones: 4100 },
  { id: "obras", nombre: "Obras Públicas", icon: "🚧", color: "#5AC8FA", organismos: 22, monto: 58000, licitaciones: 3200 },
  { id: "municipalidades", nombre: "Municipalidades", icon: "🏛️", color: "#007AFF", organismos: 345, monto: 67000, licitaciones: 12400 },
  { id: "judicial", nombre: "Poder Judicial", icon: "⚖️", color: "#AF52DE", organismos: 34, monto: 18500, licitaciones: 2800 },
];
