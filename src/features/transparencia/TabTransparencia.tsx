"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell,
} from "recharts";
import { C, cardStyle, ax, gr } from "@/lib/tokens";
import { Section } from "@/components/common/Section";
import { Stat } from "@/components/common/Stat";
import { Badge } from "@/components/common/Badge";
import { ChartTooltip } from "@/components/common/ChartTooltip";
import { transparenciaData } from "@/lib/data";

type DiaData = {
  dia: string;
  total: number;
  publicadas: number;
  desiertas: number;
};

type ApiData = {
  hoy: DiaData;
  semana: DiaData[];
};

function SkeletonBar() {
  return (
    <div style={{ height: 16, borderRadius: 8, background: C.border, marginBottom: 8, animation: "pulse 1.5s infinite" }} />
  );
}

export function TabTransparencia() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const d = transparenciaData;

  useEffect(() => {
    fetch("/api/stats/transparencia")
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalHoy = data?.hoy.total ?? 0;
  const publicadasHoy = data?.hoy.publicadas ?? 0;
  const desiertasHoy = data?.hoy.desiertas ?? 0;
  const pctDesiertas = totalHoy > 0 ? ((desiertasHoy / totalHoy) * 100).toFixed(1) : "0";

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ ...cardStyle, padding: 20 }}>
              <SkeletonBar />
              <SkeletonBar />
            </div>
          ))
        ) : (
          <>
            <Stat lbl="Licitaciones hoy" value={totalHoy} accent={C.blue} sub="total publicado" />
            <Stat lbl="Abiertas a ofertas" value={publicadasHoy} accent={C.green} sub={`${Math.round((publicadasHoy/totalHoy)*100)||0}% del total`} />
            <Stat lbl="Desiertas hoy" value={desiertasHoy} accent={C.orange} sub={`${pctDesiertas}% — sin oferentes`} />
            <Stat lbl="Participación MiPyme" value={73} suffix="%" accent={C.teal} sub="dato simulado · Meta: 80%" />
          </>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        <div style={cardStyle}>
          <Section title="Señales de alerta" sub="Indicadores estimados (datos simulados)">
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
          <Section title="Concentración por organismo" sub="% estimado por un solo proveedor (simulado)">
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
          <Section
            title="Actividad semanal"
            sub={loading ? "Cargando datos reales…" : "Licitaciones totales vs publicadas — últimos 7 días"}
          >
            {loading ? (
              <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: C.t3, fontSize: 14 }}>
                Consultando API…
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data?.semana ?? []}>
                  <defs>
                    <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.blue} stopOpacity={0.12} />
                      <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.green} stopOpacity={0.12} />
                      <stop offset="100%" stopColor={C.green} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...gr} />
                  <XAxis dataKey="dia" tick={ax} axisLine={false} tickLine={false} />
                  <YAxis tick={ax} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="total" stroke={C.blue} fill="url(#gT)" strokeWidth={2} name="Total" />
                  <Area type="monotone" dataKey="publicadas" stroke={C.green} fill="url(#gP)" strokeWidth={2} name="Publicadas" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Section>
        </div>

        <div style={cardStyle}>
          <Section
            title="Desiertas por día"
            sub={loading ? "Cargando…" : "Licitaciones sin oferentes — últimos 7 días"}
          >
            {loading ? (
              <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: C.t3, fontSize: 14 }}>
                Consultando API…
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data?.semana ?? []}>
                  <CartesianGrid {...gr} />
                  <XAxis dataKey="dia" tick={ax} axisLine={false} tickLine={false} />
                  <YAxis tick={ax} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="desiertas" radius={[6, 6, 0, 0]} name="Desiertas" fill={C.orange} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Section>
        </div>
      </div>

      {!loading && (
        <div style={{ marginTop: 16, fontSize: 12, color: C.t3, textAlign: "right" }}>
          Datos en tiempo real · API ChileCompra · Concentración y anomalías: estimados
        </div>
      )}
    </>
  );
}
