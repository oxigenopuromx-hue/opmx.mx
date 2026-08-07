# OPMX — Reporte de Fase 1

**Alcance autorizado:** `BLUEPRINT_v1.1.md` §3, §12, §13 y §16, con las
precisiones de `PHASE_1_EXECUTION_PLAN.md`.
**Estado:** Fase 1 completa según los criterios de aceptación verificados
abajo. **No se ha iniciado la Fase 2.**

---

## 1. Resumen

Se construyó el portal público de OPMX como monolito Next.js (App Router +
TypeScript estricto + Tailwind), sin base de datos, sin OPMX FIELD, sin
video ni datos personales, y sin sistema de identidad — exactamente el
alcance delimitado en `BLUEPRINT_v1.1.md` §3. Se entregaron 10 commits
pequeños y descriptivos, cada uno verificado con lint + typecheck + tests
antes de avanzar al siguiente.

## 2. Commits de esta fase

```
108e202 Fase 1: estructura inicial del monolito (Next.js + TypeScript + Tailwind)
266a60c Fase 1: TypeScript estricto, lint, formato, pruebas unitarias/E2E y CI
cca2cc2 Fase 1: sistema visual — tokens y componentes base
a22704d Fase 1: navegación y páginas institucionales
3a7ef0d Fase 1: landing pública
9aa00c5 Fase 1: experiencia demo de Michoacán
b8c953f Fase 1: SEO técnico básico, robots.txt y sitemap.xml
33507fc Fase 1: accesibilidad automatizada + fix de bug real de contraste
524e771 Fase 1: staging protegido con barrera Basic Auth temporal
317861d Fase 1: verificación de criterios de aceptación
```

Precedidos por los documentos de blueprint (`BLUEPRINT.md`,
`BLUEPRINT_v1.1.md`, `PHASE_1_EXECUTION_PLAN.md`), ya aprobados antes de
esta ejecución.

## 3. Rutas entregadas

| Ruta                                                                                                                              | Estado                                                                          | Indexable                          |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------- |
| `/`                                                                                                                               | Real (landing)                                                                  | Sí                                 |
| `/sobre-opmx`                                                                                                                     | Real                                                                            | Sí                                 |
| `/transparencia`                                                                                                                  | Real (con apartados marcados "pendiente de publicación" donde no hay info real) | Sí                                 |
| `/metodologia`                                                                                                                    | Real (hub)                                                                      | Sí                                 |
| `/glosario`                                                                                                                       | Real (parcial, 10 términos)                                                     | Sí                                 |
| `/demo/michoacan-gubernatura-junio-2026`                                                                                          | Demo, no es contenido editorial de OPMX                                         | **No** (noindex, fuera de sitemap) |
| `/encuestas`, `/datos`, `/tendencias`, `/elecciones`, `/estados`, `/personas`, `/partidos`, `/auditoria`, `/archivo`, `/analisis` | Estado vacío honesto ("en construcción")                                        | **No** (noindex, fuera de sitemap) |
| `/robots.txt`, `/sitemap.xml`, `/opengraph-image`                                                                                 | Metadata técnica                                                                | —                                  |

18 páginas de contenido + 3 rutas de metadata técnica. Todas compilan y
sirven 200 (ver §5).

## 4. Comandos ejecutados y resultados

Todos ejecutados en la raíz del repositorio, sobre el estado final del
código (no resultados parciales de commits intermedios).

### Lint

```
$ npm run lint
> eslint .
(sin salida — sin errores ni warnings)
```

### Typecheck

```
$ npm run typecheck
> tsc --noEmit
(sin salida — sin errores)
```

### Formato

```
$ npm run format
> prettier --check .
Checking formatting...
All matched files use Prettier code style!
```

### Pruebas unitarias

```
$ npm run test:unit
 Test Files  3 passed (3)
      Tests  12 passed (12)
```

Cubren: render de la home y su enlace a la demo, las cifras exactas e
inmutables del estudio demo (incluyendo el total de 97%), y la lógica de
verificación de la barrera Basic Auth de staging (7 casos).

### Pruebas E2E (Playwright + @axe-core/playwright)

```
$ npm run test:e2e
Running 40 tests using 2 workers
  40 passed (26.5s)
```

Desglose:

- 16 pruebas de accesibilidad automatizada (axe, tags WCAG 2.x/2.2 A/AA) —
  una por cada ruta de contenido de Fase 1, **0 violaciones**.
- 2 pruebas de teclado (skip link, menú móvil).
- 4 pruebas de la demo (noindex, advertencia del 97%, ausencia de
  structured data, enlace desde home).
- 3 pruebas de navegación/breadcrumbs.
- 9 pruebas de responsive (sin overflow horizontal en 375/768/1440px ×
  3 rutas) + 2 de comportamiento nav móvil/escritorio.
- 3 pruebas de SEO técnico (robots.txt, sitemap.xml, canonical).
- 1 prueba smoke.

