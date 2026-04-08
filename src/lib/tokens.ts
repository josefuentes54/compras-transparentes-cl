import type { CSSProperties } from "react";

export const C = {
  blue: "#007AFF",
  green: "#34C759",
  orange: "#FF9500",
  red: "#FF3B30",
  purple: "#AF52DE",
  teal: "#5AC8FA",
  pink: "#FF2D55",
  gray: "#8E8E93",
  bg: "#F2F2F7",
  card: "#FFFFFF",
  border: "#E5E5EA",
  t1: "#1C1C1E",
  t2: "#3A3A3C",
  t3: "#8E8E93",
  hover: "#F9F9FB",
} as const;

export const font = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";
export const mono = "'SF Mono', 'Menlo', monospace";

export const cardStyle: CSSProperties = {
  background: C.card,
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 0 0 0.5px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
};

export const labelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: C.t3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

export const pill = (bg: string, fg: string): CSSProperties => ({
  background: bg,
  color: fg,
  padding: "3px 10px",
  borderRadius: 100,
  fontSize: 12,
  fontWeight: 600,
  display: "inline-block",
});

export const ax = { fill: C.t3, fontSize: 11 };
export const gr = { strokeDasharray: "3 3", stroke: "#E5E5EA" };

export const fmt = (n: number): string =>
  n >= 1e9
    ? `$${(n / 1e9).toFixed(1)}B`
    : n >= 1e6
    ? `$${(n / 1e6).toFixed(0)}M`
    : `$${n.toLocaleString("es-CL")}`;
