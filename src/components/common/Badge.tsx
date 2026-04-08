import { C, pill } from "@/lib/tokens";

const colorMap: Record<string, string> = {
  Publicada: C.blue,
  Adjudicada: C.green,
  Cerrada: C.purple,
  alto: C.red,
  medio: C.orange,
  bajo: C.t3,
};

interface BadgeProps {
  text: string;
  color?: string;
}

export function Badge({ text, color }: BadgeProps) {
  const c = color ?? colorMap[text] ?? C.t3;
  return <span style={pill(c + "14", c)}>{text}</span>;
}
