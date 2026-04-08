"use client";

import { C, font } from "@/lib/tokens";
import type { TabId } from "@/lib/types";

interface Tab {
  id: TabId;
  label: string;
  color: string;
}

const tabs: Tab[] = [
  { id: "inicio", label: "Inicio", color: C.t1 },
  { id: "oportunidades", label: "Oportunidades", color: C.teal },
  { id: "mirubro", label: "Mi rubro", color: C.teal },
  { id: "transparencia", label: "Transparencia", color: "#E8593C" },
  { id: "gestion", label: "Gestión", color: C.purple },
  { id: "ciudadania", label: "Ciudadanía", color: C.blue },
  { id: "sectores", label: "Sectores", color: C.gray },
];

interface NavBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function NavBar({ activeTab, onTabChange }: NavBarProps) {
  return (
    <nav
      style={{
        display: "flex",
        gap: 0,
        padding: "0 32px",
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "0.5px solid rgba(0,0,0,0.06)",
        overflowX: "auto",
        fontFamily: font,
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onTabChange(t.id)}
          style={{
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === t.id
                ? `2.5px solid ${t.color}`
                : "2.5px solid transparent",
            padding: "12px 18px",
            color: activeTab === t.id ? t.color : C.t3,
            fontWeight: activeTab === t.id ? 600 : 500,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: font,
            transition: "all 0.12s",
            whiteSpace: "nowrap",
          }}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
