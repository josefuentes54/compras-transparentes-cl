# Compras Transparentes

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

## Instalación

### Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- [npm](https://www.npmjs.com/) 9 o superior
- Una base de datos PostgreSQL (recomendado: [Neon](https://neon.tech) o [Supabase](https://supabase.com) — ambos tienen plan gratuito)
- Ticket de API de Mercado Público ([solicitar aquí](https://api.mercadopublico.cl/modules/IniciarSesion.aspx))

### Pasos

**1. Clonar el repositorio**

```bash
git clone https://github.com/josefuentes54/compras-transparentes-cl.git
cd compras-transparentes-cl
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Configurar variables de entorno**

El proyecto incluye un archivo `.env` con las variables necesarias. Ábrelo y completa los valores:

```bash
# Abre .env y completa:
MERCADO_PUBLICO_TICKET=   # Tu ticket de la API de Mercado Público
DATABASE_URL=              # URL de conexión a PostgreSQL
CRON_SECRET=               # Secreto para proteger el endpoint de sincronización
```

Para generar un valor seguro para `CRON_SECRET`:

```bash
openssl rand -hex 32
```

**4. Ejecutar en desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Comandos

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run lint         # ESLint
```

## Fuente de datos

Los datos provienen de la API pública de Mercado Público (`api.mercadopublico.cl`). Actualmente el dashboard usa datos simulados — la integración real requiere un ticket de API y una base de datos PostgreSQL para almacenar históricos.

Esta plataforma no es un producto oficial de ChileCompra ni del Gobierno de Chile.
