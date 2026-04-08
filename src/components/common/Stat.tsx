import { C, cardStyle, labelStyle } from "@/lib/tokens";
import { AnimNum } from "./AnimNum";

interface StatProps {
  lbl: string;
  value: number;
  prefix?: string;
  suffix?: string;
  sub?: string;
  accent?: string;
}

export function Stat({ lbl, value, prefix, suffix, sub, accent }: StatProps) {
  return (
    <div style={{ ...cardStyle, padding: "18px 20px" }}>
      <div style={labelStyle}>{lbl}</div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          marginTop: 4,
          color: accent ?? C.t1,
        }}
      >
        <AnimNum target={value} prefix={prefix ?? ""} suffix={suffix ?? ""} />
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: C.t3, marginTop: 4 }}>{sub}</div>
      )}
    </div>
  );
}
