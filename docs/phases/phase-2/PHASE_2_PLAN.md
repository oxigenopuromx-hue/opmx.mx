# OPMX — PHASE 2 PLAN

## Sistema de Estudios + Modelo Metodológico Público

**Fecha:** 7 de agosto de 2026
**Estado de este documento:** Plan aprobado para **planeación únicamente**. **No autoriza implementación.**
**Corresponde a:** `OPMX_PRODUCT_ROADMAP_v1.0.md` — Release 1.1 "Sistema de Estudios".
**Fuentes rectoras revisadas:** `OPMX_VISION_2030.md`, `OPMX_PRODUCT_ROADMAP_v1.0.md`, `OPMX_MASTER_SPEC_v1.0.md`, `BLUEPRINT_v1.1.md`, `ARCHITECTURE.md`, `OPMX_ALIGNMENT_REVIEW_v1.0.md`, `PHASE_1_REPORT.md`, `STAGING.md`.

> **Decisión de proyecto vigente:** `OPMX_ALIGNMENT_REVIEW_v1.0.md` queda **APROBADO**. La Fase 2 queda **AUTORIZADA PARA PLANEACIÓN, NO PARA IMPLEMENTACIÓN**. Antes de autorizar la implementación deberá cerrarse staging y resolverse/formalizarse ADR-001 (`docs/adr/ADR-001-hosting.md`). La preparación de este plan avanza en paralelo a que eso ocurra, tal como lo confirma `OPMX_ALIGNMENT_REVIEW_v1.0.md` §11 y §17.

---

## 1. RESUMEN EJECUTIVO

Este documento planea — sin construirla — la Fase 2 de OPMX: el Sistema de Estudios y el Modelo Metodológico Público, correspondiente al Release 1.1 del Product Roadmap. El objetivo es dejar diseñada una arquitectura de contenido reutilizable, verificable y metodológicamente correcta, para que un futuro estudio real de OPMX tenga un lugar correcto donde publicarse sin rediseñar el sistema — sin publicar ningún estudio real todavía, sin base de datos, sin CMS con login, y sin ninguno de los elementos explícitamente fuera de alcance (§6).

El plan confirma, sin necesidad de desviarse, que el alcance recomendado por `OPMX_ALIGNMENT_REVIEW_v1.0.md` §14–§16 no depende de ningún ADR pendiente ni de que exista staging (§4, §26) — y dedica una sección aparte (§26) a lo que sí debe revisarse antes de autorizar la construcción real.

---

## 2. OBJETIVO

Preparar una arquitectura pública, reutilizable, verificable y metodológicamente correcta para que futuros estudios reales de OPMX puedan publicarse sin rediseñar el sistema.

Explícitamente:

- **No** se publica ningún estudio real durante esta fase.
- El "Sistema de Estudios" se valida con **contenido sintético claramente identificado como tal** (§10), no con datos reales ni ficticios presentados como reales.
- El "Modelo Metodológico Público" amplía lo ya publicado en Fase 1 (`/metodologia/`, `/glosario/`) con las subpáginas y páginas que `OPMX_MASTER_SPEC_v1.0.md` §62–§63 ya especifican y que Fase 1 dejó pendientes.

---

## 3. ESTADO DE ENTRADA

- `OPMX_ALIGNMENT_REVIEW_v1.0.md`: **aprobado** (decisión de proyecto de este mismo documento).
- Fase 1: completa según sus propios criterios de aceptación, con una salvedad reconocida y no bloqueante para este alcance: **no existe staging desplegado** (`PHASE_1_REPORT.md` §9–§11; `STAGING.md`).
- Ningún ADR pendiente bloquea el alcance aquí definido (`OPMX_ALIGNMENT_REVIEW_v1.0.md` §11); se formalizan en paralelo `ADR-001-hosting.md` (`Pending Decision`) y `ADR-005-repository-structure.md` (`Accepted`) — ver §19.
- Cero base de datos, cero datos personales, cero usuarios reales, cero sistema de identidad real — estado heredado de Fase 1 y que este plan **no** cambia.

---

## 4. DEPENDENCIAS

| Dependencia                              | Estado                                                    | ¿Bloquea la planeación? | ¿Bloqueará la implementación?                                                                                                            |
| ---------------------------------------- | --------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Fase 1 completa                          | ✅ (salvo staging)                                        | No                      | No                                                                                                                                       |
| `OPMX_ALIGNMENT_REVIEW_v1.0.md` aprobado | ✅                                                        | No                      | No                                                                                                                                       |
| Staging desplegado y validado            | ❌ pendiente (`ADR-001`)                                  | No                      | **Sí — condición explícita del usuario**                                                                                                 |
| ADR-001 resuelto formalmente             | ❌ `Pending Decision`                                     | No                      | **Sí — condición explícita del usuario**                                                                                                 |
| ADR-002/003/004/006/007/008              | ❌ sin resolver                                           | No                      | No, para este alcance (§11 del Alignment Review) — se reevalúan si el alcance cambiara (p. ej. si se decidiera introducir base de datos) |
| Confirmación de alcance por el usuario   | Este documento la registra; requiere lectura y aceptación | —                       | Sí, junto con lo anterior                                                                                                                |

