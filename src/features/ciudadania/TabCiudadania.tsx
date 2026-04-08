"use client";

import { useState } from "react";
import { C, font, cardStyle, labelStyle, mono } from "@/lib/tokens";
import { Section } from "@/components/common/Section";
import { Stat } from "@/components/common/Stat";
import { comunas } from "@/lib/data";

export function TabCiudadania() {
  const [buscar, setBuscar] = useState("");
  const filtered = comunas.filter((c) =>
    c.nombre.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <>
      <Section title="¿En qué gasta tu municipalidad?" sub="Busca tu comuna y conoce cómo se usan los recursos públicos">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          <Stat lbl="Gasto total municipios" value={67000} prefix="$" suffix=" MM" />
          <Stat lbl="Municipalidades activas" value={345} />
          <Stat lbl="MiPymes en municipios" value={79} suffix="%" accent={C.green} sub="Sobre la media nacional" />
        </div>
      </Section>

      <div style={{ marginBottom: 16 }}>
        <input
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          placeholder="Buscar municipalidad..."
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 12,
            border: `1px solid ${C.border}`,
            fontSize: 15,
            fontFamily: font,
            color: C.t1,
            background: C.card,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {filtered.map((c, i) => (
          <div
            key={i}
            style={{ ...cardStyle, transition: "all 0.15s" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = cardStyle.boxShadow as string;
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
              Municipalidad de {c.nombre}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              <div>
                <div style={labelStyle}>Licitaciones</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{c.licitaciones}</div>
              </div>
              <div>
                <div style={labelStyle}>Monto (MM)</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>${c.monto.toLocaleString()}</div>
              </div>
            </div>
            <div style={{ padding: "10px 12px", borderRadius: 10, background: C.bg, marginBottom: 8 }}>
              <div style={labelStyle}>Principal compra</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 2 }}>{c.topCompra}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: C.t3 }}>MiPymes</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ height: 5, width: 60, borderRadius: 3, background: C.border }}>
                  <div style={{
                    height: "100%",
                    width: `${c.pctMipyme}%`,
                    borderRadius: 3,
                    background: c.pctMipyme >= 75 ? C.green : C.orange,
                  }} />
                </div>
                <span style={{
                  fontFamily: mono,
                  fontSize: 12,
                  fontWeight: 600,
                  color: c.pctMipyme >= 75 ? C.green : C.orange,
                }}>
                  {c.pctMipyme}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
