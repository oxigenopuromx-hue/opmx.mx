# Arquitectura — Fase 1

Documento de arquitectura del monolito tal como está implementado hoy
(distinto de `BLUEPRINT_v1.1.md` §1-3, que es la propuesta; este documento
describe lo que realmente existe en el repositorio).

## Un solo runtime

Next.js (App Router) es la única aplicación desplegable. No hay backend
separado, no hay cola, no hay Redis, no hay servicio estadístico en Fase 1
— conforme a la decisión de "modular monolith" de `BLUEPRINT_v1.1.md` §1.
Las condiciones para extraer un servicio están documentadas ahí, no aquí.

## Módulos y límites

```
src/
├── app/                  Rutas (App Router). Cada carpeta = una URL.
│                          No contiene lógica de negocio reutilizable: solo
│                          composición de componentes + metadata de página.
│
├── components/
│   ├── ui/                 Componentes de sistema visual, sin conocimiento
│   │                        de contenido específico de OPMX (Button, Badge,
│   │                        Callout, Container, PageHeader, SkipLink,
│   │                        UnderConstruction). Reutilizables en cualquier
│   │                        página.
│   ├── layout/               Chrome del sitio (SiteHeader, SiteFooter,
│   │                          Breadcrumbs). Dependen de `content/nav.ts`
│   │                          pero no de páginas específicas.
│   ├── home/                   Componentes exclusivos de la home
│   │                            (HomeSectionCard).
│   └── demo/                     Componentes exclusivos de la experiencia
│                                   demo (DemoResultsChart).
│
├── content/                Datos tipados, versionados e inmutables en el
│                             repositorio (no hay base de datos en Fase 1 —
│                             BLUEPRINT_v1.1.md §1, precisión 1 de la
│                             autorización de Fase 1):
│   ├── nav.ts                 Menú principal, CTA, enlaces de pie.
│   ├── home-sections.ts         Secciones de la home y su estado
│   │                             (real/placeholder).
│   ├── glosario.ts                Definiciones del glosario.
│   └── studies/
│       └── michoacan-gubernatura-2026-demo.ts
│                                    El dato demo. Ver la nota de
│                                    inmutabilidad en el propio archivo.
│
├── lib/
│   ├── seo.ts                SITE_URL / SITE_NAME compartidos.
│   └── staging-auth.ts        Verificación pura de Basic Auth (sin
│                                acoplarse a `NextRequest`, para poder
│                                probarla por unidad).
│
└── proxy.ts                Barrera Basic Auth de staging (ver
                              `STAGING.md`). Es el único punto donde corre
                              código antes de cada request.
```

## Reglas de dependencia

- `app/*` puede importar de `components/*`, `content/*` y `lib/*`.
- `components/ui/*` no importa de `content/*` ni de `app/*` (permanece
  genérico).
- `components/layout/*` y `components/home/*` / `components/demo/*` sí
  pueden importar de `content/*` (son específicos de OPMX).
- `content/*` no importa de `components/*` ni de `app/*` (son datos puros).
- Nada en `src/` accede a una base de datos: no existe ese cliente todavía.
  Cuando se introduzca (ADR-003, `BLUEPRINT_v1.1.md` §14), debe entrar
  detrás de una interfaz en `lib/` para que `content/studies/*` pueda
  migrarse sin tocar los componentes que lo consumen — tal como anticipa
  `PHASE_1_EXECUTION_PLAN.md` §1.

## Lo que deliberadamente no existe todavía

- `app/admin/*` — no hay panel administrativo en Fase 1.
- `app/api/*` — no hay rutas de API con datos en Fase 1 (las únicas rutas
  especiales son `robots.ts`, `sitemap.ts` y `opengraph-image.tsx`, que son
  convenciones de metadata de Next.js, no una API de negocio).
- Un cliente de base de datos — ver arriba.
- Un sistema de autenticación de usuarios — `proxy.ts` es una barrera de
  despliegue, no un sistema de identidad (`BLUEPRINT_v1.1.md` §5).

`robots.txt` ya reserva `/admin/` y `/api/` por adelantado (nunca serán
públicos cuando se construyan), sin que eso implique que existen hoy.