**Ninguna dependencia técnica bloquea la planeación.** Dos dependencias (staging, ADR-001) bloquean explícitamente el paso de planeación a implementación, por instrucción directa del usuario en esta misma autorización.

---

## 5. ALCANCE

Conforme a los entregables base indicados por el usuario, mapeados a `OPMX_PRODUCT_ROADMAP_v1.0.md` Release 1.1:

1. Esquema formal `Study` (§9).
2. Tipado y validación explícita (§9).
3. Arquitectura de contenido de estudios (§11).
4. Modelo reutilizable de ficha técnica (§13).
5. Modelo de preguntas y resultados (§9).
6. Representación de metodología (§9, §13).
7. Representación de patrocinador/responsables (§9).
8. Versionado de estudios (§9).
9. Modelo de correcciones (§9, §13).
10. URL canónica futura por estudio (§12, §14).
11. Seis subpáginas metodológicas de `MASTER_SPEC` §63 (§12).
12. Glosario ampliado a los ≥14 términos de `MASTER_SPEC` §62 (§12).
13. Página pública `/correcciones/` (§12).
14. Modelo electoral estructurado: `persons`, `candidacies`, `parties`, `coalitions`, `common_candidacies` (§10).
15. Pruebas unitarias (§17).
16. Pruebas E2E (§17).
17. Accesibilidad (§15).
18. SEO técnico por estudio futuro (§14).
19. Documentación de arquitectura actualizada (§20, paso final).

---

## 6. FUERA DE ALCANCE

Queda explícitamente prohibido incorporar a la Fase 2:

OPMX FIELD; video; audio; GPS; georreferenciación real; datos personales; `respondents` reales; consentimiento productivo; OPMX AUDIT productivo; Poll Tracker; API pública; IA; búsqueda semántica; OPMX Insights; CMS editorial con login; usuarios reales; roles productivos; autenticación definitiva; base de datos productiva; object storage productivo; procesamiento estadístico productivo; publicación de un estudio real; infraestructura nueva; despliegue de producción.

No se instalará NestJS, FastAPI, Redis, BullMQ, React Native ni microservicios. Se mantiene el principio de **monolito modular** vigente (`BLUEPRINT_v1.1.md` §1, `ARCHITECTURE.md`).

Adicionalmente, fuera de alcance de **este documento** en particular (aunque formen parte de la Fase 2 como concepto): la implementación de cualquiera de los puntos de §5, la creación de los borradores institucionales de §18 como archivos reales, y cualquier despliegue. Este documento es exclusivamente un plan.

---

## 7. ARQUITECTURA AFECTADA

Ninguna decisión de `ARCHITECTURE.md` cambia. Fase 2 extiende el monolito existente, no lo modifica estructuralmente:

- Sigue habiendo **un solo runtime** (Next.js, App Router), sin backend separado, sin cola, sin Redis (`ARCHITECTURE.md` §"Un solo runtime").
- Se extiende `content/` (Fase 1: `nav.ts`, `home-sections.ts`, `glosario.ts`, `studies/michoacan-gubernatura-2026-demo.ts`) con nuevos módulos de contenido tipado:
  - `content/studies/schema.ts` (o equivalente) — el esquema `Study` formal (§9).
  - `content/electoral/*` — fixtures sintéticos del modelo electoral (§10).
  - `content/methodology/*` — contenido de las subpáginas de metodología (§12).
- Se extiende `components/` con componentes reutilizables nuevos (§13), sin romper las reglas de dependencia ya documentadas (`ARCHITECTURE.md` §"Reglas de dependencia": `components/ui/*` sigue sin conocer `content/*`; los nuevos componentes específicos de estudios siguen el mismo patrón que `components/demo/DemoResultsChart.tsx`).
- **No se introduce** cliente de base de datos, ni `app/admin/*`, ni `app/api/*` de negocio — las mismas ausencias deliberadas que documenta `ARCHITECTURE.md` §"Lo que deliberadamente no existe todavía" siguen vigentes al terminar Fase 2.

---

## 8. MODELO DE DOMINIO

Dos familias de entidades, ambas expresadas como **contenido tipado y versionado en código**, no en base de datos (§7, §9, consistente con `PHASE_1_EXECUTION_PLAN.md` §1):

### Estudio

`Study` → `Question`[] → `Result`[], con `Methodology`, `TechnicalSheet` (ficha técnica), `Sponsor`/`Responsible`[], `Version`[], `Correction`[] y una `canonicalUrl` reservada. Ver esquema detallado en §9.

### Electoral

`Person` (sin partido fijo) → `Candidacy` (vínculo temporal a una `Election`, con exactamente una fuente de postulación: `Party` | `Coalition` | `CommonCandidacy` | independiente) — el modelo corregido de `BLUEPRINT_v1.1.md` §6, llevado a código por primera vez en Fase 2, con datos exclusivamente sintéticos (§10).

