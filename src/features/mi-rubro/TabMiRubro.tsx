"use client";

import { useState, useEffect } from "react";
import { C, font, cardStyle, labelStyle } from "@/lib/tokens";
import { Section } from "@/components/common/Section";
import { Stat } from "@/components/common/Stat";

type RubroApi = {
  nombre: string;
  count: number;
  pct: number;
  montoPromedio: number | null;
};

type ApiData = {
  totalDia: number;
  muestra: number;
  fecha: string;
  rubros: RubroApi[];
};

const COLORES = [C.blue, C.teal, C.green, C.purple, C.orange, "#E8593C", "#5AC8FA", "#AF52DE"];

function SkeletonCard() {
  return (
    <div style={{ ...cardStyle, padding: 20 }}>
      {[80, 60, 60].map((w, i) => (
        <div key={i} style={{ height: 14, width: `${w}%`, borderRadius: 7, background: C.border, marginBottom: 10 }} />
      ))}
    </div>
  );
}

export function TabMiRubro() {
  const [sel, setSel] = useState<string | null>(null);
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats/mirubro")
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const rubro = data?.rubros.find((r) => r.nombre === sel);

  if (loading) {
    return (
      <Section title="Mi rubro" sub="Consultando la API de ChileCompra…">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </Section>
    );
  }

  if (!data || data.rubros.length === 0) {
    return (
      <Section title="Mi rubro" sub="No se pudo cargar la información">
        <p style={{ color: C.t3, fontSize: 14 }}>Verifica que el ticket de API esté configurado en .env</p>
      </Section>
    );
  }

  if (!rubro) {
    return (
      <Section
        title="Mi rubro"
        sub={`Distribución real · ${data.muestra} licitaciones de ayer · ${data.totalDia.toLocaleString()} publicadas ese día`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {data.rubros.map((r, i) => (
            <div
              key={r.nombre}
              onClick={() => setSel(r.nombre)}
              style={{
                ...cardStyle,
                cursor: "pointer",
                transition: "all 0.15s",
                borderLeft: `3px solid ${COLORES[i % COLORES.length]}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = cardStyle.boxShadow as string;
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, color: C.t1, lineHeight: 1.3 }}>
                {r.nombre}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div>
                  <div style={labelStyle}>En muestra</div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2, color: COLORES[i % COLORES.length] }}>
                    {r.count}
                  </div>
                </div>
                <div>
                  <div style={labelStyle}>Del total</div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2 }}>{r.pct}%</div>
                </div>
                {r.montoPromedio && (
                  <div style={{ gridColumn: "span 2" }}>
                    <div style={labelStyle}>Monto promedio estimado</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>
                      ${(r.montoPromedio / 1_000_000).toFixed(1)} MM
                    </div>
                  </div>
                )}
              </div>
              {/* barra de proporción */}
              <div style={{ height: 4, borderRadius: 2, background: C.border, marginTop: 12 }}>
                <div style={{
                  height: "100%",
                  width: `${r.pct}%`,
                  borderRadius: 2,
                  background: COLORES[i % COLORES.length],
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 12, color: C.t3 }}>
          Datos en tiempo real · API ChileCompra · Muestra de {data.muestra} licitaciones publicadas ayer
        </div>
      </Section>
    );
  }

  const color = COLORES[data.rubros.findIndex((r) => r.nombre === sel) % COLORES.length];

  return (
    <>
      <button
        onClick={() => setSel(null)}
        style={{
          background: "transparent",
          border: "none",
          color: C.blue,
          cursor: "pointer",
          fontSize: 15,
          fontWeight: 500,
          padding: 0,
          marginBottom: 20,
          fontFamily: font,
        }}
      >
        ‹ Todos los rubros
      </button>
      <h2 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
        {rubro.nombre}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        <Stat lbl="En muestra de ayer" value={rubro.count} accent={color} />
        <Stat lbl="% del total" value={rubro.pct} suffix="%" accent={color} />
        {rubro.montoPromedio ? (
          <Stat lbl="Monto prom. estimado" value={Math.round(rubro.montoPromedio / 1_000_000)} prefix="$" accent={color} sub="millones CLP" />
        ) : (
          <Stat lbl="Monto" value={0} accent={C.t3} sub="no publicado" />
        )}
      </div>

      <div style={cardStyle}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Proporción dentro de la muestra</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.rubros.map((r, i) => (
            <div key={r.nombre} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 120, fontSize: 12, color: r.nombre === sel ? C.t1 : C.t3, fontWeight: r.nombre === sel ? 700 : 400, flexShrink: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {r.nombre}
              </div>
              <div style={{ flex: 1, height: 8, borderRadius: 4, background: C.border }}>
                <div style={{
                  height: "100%",
                  width: `${r.pct}%`,
                  borderRadius: 4,
                  background: r.nombre === sel ? color : C.border,
                  transition: "width 0.6s ease",
                }} />
              </div>
              <div style={{ fontSize: 12, color: C.t3, width: 36, textAlign: "right" }}>{r.pct}%</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, fontSize: 12, color: C.t3 }}>
          Muestra real de {data.muestra} licitaciones · API ChileCompra · {data.fecha.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")}
        </div>
      </div>
    </>
  );
}
