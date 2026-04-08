"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, LineChart, Line, Cell,
} from "recharts";
import { C, cardStyle, ax, gr } from "@/lib/tokens";
import { Section } from "@/components/common/Section";
import { Stat } from "@/components/common/Stat";
import { Badge } from "@/components/common/Badge";
import { ChartTooltip } from "@/components/common/ChartTooltip";
import { transparenciaData } from "@/lib/data";

export function TabTransparencia() {
  const d = transparenciaData;

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <Stat lbl="Licitaciones 1 oferente" value={10400} accent={C.red} sub="18% del total — riesgo" />
        <Stat lbl="Desiertas" value={5187} accent={C.orange} sub="9% — bases mal diseñadas" />
        <Stat lbl="Tratos directos" value={5150} accent={C.purple} sub="8.9% de las compras" />
        <Stat lbl="Participación MiPyme" value={73} suffix="%" accent={C.green} sub="Meta: 80%" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        <div style={cardStyle}>
          <Section title="Señales de alerta" sub="Indicadores que merecen atención">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {d.anomalias.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: C.bg,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Badge text={a.riesgo} />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{a.tipo}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>
                      {a.cantidad.toLocaleString()}
                    </span>
                    <span style={{ fontSize: 12, color: C.t3, marginLeft: 6 }}>({a.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div style={cardStyle}>
          <Section title="Concentración por organismo" sub="% de licitaciones ganadas por un solo proveedor">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={d.concentracion} layout="vertical" margin={{ left: 110 }}>
                <CartesianGrid {...gr} horizontal={false} />
                <XAxis type="number" tick={ax} axisLine={false} unit="%" />
                <YAxis type="category" dataKey="org" tick={{ ...ax, fill: C.t2 }} axisLine={false} width={110} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="pct1Proveedor" radius={[0, 6, 6, 0]} name="% un proveedor">
                  {d.concentracion.map((c, i) => (
                    <Cell key={i} fill={c.pct1Proveedor > 25 ? C.red : c.pct1Proveedor > 20 ? C.orange : C.green} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Section>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={cardStyle}>
          <Section title="Licitaciones vs tratos directos" sub="Evolución mensual">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={d.tratosDirectos}>
                <defs>
                  <linearGradient id="gL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.blue} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.red} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={C.red} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...gr} />
                <XAxis dataKey="mes" tick={ax} axisLine={false} tickLine={false} />
                <YAxis tick={ax} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="licitacion" stroke={C.blue} fill="url(#gL)" strokeWidth={2} name="Licitaciones" />
                <Area type="monotone" dataKey="tratoDirecto" stroke={C.red} fill="url(#gT)" strokeWidth={2} name="Trato directo" />
              </AreaChart>
            </ResponsiveContainer>
          </Section>
        </div>

        <div style={cardStyle}>
          <Section title="Inclusión MiPymes" sub="% de adjudicaciones a micro, pequeñas y medianas empresas">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={d.mipyme}>
                <CartesianGrid {...gr} />
                <XAxis dataKey="mes" tick={ax} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 85]} tick={ax} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="pct"
                  stroke={C.green}
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: C.green, stroke: "#fff", strokeWidth: 2 }}
                  name="% MiPymes"
                />
              </LineChart>
            </ResponsiveContainer>
          </Section>
        </div>
      </div>
    </>
  );
}