Ambas familias son independientes entre sí en esta fase: el modelo electoral se valida con fixtures propios, no se conecta todavía a un `Study` real (eso ocurrirá cuando exista el primer estudio real, Release 1.3).

---

## 9. ESQUEMA `STUDY`

Campos mínimos, tomados de `OPMX_PRODUCT_ROADMAP_v1.0.md` §8 y `OPMX_MASTER_SPEC_v1.0.md` §10:

| Campo                                            | Tipo (conceptual)                                | Notas                                                                                                                                                                                                                  |
| ------------------------------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                             | string interna, estable                          | No PII — mismo criterio que `MASTER_SPEC` §33 (`OPMX-2026-MICH-000001`)                                                                                                                                                |
| `slug`                                           | string                                           | Para la URL canónica futura (§14)                                                                                                                                                                                      |
| `title`, `summary`                               | string                                           |                                                                                                                                                                                                                        |
| `state`, `election`                              | referencia                                       | Vínculo opcional al modelo electoral (§8), no obligatorio para estudios no electorales                                                                                                                                 |
| `topic`                                          | string                                           |                                                                                                                                                                                                                        |
| `publicationDate`, `fieldworkPeriod`             | fecha / rango                                    |                                                                                                                                                                                                                        |
| `population`, `coverage`, `sampleDesign`         | string estructurado                              | Ficha técnica (§4 de este plan)                                                                                                                                                                                        |
| `sampleSize`, `marginOfError`, `confidenceLevel` | numérico                                         | Con la misma advertencia de no-universalidad que ya usa la demo (`BLUEPRINT_v1.1.md` §4)                                                                                                                               |
| `weighting`                                      | referencia a `Methodology`                       |                                                                                                                                                                                                                        |
| `questions`                                      | `Question[]`                                     |                                                                                                                                                                                                                        |
| `results`                                        | `Result[]`                                       |                                                                                                                                                                                                                        |
| `methodology`                                    | `Methodology`                                    | Texto + referencias a las subpáginas de `/metodologia/` (§12)                                                                                                                                                          |
| `technicalSheet`                                 | objeto                                           | Generaliza el bloque "Datos Clave" ya implementado en la demo (`MASTER_SPEC` §59)                                                                                                                                      |
| `sponsor`, `responsible[]`                       | objeto / lista                                   | `MASTER_SPEC` §47, §78; nunca oculto cuando exista                                                                                                                                                                     |
| `version`, `corrections[]`                       | número / lista                                   | Ninguna corrección reemplaza silenciosamente una versión anterior (`MASTER_SPEC` §28, `OPMX_VISION_2030.md` §38)                                                                                                       |
| `canonicalUrl`                                   | string reservada, no necesariamente enrutada aún | `/encuestas/[slug]` (§14)                                                                                                                                                                                              |
| `citation`                                       | objeto derivado                                  | Cita corta / académica (`MASTER_SPEC` §60)                                                                                                                                                                             |
| `isReal`                                         | booleano explícito                               | **Obligatorio.** `false` para cualquier fixture o plantilla; solo `true` para un estudio real aprobado (Release 1.3). Este campo es la salvaguarda estructural equivalente a la que ya protege a la demo de Michoacán. |

Validación: tipado estricto de TypeScript + validación explícita en tiempo de ejecución (p. ej. Zod, ya presente como dependencia de tipo similar en el proyecto — decisión de implementación, no de este plan), con pruebas unitarias que verifiquen que un `Study` con `isReal: true` sin ficha técnica/metodología completa **falla la validación**, no solo que un `Study` bien formado la pasa.

**Sin base de datos**: el esquema vive como tipos + validadores en código, exactamente como anticipó `PHASE_1_EXECUTION_PLAN.md` §1 ("el cambio de fuente no obligue a tocar las páginas/componentes que la consumen").

---

## 10. MODELO ELECTORAL

Entidades de `BLUEPRINT_v1.1.md` §6, llevadas a fixtures de código:

- `persons` — sin partido fijo.
- `parties` — con `scope` (`nacional`/`local`).
- `coalitions` — agrupa 2+ `parties` para una elección específica.
- `common_candidacies` — figura distinta de la coalición.
- `elections` — evento electoral concreto.
- `candidacies` — entidad central: `person` + `election` + exactamente una fuente de postulación.

### Fixtures obligatoriamente sintéticos

Todo fixture usado para validar este modelo debe ser inequívocamente ficticio. Ejemplos vinculantes para la implementación futura:

- Personas: `Persona A`, `Persona B` (o nombres igualmente genéricos y evidentemente no reales — no iniciales de personas reales, no nombres que puedan confundirse con figuras públicas).
- Partidos: `Partido Alfa`, `Partido Beta`.
- Coalición: `Coalición Ejemplo`.
- Candidatura: `Candidatura Estatal 001`.
- Elección: un identificador igualmente genérico (p. ej. `Elección Sintética 2027 — Estado Ejemplo`), nunca un estado, año o cargo real específico que pudiera leerse como una elección real.

