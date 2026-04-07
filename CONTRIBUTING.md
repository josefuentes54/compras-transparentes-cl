# Contribuir a Mercado Público Dashboard

¡Gracias por tu interés en contribuir! Este proyecto busca mejorar la transparencia de las compras públicas en Chile y toda ayuda es bienvenida.

## Cómo contribuir

### Reportar bugs

1. Revisa los [issues existentes](../../issues) para evitar duplicados
2. Crea un nuevo issue usando la plantilla de bug report
3. Incluye pasos para reproducir, comportamiento esperado vs actual, y capturas de pantalla si aplica

### Proponer features

1. Abre un issue con la etiqueta `enhancement`
2. Describe el problema que resuelve y la audiencia que beneficia
3. Si puedes, incluye un mockup o diagrama

### Enviar código

1. Fork el repositorio
2. Crea una rama descriptiva: `feature/filtro-por-comuna` o `fix/error-formato-monto`
3. Sigue las convenciones del proyecto (ver abajo)
4. Escribe tests para funcionalidad nueva
5. Asegúrate de que `npm run lint` y `npm run test` pasen
6. Abre un PR con una descripción clara de los cambios

## Convenciones

### Código

- **TypeScript estricto** — No uses `any`, define tipos para todo
- **Componentes funcionales** — Con hooks, no clases
- **Feature-Sliced Design** — Cada feature en su propia carpeta dentro de `src/features/`
- **Nombres en español** para labels, textos y comentarios de negocio
- **Nombres en inglés** para código: variables, funciones, componentes

### Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: agrega filtro por región en oportunidades
fix: corrige formato de montos en CLP
docs: actualiza README con instrucciones de deploy
style: ajusta espaciado en tarjetas de sector
refactor: extrae lógica de fetch a custom hook
test: agrega tests para formatCLP
```

### Estructura de archivos

```
src/features/mi-feature/
├── components/
│   └── MiComponente.tsx
├── hooks/
│   └── useMiHook.ts
├── services/
│   └── mi-feature.service.ts
└── types.ts
```

## Áreas prioritarias

Si buscas dónde empezar, estas áreas necesitan ayuda:

- **Mapeo organismos → sectores**: Crear la tabla que clasifica ~850 organismos en sectores
- **Responsive design**: Hacer que los dashboards funcionen bien en móvil
- **Accesibilidad**: Mejorar ARIA labels, contraste, navegación por teclado
- **Tests**: Especialmente para los servicios que consumen la API

## Entorno de desarrollo

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Iniciar servidor
npm run dev
```

No necesitas la base de datos ni el ticket de la API para trabajar en componentes de UI — los datos simulados están incluidos en el código.

## Código de conducta

Sé respetuoso y constructivo. Este es un proyecto comunitario sin fines de lucro orientado a la transparencia pública.
