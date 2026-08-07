# ADR-001 — Proveedor de hosting

**Estado:** `Pending Decision` (no `Proposed` genérico — hay opciones evaluadas, falta la decisión del usuario)
**Fecha de apertura:** 6 de agosto de 2026 (`docs/architecture/BLUEPRINT_v1.1.md` §14)
**Fecha de este documento:** 7 de agosto de 2026
**Bloquea:** cierre formal de Release 1.0 (`docs/strategy/OPMX_PRODUCT_ROADMAP_v1.0.md` §7); despliegue de staging (`docs/operations/STAGING.md`); inicio de la **implementación** de Fase 2 (no de su planeación — ver `docs/phases/phase-2/PHASE_2_PLAN.md` §3–4).
**No bloquea:** la planeación de Fase 2, ni ningún trabajo de contenido/esquema que no requiera una URL desplegada.

---

## Contexto

OPMX necesita un entorno de staging accesible para poder considerar cerrado el Release 1.0 ("Portal Fundacional") y para validar Core Web Vitals, accesibilidad y SEO contra condiciones de red reales, no solo contra un build local (`docs/phases/phase-1/PHASE_1_REPORT.md` §6, §10).

Este entorno de ejecución cuenta con credenciales de AWS preexistentes. **No se han usado ni se usarán para crear infraestructura real** sin confirmación explícita del usuario: hacerlo implicaría crear recursos con costo y persistencia en una cuenta no verificada para este propósito por este proceso. Se preguntó al usuario cómo proceder (`docs/phases/phase-1/PHASE_1_EXECUTION_PLAN.md` §4) y no se recibió respuesta antes de que el trabajo continuara; se optó por la opción no destructiva (no desplegar, documentar el pendiente). Esa decisión sigue vigente.

## Criterios de decisión

Derivados de `BLUEPRINT_v1.1.md` §2 y §9:

- Compatibilidad con SSR/SSG de Next.js (App Router) sin reescritura.
- Costo en el rango del Escenario A/B de `BLUEPRINT_v1.1.md` §11 (prototipo/MVP: $20–440 USD/mes).
- Soporte para el proxy de Basic Auth de staging (`STAGING.md`) sin configuración especial.
- **Jurisdicción/residencia de datos no asumida** (`BLUEPRINT_v1.1.md` §9): la elección de proveedor no debe presuponer una obligación de alojar en México sin que una revisión jurídica lo determine. Como en Fase 2 no habrá datos personales ni PII, este criterio pesa menos aquí que cuando se decida el hosting para datos reales — pero la decisión de plataforma sí puede condicionar opciones futuras, por lo que se documenta desde ahora.
- Independencia tecnológica (`OPMX_VISION_2030.md` §6.9): evitar dependencia de un único proveedor cuando comprometa portabilidad.

## Opciones en evaluación

_(Listadas en `BLUEPRINT_v1.1.md` §14; ninguna se descarta ni se selecciona en este documento.)_

| Opción                      | Notas                                                                                                                                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vercel                      | Integración nativa con Next.js, despliegue por PR                                                                                                                                                                     |
| Fly.io                      | Contenedores propios, control fino de región, requiere Dockerfile                                                                                                                                                     |
| Render                      | Similar a Fly.io, más simple de configurar, menos control de región                                                                                                                                                   |
| AWS/GCP directo             | Las credenciales de AWS ya presentes en el entorno lo harían técnicamente inmediato — **precisamente por eso requiere confirmación explícita del usuario antes de usarse**, no debe elegirse por conveniencia técnica |
| Contenedores propios en VPS | Máximo control y portabilidad, mayor carga operativa                                                                                                                                                                  |

**Nota sobre costos:** el rango de `$20–440 USD/mes` de "Criterios de decisión" es una referencia orientativa de `BLUEPRINT_v1.1.md` §11, no una garantía de que el tier gratuito o de entrada de ningún proveedor listado cubra ese rango de forma permanente. Las condiciones, límites y precios del plan comercial vigente de cualquier opción deberán verificarse al momento de adoptar esta decisión y antes del despliegue — los planes gratuitos/hobby de los proveedores de hosting cambian sus condiciones sin que este documento pueda anticiparlo.

## Decisión

**Pendiente.** Este ADR no elige un proveedor. Queda en `Pending Decision` hasta que el usuario confirme una opción (o indique una no listada aquí).

## Consecuencias de que la decisión siga pendiente

- Release 1.0 no puede declararse formalmente cerrado (`OPMX_PRODUCT_ROADMAP_v1.0.md` §7).
- No existe URL de staging ni de producción; todas las mediciones de rendimiento siguen siendo locales, no representativas de condiciones de red reales.
- La **implementación** de Fase 2 no puede autorizarse hasta que este ADR pase a `Accepted` y staging esté desplegado y validado (`docs/phases/phase-2/PHASE_2_PLAN.md` §3, §26) — instrucción explícita del usuario al autorizar la planeación de Fase 2.
- La **planeación** de Fase 2 no depende de esta decisión y puede avanzar en paralelo (`docs/strategy/OPMX_ALIGNMENT_REVIEW_v1.0.md` §11, §17).

## Próximos pasos

1. El usuario elige una opción de la tabla anterior, o propone otra, o autoriza explícitamente el uso de las credenciales de AWS presentes en el entorno para una de las opciones que las requiera.
2. Se actualiza este documento: `Estado` pasa a `Accepted`, se registra la opción elegida, fecha y responsable de la decisión.
3. Se configura `STAGING_BASIC_AUTH_USER`/`STAGING_BASIC_AUTH_PASSWORD` y `NEXT_PUBLIC_SITE_URL` como secretos del proveedor elegido (nunca en el repositorio) — ver `STAGING.md`.
4. Se añade el job de despliegue correspondiente a `.github/workflows/ci.yml`.
