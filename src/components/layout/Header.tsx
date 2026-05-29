"use client";

import { C, font } from "@/lib/tokens";
import type { TabId } from "@/lib/types";

interface HeaderProps {
  onLogoClick: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
  return (
    <header
      style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "0.5px solid rgba(0,0,0,0.1)",
        padding: "0 32px",
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        fontFamily: font,
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        onClick={onLogoClick}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 11,
            color: "#fff",
          }}
        >
          CT
        </div>
        <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>
          Compras Transparentes
        </span>
        <span style={{ fontSize: 12, color: C.t3, marginLeft: 4 }}>
          Transparencia en Compras del Estado
        </span>
      </div>
      <span style={{ fontSize: 12, color: C.t3 }}>Datos simulados · Abril 2026</span>
    </header>
  );
}
