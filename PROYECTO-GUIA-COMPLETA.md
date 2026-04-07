# Mercado Público Dashboard — Guía de Proyecto

## Arquitectura: Feature-Sliced Design (FSD)

> **¿Por qué no MVC?** MVC funciona bien para backends, pero en frontend moderno con React genera carpetas
> enormes de `controllers/` y `models/` que no escalan. **Feature-Sliced Design** organiza el código por
> **dominio de negocio** (licitaciones, organismos, sectores) en vez de por tipo de archivo. Cada feature
> es autónoma: tiene sus componentes, hooks, servicios y tipos. Si mañana agregas "Proveedores" o
> "Órdenes de Compra", solo creas una carpeta nueva sin tocar nada existente.

---

## Stack Tecnológico

| Capa | Tecnología | Por qué |
|------|-----------|---------|
| Framework | **Next.js 14+ (App Router)** | SSR/SSG, API Routes, deploy fácil en Vercel |
| Lenguaje | **TypeScript** | Tipado estricto sobre los JSON de la API |
| Estilos | **Tailwind CSS** | Consistente, rápido, ideal para diseño Apple-like |
| Gráficos | **Recharts** | Ya lo usamos, funciona perfecto con React |
| Base de Datos | **PostgreSQL** (Supabase o Neon) | Gratis, SQL real, escalable |
| ORM | **Drizzle ORM** | Ligero, type-safe, migraciones fáciles |
| Cron Jobs | **Vercel Cron** o **node-cron** | Para el scraping diario de la API |
| Estado | **Zustand** | Liviano, sin boilerplate, mejor que Redux para esto |
| Validación | **Zod** | Validar respuestas de la API de Mercado Público |
| Testing | **Vitest + Playwright** | Unit + E2E |

---

## Estructura de Carpetas

