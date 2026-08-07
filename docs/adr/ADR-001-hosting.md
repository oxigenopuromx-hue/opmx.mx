# ADR-001 — Proveedor de hosting

**Estado:** `Accepted`
**Fecha de apertura:** 6 de agosto de 2026 (`docs/architecture/BLUEPRINT_v1.1.md` §14)
**Fecha de la decisión:** 7 de agosto de 2026
**Responsable de la decisión:** usuario/propietario de OPMX
**Desbloquea:** despliegue de staging (`docs/operations/STAGING.md`,
`docs/operations/VERCEL_STAGING_DEPLOYMENT_PLAN.md`); cierre formal de
Release 1.0 (`docs/strategy/OPMX_PRODUCT_ROADMAP_v1.0.md` §7) una vez
completado y validado ese despliegue; inicio de la **implementación** de
Fase 2 (no de su planeación — ver `docs/phases/phase-2/PHASE_2_PLAN.md`
§3–4, §26) una vez cumplidas también esas condiciones.
**No implica todavía:** ninguna cuenta conectada, ningún despliegue
ejecutado, ningún uso de credenciales. Ver "Límites de la decisión" abajo.

---

## Contexto

OPMX necesita un entorno de staging accesible para poder considerar
cerrado el Release 1.0 ("Portal Fundacional") y para validar Core Web
Vitals, accesibilidad y SEO contra condiciones de red reales, no solo
contra un build local (`docs/phases/phase-1/PHASE_1_REPORT.md` §6, §10).

Este entorno de ejecución cuenta con credenciales de AWS preexistentes.
**No se han usado ni se usarán para crear infraestructura real** sin
confirmación explícita del usuario. Se preguntó al usuario cómo proceder
(`docs/phases/phase-1/PHASE_1_EXECUTION_PLAN.md` §4) y no se recibió
respuesta antes de que el trabajo continuara; se optó por la opción no
destructiva (no desplegar, documentar el pendiente). Esa decisión seguía
vigente hasta el research de proveedor concluir — el proveedor elegido en
este documento es Vercel, no AWS, por lo que esas credenciales de AWS
siguen sin autorización de uso (ver "Aclaraciones explícitas" abajo).

## Criterios de decisión

Derivados de `BLUEPRINT_v1.1.md` §2 y §9:

- Compatibilidad con SSR/SSG de Next.js (App Router) sin reescritura.
- Costo en el rango del Escenario A/B de `BLUEPRINT_v1.1.md` §11
  (prototipo/MVP: $20–440 USD/mes).
- Soporte para el proxy de Basic Auth de staging (`STAGING.md`) sin
  configuración especial.
- **Jurisdicción/residencia de datos no asumida** (`BLUEPRINT_v1.1.md`
  §9): la elección de proveedor no debe presuponer una obligación de
  alojar en México sin que una revisión jurídica lo determine. Como en
  Fase 2 no habrá datos personales ni PII, este criterio pesa menos aquí
  que cuando se decida el hosting para datos reales — pero la decisión de
  plataforma sí puede condicionar opciones futuras, por lo que se
  documenta desde ahora.
- Independencia tecnológica (`OPMX_VISION_2030.md` §6.9): evitar
  dependencia de un único proveedor cuando comprometa portabilidad.

## Opciones evaluadas

_(Listadas en `BLUEPRINT_v1.1.md` §14.)_

| Opción                      | Notas                                                                                                                                                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vercel (elegida)**        | Integración nativa con Next.js, despliegue por PR                                                                                                                                                                                 |
| Fly.io                      | Contenedores propios, control fino de región, requiere Dockerfile                                                                                                                                                                 |
| Render                      | Similar a Fly.io, más simple de configurar, menos control de región                                                                                                                                                               |
| AWS/GCP directo             | Las credenciales de AWS ya presentes en el entorno lo harían técnicamente inmediato — **precisamente por eso requería confirmación explícita del usuario antes de usarse**; no se eligió por conveniencia técnica, y no se eligió |
| Contenedores propios en VPS | Máximo control y portabilidad, mayor carga operativa                                                                                                                                                                              |

