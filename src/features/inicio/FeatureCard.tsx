"use client";

import { cardStyle, pill, C } from "@/lib/tokens";

interface FeatureCardProps {
  icon: string;
  color: string;
  title: string;
  desc: string;
  tag: string;
  onClick: () => void;
}

export function FeatureCard({ icon, color, title, desc, tag, onClick }: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      style={{ ...cardStyle, cursor: "pointer", transition: "all 0.18s", position: "relative", overflow: "hidden" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = `0 8px 28px ${color}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = cardStyle.boxShadow as string;
      }}
    >
      <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: color, opacity: 0.05 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: color + "14",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
          }}
        >
          {icon}
        </div>
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
