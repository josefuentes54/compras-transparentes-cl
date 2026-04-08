import { C } from "@/lib/tokens";

interface TooltipPayload {
  color: string;
  name: string;
  value: number | string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "10px 14px",
        fontSize: 12,
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: C.t2,
            marginTop: 2,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: p.color,
              display: "inline-block",
            }}
          />
          {p.name}:{" "}
          <strong>
            {typeof p.value === "number"
              ? p.value.toLocaleString("es-CL")
              : p.value}
          </strong>
        </div>
      ))}
    </div>
  );
}