```
mercado-publico-dashboard/
│
├── .env.local                          # Variables de entorno (TICKET API, DB URL)
├── .env.example                        # Template para otros devs
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── drizzle.config.ts                   # Config del ORM
├── package.json
│
├── public/
│   ├── favicon.ico
│   └── og-image.png                    # Open Graph para compartir
│
├── src/
│   │
│   ├── app/                            # ─── Next.js App Router ───
│   │   ├── layout.tsx                  # Layout raíz (header, nav, footer)
│   │   ├── page.tsx                    # Página principal → redirige a /dashboard
│   │   ├── globals.css                 # Tailwind + variables CSS Apple
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx                # Tab "Dashboard" (vista general)
│   │   │
│   │   ├── organismos/
│   │   │   └── page.tsx                # Tab "Organismos"
│   │   │
│   │   ├── competencia/
│   │   │   └── page.tsx                # Tab "Competencia"
│   │   │
│   │   ├── licitaciones/
│   │   │   ├── page.tsx                # Tab "Licitaciones" (listado)
│   │   │   └── [codigo]/
│   │   │       └── page.tsx            # Detalle de una licitación
│   │   │
│   │   ├── sectores/
│   │   │   ├── page.tsx                # Tab "Sectores" (grid de tarjetas)
│   │   │   └── [sectorId]/
│   │   │       └── page.tsx            # Detalle de un sector
│   │   │
│   │   └── api/                        # ─── API Routes (Backend) ───
│   │       ├── licitaciones/
│   │       │   ├── route.ts            # GET /api/licitaciones?fecha=...&estado=...
│   │       │   └── [codigo]/
│   │       │       └── route.ts        # GET /api/licitaciones/[codigo]
│   │       │
│   │       ├── ordenes-compra/
│   │       │   └── route.ts            # GET /api/ordenes-compra
│   │       │
│   │       ├── organismos/
│   │       │   └── route.ts            # GET /api/organismos
│   │       │
│   │       ├── stats/
│   │       │   └── route.ts            # GET /api/stats (datos agregados del dashboard)
│   │       │
│   │       └── cron/
│   │           └── sync/
│   │               └── route.ts        # POST /api/cron/sync (llamado por Vercel Cron)
│   │
│   ├── features/                       # ─── Feature Slices (dominio de negocio) ───
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── StatCard.tsx
│   │   │   │   ├── MonthlyActivityChart.tsx
│   │   │   │   ├── EstadoPieChart.tsx
│   │   │   │   └── MipymeLineChart.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useDashboardStats.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── licitaciones/
│   │   │   ├── components/
│   │   │   │   ├── LicitacionCard.tsx
│   │   │   │   ├── LicitacionTable.tsx
│   │   │   │   ├── LicitacionDetail.tsx
│   │   │   │   ├── EstadoBadge.tsx
│   │   │   │   └── FiltrosLicitacion.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useLicitaciones.ts
│   │   │   │   └── useLicitacionDetail.ts
│   │   │   ├── services/
│   │   │   │   └── licitaciones.service.ts   # Fetch desde /api/licitaciones
│   │   │   └── types.ts                      # Licitacion, EstadoLicitacion, etc.
│   │   │
│   │   ├── organismos/
│   │   │   ├── components/
│   │   │   │   ├── OrganismoRanking.tsx
│   │   │   │   ├── OrganismoTable.tsx
│   │   │   │   └── OrganismoBarChart.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useOrganismos.ts
│   │   │   ├── services/
│   │   │   │   └── organismos.service.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── competencia/
│   │   │   ├── components/
│   │   │   │   ├── CompetenciaChart.tsx
│   │   │   │   ├── RegionChart.tsx
│   │   │   │   └── IndicadorCard.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useCompetencia.ts
│   │   │   └── types.ts
│   │   │
│   │   └── sectores/
│   │       ├── components/
│   │       │   ├── SectorGrid.tsx
│   │       │   ├── SectorCard.tsx
│   │       │   ├── SectorDetail.tsx
│   │       │   ├── RubrosChart.tsx
│   │       │   └── EntidadesTable.tsx
│   │       ├── hooks/
│   │       │   └── useSectores.ts
│   │       ├── data/
│   │       │   └── sector-mapping.ts          # Mapeo código organismo → sector
│   │       └── types.ts
│   │
│   ├── shared/                         # ─── Código compartido ───
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                     # Componentes genéricos reutilizables
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Skeleton.tsx        # Loading states
│   │   │   │   ├── DataTable.tsx
│   │   │   │   ├── AnimatedNumber.tsx
│   │   │   │   └── EmptyState.tsx
│   │   │   │
│   │   │   ├── charts/                 # Wrappers de Recharts con tema Apple
│   │   │   │   ├── ChartTooltip.tsx
│   │   │   │   ├── ChartContainer.tsx
│   │   │   │   └── chartTheme.ts       # Colores, estilos, config compartida
│   │   │   │
│   │   │   └── layout/
│   │   │       ├── Header.tsx
│   │   │       ├── TabNav.tsx
│   │   │       └── Footer.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useDebounce.ts
│   │   │   └── useMediaQuery.ts
│   │   │
│   │   ├── lib/
│   │   │   ├── api-client.ts           # Fetch wrapper con error handling
│   │   │   ├── mercado-publico.ts      # Cliente para api.mercadopublico.cl
│   │   │   ├── formatters.ts           # formatCLP(), formatDate(), etc.
│   │   │   ├── constants.ts            # Estados, tipos de licitación, etc.
│   │   │   └── utils.ts
│   │   │
│   │   ├── store/
│   │   │   └── filters.store.ts        # Zustand: filtros globales (fecha, región)
│   │   │
│   │   └── types/
│   │       ├── api.types.ts            # Tipos de la respuesta de Mercado Público
│   │       └── common.types.ts
│   │
│   └── db/                             # ─── Base de Datos ───
│       ├── schema/
│       │   ├── licitaciones.ts         # Tabla licitaciones
│       │   ├── ordenes-compra.ts       # Tabla órdenes de compra
│       │   ├── organismos.ts           # Tabla organismos + sector + región
│       │   └── sync-log.ts             # Registro de sincronizaciones
│       │
│       ├── migrations/                 # Migraciones auto-generadas por Drizzle
│       ├── seed.ts                     # Seed inicial (lista organismos, mapeo sectores)
│       └── index.ts                    # Conexión a la DB
│
├── scripts/
│   ├── sync-licitaciones.ts            # Script manual para llenar datos históricos
│   ├── sync-ordenes.ts
│   └── map-organismos-sectores.ts      # Genera el mapeo organismo → sector
│
└── tests/
    ├── unit/
    │   ├── formatters.test.ts
    │   └── mercado-publico.test.ts
    └── e2e/
        └── dashboard.spec.ts
```

---

## Cómo crear el proyecto desde 0

### Requisitos previos

```bash
# Necesitas Node.js 18+ y npm/pnpm
node --version   # debe ser >= 18
```

