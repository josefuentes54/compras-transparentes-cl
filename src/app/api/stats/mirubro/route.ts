import {
  getLicitacionesByFecha,
  getLicitacionDetalle,
  fechaDDMMYYYY,
} from "@/lib/mercadopublico";
import { NextResponse } from "next/server";

const MUESTRA = 50;

function topCategoria(cat: string): string {
  return cat?.split("/")?.[0]?.trim() ?? "Sin categoría";
}

export async function GET() {
  const fecha = fechaDDMMYYYY(1);
  const lista = await getLicitacionesByFecha(fecha, "publicada");
  const codigos = lista.Listado.slice(0, MUESTRA).map((l) => l.CodigoExterno);

  const detalles = await Promise.all(
    codigos.map((c) => getLicitacionDetalle(c).catch(() => null))
  );

  const map: Record<
    string,
    { count: number; montoSum: number; montoCount: number }
  > = {};

  for (const d of detalles) {
    if (!d) continue;
    const cat = topCategoria(d.Items?.Listado?.[0]?.Categoria ?? "");
    if (!map[cat]) map[cat] = { count: 0, montoSum: 0, montoCount: 0 };
    map[cat].count++;
    if (d.MontoEstimado && d.VisibilidadMonto === 1) {
      map[cat].montoSum += d.MontoEstimado;
      map[cat].montoCount++;
    }
  }

  const rubros = Object.entries(map)
    .map(([nombre, s]) => ({
      nombre,
      count: s.count,
      pct: Math.round((s.count / detalles.filter(Boolean).length) * 100),
      montoPromedio:
        s.montoCount > 0 ? Math.round(s.montoSum / s.montoCount) : null,
    }))
    .sort((a, b) => b.count - a.count);

  return NextResponse.json({
    totalDia: lista.Cantidad,
    muestra: detalles.filter(Boolean).length,
    fecha,
    rubros,
  });
}
