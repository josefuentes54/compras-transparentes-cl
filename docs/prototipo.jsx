import { useState, useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════

const oportunidades = [
  { id: "1057846-22-LR26", org: "Hospital Barros Luco", desc: "Equipamiento médico UCI neonatal", monto: 245000000, rubro: "Salud", region: "RM", estado: "Publicada", oferentes: 0, cierre: "12 Abr 2026", tipo: "LP" },
  { id: "750301-8-LE26", org: "SERVIU Metropolitano", desc: "Mantención áreas verdes sector oriente", monto: 89500000, rubro: "Mantención", region: "RM", estado: "Publicada", oferentes: 3, cierre: "14 Abr 2026", tipo: "LE" },
  { id: "612930-41-LP26", org: "Municipalidad de Temuco", desc: "Construcción multicancha techada", monto: 320000000, rubro: "Construcción", region: "Araucanía", estado: "Publicada", oferentes: 1, cierre: "18 Abr 2026", tipo: "LP" },
  { id: "432100-12-LE26", org: "Min. Educación", desc: "Textos escolares enseñanza básica 2027", monto: 4500000000, rubro: "Educación", region: "Nacional", estado: "Publicada", oferentes: 2, cierre: "25 Abr 2026", tipo: "LP" },
  { id: "289310-3-L126", org: "Municipalidad de Viña del Mar", desc: "Servicio de aseo industrial edificios municipales", monto: 42000000, rubro: "Aseo", region: "Valparaíso", estado: "Publicada", oferentes: 0, cierre: "15 Abr 2026", tipo: "L1" },
  { id: "991204-7-LE26", org: "Hospital Regional Temuco", desc: "Insumos clínicos traumatología", monto: 156000000, rubro: "Salud", region: "Araucanía", estado: "Publicada", oferentes: 4, cierre: "11 Abr 2026", tipo: "LE" },
  { id: "553210-19-LP26", org: "JUNAEB", desc: "Alimentación escolar región del Maule", monto: 890000000, rubro: "Alimentos", region: "Maule", estado: "Publicada", oferentes: 2, cierre: "20 Abr 2026", tipo: "LP" },
  { id: "118700-2-L126", org: "Carabineros de Chile", desc: "Servicio mantención vehículos policiales", monto: 67000000, rubro: "Mantención", region: "RM", estado: "Publicada", oferentes: 0, cierre: "16 Abr 2026", tipo: "L1" },
];

const rubros = ["Todos", "Salud", "Construcción", "Mantención", "Educación", "Aseo", "Alimentos", "Informática", "Transporte"];
const regiones = ["Todas", "RM", "Valparaíso", "Biobío", "Araucanía", "Maule", "Los Lagos"];

const rubroStats = [
  { rubro: "Salud", licitaciones: 8900, monto: 52000, proveedoresActivos: 4200, montoPromedio: 58, topGanador: "Comercial Médica S.A.", pctTopGanador: 8, oferentesPromedio: 5.2, adjudicacion: 78 },
  { rubro: "Construcción", licitaciones: 6100, monto: 68000, proveedoresActivos: 3100, montoPromedio: 111, topGanador: "Constructora Aconcagua", pctTopGanador: 4, oferentesPromedio: 6.8, adjudicacion: 74 },
  { rubro: "Informática", licitaciones: 7200, monto: 34000, proveedoresActivos: 5800, montoPromedio: 47, topGanador: "Sonda S.A.", pctTopGanador: 12, oferentesPromedio: 4.1, adjudicacion: 81 },
  { rubro: "Alimentos", licitaciones: 4300, monto: 28000, proveedoresActivos: 2600, montoPromedio: 65, topGanador: "Sodexo Chile", pctTopGanador: 15, oferentesPromedio: 3.4, adjudicacion: 69 },
  { rubro: "Aseo", licitaciones: 3800, monto: 12000, proveedoresActivos: 2900, montoPromedio: 32, topGanador: "ISS Chile", pctTopGanador: 9, oferentesPromedio: 4.8, adjudicacion: 76 },
  { rubro: "Mantención", licitaciones: 5400, monto: 22000, proveedoresActivos: 4100, montoPromedio: 41, topGanador: "Sodimac Empresas", pctTopGanador: 6, oferentesPromedio: 5.5, adjudicacion: 77 },
];

const rubroTrend = [
  { mes: "Ene", Salud: 4200, Construcción: 5100, Informática: 2800, Alimentos: 2100 },
  { mes: "Feb", Salud: 3900, Construcción: 4800, Informática: 3100, Alimentos: 1900 },
  { mes: "Mar", Salud: 5100, Construcción: 6200, Informática: 3400, Alimentos: 2400 },
  { mes: "Abr", Salud: 4800, Construcción: 5500, Informática: 2900, Alimentos: 2200 },
  { mes: "May", Salud: 5400, Construcción: 7100, Informática: 3200, Alimentos: 2600 },
  { mes: "Jun", Salud: 4600, Construcción: 5800, Informática: 3000, Alimentos: 2300 },
];

const transparenciaData = {
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

const gestionData = {
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

const comunas = [
  { nombre: "Santiago", licitaciones: 890, monto: 8200, topCompra: "Aseo y seguridad", pctMipyme: 74 },
  { nombre: "Puente Alto", licitaciones: 620, monto: 4100, topCompra: "Mantención vías", pctMipyme: 81 },
  { nombre: "Maipú", licitaciones: 580, monto: 3800, topCompra: "Áreas verdes", pctMipyme: 79 },
  { nombre: "Las Condes", licitaciones: 510, monto: 5200, topCompra: "Informática", pctMipyme: 62 },
  { nombre: "Viña del Mar", licitaciones: 470, monto: 3400, topCompra: "Obras civiles", pctMipyme: 71 },
  { nombre: "Temuco", licitaciones: 410, monto: 2900, topCompra: "Alimentos", pctMipyme: 85 },
  { nombre: "Concepción", licitaciones: 390, monto: 3100, topCompra: "Construcción", pctMipyme: 68 },
  { nombre: "La Serena", licitaciones: 340, monto: 2200, topCompra: "Mantención", pctMipyme: 77 },
];

const sectoresData = [
  { id: "salud", nombre: "Sector Salud", icon: "🏥", color: "#34C759", organismos: 82, monto: 52000, licitaciones: 8900 },
  { id: "educacion", nombre: "Educación", icon: "📚", color: "#FF9500", organismos: 68, monto: 34000, licitaciones: 6200 },
  { id: "defensa", nombre: "Defensa y Seguridad", icon: "🛡️", color: "#FF3B30", organismos: 28, monto: 45000, licitaciones: 4100 },
  { id: "obras", nombre: "Obras Públicas", icon: "🚧", color: "#5AC8FA", organismos: 22, monto: 58000, licitaciones: 3200 },
  { id: "municipalidades", nombre: "Municipalidades", icon: "🏛️", color: "#007AFF", organismos: 345, monto: 67000, licitaciones: 12400 },
  { id: "judicial", nombre: "Poder Judicial", icon: "⚖️", color: "#AF52DE", organismos: 34, monto: 18500, licitaciones: 2800 },
];

// ═══════════════════════════════════════════
// DESIGN TOKENS (Apple HIG)
// ═══════════════════════════════════════════
const C = { blue: "#007AFF", green: "#34C759", orange: "#FF9500", red: "#FF3B30", purple: "#AF52DE", teal: "#5AC8FA", pink: "#FF2D55", gray: "#8E8E93", bg: "#F2F2F7", card: "#FFFFFF", border: "#E5E5EA", t1: "#1C1C1E", t2: "#3A3A3C", t3: "#8E8E93", hover: "#F9F9FB" };
const font = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";
const mono = "'SF Mono', 'Menlo', monospace";

// ═══════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════
const card = { background: C.card, borderRadius: 16, padding: 24, boxShadow: "0 0 0 0.5px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)" };
const label = { fontSize: 11, fontWeight: 600, color: C.t3, letterSpacing: "0.06em", textTransform: "uppercase" };
const pill = (bg, fg) => ({ background: bg, color: fg, padding: "3px 10px", borderRadius: 100, fontSize: 12, fontWeight: 600, display: "inline-block" });

function AnimNum({ target, prefix = "", suffix = "" }) {
  const [v, setV] = useState(0);
  useEffect(() => { let n = 0; const s = target / 50; const id = setInterval(() => { n += s; if (n >= target) { setV(target); clearInterval(id); } else setV(Math.floor(n)); }, 16); return () => clearInterval(id); }, [target]);
  return <span>{prefix}{v.toLocaleString("es-CL")}{suffix}</span>;
}

function Stat({ lbl, value, prefix, suffix, sub, accent }) {
  return (
    <div style={{ ...card, padding: "18px 20px" }}>
      <div style={label}>{lbl}</div>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 4, color: accent || C.t1 }}>
        <AnimNum target={value} prefix={prefix || ""} suffix={suffix || ""} />
      </div>
      {sub && <div style={{ fontSize: 12, color: C.t3, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Badge({ text, color }) {
  const m = { Publicada: C.blue, Adjudicada: C.green, Cerrada: C.purple, alto: C.red, medio: C.orange, bajo: C.t3 };
  const c = color || m[text] || C.t3;
  return <span style={pill(c + "14", c)}>{text}</span>;
}

function Section({ title, sub, children, style: s }) {
  return <div style={{ marginBottom: 20, ...s }}>{title && <div style={{ marginBottom: 14 }}><h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em", color: C.t1, margin: 0 }}>{title}</h2>{sub && <p style={{ fontSize: 13, color: C.t3, margin: "3px 0 0" }}>{sub}</p>}</div>}{children}</div>;
}

const Tip = ({ active, payload, label: l }) => {
  if (!active || !payload?.length) return null;
  return <div style={{ background: "#fff", borderRadius: 12, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", border: "none" }}><div style={{ fontWeight: 700, marginBottom: 4 }}>{l}</div>{payload.map((p, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, color: C.t2, marginTop: 2 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color }} />{p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString("es-CL") : p.value}</strong></div>)}</div>;
};
const ax = { fill: C.t3, fontSize: 11 };
const gr = { strokeDasharray: "3 3", stroke: "#E5E5EA" };
const fmt = n => n >= 1e9 ? `$${(n/1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n/1e6).toFixed(0)}M` : `$${n.toLocaleString("es-CL")}`;

// ═══════════════════════════════════════════
// TAB: OPORTUNIDADES
// ═══════════════════════════════════════════
function TabOportunidades() {
  const [rubro, setRubro] = useState("Todos");
  const [region, setRegion] = useState("Todas");
  const [orden, setOrden] = useState("cierre");

  const filtered = useMemo(() => {
    let r = oportunidades.filter(o => o.estado === "Publicada");
    if (rubro !== "Todos") r = r.filter(o => o.rubro === rubro);
    if (region !== "Todas") r = r.filter(o => o.region === region);
    if (orden === "monto") r = [...r].sort((a, b) => b.monto - a.monto);
    return r;
  }, [rubro, region, orden]);

  const sel = (opts, val, set) => (
    <select value={val} onChange={e => set(e.target.value)} style={{ padding: "8px 12px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 14, fontFamily: font, color: C.t1, background: C.card, cursor: "pointer", outline: "none" }}>
      {opts.map(o => <option key={o}>{o}</option>)}
    </select>
  );

  return <>
    <Section title="Oportunidades abiertas" sub="Licitaciones publicadas ahora mismo — filtra por tu rubro y región">
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
        <span style={{ fontSize: 13, color: C.t3, fontWeight: 500 }}>Rubro</span>
        {sel(rubros, rubro, setRubro)}
        <span style={{ fontSize: 13, color: C.t3, fontWeight: 500, marginLeft: 8 }}>Región</span>
        {sel(regiones, region, setRegion)}
        <span style={{ fontSize: 13, color: C.t3, fontWeight: 500, marginLeft: 8 }}>Ordenar</span>
        {sel(["cierre", "monto"], orden, setOrden)}
        <span style={{ marginLeft: "auto", fontSize: 13, color: C.blue, fontWeight: 600 }}>{filtered.length} resultados</span>
      </div>
    </Section>

    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {filtered.map((l, i) => (
        <div key={i} style={{ ...card, padding: "16px 22px", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", transition: "box-shadow 0.12s", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = card.boxShadow}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: C.blue, fontWeight: 600 }}>{l.id}</span>
              <Badge text={l.tipo} />
              <span style={pill(C.teal + "14", C.teal)}>{l.rubro}</span>
              <span style={{ fontSize: 11, color: C.t3 }}>{l.region}</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{l.desc}</div>
            <div style={{ fontSize: 13, color: C.t3, marginTop: 1 }}>{l.org}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700, fontSize: 16, fontFamily: mono }}>{fmt(l.monto)}</div>
            <div style={{ fontSize: 12, color: C.t3, marginTop: 2 }}>
              {l.oferentes > 0 ? `${l.oferentes} oferentes` : "Sin ofertas aún"}
            </div>
            <div style={{ fontSize: 12, color: C.orange, fontWeight: 600, marginTop: 2 }}>Cierre {l.cierre}</div>
          </div>
        </div>
      ))}
      {filtered.length === 0 && <div style={{ ...card, textAlign: "center", padding: 40, color: C.t3 }}>No hay licitaciones con esos filtros</div>}
    </div>
  </>;
}

// ═══════════════════════════════════════════
// TAB: MI RUBRO
// ═══════════════════════════════════════════
function TabMiRubro() {
  const [sel, setSel] = useState(null);
  const s = sel ? rubroStats.find(r => r.rubro === sel) : null;

  if (!s) return (
    <Section title="Mi rubro" sub="Elige tu categoría y conoce tu mercado: quién compra, cuánto se gasta y quién gana">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {rubroStats.map(r => (
          <div key={r.rubro} onClick={() => setSel(r.rubro)} style={{ ...card, cursor: "pointer", transition: "all 0.15s", borderLeft: "3px solid " + C.blue }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = card.boxShadow; }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 12 }}>{r.rubro}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div><div style={label}>Licitaciones</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{r.licitaciones.toLocaleString()}</div></div>
              <div><div style={label}>Monto (MM)</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>${r.monto.toLocaleString()}</div></div>
              <div><div style={label}>Proveedores</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{r.proveedoresActivos.toLocaleString()}</div></div>
              <div><div style={label}>Adjudicación</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 2, color: C.green }}>{r.adjudicacion}%</div></div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );

  return <>
    <button onClick={() => setSel(null)} style={{ background: "transparent", border: "none", color: C.blue, cursor: "pointer", fontSize: 15, fontWeight: 500, padding: 0, marginBottom: 20, fontFamily: font }}>‹ Todos los rubros</button>
    <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.01em" }}>{s.rubro}</h2>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
      <Stat lbl="Licitaciones" value={s.licitaciones} />
      <Stat lbl="Monto total (MM)" value={s.monto} prefix="$" />
      <Stat lbl="Monto promedio (MM)" value={s.montoPromedio} prefix="$" />
      <Stat lbl="Oferentes promedio" value={parseFloat(s.oferentesPromedio.toFixed(1))} suffix="" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
      <div style={card}>
        <Section title="Tendencia de montos" sub="Evolución mensual MM CLP">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={rubroTrend}>
              <defs><linearGradient id="gR" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.blue} stopOpacity={0.12} /><stop offset="100%" stopColor={C.blue} stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid {...gr} /><XAxis dataKey="mes" tick={ax} axisLine={false} tickLine={false} /><YAxis tick={ax} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey={s.rubro} stroke={C.blue} fill="url(#gR)" strokeWidth={2} name={s.rubro} />
            </AreaChart>
          </ResponsiveContainer>
        </Section>
      </div>
      <div style={card}>
        <Section title="Competencia en tu rubro" sub="¿Quién domina el mercado?">
          <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ padding: "14px 16px", borderRadius: 12, background: C.bg }}>
              <div style={label}>Principal ganador</div>
              <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>{s.topGanador}</div>
              <div style={{ fontSize: 13, color: C.t3, marginTop: 2 }}>Gana el {s.pctTopGanador}% de las licitaciones del rubro</div>
              <div style={{ height: 5, borderRadius: 3, background: C.border, marginTop: 8 }}>
                <div style={{ height: "100%", width: `${s.pctTopGanador}%`, borderRadius: 3, background: s.pctTopGanador > 15 ? C.red : s.pctTopGanador > 10 ? C.orange : C.green }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ padding: "12px 14px", borderRadius: 10, background: C.bg, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: C.blue }}>{s.oferentesPromedio}</div>
                <div style={{ fontSize: 11, color: C.t3, marginTop: 2 }}>Oferentes promedio</div>
              </div>
              <div style={{ padding: "12px 14px", borderRadius: 10, background: C.bg, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: C.green }}>{s.proveedoresActivos.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: C.t3, marginTop: 2 }}>Proveedores activos</div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  </>;
}

// ═══════════════════════════════════════════
// TAB: TRANSPARENCIA
// ═══════════════════════════════════════════
function TabTransparencia() {
  const d = transparenciaData;
  return <>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
      <Stat lbl="Licitaciones 1 oferente" value={10400} accent={C.red} sub="18% del total — riesgo" />
      <Stat lbl="Desiertas" value={5187} accent={C.orange} sub="9% — bases mal diseñadas" />
      <Stat lbl="Tratos directos" value={5150} accent={C.purple} sub="8.9% de las compras" />
      <Stat lbl="Participación MiPyme" value={73} suffix="%" accent={C.green} sub="Meta: 80%" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
      <div style={card}>
        <Section title="Señales de alerta" sub="Indicadores que merecen atención">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {d.anomalias.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: C.bg }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Badge text={a.riesgo} />
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{a.tipo}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 700 }}>{a.cantidad.toLocaleString()}</span>
                  <span style={{ fontSize: 12, color: C.t3, marginLeft: 6 }}>({a.pct}%)</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div style={card}>
        <Section title="Concentración por organismo" sub="% de licitaciones ganadas por un solo proveedor">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={d.concentracion} layout="vertical" margin={{ left: 110 }}>
              <CartesianGrid {...gr} horizontal={false} />
              <XAxis type="number" tick={ax} axisLine={false} unit="%" />
              <YAxis type="category" dataKey="org" tick={{ ...ax, fill: C.t2 }} axisLine={false} width={110} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="pct1Proveedor" radius={[0, 6, 6, 0]} name="% un proveedor">
                {d.concentracion.map((c, i) => <Cell key={i} fill={c.pct1Proveedor > 25 ? C.red : c.pct1Proveedor > 20 ? C.orange : C.green} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Section>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <div style={card}>
        <Section title="Licitaciones vs tratos directos" sub="Evolución mensual">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={d.tratosDirectos}>
              <defs>
                <linearGradient id="gL" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.blue} stopOpacity={0.12} /><stop offset="100%" stopColor={C.blue} stopOpacity={0} /></linearGradient>
                <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.red} stopOpacity={0.12} /><stop offset="100%" stopColor={C.red} stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid {...gr} /><XAxis dataKey="mes" tick={ax} axisLine={false} tickLine={false} /><YAxis tick={ax} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="licitacion" stroke={C.blue} fill="url(#gL)" strokeWidth={2} name="Licitaciones" />
              <Area type="monotone" dataKey="tratoDirecto" stroke={C.red} fill="url(#gT)" strokeWidth={2} name="Trato directo" />
            </AreaChart>
          </ResponsiveContainer>
        </Section>
      </div>
      <div style={card}>
        <Section title="Inclusión MiPymes" sub="% de adjudicaciones a micro, pequeñas y medianas empresas">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={d.mipyme}>
              <CartesianGrid {...gr} /><XAxis dataKey="mes" tick={ax} axisLine={false} tickLine={false} /><YAxis domain={[60, 85]} tick={ax} axisLine={false} tickLine={false} unit="%" />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="pct" stroke={C.green} strokeWidth={2.5} dot={{ r: 3, fill: C.green, stroke: "#fff", strokeWidth: 2 }} name="% MiPymes" />
            </LineChart>
          </ResponsiveContainer>
        </Section>
      </div>
    </div>
  </>;
}

// ═══════════════════════════════════════════
// TAB: GESTIÓN
// ═══════════════════════════════════════════
function TabGestion() {
  const d = gestionData.benchmark;
  return <>
    <Section title="Benchmarking de organismos" sub="Compara el desempeño entre organismos públicos">
      <div style={{ ...card, padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead><tr style={{ borderBottom: `0.5px solid ${C.border}` }}>
            {["Organismo", "Días adjudicación", "% Desiertas", "% MiPyme", "Eficiencia"].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "14px 22px", ...label }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{d.map((o, i) => {
            const score = Math.round(100 - o.diasAdjudicacion * 0.8 - o.pctDesiertas * 2 + o.pctMipyme * 0.3);
            return (
              <tr key={i} style={{ borderBottom: `0.5px solid ${C.bg}`, transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = C.hover}
                onMouseLeave={e => e.currentTarget.style.background = ""}>
                <td style={{ padding: "14px 22px", fontWeight: 600 }}>{o.org}</td>
                <td style={{ padding: "14px 22px", fontFamily: mono, fontSize: 13 }}>
                  <span style={{ color: o.diasAdjudicacion > 40 ? C.red : o.diasAdjudicacion > 30 ? C.orange : C.green, fontWeight: 600 }}>{o.diasAdjudicacion} días</span>
                </td>
                <td style={{ padding: "14px 22px", fontFamily: mono, fontSize: 13, color: o.pctDesiertas > 10 ? C.red : C.green, fontWeight: 600 }}>{o.pctDesiertas}%</td>
                <td style={{ padding: "14px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ height: 5, flex: 1, maxWidth: 80, borderRadius: 3, background: C.border }}><div style={{ height: "100%", width: `${o.pctMipyme}%`, borderRadius: 3, background: o.pctMipyme >= 70 ? C.green : C.orange }} /></div>
                    <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 600 }}>{o.pctMipyme}%</span>
                  </div>
                </td>
                <td style={{ padding: "14px 22px" }}>
                  <span style={pill((score >= 70 ? C.green : score >= 55 ? C.orange : C.red) + "14", score >= 70 ? C.green : score >= 55 ? C.orange : C.red)}>{score}/100</span>
                </td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </Section>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <div style={card}>
        <Section title="Días promedio de adjudicación" sub="Menor es mejor">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={d} layout="vertical" margin={{ left: 120 }}>
              <CartesianGrid {...gr} horizontal={false} />
              <XAxis type="number" tick={ax} axisLine={false} unit=" días" />
              <YAxis type="category" dataKey="org" tick={{ ...ax, fill: C.t2 }} axisLine={false} width={120} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="diasAdjudicacion" radius={[0, 6, 6, 0]} name="Días">
                {d.map((o, i) => <Cell key={i} fill={o.diasAdjudicacion > 40 ? C.red : o.diasAdjudicacion > 30 ? C.orange : C.green} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Section>
      </div>
      <div style={card}>
        <Section title="Participación MiPyme por organismo" sub="Meta ChileCompra: 80%">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={d} layout="vertical" margin={{ left: 120 }}>
              <CartesianGrid {...gr} horizontal={false} />
              <XAxis type="number" tick={ax} axisLine={false} unit="%" domain={[0, 100]} />
              <YAxis type="category" dataKey="org" tick={{ ...ax, fill: C.t2 }} axisLine={false} width={120} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="pctMipyme" radius={[0, 6, 6, 0]} name="% MiPyme">
                {d.map((o, i) => <Cell key={i} fill={o.pctMipyme >= 70 ? C.green : o.pctMipyme >= 50 ? C.orange : C.red} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Section>
      </div>
    </div>
  </>;
}

// ═══════════════════════════════════════════
// TAB: CIUDADANÍA
// ═══════════════════════════════════════════
function TabCiudadania() {
  const [buscar, setBuscar] = useState("");
  const filtered = comunas.filter(c => c.nombre.toLowerCase().includes(buscar.toLowerCase()));

  return <>
    <Section title="¿En qué gasta tu municipalidad?" sub="Busca tu comuna y conoce cómo se usan los recursos públicos">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        <Stat lbl="Gasto total municipios" value={67000} prefix="$" suffix=" MM" />
        <Stat lbl="Municipalidades activas" value={345} />
        <Stat lbl="MiPymes en municipios" value={79} suffix="%" accent={C.green} sub="Sobre la media nacional" />
      </div>
    </Section>

    <div style={{ marginBottom: 16 }}>
      <input value={buscar} onChange={e => setBuscar(e.target.value)} placeholder="Buscar municipalidad..." style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 15, fontFamily: font, color: C.t1, background: C.card, outline: "none", boxSizing: "border-box" }} />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
      {filtered.map((c, i) => (
        <div key={i} style={{ ...card, transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = card.boxShadow; }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Municipalidad de {c.nombre}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div><div style={label}>Licitaciones</div><div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{c.licitaciones}</div></div>
            <div><div style={label}>Monto (MM)</div><div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>${c.monto.toLocaleString()}</div></div>
          </div>
          <div style={{ padding: "10px 12px", borderRadius: 10, background: C.bg, marginBottom: 8 }}>
            <div style={label}>Principal compra</div>
            <div style={{ fontWeight: 600, fontSize: 14, marginTop: 2 }}>{c.topCompra}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: C.t3 }}>MiPymes</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ height: 5, width: 60, borderRadius: 3, background: C.border }}><div style={{ height: "100%", width: `${c.pctMipyme}%`, borderRadius: 3, background: c.pctMipyme >= 75 ? C.green : C.orange }} /></div>
              <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 600, color: c.pctMipyme >= 75 ? C.green : C.orange }}>{c.pctMipyme}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>;
}

// ═══════════════════════════════════════════
// TAB: SECTORES
// ═══════════════════════════════════════════
function TabSectores() {
  return (
    <Section title="Sectores del Estado" sub="Vista general por sector — montos en MM CLP">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
        {sectoresData.map(s => (
          <div key={s.id} style={{ ...card, borderLeft: `3px solid ${s.color}`, transition: "all 0.15s", cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = card.boxShadow; }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 30 }}>{s.icon}</span>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{s.nombre}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              <div><div style={label}>Organismos</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{s.organismos}</div></div>
              <div><div style={label}>Monto (MM)</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>${s.monto.toLocaleString()}</div></div>
              <div><div style={label}>Licitaciones</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{s.licitaciones.toLocaleString()}</div></div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════
// TAB: INICIO (LANDING)
// ═══════════════════════════════════════════
function FeatureCard({ icon, color, title, desc, tag, onClick }) {
  return (
    <div onClick={onClick} style={{ ...card, cursor: "pointer", transition: "all 0.18s", position: "relative", overflow: "hidden" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${color}18`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = card.boxShadow; }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: color, opacity: 0.05 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: color + "14", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{icon}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.01em" }}>{title}</div>
          <span style={pill(color + "14", color)}>{tag}</span>
        </div>
      </div>
      <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.55, margin: 0 }}>{desc}</p>
      <div style={{ marginTop: 14, fontSize: 13, color: color, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
        Explorar <span style={{ fontSize: 16 }}>›</span>
      </div>
    </div>
  );
}

function TabInicio({ onNavigate }) {
  const heroStats = [
    { n: 57600, lbl: "Licitaciones en 2026", sfx: "" },
    { n: 2567, lbl: "Miles de millones transados", pfx: "$", sfx: "MM" },
    { n: 118400, lbl: "Proveedores activos", sfx: "" },
    { n: 850, lbl: "Organismos del Estado", sfx: "" },
  ];

  const audiences = [
    { icon: "🏢", title: "Proveedores", color: C.teal, who: "Empresas y emprendedores que quieren vender al Estado" },
    { icon: "🔍", title: "Periodistas", color: "#E8593C", who: "Investigadores que fiscalizan el gasto público" },
    { icon: "🏛️", title: "Funcionarios", color: C.purple, who: "Gestores que quieren mejorar sus compras" },
    { icon: "👤", title: "Ciudadanos", color: C.blue, who: "Personas que quieren saber en qué se gasta" },
  ];

  return (
    <div>
      {/* ── HERO ── */}
      <div style={{ textAlign: "center", padding: "48px 20px 40px" }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 24, color: "#fff", marginBottom: 20, boxShadow: `0 8px 24px ${C.blue}30` }}>MP</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 10px", lineHeight: 1.15, color: C.t1 }}>
          Compras públicas de Chile,<br />explicadas con datos
        </h1>
        <p style={{ fontSize: 17, color: C.t2, maxWidth: 620, margin: "0 auto 28px", lineHeight: 1.6 }}>
          Más de $2.5 billones al año pasan por Mercado Público. Esta plataforma te muestra a dónde va ese dinero, quién lo gasta y cómo puedes participar — todo desde la API oficial de ChileCompra.
        </p>
        <button onClick={() => onNavigate("oportunidades")} style={{
          background: C.blue, color: "#fff", border: "none", borderRadius: 12,
          padding: "14px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer",
          fontFamily: font, boxShadow: `0 4px 14px ${C.blue}40`, transition: "transform 0.12s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
        onMouseLeave={e => e.currentTarget.style.transform = ""}>
          Ver oportunidades abiertas
        </button>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
        {heroStats.map((s, i) => (
          <div key={i} style={{ ...card, textAlign: "center", padding: "20px 16px" }}>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: C.blue }}>
              <AnimNum target={s.n} prefix={s.pfx || ""} suffix={s.sfx || ""} />
            </div>
            <div style={{ fontSize: 12, color: C.t3, marginTop: 4, fontWeight: 500 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── PARA QUIÉN ── */}
      <Section title="¿Para quién es esta plataforma?" sub="Diseñada para cuatro audiencias con necesidades distintas">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
          {audiences.map((a, i) => (
            <div key={i} style={{ ...card, textAlign: "center", padding: "24px 18px" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{a.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: a.color }}>{a.title}</div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.5 }}>{a.who}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SECCIONES ── */}
      <Section title="Qué puedes hacer" sub="Cada sección resuelve una pregunta concreta">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <FeatureCard icon="🎯" color={C.teal} title="Oportunidades" tag="Proveedores"
            desc="Licitaciones abiertas ahora mismo con filtros por rubro, región y monto. Encuentra negocios con el Estado en segundos."
            onClick={() => onNavigate("oportunidades")} />
          <FeatureCard icon="📊" color={C.teal} title="Mi Rubro" tag="Proveedores"
            desc="Elige tu categoría (salud, aseo, informática) y ve quién compra, cuánto se gasta, quién gana y a qué precios. Tu inteligencia de mercado."
            onClick={() => onNavigate("mirubro")} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <FeatureCard icon="🔎" color="#E8593C" title="Transparencia" tag="Fiscalización"
            desc="Indicadores de riesgo: licitaciones con un solo oferente, tratos directos sin competencia, organismos con alta tasa de desiertas y concentración de proveedores."
            onClick={() => onNavigate("transparencia")} />
          <FeatureCard icon="⚡" color={C.purple} title="Gestión" tag="Funcionarios"
            desc="Benchmarking entre organismos: días de adjudicación, tasas de desiertas, participación MiPyme. Compara tu organismo con el resto."
            onClick={() => onNavigate("gestion")} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <FeatureCard icon="🏘️" color={C.blue} title="Mi Municipalidad" tag="Ciudadanía"
            desc="Busca tu comuna y conoce qué compra tu municipalidad, cuánto gasta y cuántas MiPymes participan. Transparencia a nivel local."
            onClick={() => onNavigate("ciudadania")} />
          <FeatureCard icon="🏛️" color={C.gray} title="Sectores del Estado" tag="Exploración"
            desc="Vista panorámica por sector: Salud, Educación, Defensa, Obras Públicas, Municipalidades y Poder Judicial con sus montos y organismos."
            onClick={() => onNavigate("sectores")} />
        </div>
      </Section>

      {/* ── FUENTE ── */}
      <div style={{ ...card, marginTop: 32, display: "flex", gap: 20, alignItems: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: C.green + "14", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>📡</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Datos en tiempo real desde la API oficial</div>
          <p style={{ fontSize: 14, color: C.t2, margin: 0, lineHeight: 1.55 }}>
            Toda la información proviene de la API de Mercado Público de ChileCompra (<span style={{ fontFamily: mono, fontSize: 12, color: C.blue }}>api.mercadopublico.cl</span>). Los datos son públicos, gratuitos y se actualizan diariamente. Nuestro sistema sincroniza, enriquece y almacena históricos para generar análisis que la API por sí sola no permite.
          </p>
        </div>
      </div>

      {/* ── CÓMO FUNCIONA ── */}
      <div style={{ marginTop: 32, marginBottom: 20 }}>
        <Section title="¿Cómo funciona?" sub="Tres capas de procesamiento para transformar datos crudos en información útil">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {[
              { step: "1", title: "Ingesta diaria", desc: "Un proceso automático consulta la API de Mercado Público cada noche y descarga licitaciones y órdenes de compra del día.", color: C.blue },
              { step: "2", title: "Enriquecimiento", desc: "Cada licitación se clasifica por sector, región y rubro. Se calculan métricas de competencia, concentración y tendencias.", color: C.teal },
              { step: "3", title: "Visualización", desc: "Los datos procesados alimentan dashboards interactivos diseñados para cada tipo de usuario y necesidad.", color: C.green },
            ].map((s, i) => (
              <div key={i} style={{ ...card, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 12, right: 16, fontSize: 48, fontWeight: 800, color: s.color, opacity: 0.08 }}>{s.step}</div>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: s.color + "14", color: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>{s.step}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: C.t2, margin: 0, lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("inicio");
  const tabs = [
    { id: "inicio", label: "Inicio", color: C.t1 },
    { id: "oportunidades", label: "Oportunidades", color: C.teal },
    { id: "mirubro", label: "Mi rubro", color: C.teal },
    { id: "transparencia", label: "Transparencia", color: "#E8593C" },
    { id: "gestion", label: "Gestión", color: C.purple },
    { id: "ciudadania", label: "Ciudadanía", color: C.blue },
    { id: "sectores", label: "Sectores", color: C.gray },
  ];

  return (
    <div style={{ fontFamily: font, background: C.bg, minHeight: "100vh", color: C.t1, WebkitFontSmoothing: "antialiased" }}>
      <header style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "0.5px solid rgba(0,0,0,0.1)", padding: "0 32px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setTab("inicio")}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, color: "#fff" }}>MP</div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>Mercado Público</span>
          <span style={{ fontSize: 12, color: C.t3, marginLeft: 4 }}>Transparencia en Compras del Estado</span>
        </div>
        <span style={{ fontSize: 12, color: C.t3 }}>Datos simulados · Abril 2026</span>
      </header>

      <nav style={{ display: "flex", gap: 0, padding: "0 32px", background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", borderBottom: "0.5px solid rgba(0,0,0,0.06)", overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "transparent", border: "none",
            borderBottom: tab === t.id ? `2.5px solid ${t.color}` : "2.5px solid transparent",
            padding: "12px 18px", color: tab === t.id ? t.color : C.t3,
            fontWeight: tab === t.id ? 600 : 500, fontSize: 14, cursor: "pointer",
            fontFamily: font, transition: "all 0.12s", whiteSpace: "nowrap",
          }}>
            {t.label}
          </button>
        ))}
      </nav>

      <main style={{ padding: "24px 32px", maxWidth: 1200, margin: "0 auto" }}>
        {tab === "inicio" && <TabInicio onNavigate={setTab} />}
        {tab === "oportunidades" && <TabOportunidades />}
        {tab === "mirubro" && <TabMiRubro />}
        {tab === "transparencia" && <TabTransparencia />}
        {tab === "gestion" && <TabGestion />}
        {tab === "ciudadania" && <TabCiudadania />}
        {tab === "sectores" && <TabSectores />}
      </main>

      <footer style={{ textAlign: "center", padding: "20px 32px", fontSize: 12, color: C.t3 }}>
        Fuente: API Mercado Público · ChileCompra · Datos simulados con fines demostrativos
      </footer>
    </div>
  );
}
