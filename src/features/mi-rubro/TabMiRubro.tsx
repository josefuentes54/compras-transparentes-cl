"use client";

import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { C, font, cardStyle, labelStyle, ax, gr } from "@/lib/tokens";
import { Section } from "@/components/common/Section";
import { Stat } from "@/components/common/Stat";
import { ChartTooltip } from "@/components/common/ChartTooltip";
import { rubroStats, rubroTrend } from "@/lib/data";

export function TabMiRubro() {
  const [sel, setSel] = useState<string | null>(null);
  const s = sel ? rubroStats.find((r) => r.rubro === sel) : null;

  if (!s) {
    return (
      <Section title="Mi rubro" sub="Elige tu categoría y conoce tu mercado: quién compra, cuánto se gasta y quién gana">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {rubroStats.map((r) => (
            <div
              key={r.rubro}
              onClick={() => setSel(r.rubro)}
              style={{ ...cardStyle, cursor: "pointer", transition: "all 0.15s", borderLeft: `3px solid ${C.blue}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = cardStyle.boxShadow as string;
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 12 }}>{r.rubro}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div><div style={labelStyle}>Licitaciones</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{r.licitaciones.toLocaleString()}</div></div>
                <div><div style={labelStyle}>Monto (MM)</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>${r.monto.toLocaleString()}</div></div>
                <div><div style={labelStyle}>Proveedores</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{r.proveedoresActivos.toLocaleString()}</div></div>
                <div><div style={labelStyle}>Adjudicación</div><div style={{ fontSize: 16, fontWeight: 700, marginTop: 2, color: C.green }}>{r.adjudicacion}%</div></div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <>
      <button
        onClick={() => setSel(null)}
        style={{ background: "transparent", border: "none", color: C.blue, cursor: "pointer", fontSize: 15, fontWeight: 500, padding: 0, marginBottom: 20, fontFamily: font }}
      >
        ‹ Todos los rubros
      </button>
      <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.01em" }}>{s.rubro}</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <Stat lbl="Licitaciones" value={s.licitaciones} />
        <Stat lbl="Monto total (MM)" value={s.monto} prefix="$" />
        <Stat lbl="Monto promedio (MM)" value={s.montoPromedio} prefix="$" />
        <Stat lbl="Oferentes promedio" value={parseFloat(s.oferentesPromedio.toFixed(1))} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        <div style={cardStyle}>
          <Section title="Tendencia de montos" sub="Evolución mensual MM CLP">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={rubroTrend}>
                <defs>
                  <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.blue} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...gr} />
                <XAxis dataKey="mes" tick={ax} axisLine={false} tickLine={false} />
                <YAxis tick={ax} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey={s.rubro} stroke={C.blue} fill="url(#gR)" strokeWidth={2} name={s.rubro} />
              </AreaChart>
            </ResponsiveContainer>
          </Section>
        </div>

        <div style={cardStyle}>
          <Section title="Competencia en tu rubro" sub="¿Quién domina el mercado?">
            <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ padding: "14px 16px", borderRadius: 12, background: C.bg }}>
                <div style={labelStyle}>Principal ganador</div>
                <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>{s.topGanador}</div>
                <div style={{ fontSize: 13, color: C.t3, marginTop: 2 }}>Gana el {s.pctTopGanador}% de las licitaciones del rubro</div>
                <div style={{ height: 5, borderRadius: 3, background: C.border, marginTop: 8 }}>
                  <div style={{
                    height: "100%",
                    width: `${s.pctTopGanador}%`,
                    borderRadius: 3,
                    background: s.pctTopGanador > 15 ? C.red : s.pctTopGanador > 10 ? C.orange : C.green,
                  }} />
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
    </>
  );
}