**Prohibido explícitamente:** usar nombres de políticos, candidatos, partidos o resultados electorales reales como fixtures técnicos, incluida cualquier variación, apodo o alusión reconocible. Esta regla es más estricta que la ya aplicada a la demo de Michoacán (que sí usa datos históricos reales pero claramente etiquetados) — aquí ni siquiera se usan datos reales etiquetados, porque el propósito es validar el _modelo_, no representar un caso histórico.

Prueba unitaria obligatoria: verificar que una persona sintética puede tener múltiples `candidacies` a lo largo del tiempo (distinta elección, distinto partido o coalición) sin que una sobrescriba a la otra — validando el principio central de `BLUEPRINT_v1.1.md` §6 ("nunca se sobrescribe entre elecciones").

---

## 11. ARQUITECTURA DE CONTENIDO

Extiende exactamente el patrón ya usado por `content/studies/michoacan-gubernatura-2026-demo.ts` en Fase 1: datos tipados, versionados en Git, tratados como inmutables (`as const` o equivalente), consumidos por componentes de presentación a través de una interfaz simple, sin acoplar las páginas a la fuente de datos (`ARCHITECTURE.md` §"Reglas de dependencia").

Nuevos módulos de contenido (todos código, cero base de datos):

- `content/studies/schema.ts` — el tipo `Study` y sus validadores (§9).
- `content/studies/fixtures/*` — plantilla(s) sintética(s) para probar el esquema y la página de estudio (§12), cada una con `isReal: false`.
- `content/electoral/*` — fixtures del modelo electoral (§10).
- `content/methodology/*` — contenido de cada subpágina de metodología (§12), en el mismo estilo que `content/glosario.ts`.
- `content/corrections.ts` (o similar) — contenido de la página `/correcciones/` (proceso, no casos reales).

---

## 12. RUTAS NUEVAS

