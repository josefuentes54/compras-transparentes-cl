# 🏛️ Mercado Público Dashboard

**Plataforma de transparencia y análisis de compras públicas del Estado de Chile.**

Visualiza, filtra y analiza las licitaciones y órdenes de compra que realizan más de 850 organismos del Estado a través de [Mercado Público](https://www.mercadopublico.cl), usando datos en tiempo real desde la [API oficial de ChileCompra](https://www.chilecompra.cl/api/).

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 ¿Qué problema resuelve?

El portal Mercado Público tiene miles de licitaciones diarias, pero no ofrece herramientas de análisis ni visualización. Esta plataforma transforma esos datos crudos en información útil para:

| Audiencia | Necesidad | Sección |
|-----------|-----------|---------|
| **Proveedores** | Encontrar oportunidades y entender su mercado | Oportunidades, Mi Rubro |
| **Periodistas** | Fiscalizar el gasto público | Transparencia |
| **Funcionarios** | Comparar su gestión con otros organismos | Gestión |
| **Ciudadanos** | Saber en qué gasta su municipalidad | Ciudadanía |

## ✨ Funcionalidades

- **Oportunidades** — Licitaciones abiertas con filtros por rubro, región y monto
- **Mi Rubro** — Inteligencia de mercado por categoría: quién compra, quién gana, precios históricos
- **Transparencia** — Indicadores de riesgo: concentración de proveedores, tratos directos, licitaciones desiertas
- **Gestión** — Benchmarking entre organismos: días de adjudicación, MiPymes, eficiencia
- **Ciudadanía** — Buscador de municipalidades con desglose de gastos
- **Sectores** — Vista panorámica por sector del Estado

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Lenguaje | [TypeScript](https://www.typescriptlang.org/) |
| Estilos | [Tailwind CSS](https://tailwindcss.com/) |
| Gráficos | [Recharts](https://recharts.org/) |
| Base de datos | [PostgreSQL](https://www.postgresql.org/) vía [Neon](https://neon.tech/) |
| ORM | [Drizzle ORM](https://orm.drizzle.team/) |
| Estado | [Zustand](https://zustand-demo.pmnd.rs/) |
| Validación | [Zod](https://zod.dev/) |
| Deploy | [Vercel](https://vercel.com/) |

## 📁 Estructura del proyecto

```
src/
├── app/                        # Next.js App Router (páginas y API routes)
│   ├── dashboard/              # Página principal
│   ├── oportunidades/          # Licitaciones abiertas
│   ├── mi-rubro/               # Análisis por rubro
│   ├── transparencia/          # Indicadores de fiscalización
│   ├── gestion/                # Benchmarking organismos
│   ├── ciudadania/             # Buscador de municipalidades
│   ├── sectores/               # Vista por sector
│   └── api/                    # Backend (proxy API + cron sync)
│
├── features/                   # Feature-Sliced Design (por dominio)
│   ├── licitaciones/           # Componentes, hooks, servicios, tipos
│   ├── organismos/
│   ├── competencia/
│   └── sectores/
│
├── shared/                     # Código compartido
│   ├── components/ui/          # Card, Badge, DataTable, Skeleton...
│   ├── components/charts/      # Wrappers de Recharts con tema
│   ├── components/layout/      # Header, TabNav, Footer
│   ├── lib/                    # API client, formatters, constantes
│   └── store/                  # Zustand (filtros globales)
│
├── db/                         # Schema, migraciones, seed
│   └── schema/
│
└── scripts/                    # Sincronización manual de datos
```

## 🚀 Inicio rápido

### Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- [npm](https://www.npmjs.com/) o [pnpm](https://pnpm.io/)
- Un ticket de la [API de Mercado Público](https://api.mercadopublico.cl/modules/IniciarSesion.aspx)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/mercado-publico-dashboard.git
cd mercado-publico-dashboard

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu ticket y credenciales de DB

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# API Mercado Público (solicitar en https://api.mercadopublico.cl)
MERCADO_PUBLICO_TICKET=tu-ticket-aqui

# Base de datos PostgreSQL (Neon, Supabase o local)
DATABASE_URL=postgresql://user:password@host/database

# Secreto para proteger el endpoint de sincronización
CRON_SECRET=un-secreto-largo-aleatorio
```

### Comandos disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servir build de producción
npm run lint         # Linting con ESLint
npm run test         # Tests unitarios con Vitest
npm run db:generate  # Generar migraciones de DB
npm run db:push      # Aplicar migraciones
npm run db:seed      # Seed inicial (organismos + sectores)
npm run sync         # Sincronizar datos desde la API manualmente
```

## 📡 Fuente de datos

Todos los datos provienen de la **API de Mercado Público** de la Dirección ChileCompra:

- **Endpoint**: `api.mercadopublico.cl`
- **Formatos**: JSON, XML, JSONP
- **Límite**: 10.000 requests/día por ticket
- **Datos disponibles**: Licitaciones, órdenes de compra, organismos compradores, proveedores

La API entrega datos crudos del día. Este proyecto agrega una capa de:

1. **Almacenamiento histórico** — PostgreSQL para series de tiempo
2. **Enriquecimiento** — Clasificación por sector, región y rubro
3. **Análisis** — Métricas de competencia, concentración e inclusión MiPyme

Para más información sobre la API: [chilecompra.cl/api](https://www.chilecompra.cl/api/)

## 🗺️ Roadmap

- [x] Prototipo visual del dashboard
- [x] Arquitectura de información centrada en usuarios
- [x] Diseño de la estructura del proyecto
- [ ] Implementación Next.js + TypeScript
- [ ] Integración con la API real de Mercado Público
- [ ] Base de datos y sincronización automática
- [ ] Sistema de alertas por email
- [ ] Búsqueda full-text de licitaciones
- [ ] Exportar datos a CSV/Excel
- [ ] Mapas por región con datos georreferenciados
- [ ] PWA para acceso móvil offline

## 🤝 Contribuir

Las contribuciones son bienvenidas. Si quieres colaborar:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/mi-feature`)
3. Haz commit de tus cambios (`git commit -m 'Agrega mi feature'`)
4. Push a tu rama (`git push origin feature/mi-feature`)
5. Abre un Pull Request

### Áreas donde se necesita ayuda

- **Mapeo de organismos → sectores/regiones**: La API no clasifica organismos por sector. Se necesita un mapeo manual de los ~850 organismos.
- **Diseño UX**: Mejoras de accesibilidad, responsive, mobile-first.
- **Testing**: Unit tests para servicios y E2E para flujos principales.
- **Datos**: Scripts para backfill de datos históricos.

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE). Los datos de Mercado Público son de carácter público según las políticas de ChileCompra.

## ⚠️ Aviso legal

- Los datos mostrados provienen de la API pública de Mercado Público y son de carácter público.
- Esta plataforma **no** es un producto oficial de ChileCompra ni del Gobierno de Chile.
- Según las condiciones de uso de la API, la información publicada sin modificar debe indicar que la fuente es la Dirección ChileCompra.
- El autor no se responsabiliza por decisiones tomadas en base a los datos mostrados.

---

**Hecho con 🇨🇱 para la transparencia del gasto público en Chile.**