**Nota sobre costos:** el rango de `$20–440 USD/mes` de "Criterios de
decisión" fue una referencia orientativa de `BLUEPRINT_v1.1.md` §11, no
una garantía de que ningún tier cubriera ese rango de forma permanente.
El plan elegido (Vercel Pro) y sus condiciones comerciales vigentes
deben verificarse nuevamente al momento de la contratación — ver
"Consecuencias" y "Límites de la decisión" abajo.

## Decisión

**Vercel Pro** queda seleccionado para alojar el portal web de OPMX y sus
entornos Preview/Staging durante Release 1.0 y la Fase 2.

- **Proveedor elegido:** Vercel.
- **Plan previsto:** Pro — sujeto a verificar nuevamente precio y
  condiciones comerciales vigentes al momento de la contratación; este
  documento no fija un precio como definitivo.
- **Alcance de la decisión:** el portal Next.js de OPMX (App Router),
  sus Preview Deployments por PR, y el entorno de staging. **No cubre**
  OPMX FIELD, bases de datos productivas, video/audio, geolocalización,
  datos personales, almacenamiento de evidencia, procesamiento
  estadístico, ni ninguna otra infraestructura sensible — esos
  componentes requerirán sus propios ADR (ver ADR-002, ADR-003, ADR-004,
  ADR-006, ADR-007, ADR-008 en `docs/architecture/BLUEPRINT_v1.1.md`
  §14) y no se asume que Vercel sea también el proveedor elegido para
  ellos.
- **Responsable de la decisión:** usuario/propietario de OPMX.
- **Fecha de la decisión:** 7 de agosto de 2026.

### Razones

1. Integración nativa con Next.js (App Router, SSR/SSG, Turbopack) sin
   necesidad de reescritura ni de contenedores propios.
2. Integración directa con GitHub — el flujo de trabajo del repositorio
   ya vive en GitHub (`.github/workflows/ci.yml`).
3. Previews automáticos por pull request, alineados con el criterio de
   "despliegue por PR" ya identificado en la tabla de opciones.
4. Bajo esfuerzo operativo — no requiere gestionar Dockerfile,
   orquestación de contenedores, ni servidores propios para el alcance
   actual (portal público, sin backend separado — consistente con
   ADR-005).
5. Soporte nativo para dominio propio y variables de entorno por
   entorno (producción/preview/staging), necesario para
   `STAGING_BASIC_AUTH_USER`, `STAGING_BASIC_AUTH_PASSWORD` y
   `NEXT_PUBLIC_SITE_URL` sin exponerlas en el repositorio.
6. Rollback sencillo entre despliegues.
7. Portabilidad razonable si en el futuro se decide migrar, siempre que
   el código se mantenga dentro de los estándares de Next.js (sin
   adoptar APIs propietarias de Vercel más allá de lo estándar del
   framework) — mitiga parcialmente el criterio de independencia
   tecnológica de `OPMX_VISION_2030.md` §6.9.

### Aclaraciones explícitas

- **Vercel Hobby no se utilizará para OPMX.** El plan previsto es Pro.
- **No se autorizan add-ons** (ni de Vercel ni de terceros integrados a
  través de su marketplace) sin una autorización explícita adicional.
- **No se autoriza producción pública** como parte de esta decisión —
  esta decisión habilita el entorno de staging y los Preview
  Deployments; abrir producción pública requiere su propia autorización
  posterior, según los criterios de cierre de `PHASE_1_REPORT.md` y del
  plan de despliegue referenciado abajo.
- **No se autoriza el uso de credenciales de AWS** para ningún propósito
  relacionado con esta decisión ni con OPMX en general, salvo
  autorización explícita futura y separada.
- **No se autoriza ninguna base de datos ni almacenamiento productivo**
  como parte de esta decisión.
