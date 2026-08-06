# OPMX — Opinión Pública de México

Portal público de OPMX. Este repositorio contiene el trabajo de **Fase 1**
autorizado sobre `BLUEPRINT_v1.1.md` — sistema visual, navegación, páginas
institucionales, landing, experiencia demo de Michoacán y SEO técnico
básico. No incluye OPMX FIELD, video, datos personales ni un sistema
estadístico productivo (ver `BLUEPRINT_v1.1.md` §3 y `PHASE_1_REPORT.md`
para el alcance exacto y sus límites).

## Documentos de referencia

- `BLUEPRINT.md` — propuesta original (v1.0), conservada intacta como
  historial de decisiones.
- `BLUEPRINT_v1.1.md` — blueprint vigente, con las correcciones aprobadas.
- `PHASE_1_EXECUTION_PLAN.md` — precisiones y alcance autorizado de Fase 1.
- `PHASE_1_REPORT.md` — evidencia de cumplimiento de Fase 1.
- `ARCHITECTURE.md` — módulos del monolito y sus límites.
- `STAGING.md` — barrera de acceso temporal de staging y su estado.

## Requisitos

- Node.js 22+ (ver `.github/workflows/ci.yml` para la versión exacta usada
  en CI).
- npm (el repositorio usa `package-lock.json`).

## Arranque

```bash
npm install
cp .env.example .env.local   # opcional: ver variables disponibles abajo
npm run dev                  # http://localhost:3000
```

## Scripts

| Script                            | Qué hace                                                                    |
| --------------------------------- | --------------------------------------------------------------------------- |
| `npm run dev`                     | Servidor de desarrollo (Turbopack).                                         |
| `npm run build`                   | Build de producción.                                                        |
| `npm run start`                   | Sirve el build de producción.                                               |
| `npm run lint`                    | ESLint (Next core-web-vitals + TypeScript + Prettier).                      |
| `npm run typecheck`               | `tsc --noEmit`, TypeScript estricto.                                        |
| `npm run format` / `format:write` | Verifica / aplica formato con Prettier.                                     |
| `npm run test:unit`               | Pruebas unitarias (Vitest + Testing Library).                               |
| `npm run test:e2e`                | Pruebas E2E (Playwright): navegación, SEO, accesibilidad (axe), responsive. |

## Variables de entorno

Ver `.env.example`. Ninguna es obligatoria para desarrollo local:

- `NEXT_PUBLIC_SITE_URL` — dominio usado en `sitemap.xml`, `robots.txt` y
  URLs canónicas. Por defecto, el dominio de producción del Master Spec.
- `STAGING_BASIC_AUTH_USER` / `STAGING_BASIC_AUTH_PASSWORD` — activan la
  barrera temporal de staging (`STAGING.md`). Sin ambas, el sitio queda
  abierto.

## Estructura

Ver `ARCHITECTURE.md` para el detalle de módulos y límites. Resumen:

```
src/
├── app/            Next.js App Router — páginas, layout, robots/sitemap
├── components/      Componentes por dominio (ui, layout, home, demo)
├── content/          Datos tipados y versionados en el repo (nav, glosario,
│                      secciones de home, el estudio demo de Michoacán)
├── lib/                Utilidades (SEO, verificación de staging auth)
└── proxy.ts             Barrera Basic Auth temporal de staging
tests/e2e/            Pruebas Playwright (navegación, SEO, accesibilidad,
                        responsive, demo)
```

## Estado del dato de Michoacán

`/demo/michoacan-gubernatura-junio-2026` es una **demostración de
interfaz**, no un estudio de OPMX. Está en `noindex`, fuera de
`sitemap.xml`, y sus cifras (que suman 97%, no 100%) no se han alterado ni
completado. Ver `src/content/studies/michoacan-gubernatura-2026-demo.ts` y
`BLUEPRINT_v1.1.md` §16.
