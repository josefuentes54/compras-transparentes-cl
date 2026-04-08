export interface Licitacion {
  id: string;
  org: string;
  desc: string;
  monto: number;
  rubro: string;
  region: string;
  estado: string;
  oferentes: number;
  cierre: string;
  tipo: string;
}

export interface RubroStat {
  rubro: string;
  licitaciones: number;
  monto: number;
  proveedoresActivos: number;
  montoPromedio: number;
  topGanador: string;
  pctTopGanador: number;
  oferentesPromedio: number;
  adjudicacion: number;
}

export interface GestionOrg {
  org: string;
  diasAdjudicacion: number;
  pctDesiertas: number;
  pctMipyme: number;
}

export interface Comuna {
  nombre: string;
  licitaciones: number;
  monto: number;
  topCompra: string;
  pctMipyme: number;
}

export interface Sector {
  id: string;
  nombre: string;
  icon: string;
  color: string;
  organismos: number;
  monto: number;
  licitaciones: number;
}

export type TabId =
  | "inicio"
  | "oportunidades"
  | "mirubro"
  | "transparencia"
  | "gestion"
  | "ciudadania"
  | "sectores";
