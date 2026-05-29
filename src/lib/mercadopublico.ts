const TICKET = process.env.MERCADO_PUBLICO_TICKET;
const BASE = "https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json";

export type LicitacionItem = {
  CodigoExterno: string;
  Nombre: string;
  CodigoEstado: number;
  FechaCierre: string | null;
};

export type LicitacionDetalle = {
  CodigoExterno: string;
  Nombre: string;
  Estado: string;
  Tipo: string;
  MontoEstimado: number | null;
  VisibilidadMonto: number;
  Comprador: { NombreOrganismo: string; RegionUnidad: string };
  Items: {
    Listado: Array<{
      Categoria: string;
      CodigoCategoria: string;
      NombreProducto: string;
    }>;
  };
};

export function fechaDDMMYYYY(daysAgo = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return dd + mm + d.getFullYear();
}

export async function getLicitacionesByFecha(
  fecha: string,
  estado?: string
): Promise<{ Cantidad: number; Listado: LicitacionItem[] }> {
  const params = new URLSearchParams({ ticket: TICKET!, fecha });
  if (estado) params.set("estado", estado);
  const res = await fetch(`${BASE}?${params}`);
  return res.json();
}

export async function getLicitacionDetalle(
  codigo: string
): Promise<LicitacionDetalle | null> {
  const res = await fetch(`${BASE}?ticket=${TICKET}&codigo=${codigo}`);
  const json = await res.json();
  return json?.Listado?.[0] ?? null;
}
