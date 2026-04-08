import { C } from "@/lib/tokens";
import type { ReactNode, CSSProperties } from "react";

interface SectionProps {
  title?: string;
  sub?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function Section({ title, sub, children, style }: SectionProps) {
  return (
    <div style={{ marginBottom: 20, ...style }}>
      {title && (
        <div style={{ marginBottom: 14 }}>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: C.t1,
              margin: 0,
            }}
          >
            {title}
          </h2>
          {sub && (
            <p style={{ fontSize: 13, color: C.t3, margin: "3px 0 0" }}>
              {sub}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