### Paso 1: Crear el proyecto Next.js

```bash
npx create-next-app@latest mercado-publico-dashboard \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd mercado-publico-dashboard
```

### Paso 2: Instalar dependencias

```bash
# UI y gráficos
npm install recharts zustand zod

# Base de datos
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit

# Utilidades
npm install date-fns clsx

# Testing (opcional, recomendado)
npm install -D vitest @testing-library/react playwright
```

### Paso 3: Crear la estructura de carpetas

```bash
# Features
mkdir -p src/features/{dashboard,licitaciones,organismos,competencia,sectores}/{components,hooks}
mkdir -p src/features/licitaciones/services
mkdir -p src/features/organismos/services
mkdir -p src/features/sectores/data

# Shared
mkdir -p src/shared/{components/{ui,charts,layout},hooks,lib,store,types}

# DB
mkdir -p src/db/{schema,migrations}

# API routes
mkdir -p src/app/api/{licitaciones,ordenes-compra,organismos,stats,cron/sync}

# Pages
mkdir -p src/app/{dashboard,organismos,competencia,sectores}
mkdir -p "src/app/licitaciones/[codigo]"
mkdir -p "src/app/sectores/[sectorId]"

# Scripts y tests
mkdir -p scripts
mkdir -p tests/{unit,e2e}
```

### Paso 4: Configurar variables de entorno

```bash
# Crear archivo .env.local
cat > .env.local << 'EOF'
# API Mercado Público
MERCADO_PUBLICO_TICKET=tu-ticket-aqui

# Base de datos (ejemplo con Neon)
DATABASE_URL=postgresql://user:pass@host/dbname

# Cron secret (para proteger el endpoint)
CRON_SECRET=un-secreto-largo-aleatorio
EOF

# Crear template para otros devs
cp .env.local .env.example
# Editar .env.example y quitar los valores reales
```

### Paso 5: Archivo base — Cliente de la API

Crea `src/shared/lib/mercado-publico.ts`:

```typescript
import { z } from "zod";

const BASE_URL = "https://api.mercadopublico.cl/servicios/v1/publico";
const TICKET = process.env.MERCADO_PUBLICO_TICKET!;

// ── Esquemas de validación ──
export const LicitacionSchema = z.object({
  CodigoExterno: z.string(),
  Nombre: z.string(),
  CodigoEstado: z.number(),
  FechaCierre: z.string(),
  // ... agrega los campos según la documentación
});

export type Licitacion = z.infer<typeof LicitacionSchema>;

// ── Cliente ──
export async function fetchLicitaciones(params: {
  fecha?: string;       // ddmmaaaa
  estado?: string;
  codigo?: string;
  codigoOrganismo?: string;
}) {
  const url = new URL(`${BASE_URL}/licitaciones.json`);
  url.searchParams.set("ticket", TICKET);

  if (params.fecha) url.searchParams.set("fecha", params.fecha);
  if (params.estado) url.searchParams.set("estado", params.estado);
  if (params.codigo) url.searchParams.set("codigo", params.codigo);
  if (params.codigoOrganismo) url.searchParams.set("CodigoOrganismo", params.codigoOrganismo);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchOrdenesCompra(params: {
  fecha?: string;
  estado?: string;
  codigo?: string;
}) {
  const url = new URL(`${BASE_URL}/ordenesdecompra.json`);
  url.searchParams.set("ticket", TICKET);

  if (params.fecha) url.searchParams.set("fecha", params.fecha);
  if (params.estado) url.searchParams.set("estado", params.estado);
  if (params.codigo) url.searchParams.set("codigo", params.codigo);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchOrganismos() {
  const url = `${BASE_URL}/Empresas/BuscarComprador?ticket=${TICKET}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
```

### Paso 6: Primer componente — Layout raíz

Edita `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/shared/components/layout/Header";
import { TabNav } from "@/shared/components/layout/TabNav";
import { Footer } from "@/shared/components/layout/Footer";

