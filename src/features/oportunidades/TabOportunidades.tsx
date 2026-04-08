"use client";

import { useState, useMemo } from "react";
import { C, font, mono, cardStyle, labelStyle, pill, fmt } from "@/lib/tokens";
import { Section } from "@/components/common/Section";
import { Badge } from "@/components/common/Badge";
import { oportunidades, rubros, regiones } from "@/lib/data";

export function TabOportunidades() {
  const [rubro, setRubro] = useState("Todos");
  const [region, setRegion] = useState("Todas");
  const [orden, setOrden] = useState("cierre");

  const filtered = useMemo(() => {
    let r = oportunidades.filter((o) => o.estado === "Publicada");
    if (rubro !== "Todos") r = r.filter((o) => o.rubro === rubro);
    if (region !== "Todas") r = r.filter((o) => o.region === region);
    if (orden === "monto") r = [...r].sort((a, b) => b.monto - a.monto);
    return r;
  }, [rubro, region, orden]);

  const selectStyle: React.CSSProperties = {
    padding: "8px 12px",
    borderRadius: 10,
    border: `1px solid ${C.border}`,
    fontSize: 14,
    fontFamily: font,
    color: C.t1,
    background: C.card,
    cursor: "pointer",
    outline: "none",
  };

  const Sel = ({ opts, val, set }: { opts: string[]; val: string; set: (v: string) => void }) => (
    <select value={val} onChange={(e) => set(e.target.value)} style={selectStyle}>
      {opts.map((o) => <option key={o}>{o}</option>)}
    </select>
  );

  return (
    <>
      <Section title="Oportunidades abiertas" sub="Licitaciones publicadas ahora mismo — filtra por tu rubro y región">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: C.t3, fontWeight: 500 }}>Rubro</span>
          <Sel opts={rubros} val={rubro} set={setRubro} />
          <span style={{ fontSize: 13, color: C.t3, fontWeight: 500, marginLeft: 8 }}>Región</span>
          <Sel opts={regiones} val={region} set={setRegion} />
          <span style={{ fontSize: 13, color: C.t3, fontWeight: 500, marginLeft: 8 }}>Ordenar</span>
          <Sel opts={["cierre", "monto"]} val={orden} set={setOrden} />
          <span style={{ marginLeft: "auto", fontSize: 13, color: C.blue, fontWeight: 600 }}>
            {filtered.length} resultados
          </span>
        </div>
      </Section>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((l, i) => (
          <div
            key={i}
            style={{
              ...cardStyle,
              padding: "16px 22px",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              transition: "box-shadow 0.12s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = cardStyle.boxShadow as string)}
          >
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
              <div style={{ fontSize: 12, color: C.orange, fontWeight: 600, marginTop: 2 }}>
                Cierre {l.cierre}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ ...cardStyle, textAlign: "center", padding: 40, color: C.t3 }}>
            No hay licitaciones con esos filtros
          </div>
        )}
      </div>
    </>
  );
}
