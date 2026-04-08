# Mercado Público Dashboard

Plataforma de transparencia y análisis de compras públicas del Estado de Chile. Visualiza licitaciones, detecta anomalías y compara el desempeño de organismos usando datos de la [API oficial de ChileCompra](https://www.chilecompra.cl/api/).

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

---

## Secciones

| Sección | Para quién | Qué muestra |
|---|---|---|
| **Oportunidades** | Proveedores | Licitaciones abiertas filtradas por rubro y región |
| **Mi Rubro** | Proveedores | Quién compra, quién gana, precios históricos por categoría |
| **Transparencia** | Periodistas | Concentración de proveedores, tratos directos, licitaciones con un solo oferente |
| **Gestión** | Funcionarios | Benchmarking entre organismos: días de adjudicación, MiPymes, eficiencia |
| **Ciudadanía** | Ciudadanos | En qué gasta cada municipalidad |
| **Sectores** | Todos | Vista panorámica por sector del Estado |

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 4 |
| Gráficos | Recharts |
| Base de datos | PostgreSQL vía Neon |
| ORM | Drizzle ORM |
| Deploy | Vercel |

## Estructura

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # Shell principal con navegación por tabs
│
├── components/
│   ├── common/            # AnimNum, Stat, Badge, Section, ChartTooltip
│   └── layout/            # Header, NavBar, Footer
│
├── features/              # Un directorio por sección del dashboard
│   ├── inicio/
│   ├── oportunidades/
│   ├── mi-rubro/
│   ├── transparencia/
│   ├── gestion/
│   ├── ciudadania/
│   └── sectores/
│
└── lib/
    ├── data.ts            # Datos simulados (reemplazar con API real)
    ├── tokens.ts          # Design tokens Apple HIG
    └── types.ts           # Tipos TypeScript compartidos
```

## Desarrollo

```bash
npm install
cp .env.example .env.local   # Completar variables
npm run dev                  # http://localhost:3000
```

## Variables de entorno

```env
# API Mercado Público (https://api.mercadopublico.cl)
MERCADO_PUBLICO_TICKET=

# Base de datos (Neon, Supabase o local)
DATABASE_URL=

# Protege el endpoint de sincronización
CRON_SECRET=
```

## Comandos

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run lint         # ESLint
```

## Fuente de datos

Los datos provienen de la API pública de Mercado Público (`api.mercadopublico.cl`). Actualmente el dashboard usa datos simulados — la integración real requiere un ticket de API y una base de datos PostgreSQL para almacenar históricos.

Esta plataforma no es un producto oficial de ChileCompra ni del Gobierno de Chile.