export const metadata: Metadata = {
  title: "Mercado Público — Dashboard de Transparencia",
  description: "Estadísticas de compras públicas del Estado de Chile",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Header />
        <TabNav />
        <main className="max-w-7xl mx-auto px-8 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### Paso 7: Correr el proyecto

```bash
npm run dev
# → http://localhost:3000
```

---

## Flujo de datos (arquitectura completa)

```
┌──────────────────────────────────────────────────────────┐
│                    FUENTE DE DATOS                        │
│         api.mercadopublico.cl (10.000 req/día)           │
└──────────────┬───────────────────────────────────────────┘
               │
               │  Cron nocturno (22:00 - 07:00)
               │  POST /api/cron/sync
               ▼
┌──────────────────────────────────────────────────────────┐
│                   CAPA DE INGESTA                         │
│                                                          │
│  scripts/sync-licitaciones.ts                            │
│  - Itera día a día                                       │
│  - Valida con Zod                                        │
│  - Enriquece: agrega sector, región, rubro               │
│  - Guarda en PostgreSQL                                  │
│  - Respeta límite de 10.000 req/día                      │
└──────────────┬───────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│                  BASE DE DATOS                            │
│              PostgreSQL (Neon/Supabase)                   │
│                                                          │
│  ┌─────────────┐ ┌──────────────┐ ┌─────────────┐      │
│  │ licitaciones│ │ordenes_compra│ │ organismos  │       │
│  │             │ │              │ │ + sector    │       │
│  │ código      │ │ código       │ │ + región    │       │
│  │ estado      │ │ estado       │ │ + código    │       │
│  │ monto       │ │ monto        │ │ + nombre    │       │
│  │ fecha       │ │ fecha        │ └─────────────┘      │
│  │ organismo   │ │ proveedor    │                       │
│  │ sector*     │ └──────────────┘ ┌─────────────┐      │
│  │ región*     │                  │  sync_log   │       │
│  └─────────────┘                  └─────────────┘      │
└──────────────┬───────────────────────────────────────────┘
               │
               │  API Routes de Next.js
               │  GET /api/stats, /api/licitaciones, etc.
               ▼
┌──────────────────────────────────────────────────────────┐
│                CAPA DE PRESENTACIÓN                       │
│                                                          │
│  ┌────────┐ ┌───────────┐ ┌─────────────┐ ┌──────────┐ │
│  │Dashboar│ │Organismos │ │Competencia  │ │Sectores  │ │
│  │  d     │ │           │ │             │ │          │ │
│  │ Stats  │ │ Rankings  │ │ Oferentes   │ │ Grid     │ │
│  │ Charts │ │ Tablas    │ │ Regional    │ │ Detail   │ │
│  │ Trends │ │ Barras    │ │ HHI         │ │ Rubros   │ │
│  └────────┘ └───────────┘ └─────────────┘ └──────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Orden de implementación recomendado

| Fase | Qué hacer | Tiempo estimado |
|------|----------|----------------|
| **1. Setup** | Crear proyecto, instalar deps, estructura de carpetas | 1 día |
| **2. Shared** | Componentes UI (Card, Badge, Table, charts), theme, formatters | 2-3 días |
| **3. Layout** | Header, TabNav, Footer, routing entre páginas | 1 día |
| **4. API Client** | `mercado-publico.ts`, validación Zod, API routes proxy | 1-2 días |
| **5. Dashboard** | StatCards, gráficos mensuales, pie chart estados | 2 días |
| **6. Licitaciones** | Listado, filtros, detalle por código, datos en vivo | 2-3 días |
| **7. DB Setup** | Schema Drizzle, migraciones, conexión Neon/Supabase | 1 día |
| **8. Cron Sync** | Script de ingesta, cron job, sync log | 2-3 días |
| **9. Organismos** | Rankings, tabla, gráfico de barras (datos de DB) | 2 días |
| **10. Sectores** | Mapeo organismo→sector, grid, detalle, rubros | 2-3 días |
| **11. Competencia** | Análisis oferentes, regional, HHI (datos de DB) | 2 días |
| **12. Deploy** | Vercel, variables de entorno, dominio | 1 día |

**Total estimado: 3-4 semanas** trabajando a ritmo normal.

---

## Comandos útiles del día a día

```bash
# Desarrollo
npm run dev                    # Servidor en localhost:3000

# Base de datos
npx drizzle-kit generate       # Generar migraciones
npx drizzle-kit push           # Aplicar migraciones
npx tsx src/db/seed.ts         # Seed inicial

# Scripts de sincronización
npx tsx scripts/sync-licitaciones.ts --from=01012026 --to=07042026

# Testing
npx vitest                     # Unit tests
npx playwright test            # E2E tests

# Build y deploy
npm run build                  # Build de producción
npx vercel                     # Deploy a Vercel
```