### Build de producción

```
$ npm run build
✓ Compiled successfully
✓ Generating static pages (22/22)
ƒ Proxy (Middleware)
○ (Static) prerendered as static content
```

Todas las páginas de contenido se generan como estático (SSG) — coherente
con el requisito de HTML rastreable sin depender de JavaScript (Master
Spec Sección 50).

## 5. Accesibilidad — hallazgo real y corrección

Antes de las correcciones finales, la ejecución de las 16 pruebas axe
encontró **16 fallos reales de contraste de color** (`serious`, ratio tan
bajo como 1.3:1 contra el mínimo de 4.5:1). La causa raíz: en
`src/app/globals.css`, `--color-background`/`--color-foreground` estaban
declaradas dentro de `@theme inline` anidado en
`@media (prefers-color-scheme: dark)`. Tailwind v4 fusiona los tokens
`@theme` en una única definición en tiempo de build, así que la envoltura
en `@media` se perdía: el valor "oscuro" quedaba activo de forma
**permanente para todos los visitantes**, sin importar su preferencia real
de sistema, mientras que las utilidades `dark:` normales sí respetaban esa
preferencia — dejando texto oscuro sobre un fondo forzado a oscuro.
Corregido usando `:root` + `@media` con propiedades CSS normales (ninguna
de las dos necesitaba ser un token `@theme`, porque ningún componente usa
utilidades `bg-background`/`text-foreground`). Verificado: las 16 rutas
pasan axe después del fix.

Adicionalmente, Lighthouse (no solo axe) encontró que la home saltaba de
`<h1>` a `<h3>` en la grilla de secciones (`heading-order`, moderado).
Corregido agregando un `<h2 class="sr-only">Secciones de OPMX</h2>` antes
de la grilla.

## 6. Lighthouse / Core Web Vitals

Ejecutado con `lighthouse` (preset desktop) contra el build de producción
servido localmente (`npm run start`), usando el Chromium del entorno.

| Ruta                                     | Performance | Accessibility | Best Practices | SEO      | LCP   | CLS |
| ---------------------------------------- | ----------- | ------------- | -------------- | -------- | ----- | --- |
| `/`                                      | 1.00        | 1.00          | 1.00           | 1.00     | 0.5 s | 0   |
| `/metodologia`                           | 1.00        | 1.00          | 1.00           | 1.00     | 0.5 s | 0   |
| `/demo/michoacan-gubernatura-junio-2026` | 1.00        | 1.00          | 1.00           | **0.66** | 0.5 s | 0   |

El SEO 0.66 de la demo es **esperado e intencional**: el único audit que
falla es `is-crawlable`, porque la página lleva `noindex` a propósito
(`BLUEPRINT_v1.1.md` §16). No es un defecto — sería un defecto si diera
1.00 ahí.

LCP de 0.5 s y CLS de 0 cumplen holgadamente el objetivo de LCP < 2.5 s de
`BLUEPRINT_v1.1.md` §13. Nota de contexto: estas cifras son de una
build local servida en el mismo entorno que ejecuta Lighthouse (sin
latencia de red real ni CDN); son una cota optimista, no una medición de
producción — se deberán re-medir contra la URL de staging/producción real
en cuanto exista.

## 7. Seguridad — cero secretos

- `gitleaks` no está instalado en este entorno de ejecución; el workflow
  de CI (`.github/workflows/ci.yml`, job `secrets-scan`) lo ejecuta vía
  `gitleaks/gitleaks-action@v2` en cada push/PR — es la verificación
  autorizada.
- Como verificación local complementaria: `git ls-files` confirma que
  ningún archivo `.env*` real está trackeado (solo `.env.example`, sin
  valores), y un escaneo por patrones (claves AWS, llaves privadas,
  tokens de Slack/GitHub/OpenAI, `password=`/`secret=` con valor literal)
  sobre todos los archivos versionados no encontró coincidencias.
- La barrera de staging (`src/proxy.ts`) lee credenciales únicamente de
  variables de entorno, nunca hardcodeadas.

## 8. Demo de Michoacán — cumplimiento de las precisiones

- Datos tipados, versionados e inmutables en
  `src/content/studies/michoacan-gubernatura-2026-demo.ts`, sin base de
  datos.
- Cifras exactas del material fuente, sin alterar; el total (97%, no
  100%) se calcula desde los datos reales, no se escribe a mano, y se
  muestra como advertencia permanente en HTML visible.
- Sin `Dataset` ni ningún otro structured data (verificado: 0 scripts
  `application/ld+json` en la página).
- `noindex, nofollow`, fuera de `sitemap.xml`, sin enlace desde hubs SEO
  como si fuera contenido editorial regular (vive en `/demo/...`, no en
  `/encuestas/...`, precisamente para no colisionar con la URL canónica
  de un futuro estudio real).