- **La protección del entorno de staging utilizará, inicialmente, la
  barrera Basic Auth ya implementada** por OPMX mediante variables de
  entorno (`src/proxy.ts`, `src/lib/staging-auth.ts`,
  `docs/operations/STAGING.md`), configuradas como secretos del
  proveedor — nunca en el repositorio.
- **El entorno de staging permanecerá en `noindex`** — no se modifica
  esa protección técnica ya implementada en Fase 1
  (`src/app/robots.ts` y equivalentes).

## Consecuencias

- Release 1.0 puede avanzar hacia su despliegue de staging siguiendo
  `docs/operations/VERCEL_STAGING_DEPLOYMENT_PLAN.md`, sin que ese
  despliegue esté todavía ejecutado por este documento — este ADR
  autoriza la decisión de proveedor, no el despliegue en sí.
- Las mediciones de rendimiento (Core Web Vitals, Lighthouse) podrán
  validarse contra un entorno real una vez ejecutado ese plan, en lugar
  de depender únicamente de builds locales.
- OPMX adopta una dependencia operativa de Vercel para el portal y su
  staging — mitigada parcialmente por mantener el código dentro de
  estándares de Next.js (razón 7 arriba), pero no eliminada: migrar en
  el futuro seguiría requiriendo trabajo de reconfiguración de
  despliegue, aunque no de reescritura de aplicación.
- Esta decisión no resuelve ni condiciona las decisiones de hosting
  para OPMX FIELD ni para infraestructura de datos reales — esos ADR
  siguen pendientes y deben evaluarse con sus propios criterios
  (incluida la jurisdicción/residencia de datos, que pesa más en esos
  casos que en el portal actual).

## Límites de la decisión

- Esta decisión **no autoriza conectar una cuenta de Vercel**, ni
  solicitar ni usar credenciales, ni ejecutar ningún despliegue. Esas
  acciones requieren autorización posterior y explícita, y acceso
  específico a la cuenta de Vercel destinada a OPMX.
- El precio y las condiciones comerciales del plan Pro deben
  reverificarse al momento de la contratación — este documento no las
  fija como definitivas ni vigentes de forma permanente.
- Esta decisión no habilita producción pública, bases de datos
  productivas, almacenamiento productivo, ni el uso de add-ons, según
  se aclaró arriba.

## Condiciones para revisar este ADR

Reabrir este ADR si ocurre cualquiera de estas señales:

- Las condiciones comerciales del plan Pro verificadas al momento de la
  contratación difieren sustancialmente de lo esperado al tomar esta
  decisión.
- Se necesita alojar infraestructura fuera del alcance definido aquí
  (bases de datos productivas, almacenamiento de evidencia, OPMX FIELD,
  procesamiento estadístico) y se evalúa si Vercel también debe cubrir
  ese componente o si requiere un proveedor distinto vía su propio ADR.
- Una revisión jurídica de jurisdicción/residencia de datos (pendiente,
  ver "Criterios de decisión") determina una obligación de alojamiento
  que Vercel no pueda cumplir para componentes futuros con datos reales.
- El criterio de independencia tecnológica (`OPMX_VISION_2030.md`
  §6.9) se ve comprometido por una dependencia de Vercel más allá de lo
  previsto en "Razones" punto 7.

## Próximos pasos

1. Ejecutar, bajo autorización explícita separada, los pasos descritos
   en `docs/operations/VERCEL_STAGING_DEPLOYMENT_PLAN.md` (conexión de
   cuenta, configuración de entorno de staging, variables de entorno,
   verificación posterior al despliegue).
2. Añadir el job de despliegue correspondiente a
   `.github/workflows/ci.yml` una vez el despliegue esté autorizado y
   configurado.
3. Registrar en `docs/phases/phase-1/PHASE_1_REPORT.md` y en
   `OPMX_PRODUCT_ROADMAP_v1.0.md` §7 el cierre formal de Release 1.0
   una vez el despliegue de staging esté completado y validado.
