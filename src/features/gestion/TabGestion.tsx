"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { C, cardStyle, labelStyle, pill, ax, gr } from "@/lib/tokens";
import { Section } from "@/components/common/Section";
import { ChartTooltip } from "@/components/common/ChartTooltip";
import { gestionData } from "@/lib/data";

export function TabGestion() {
  const d = gestionData.benchmark;

  return (
    <>
      <Section title="Benchmarking de organismos" sub="Compara el desempeño entre organismos públicos">
        <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: `0.5px solid ${C.border}` }}>
                {["Organismo", "Días adjudicación", "% Desiertas", "% MiPyme", "Eficiencia"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "14px 22px", ...labelStyle }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.map((o, i) => {
                const score = Math.round(100 - o.diasAdjudicacion * 0.8 - o.pctDesiertas * 2 + o.pctMipyme * 0.3);
                return (
                  <tr
                    key={i}
                    style={{ borderBottom: `0.5px solid ${C.bg}`, transition: "background 0.1s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = C.hover)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                  >
                    <td style={{ padding: "14px 22px", fontWeight: 600 }}>{o.org}</td>
                    <td style={{ padding: "14px 22px", fontFamily: "monospace", fontSize: 13 }}>
                      <span style={{ color: o.diasAdjudicacion > 40 ? C.red : o.diasAdjudicacion > 30 ? C.orange : C.green, fontWeight: 600 }}>
                        {o.diasAdjudicacion} días
                      </span>
                    </td>
                    <td style={{ padding: "14px 22px", fontFamily: "monospace", fontSize: 13, color: o.pctDesiertas > 10 ? C.red : C.green, fontWeight: 600 }}>
                      {o.pctDesiertas}%
                    </td>
                    <td style={{ padding: "14px 22px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ height: 5, flex: 1, maxWidth: 80, borderRadius: 3, background: C.border }}>
                          <div style={{ height: "100%", width: `${o.pctMipyme}%`, borderRadius: 3, background: o.pctMipyme >= 70 ? C.green : C.orange }} />
                        </div>
                        <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600 }}>{o.pctMipyme}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 22px" }}>
                      <span style={pill(
                        (score >= 70 ? C.green : score >= 55 ? C.orange : C.red) + "14",
                        score >= 70 ? C.green : score >= 55 ? C.orange : C.red,
                      )}>
                        {score}/100
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={cardStyle}>
          <Section title="Días promedio de adjudicación" sub="Menor es mejor">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={d} layout="vertical" margin={{ left: 120 }}>
                <CartesianGrid {...gr} horizontal={false} />
                <XAxis type="number" tick={ax} axisLine={false} unit=" días" />
                <YAxis type="category" dataKey="org" tick={{ ...ax, fill: C.t2 }} axisLine={false} width={120} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="diasAdjudicacion" radius={[0, 6, 6, 0]} name="Días">
                  {d.map((o, i) => (
                    <Cell key={i} fill={o.diasAdjudicacion > 40 ? C.red : o.diasAdjudicacion > 30 ? C.orange : C.green} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Section>
        </div>

        <div style={cardStyle}>
          <Section title="Participación MiPyme por organismo" sub="Meta ChileCompra: 80%">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={d} layout="vertical" margin={{ left: 120 }}>
                <CartesianGrid {...gr} horizontal={false} />
                <XAxis type="number" tick={ax} axisLine={false} unit="%" domain={[0, 100]} />
                <YAxis type="category" dataKey="org" tick={{ ...ax, fill: C.t2 }} axisLine={false} width={120} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="pctMipyme" radius={[0, 6, 6, 0]} name="% MiPyme">
                  {d.map((o, i) => (
                    <Cell key={i} fill={o.pctMipyme >= 70 ? C.green : o.pctMipyme >= 50 ? C.orange : C.red} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Section>
        </div>
      </div>
    </>
  );
}