- **Fuera de alcance deliberado:** los módulos de "opinión de aspirantes"
  (Master Spec Sección 12) y "contienda interna MORENA" (Sección 13) no
  se implementaron en este demo porque el material fuente no incluyó
  cifras reales para ellos — no se inventaron datos faltantes.

## 9. Documentación entregada

`README.md` (arranque), `ARCHITECTURE.md` (módulos del monolito y
límites), `STAGING.md` (barrera temporal y su estado), `.env.example`
(variables disponibles), además de `BLUEPRINT.md`, `BLUEPRINT_v1.1.md`,
`PHASE_1_EXECUTION_PLAN.md` y este reporte.

## 10. Staging — limitación conocida

**No se aprovisionó infraestructura real de staging en esta sesión.**

El entorno tenía credenciales de AWS preexistentes, pero se decidió no
usarlas para crear recursos reales sin confirmación explícita: se le
preguntó al usuario cómo proceder (usar esas credenciales, no desplegar
todavía, u otro proveedor) y no llegó respuesta antes de que fuera momento
de continuar con el resto de la Fase 1, así que se optó por la opción no
destructiva — preparar el pipeline sin aprovisionar. Esto se documentó de
forma explícita en `PHASE_1_EXECUTION_PLAN.md` §4 antes de empezar a
construir, no como una sorpresa de último momento.

Lo que sí está listo para desplegar en cuanto se resuelva ADR-001
(proveedor de hosting): build de producción funcional, barrera Basic Auth
condicionada a dos variables de entorno (probada por unidad y
manualmente con `curl` — ver `STAGING.md`), y CI verificando cada push.

**No hay URL de staging que entregar en este reporte.**

## 11. Verificación de criterios de aceptación (`BLUEPRINT_v1.1.md` §13)

| Criterio                         | Resultado                                                                                                                                                                                                                        |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rutas y páginas entregadas       | ✅ 18 páginas + 3 rutas técnicas, todas compilan y sirven 200                                                                                                                                                                    |
| Responsive (3 breakpoints)       | ✅ Sin overflow horizontal en 375/768/1440px, verificado en 3 rutas representativas                                                                                                                                              |
| WCAG 2.2 AA                      | ✅ 0 violaciones axe en 16 rutas; Lighthouse Accessibility 1.00 en las 3 rutas medidas; 1 bug real de contraste y 1 de heading-order encontrados y corregidos (§5)                                                               |
| Lighthouse / Core Web Vitals     | ✅ LCP 0.5s, CLS 0, Performance 1.00 (build local — re-medir contra staging/producción real cuando exista, ver §6)                                                                                                               |
| Pruebas automatizadas            | ✅ 12 unitarias + 40 E2E, CI en verde                                                                                                                                                                                            |
| Cero secretos                    | ✅ Sin `.env` real trackeado; escaneo por patrones limpio; gitleaks corre en CI                                                                                                                                                  |
| No exposición de datos sensibles | ✅ No existe PII en el sistema en esta fase; la demo no tiene coordenadas, video ni identificadores personales                                                                                                                   |
| Demo no indexable                | ✅ `noindex`, ausente de `sitemap.xml`, verificado por E2E                                                                                                                                                                       |
| Documentación                    | ✅ README, ARCHITECTURE, STAGING, .env.example, blueprints, este reporte                                                                                                                                                         |
| Despliegue de staging            | ⚠️ **Pendiente** — pipeline listo, sin infraestructura real aprovisionada (§10); no bloquea el resto de los criterios porque fue documentado como limitación conocida desde `PHASE_1_EXECUTION_PLAN.md`, no descubierto al final |

Todos los criterios verificables sin depender de una decisión de hosting
externa a esta sesión (ADR-001) están cumplidos. El único punto abierto —
la URL de staging real — depende de una decisión que corresponde al
usuario (proveedor de hosting y/o autorización explícita para usar las
credenciales de AWS presentes en el entorno), no de trabajo pendiente
dentro del alcance técnico de Fase 1.

## 12. Limitaciones y pendientes explícitos

1. Sin URL de staging real (§10) — requiere decisión de hosting o
   autorización explícita de credenciales.
2. Lighthouse medido contra build local, no contra staging/producción con
   latencia de red real — re-medir cuando exista una URL desplegada.
3. `/glosario` tiene 10 términos (parcial, conforme al alcance de Fase 1);
   el resto del glosario del Master Spec queda para fases posteriores.
4. Los módulos de "opinión de aspirantes" y "contienda interna MORENA" no
   están en el demo por falta de cifras reales (§8) — se implementarán
   cuando existan datos reales que mostrar, no antes.
5. `gitleaks` no se ejecutó localmente (no instalado en este entorno); la
   verificación autorizada es la de CI.

## 13. Siguiente paso

Fase 1 completa según lo autorizado. **No se ha iniciado la Fase 2.**
Quedo a la espera de revisión y autorización explícita para continuar.
