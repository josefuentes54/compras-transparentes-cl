import { cardStyle, labelStyle } from "@/lib/tokens";
import { Section } from "@/components/common/Section";
import { sectoresData } from "@/lib/data";

export function TabSectores() {
  return (
    <Section title="Sectores del Estado" sub="Vista general por sector — montos en MM CLP">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
        {sectoresData.map((s) => (
          <div
            key={s.id}
            style={{ ...cardStyle, borderLeft: `3px solid ${s.color}`, transition: "all 0.15s", cursor: "pointer" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = cardStyle.boxShadow as string;
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 30 }}>{s.icon}</span>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{s.nombre}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              <div>
                <div style={labelStyle}>Organismos</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{s.organismos}</div>
              </div>
              <div>
                <div style={labelStyle}>Monto (MM)</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>${s.monto.toLocaleString()}</div>
              </div>
              <div>
                <div style={labelStyle}>Licitaciones</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{s.licitaciones.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