| Ruta                                                                                                                 | Contenido                                                                                                                             | Indexable                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/metodologia/muestreo-probabilistico`                                                                               | Real (educativo, genérico)                                                                                                            | Sí                                                                                                                                                                             |
| `/metodologia/muestreo-polietapico`                                                                                  | Real                                                                                                                                  | Sí                                                                                                                                                                             |
| `/metodologia/ponderacion`                                                                                           | Real                                                                                                                                  | Sí                                                                                                                                                                             |
| `/metodologia/raking`                                                                                                | Real                                                                                                                                  | Sí                                                                                                                                                                             |
| `/metodologia/margen-de-error`                                                                                       | Real                                                                                                                                  | Sí                                                                                                                                                                             |
| `/metodologia/efecto-de-diseno`                                                                                      | Real                                                                                                                                  | Sí                                                                                                                                                                             |
| `/correcciones/`                                                                                                     | Real (proceso, sin casos aún)                                                                                                         | Sí                                                                                                                                                                             |
| `/glosario`                                                                                                          | Ampliado (ya existe desde Fase 1)                                                                                                     | Sí (ya lo era)                                                                                                                                                                 |
| Plantilla sintética de estudio (ruta exacta a definir en implementación, p. ej. `/demo/plantilla-estudio-sintetico`) | Contenido con fixtures explícitamente ficticios (`Persona A`, `Partido Alfa`, etc.), usado para validar el esquema `Study` end-to-end | **No** — mismo tratamiento que la demo de Michoacán: `noindex`, fuera de `sitemap.xml`, badge visible de "plantilla / datos sintéticos", sin JSON-LD `Dataset`/`Article` (§14) |

La ruta canónica real de estudios (`/encuestas/[slug]`) **no se enruta públicamente todavía**: se reserva el patrón (§9, campo `canonicalUrl`) pero no se construye una página dinámica que pudiera indexarse o enlazarse antes de que exista un estudio real — evita el riesgo de una URL "fantasma" navegable sin contenido real, coherente con `MASTER_SPEC` §38 ("no generar páginas vacías").

---

## 13. COMPONENTES REUTILIZABLES

Generalizando los patrones ya construidos en Fase 1 (`DemoResultsChart`, el bloque "Datos Clave" de la página demo):

- **`TechnicalSheet`** (ficha técnica) — parametrizable, reemplaza el bloque `Fact`/`dl` hardcodeado de la demo por un componente reutilizable para cualquier `Study`.
- **`ResultsChart`** — generaliza `DemoResultsChart` para aceptar cualquier `Question`/`Result[]`.
- **`MethodologySection`** — bloque de texto + enlaces a subpáginas de `/metodologia/`, reutilizable en la ficha de cualquier estudio.
- **`CorrectionsList`** — muestra versión original/corregida/fecha/motivo (`MASTER_SPEC` §28), reutilizable tanto en `/correcciones/` como en la ficha de un estudio.
- **`CitationBlock`** — genera cita corta y cita académica (`MASTER_SPEC` §60) a partir de los campos de `Study`; se construye y prueba ahora aunque no haya un estudio real que lo use todavía, precisamente para que el primer estudio real (Release 1.3) no requiera diseñarlo desde cero.
- **`CandidacyTimeline`** — muestra la evolución de candidaturas de una `Person` a través del tiempo (§10), reutilizando el patrón de "evolución" ya previsto en `MASTER_SPEC` §39.

Todos siguen la regla de dependencia ya vigente: componentes específicos de dominio (`components/studies/*`, análogo a `components/demo/*`) pueden importar de `content/*`; `components/ui/*` permanece genérico.

---

## 14. SEO Y DATOS ESTRUCTURADOS

**Resolución explícita del hallazgo del Alignment Review (§5.1):**

- El contenido demostrativo o fixtures (la plantilla sintética de §12, cualquier fixture del modelo electoral) **no debe usar `Dataset`/`Article` structured data** de forma que pueda interpretarse como investigación real de OPMX — misma regla que ya rige la demo de Michoacán (`PHASE_1_EXECUTION_PLAN.md` §2), extendida explícitamente a todo lo nuevo de Fase 2.
- Los **futuros estudios reales** (Release 1.3, fuera de esta fase) sí deberán contemplar structured data apropiado (`Dataset`, `Article` según corresponda, `MASTER_SPEC` §43), sujeto a que el campo `isReal` sea `true`, el esquema esté validado y la información publicada sea real — no antes.
- **Acción documental pendiente, registrada aquí y no ejecutada:** corregir `BLUEPRINT_v1.1.md` §4 para acotar textualmente que su instrucción de incluir JSON-LD `Dataset`/`Article` aplica a estudios reales, no a contenido demostrativo o sintético — tal como recomendó `OPMX_ALIGNMENT_REVIEW_v1.0.md` §5.1. **Este plan no modifica el Blueprint.**

Para lo demás (canonical, Open Graph, robots, sitemap): las nuevas rutas indexables (§12) siguen exactamente el mismo patrón técnico que Fase 1 (`src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`); la plantilla sintética sigue exactamente el patrón `noindex` de la demo (`src/app/demo/.../page.tsx`).

---

## 15. ACCESIBILIDAD

Mismo estándar que Fase 1, sin excepciones: WCAG 2.2 AA, verificación automatizada (axe-core, mismos tags `wcag2a/wcag2aa/wcag21a/wcag21aa/wcag22aa` usados en `tests/e2e/accessibility.spec.ts`) sobre cada ruta nueva de §12, más verificación manual de navegación por teclado en los flujos nuevos (plantilla de estudio, `/correcciones/`). Umbral: **0 violaciones nuevas** — no se acepta introducir una sola regresión de accesibilidad, igual que estableció `BLUEPRINT_v1.1.md` §12 como requisito transversal.

---

## 16. SEGURIDAD Y PRIVACIDAD

- Cero datos personales — el modelo electoral y el esquema `Study` se validan exclusivamente con fixtures sintéticos (§10).
- Cero nueva superficie de autenticación — no hay login, no hay roles, `proxy.ts` no cambia.
- Cero infraestructura nueva — ni base de datos, ni object storage, ni servicios adicionales.
- Cero secretos nuevos — ningún módulo de Fase 2 requiere credenciales.
- El campo `isReal: false` obligatorio en todo fixture (§9) es, en sí mismo, un control de seguridad de contenido: hace estructuralmente explícito que nada de lo construido en Fase 2 puede confundirse con un estudio real, incluso si un componente se reutiliza incorrectamente en el futuro.

---

## 17. ESTRATEGIA DE PRUEBAS

| Tipo                              | Cobertura                                                                                                                                                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unitarias                         | Validación del esquema `Study` (casos válidos e inválidos, incluyendo `isReal` mal usado); integridad del modelo electoral (candidaturas múltiples sin sobrescritura); lógica de `CitationBlock`            |
| E2E — navegación                  | Las nuevas rutas de §12 son alcanzables desde la navegación/menú/breadcrumbs existentes                                                                                                                     |
| E2E — responsive                  | Mismos 3 breakpoints que Fase 1 (375/768/1440px) en las rutas nuevas                                                                                                                                        |
| E2E — SEO técnico                 | Canonical presente en rutas indexables; plantilla sintética en `noindex` y ausente de `sitemap.xml`; cero JSON-LD `Dataset`/`Article` en la plantilla sintética (mismo patrón que `tests/e2e/demo.spec.ts`) |
| E2E — accesibilidad               | axe sobre cada ruta nueva, 0 violaciones                                                                                                                                                                    |
| Validación del modelo de estudios | Prueba explícita de que un `Study` con `isReal: true` incompleto falla validación                                                                                                                           |
| Validación del modelo electoral   | Prueba explícita de historial de candidaturas sin sobrescritura (§10)                                                                                                                                       |

---

## 18. DOCUMENTACIÓN INSTITUCIONAL

Como parte de los entregables de la **implementación** futura de Fase 2 (no de este documento de planeación — ver nota al final de esta sección), se crearán los borradores iniciales de:

- `docs/methodology/METHODOLOGY_STANDARD.md`
- `docs/policies/EDITORIAL_POLICY.md`
- `docs/policies/CORRECTIONS_POLICY.md`

Cada uno deberá encabezarse explícitamente con:

> **DRAFT — pendiente de revisión y aprobación institucional.**

y no deberá presentarse en ningún momento como política ya aprobada. Su aprobación real requiere el Consejo Editorial y Metodológico previsto en `OPMX_VISION_2030.md` §12, que todavía no se ha constituido (`OPMX_ALIGNMENT_REVIEW_v1.0.md` §3, §13) — algo que ni este plan ni la implementación técnica de Fase 2 pueden resolver por sí solos.

### Distinción explícita de categorías (requerida por el encargo)

| Categoría                                  | Ejemplos en Fase 2                                                                                                                                | Quién puede producirla                                                | Quién debe aprobarla                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Implementación técnica                     | Esquema `Study`, componentes, rutas, pruebas                                                                                                      | Este proceso técnico, en la etapa de implementación (no en este plan) | Revisión técnica estándar (CI, criterios de aceptación de §21)                                                         |
| Documentación técnica                      | `ARCHITECTURE.md` actualizado, este mismo `PHASE_2_PLAN.md`, los ADR                                                                              | Este proceso técnico                                                  | Lectura/aprobación del usuario, como en fases anteriores                                                               |
| Borradores institucionales                 | `METHODOLOGY_STANDARD.md`, `EDITORIAL_POLICY.md`, `CORRECTIONS_POLICY.md`                                                                         | Este proceso técnico puede redactar un **borrador**                   | **Aprobación institucional humana** (Consejo Editorial y Metodológico o quien el usuario designe) — nunca este proceso |
| Decisiones que requieren aprobación humana | Alcance de Fase 2 (este documento), elección de proveedor de hosting (ADR-001), cualquier cambio de alcance                                       | El usuario                                                            | El usuario                                                                                                             |
| Decisiones que requieren revisión jurídica | Ninguna en el alcance de Fase 2 (sin datos personales); todas las relacionadas con FIELD, consentimiento, retención, jurisdicción de datos reales | Asesoría jurídica externa                                             | Asesoría jurídica externa                                                                                              |

**Nota sobre esta entrega:** siguiendo la instrucción explícita de cerrar esta tarea únicamente con `PHASE_2_PLAN.md` y los ADR correspondientes, los tres borradores institucionales **no se crean como archivos en este commit** — quedan especificados aquí (ruta, encabezado obligatorio, y su lugar en la secuencia de §20) como un entregable de la implementación futura, no de esta planeación.

---

## 19. ADR RELACIONADOS

- **`docs/adr/ADR-001-hosting.md`** — creado en este mismo commit. Estado `Pending Decision`. No se decide un proveedor; queda documentado el contexto, los criterios y las opciones evaluadas, a la espera de la decisión del usuario. Bloquea la implementación de Fase 2 (no su planeación) y el cierre de Release 1.0.
- **`docs/adr/ADR-005-repository-structure.md`** — creado en este mismo commit. Estado `Accepted`, documenta retroactivamente la decisión de facto (paquete único, sin herramienta de monorepo) ya sostenida por la evidencia del repositorio. No bloquea nada.
- ADR-002, 003, 004, 006, 007, 008: siguen sin formalizarse como archivos individuales; ninguno bloquea el alcance de Fase 2 mientras se mantenga sin base de datos, sin CMS con login y sin nueva infraestructura (`OPMX_ALIGNMENT_REVIEW_v1.0.md` §11). Si el alcance de Fase 2 cambiara para incluir cualquiera de esos elementos, el ADR correspondiente pasaría a ser bloqueante de inmediato.

---

## 20. SECUENCIA DE IMPLEMENTACIÓN PROPUESTA (NO EJECUTADA)

Cada paso, como en Fase 1, se entregaría en un commit pequeño y descriptivo, verificado antes de continuar al siguiente. **Ninguno de estos pasos se ejecuta en esta entrega.**

| #   | Paso                                                | Objetivo                                                                                                              | Archivos/módulos afectados                                                                                             | Pruebas requeridas                                                                  | Criterio de aceptación                                          | Condición para continuar                                          |
| --- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| 1   | Esquema `Study`                                     | Definir tipos + validación (§9)                                                                                       | `content/studies/schema.ts`                                                                                            | Unitarias de validación (casos válidos/inválidos, `isReal`)                         | Esquema tipado estricto, validador probado                      | Pruebas en verde, `tsc --noEmit` limpio                           |
| 2   | Modelo electoral + fixtures sintéticos              | Definir `persons`/`candidacies`/`parties`/`coalitions`/`common_candidacies` (§10)                                     | `content/electoral/*`                                                                                                  | Unitarias de integridad histórica de candidaturas                                   | Fixtures inequívocamente sintéticos, revisión manual de nombres | Ningún nombre reconocible como real; pruebas en verde             |
| 3   | Componentes reutilizables                           | `TechnicalSheet`, `ResultsChart`, `MethodologySection`, `CorrectionsList`, `CitationBlock`, `CandidacyTimeline` (§13) | `components/studies/*`                                                                                                 | Unitarias de render con props sintéticas                                            | Componentes sin acoplar a una fuente de datos específica        | Cumple reglas de dependencia de `ARCHITECTURE.md`                 |
| 4   | Plantilla sintética de estudio                      | Página que use el esquema + componentes con fixtures (§12)                                                            | `src/app/<ruta-plantilla>/page.tsx`                                                                                    | E2E: noindex, fuera de sitemap, sin JSON-LD, badge de "plantilla sintética" visible | Misma rigurosidad que la demo de Michoacán                      | Todas las pruebas E2E de §17 en verde para esta ruta              |
| 5   | Subpáginas de metodología                           | 6 rutas de `MASTER_SPEC` §63                                                                                          | `src/app/metodologia/*`, `content/methodology/*`                                                                       | E2E navegación + axe + responsive                                                   | Contenido real, no relleno; indexables                          | 0 violaciones axe, canonical presente                             |
| 6   | Glosario ampliado                                   | ≥14 términos de `MASTER_SPEC` §62                                                                                     | `content/glosario.ts`                                                                                                  | Unitaria de conteo/consistencia                                                     | ≥14 definiciones técnicamente correctas                         | Revisión de precisión técnica                                     |
| 7   | `/correcciones/`                                    | Página de política de correcciones (proceso, no casos)                                                                | `src/app/correcciones/page.tsx`, `content/corrections.ts`                                                              | E2E navegación + axe                                                                | Página real, sin casos inventados                               | 0 violaciones axe                                                 |
| 8   | SEO técnico                                         | Sitemap/robots/canonical actualizados para rutas nuevas                                                               | `src/app/sitemap.ts`                                                                                                   | E2E de `tests/e2e/seo.spec.ts` ampliado                                             | Rutas reales indexables, plantilla sintética excluida           | Prueba de sitemap.xml en verde                                    |
| 9   | Verificación de accesibilidad y responsive completa | Pase final sobre todas las rutas nuevas                                                                               | —                                                                                                                      | axe + responsive sobre todas las rutas de §12                                       | 0 violaciones nuevas                                            | Igual rigor que Fase 1 §5/§6 del reporte                          |
| 10  | `ARCHITECTURE.md` actualizado                       | Documentar los nuevos módulos (§7)                                                                                    | `docs/architecture/ARCHITECTURE.md`                                                                                    | —                                                                                   | Refleja el estado real tras los pasos 1–9                       | Revisión de consistencia con el código                            |
| 11  | Borradores institucionales                          | Crear los 3 documentos DRAFT de §18                                                                                   | `docs/methodology/METHODOLOGY_STANDARD.md`, `docs/policies/EDITORIAL_POLICY.md`, `docs/policies/CORRECTIONS_POLICY.md` | —                                                                                   | Encabezado DRAFT presente, sin presentarse como aprobados       | Revisión de que no se afirma aprobación institucional inexistente |
| 12  | Reporte final de Fase 2                             | `PHASE_2_REPORT.md` con evidencia, igual que `PHASE_1_REPORT.md`                                                      | `docs/phases/phase-2/PHASE_2_REPORT.md`                                                                                | Ejecución completa de §17                                                           | Todos los criterios de §21 verificados con comando/evidencia    | Ningún criterio marcado como cumplido sin verificación            |

---

## 21. CRITERIOS DE ACEPTACIÓN

### Esquema `Study`

- TypeScript estricto (mismas reglas de `tsconfig.json` ya vigentes).
- Validación explícita en tiempo de ejecución, no solo de tipos.
- Pruebas unitarias que cubran casos válidos e inválidos.
- Sin datos reales en ningún fixture de prueba.

### Accesibilidad

- 0 nuevas violaciones axe en las rutas de Fase 2.
- WCAG 2.2 AA como objetivo, mismos tags que Fase 1.

### Rendimiento

Localmente durante desarrollo (build local, igual metodología que `PHASE_1_REPORT.md` §6):

- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95
- LCP < 2.5 s
- CLS < 0.1

**Una vez disponible staging, estos controles deben repetirse contra staging antes de considerar completamente verificada la entrega** — exactamente la misma advertencia que `PHASE_1_REPORT.md` §6 ya dejó registrada para Fase 1, y que sigue sin resolverse por la misma razón (§4).

### Pruebas

Unit tests; E2E; navegación; responsive; SEO; accesibilidad; validación del modelo de estudios; validación del modelo electoral — todas ejecutadas y en verde (§17).

### Seguridad

Cero secretos nuevos; sin nueva superficie de autenticación; sin datos personales; sin infraestructura nueva.

### Integridad

Cero cifras inventadas; cero estudios ficticios presentados como reales (`isReal: false` verificado, §9); fixtures claramente identificados como sintéticos (§10); ninguna atribución falsa a OPMX.

---

## 22. DEFINITION OF DONE

Fase 2 se considera técnicamente completa cuando:

1. Los 12 pasos de §20 están ejecutados, cada uno con su commit y su verificación.
2. Todos los criterios de §21 están verificados con comandos y evidencia (mismo estándar que `PHASE_1_REPORT.md`).
3. `PHASE_2_REPORT.md` documenta esa evidencia.
4. `ARCHITECTURE.md` refleja el estado real del código.
5. Los tres borradores institucionales de §18 existen, con el encabezado DRAFT, sin presentarse como aprobados.
6. **Queda registrado explícitamente** que la repetición de Lighthouse/Core Web Vitals contra staging real sigue pendiente si staging no se ha resuelto para entonces — no se declara "completamente verificado" sin esa repetición, aunque el resto de la fase esté terminado.

Fase 2 **no** requiere, para su Definition of Done técnico, que exista un estudio real publicado ni que los borradores institucionales estén aprobados — eso corresponde a Release 1.3 y a decisiones institucionales fuera de este alcance.

---

## 23. RIESGOS

- **Metodológico:** construir el esquema `Study` sin que exista todavía un Consejo Editorial y Metodológico que valide sus campos podría requerir ajustes cuando ese consejo se constituya. Mitigación: el esquema se diseña extensible (campos opcionales donde el Master Spec no es prescriptivo), no cerrado.
- **Técnico:** todo lo medido (Lighthouse, accesibilidad) seguirá siendo local, no contra staging, mientras ADR-001 no se resuelva — mismo riesgo que en Fase 1, ya mitigado por la práctica de re-medir cuando exista staging (§21, §22).
- **De sobre-ingeniería:** el modelo electoral (`candidacies`/`coalitions`/`common_candidacies`) es más complejo que lo mínimo de `MASTER_SPEC` §32. Mitigación: se construye con fixtures sintéticos mínimos suficientes para probar el modelo (§10), no con un catálogo exhaustivo de casos electorales — evita invertir tiempo en cobertura que ningún estudio real necesita todavía.
- **Reputacional:** una plantilla de estudio visualmente completa, aunque marcada como sintética, podría malinterpretarse si se comparte fuera de contexto (captura de pantalla sin las advertencias visibles). Mitigación: mismo tratamiento ya probado con la demo de Michoacán (`noindex`, badge visible, sin structured data) — riesgo residual, no eliminado, igual que se reconoció en `OPMX_ALIGNMENT_REVIEW_v1.0.md` §12.
- **De alcance:** riesgo de que "modelo reutilizable de ficha técnica" se interprete como licencia para empezar a construir el CMS (Release 1.2). Mitigación: §6 y §16 de este plan son explícitos; ningún paso de §20 introduce login, roles ni base de datos.

---

## 24. ROLLBACK

Todo lo planeado en Fase 2 es contenido y código versionado en Git, sin migraciones de datos, sin infraestructura nueva y sin estado persistente fuera del repositorio (§16). El rollback de cualquier paso de §20 es un `git revert` del commit correspondiente, sin efectos secundarios en producción (que no existe) ni en datos de usuarios (que no existen). Esto cumple directamente el requisito de `OPMX_PRODUCT_ROADMAP_v1.0.md` §3 ("capacidad de rollback o corrección") de la forma más simple posible.

---

## 25. ENTREGABLES FINALES

Al completar la **implementación** futura de Fase 2 (no en esta entrega):

- Esquema `Study` tipado y validado, con pruebas.
- Modelo electoral con fixtures sintéticos, con pruebas.
- 6 subpáginas de metodología publicadas.
- Glosario ampliado (≥14 términos).
- Página `/correcciones/` publicada.
- Plantilla sintética de estudio, `noindex`, verificada.
- Componentes reutilizables de §13.
- `ARCHITECTURE.md` actualizado.
- Tres borradores institucionales (DRAFT) de §18.
- `PHASE_2_REPORT.md` con evidencia completa.

Entregables de **esta** planeación (sí producidos ahora): `PHASE_2_PLAN.md` (este documento), `ADR-001-hosting.md`, `ADR-005-repository-structure.md`, `docs/adr/README.md` actualizado.

---

## 26. QUÉ DEBE REVISARSE ANTES DE AUTORIZAR IMPLEMENTACIÓN

1. **Staging desplegado y validado** — condición explícita del usuario en esta misma autorización. No basta con que exista una URL; debe haberse verificado (Lighthouse, accesibilidad, disponibilidad) igual que se hizo localmente en Fase 1.
2. **ADR-001 en estado `Accepted`**, con un proveedor de hosting elegido por el usuario (o autorización explícita para usar las credenciales de AWS presentes en el entorno) — no puede resolverlo este proceso por sí solo.
3. Confirmación del usuario de que el alcance de §5–§6 sigue siendo el correcto (no ha cambiado nada desde esta planeación).
4. Confirmación de que la regla de fixtures sintéticos (§10) y la regla de `isReal`/JSON-LD (§9, §14) se entienden y aceptan como no negociables antes de que se escriba una sola línea de código.
5. Autorización explícita, separada de esta, para iniciar la implementación — igual que se exigió antes de iniciar la Fase 1.

---

# CONFIRMACIÓN

**No se ha iniciado la implementación de la Fase 2.** No se escribió código de producto. No se desplegó infraestructura. No se usaron las credenciales de AWS presentes en el entorno. Este documento y los dos ADR que lo acompañan son los únicos artefactos producidos en esta entrega.

Quedo a la espera de revisión.
