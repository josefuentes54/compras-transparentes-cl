import { getLicitacionesByFecha, fechaDDMMYYYY } from "@/lib/mercadopublico";
import { NextResponse } from "next/server";

const DIAS_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

async function fetchDia(daysAgo: number) {
  const fecha = fechaDDMMYYYY(daysAgo);
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const dia = DIAS_ES[d.getDay()];

  const [total, publicadas, desiertas] = await Promise.all([
    getLicitacionesByFecha(fecha).catch(() => ({ Cantidad: 0 })),
    getLicitacionesByFecha(fecha, "publicada").catch(() => ({ Cantidad: 0 })),
    getLicitacionesByFecha(fecha, "desierta").catch(() => ({ Cantidad: 0 })),
  ]);

  return {
    dia,
    fecha,
    total: total.Cantidad ?? 0,
    publicadas: publicadas.Cantidad ?? 0,
    desiertas: desiertas.Cantidad ?? 0,
  };
}

export async function GET() {
  const semana = await Promise.all(
    Array.from({ length: 7 }, (_, i) => fetchDia(6 - i))
  );

  const hoy = semana[semana.length - 1];

  return NextResponse.json({ hoy, semana });
}
