# OPMX ALIGNMENT REVIEW v1.0

## Revisión formal de alineación entre documentos rectores, técnicos y de ejecución

**Fecha:** 7 de agosto de 2026
**Alcance:** Revisión documental. No se escribió ni modificó código. No se inició la Fase 2.
**Documentos revisados íntegramente:**

1. `docs/strategy/OPMX_VISION_2030.md`
2. `docs/strategy/OPMX_PRODUCT_ROADMAP_v1.0.md`
3. `docs/specifications/OPMX_MASTER_SPEC_v1.0.md`
4. `docs/architecture/BLUEPRINT_v1.1.md` (y, por referencia, `docs/architecture/BLUEPRINT.md` v1.0, ya superseded)
5. `docs/architecture/ARCHITECTURE.md`
6. `docs/phases/phase-1/PHASE_1_EXECUTION_PLAN.md`
7. `docs/phases/phase-1/PHASE_1_REPORT.md`
8. `docs/operations/STAGING.md`

Esta revisión corresponde al **Paso 4** de la secuencia recomendada en `OPMX_PRODUCT_ROADMAP_v1.0.md` §48.

---

## 1. RESUMEN EJECUTIVO

La documentación rectora de OPMX (Visión, Roadmap, Master Spec, Blueprint) es internamente coherente: donde un documento posterior corrige a uno anterior, la corrección está explícita y documentada, no oculta. La Fase 1, tal como fue autorizada y ejecutada, cumple su propio alcance delimitado (`BLUEPRINT_v1.1.md` §3) y sus criterios de aceptación (`BLUEPRINT_v1.1.md` §13), con **una única excepción reconocida por el propio reporte de fase**: no existe una URL de staging real desplegada, porque no se autorizó usar las credenciales de AWS presentes en el entorno y no se resolvió ADR-001 (hosting).

Ese punto no es un detalle menor: `OPMX_PRODUCT_ROADMAP_v1.0.md` §48 ("Próxima secuencia recomendada") pone **"Paso 1: Cerrar staging de la Fase 1"** antes de este mismo Alignment Review. Este documento se está produciendo sin que ese paso se haya completado, porque así lo instruyó explícitamente el usuario. Esta revisión no ignora esa discrepancia de secuencia — la trata como el hallazgo más importante del análisis (§10) y la traduce en una recomendación condicionada, no en un bloqueo total ni en una aprobación silenciosa (§20).

Se encontró **una contradicción textual real y localizada** entre `BLUEPRINT_v1.1.md` §4 (que instruye incluir JSON-LD `Dataset`/`Article` en la ficha del estudio demo) y `PHASE_1_EXECUTION_PLAN.md` §2 (que lo prohíbe explícitamente para esa misma página) — ver §5. Fue resuelta en la práctica a favor de la versión más restrictiva y más reciente, y aquí se recomienda una corrección textual de `BLUEPRINT_v1.1.md` para eliminar la ambigüedad hacia el futuro.

Ninguna de las ocho decisiones ADR pendientes (`BLUEPRINT_v1.1.md` §14) bloquea el alcance de Fase 2 recomendado por el propio Roadmap y confirmado en el encargo de esta revisión: **Sistema de Estudios + Modelo Metodológico Público**, sin base de datos, sin CMS con login, sin FIELD, sin datos personales. El detalle está en §11.

**Recomendación final (§20): autorizar la Fase 2 con condiciones**, no de forma incondicional ni denegarla.

---

## 2. JERARQUÍA OFICIAL DE DOCUMENTOS

Conforme a la jerarquía indicada para esta revisión, y consistente con lo que los propios documentos declaran sobre sí mismos (`OPMX_PRODUCT_ROADMAP_v1.0.md` §0; `OPMX_VISION_2030.md` §46–48):

| #   | Documento                                                                                               | Rol                                                                                                                                                                 |
| --- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `OPMX_VISION_2030.md`                                                                                   | Define el destino institucional. Por encima de decisiones tecnológicas coyunturales.                                                                                |
| 2   | `OPMX_PRODUCT_ROADMAP_v1.0.md`                                                                          | Convierte la visión en releases, prioridades, gates y criterios de avance.                                                                                          |
| 3   | `OPMX_MASTER_SPEC_v1.0.md`                                                                              | Define los requisitos técnicos y funcionales originales.                                                                                                            |
| 4   | `BLUEPRINT_v1.1.md`                                                                                     | Arquitectura técnica vigente. Corrige explícitamente 14 puntos de `BLUEPRINT.md` v1.0 (tabla en su §0); v1.0 queda como historial, no como fuente de verdad activa. |
| 5   | `ARCHITECTURE.md`                                                                                       | Documenta lo realmente implementado (no la propuesta) — módulos del monolito y sus límites.                                                                         |
| 6   | Planes y reportes de fase (`PHASE_1_EXECUTION_PLAN.md`, `PHASE_1_REPORT.md`) y operación (`STAGING.md`) | Ejecución inmediata y su evidencia.                                                                                                                                 |

**Regla de resolución aplicada en esta revisión:** cuando un documento de rango inferior precisa o restringe a uno de rango superior _para un caso específico y explícito_ (p. ej. una precisión de fase que acota cómo se aplica una regla del Blueprint a una sola página), y esa precisión fue autorizada explícitamente por el usuario antes de construirse, se trata como **corrección documentada**, no como contradicción sin resolver — salvo que la precisión contradiga un principio no negociable de rango 1–3 (integridad de datos, privacidad, no fabricación), en cuyo caso se marca como contradicción real independientemente del rango del documento que la introdujo. Bajo esa regla, ninguna precisión de Fase 1 viola un principio de rango superior; todas son acotaciones de alcance o de implementación.

---

## 3. ESTADO ACTUAL REAL DEL PROYECTO

- **Código**: portal público funcional como monolito Next.js, con 18 páginas de contenido + 3 rutas de metadata técnica, verificado con 12 pruebas unitarias y 40 pruebas E2E (accesibilidad, SEO técnico, responsive, navegación), todas en verde según `PHASE_1_REPORT.md` §4.
- **Despliegue**: **ninguno**. No existe staging ni producción accesibles fuera de este entorno de ejecución. Todo lo verificado (incluyendo Lighthouse) se midió contra un build local, no contra una URL real (`PHASE_1_REPORT.md` §6, §12.2).
- **Datos**: cero base de datos, cero datos personales, cero usuarios reales, cero estudios reales publicados. El único "estudio" existente es la demostración de Michoacán, explícitamente marcada como no atribuible a OPMX (`BLUEPRINT_v1.1.md` §16).
- **Identidad/autenticación**: no existe sistema de identidad real. La única barrera de acceso es Basic Auth condicional para staging (`STAGING.md`), inactiva por defecto y explícitamente no destinada a evolucionar hacia la autenticación definitiva (`BLUEPRINT_v1.1.md` §5).
- **Gobernanza**: no existe Consejo Editorial y Metodológico (`OPMX_VISION_2030.md` §12 lo prevé para 2026, pero no hay evidencia de que se haya constituido). No existe revisión jurídica documentada. `/transparencia/` publica explícitamente sus apartados de responsables y financiamiento como "pendiente de publicación".
- **Documentación rectora**: completa y reorganizada bajo `docs/` (Visión, Roadmap, Master Spec, Blueprint, Architecture, fases, operación), con historial Git preservado.

Según los niveles de madurez del propio Roadmap (`OPMX_PRODUCT_ROADMAP_v1.0.md` §5), el estado real es más cercano a **M1 (Prototipo — permite validar UX/arquitectura sin operación real)** que a M2 (MVP con usuarios reales), precisamente porque nada está desplegado públicamente todavía. Esto no es una crítica: es la descripción honesta que exige la propia regla del Roadmap ("no describir un prototipo como plataforma productiva").

---

## 4. ELEMENTOS CORRECTAMENTE ALINEADOS

- **Principio de no fabricación** (`OPMX_VISION_2030.md` §6.8, `OPMX_MASTER_SPEC_v1.0.md` §3): aplicado consistentemente — cifras del demo sin alterar, secciones sin contenido real marcadas honestamente como "en construcción" en vez de rellenarse (`PHASE_1_REPORT.md` §8, §3).
- **Metodología antes de marketing / evidencia antes de escala**: la secuencia de fases de Fase 1 (visual → navegación → landing → demo → SEO → accesibilidad → staging → verificación) respeta el principio de "Credibilidad → Publicación → ..." de `OPMX_PRODUCT_ROADMAP_v1.0.md` §2 sin saltarse pasos.
- **Modular monolith**: la decisión de `BLUEPRINT_v1.1.md` §1 (no instalar NestJS/FastAPI/Redis/BullMQ desde el día uno) coincide exactamente con `ARCHITECTURE.md` §"Un solo runtime" — arquitectura propuesta e implementada coinciden sin desviación.
- **URL del demo separada de la URL canónica futura**: `MASTER_SPEC` §41 usa `/encuestas/michoacan-gubernatura-junio-2026` como ejemplo canónico para estudios reales. La implementación deliberadamente puso el demo en `/demo/michoacan-gubernatura-junio-2026` para no colisionar con esa URL canónica cuando exista un estudio real (`PHASE_1_REPORT.md` §8) — una lectura correcta y anticipada del principio de fuente única (`MASTER_SPEC` §58, `OPMX_VISION_2030.md` §6.7).
- **Privacidad > SEO** (`OPMX_MASTER_SPEC_v1.0.md` §87, `OPMX_VISION_2030.md` §6.4): aplicado en la decisión de no usar las credenciales de AWS sin autorización y de dejar el demo en `noindex` en vez de indexarlo para ganar tráfico.
- **No exceder la evidencia disponible**: ni la Visión ni el Roadmap ni el Master Spec prometen una posición garantizada en buscadores o sistemas de IA; la implementación de Fase 1 (metadata, `robots.txt`, `sitemap.xml`) tampoco lo hace.
- **Jurisdicción de datos no asumida** (`BLUEPRINT_v1.1.md` §9): consistente con `OPMX_VISION_2030.md` §6.9 (independencia tecnológica) — ningún documento posterior fuerza una decisión de hosting específica.

---

## 5. CONTRADICCIONES ENTRE VISIÓN, ROADMAP, MASTER SPEC, BLUEPRINT Y ARQUITECTURA IMPLEMENTADA

### 5.1 Contradicción textual real: JSON-LD `Dataset` en la ficha del demo

- `BLUEPRINT_v1.1.md` §4 ("Tratamiento en interfaz, obligatorio, no opcional") instruye explícitamente: _"Se incluye también en el JSON-LD (`Dataset`/`Article`) como `description` adicional o `disambiguatingDescription`..."_, referido a la advertencia del 97% en la ficha del demo.
- `PHASE_1_EXECUTION_PLAN.md` §2 (precisión de la autorización de Fase 1, posterior y más específica) ordena lo contrario para esa misma página: _"No se usa `Dataset` (ni ningún otro structured data que implique investigación producida por OPMX)... sin JSON-LD de ningún tipo."_
- La implementación siguió `PHASE_1_EXECUTION_PLAN.md`: cero scripts `application/ld+json` en la página demo, verificado por prueba E2E (`PHASE_1_REPORT.md` §8).

**Clasificación:** contradicción textual real entre dos documentos vigentes, **resuelta en la práctica** — no una duda abierta. La resolución es coherente con el principio de mayor jerarquía en juego (`BLUEPRINT_v1.1.md` §16: el demo no debe atribuirse a OPMX como investigación real), por lo que la precisión más restrictiva es la correcta, no una desviación.

**Recomendación:** corregir `BLUEPRINT_v1.1.md` §4 para acotar explícitamente que el JSON-LD de `Dataset`/`Article` aplica a estudios **reales** publicados por OPMX, nunca a contenido demostrativo. Esta revisión no modifica el Blueprint (regla de la tarea); se registra como acción pendiente en §13.

### 5.2 Aparente contradicción de secuencia: este Alignment Review vs. `OPMX_PRODUCT_ROADMAP_v1.0.md` §48

El propio Roadmap define su secuencia recomendada como: Paso 1 cerrar staging → Paso 2 aprobar Visión → Paso 3 aprobar Roadmap → **Paso 4 Alignment Review** → Paso 5 `PHASE_2_PLAN.md`. Este documento (Paso 4) se produce sin que el Paso 1 (staging) se haya completado.

**Clasificación:** no es una contradicción entre documentos — es una **decisión pendiente del usuario**, tomada explícitamente al encargar esta revisión ahora. Se documenta aquí para que la decisión sea visible, no para cuestionarla. Ver tratamiento completo en §10 y su efecto en la recomendación final en §20.

### 5.3 Generalización de "Fase 2" entre `BLUEPRINT_v1.1.md` y `OPMX_PRODUCT_ROADMAP_v1.0.md`

`BLUEPRINT_v1.1.md` §14 usa la etiqueta genérica "Fase 2" como punto de bloqueo para ADR-006 (CMS) y ADR-008 (IaC). `OPMX_PRODUCT_ROADMAP_v1.0.md` desagrega lo que el Blueprint llama "Fase 2" en releases distintos: **Release 1.1 "Sistema de Estudios"** (sin CMS, sin login) y **Release 1.2 "CMS Editorial Controlado"** (con CMS, con roles). Leído literalmente, el Blueprint sugeriría que ADR-006 bloquea el "Fase 2" que esta revisión está a punto de recomendar.

**Clasificación:** no es una contradicción de fondo — es una imprecisión de granularidad en un documento de rango inferior (Blueprint, rango 4) frente a uno de rango superior (Roadmap, rango 2) que sí distingue los releases. Por jerarquía, el Roadmap gobierna: ADR-006 bloquea el Release 1.2 (CMS), no el Release 1.1 (Sistema de Estudios), que es el alcance de la Fase 2 aquí recomendada. Detalle en §11.

### 5.4 Ningún otro punto de contradicción de fondo encontrado

El resto de las diferencias detectadas entre Master Spec y documentos posteriores son correcciones explícitamente documentadas (§6), no contradicciones sin resolver.

---

## 6. REQUISITOS DEL MASTER SPEC SUPERADOS O CORREGIDOS POR DOCUMENTOS POSTERIORES

| Requisito original (Master Spec)                                                                                            | Corrección                                                                                                                                                                                            | Documento y sección que corrige                               |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| §32 modelo de datos incluye `respondents` como tabla persistente                                                            | Eliminada por defecto; los datos de respuesta viven ligados solo a la entrevista, salvo estudios panel explícitamente consentidos                                                                     | `BLUEPRINT_v1.1.md` §7                                        |
| §32 implica candidato↔partido como relación fija (no hay entidad de unión)                                                  | Reemplazado por `candidacies` + `coalitions` + `common_candidacies`, histórico y no exclusivo de un partido                                                                                           | `BLUEPRINT_v1.1.md` §6                                        |
| §7 "Arquitectura General" separa FRONTEND/BACKEND/DATA/FIELD/AUDIT/ADMIN como si fueran servicios físicos                   | Reinterpretado como separación **lógica** dentro de un monolito modular; física solo cuando una señal concreta lo justifique                                                                          | `BLUEPRINT_v1.1.md` §1, §15                                   |
| §80 Roadmap de 12 fases lineales ("Fase 1"..."Fase 12")                                                                     | Sustituido en estructura (no en espíritu) por releases versionados y horizontes anuales del Product Roadmap; el mapeo 1:1 entre "Fase N" del Master Spec y "Release X.Y" del Roadmap ya no es literal | `OPMX_PRODUCT_ROADMAP_v1.0.md` completo, especialmente §6–§34 |
| §72 seguridad y §73 accesibilidad listadas sin fase explícita, junto a un roadmap original que las colocaba tarde (Fase 12) | Declaradas transversales a todas las fases desde el diseño; Fase 12 redefinida como auditoría final y hardening, no como el inicio de la seguridad                                                    | `BLUEPRINT_v1.1.md` §12                                       |
| §54 "cada página debe generar... Open Graph, imagen social, autor, fecha"                                                   | Acotado para la página demo específicamente: sin autor, sin fecha editorial, sin Open Graph de tipo artículo (no aplica a páginas reales futuras, que sí deben cumplir §54 íntegro)                   | `PHASE_1_EXECUTION_PLAN.md` §2                                |
| §43/§59 datos estructurados y machine-readable facts                                                                        | Para el demo: se mantiene el requisito de hechos clave **visibles en HTML** (§59), se elimina el requisito de `Dataset` JSON-LD (§43) — ver contradicción resuelta en §5.1                            | `PHASE_1_EXECUTION_PLAN.md` §2, `BLUEPRINT_v1.1.md` §16       |
| Sección 11 (implícito): host único "S3 o Cloudflare R2" intercambiables para evidencia                                      | Reemplazado por comparación real multi-criterio (residencia, cifrado, WORM, egress); ninguno domina en todos los criterios                                                                            | `BLUEPRINT_v1.1.md` §10                                       |
| Implícito en §84: hosting sugerido en México sin fundamentarlo                                                              | Explícitamente no se asume obligación de residencia en México; decisión condicionada a revisión jurídica/contractual/seguridad                                                                        | `BLUEPRINT_v1.1.md` §9                                        |

Todos los requisitos de esta tabla son **superados formalmente** — no deben tratarse como vigentes en su forma original al planear la Fase 2.

---

## 7. FUNCIONALIDADES QUE DEBEN APLAZARSE CONFORME AL PRODUCT ROADMAP

### 7.1 Aplazadas por gate explícito (condiciones no cumplidas)

Bloqueadas por el **Gate 2026 → 2027** (`OPMX_PRODUCT_ROADMAP_v1.0.md` §13), ninguna de cuyas condiciones está satisfecha hoy (sin metodología institucional documentada, sin política de privacidad publicada, sin revisión jurídica, sin modelo de consentimiento, sin identidad/roles, sin ADR de infraestructura resuelto):

- OPMX FIELD MVP (Release 2.0)
- Consentimiento y evidencia (Release 2.1)
- Georreferenciación segura (Release 2.2)
- OPMX AUDIT (Release 2.3 — depende de FIELD)
- Pipeline estadístico reproducible sobre datos reales (Release 2.4)
- Dashboard operativo (Release 2.5)

Bloqueadas además por el **Gate 2027 → 2028** (§21, que a su vez requiere lo anterior resuelto):

- OPMX DATA (Release 3.0), series históricas (3.1), Poll Tracker (3.2), API (3.3), Academia 2.0 (3.4)

Bloqueadas por dependerse de un corpus maduro que no existe (Horizonte 2029, §28):

- OPMX Insights (4.0), OPMX Lab (4.1), búsqueda semántica (4.2), OPMX AI Beta (4.3)

### 7.2 Aplazada por secuencia de release, no por gate incumplido

- **CMS Editorial Controlado (Release 1.2)**: no está bloqueado por ninguna condición incumplida — simplemente es el release siguiente a "Sistema de Estudios" (Release 1.1), y el propio Roadmap advierte no adelantar funcionalidad sin necesidad (§36 "Principio de Desarrollo" en `OPMX_VISION_2030.md`). Se recomienda aplazarlo a una Fase 3, no a la Fase 2 aquí evaluada.
- **Publicación del primer estudio real (Release 1.3)**: requiere metodología aprobada, protocolo, revisión jurídica y revisión editorial — ninguno existe todavía (§13 de este documento). No es un gate formal del Roadmap pero es un requisito explícito de `OPMX_VISION_2030.md` §37 ("Principio de Publicación").

Todo lo anterior coincide exactamente con la restricción ya impuesta a esta revisión (sin FIELD, video, GPS, audio, datos personales, Poll Tracker, API pública ni IA en Fase 2) — no hay tensión entre esa restricción y lo que el propio Roadmap indica.

---

## 8. FUNCIONALIDADES QUE DEBEN PRIORIZARSE

Según la matriz de prioridad del Roadmap (`OPMX_PRODUCT_ROADMAP_v1.0.md` §50), los elementos **P0** son: OPMX Portal (✅ Fase 1), **OPMX Research**, CMS, Primer estudio nativo, SEO/citabilidad — los tres últimos dependientes de Research. Esto confirma que **Sistema de Estudios (OPMX Research)** es la prioridad inmediata correcta, sin necesidad de justificar una alternativa.

Adicionalmente, "Primer estudio nativo" depende explícitamente de "Research **+ gobernanza**" (§50) — no solo de Research. Esto eleva a prioridad P0-adyacente, aunque no forme parte del código:

- Iniciar `METHODOLOGY_STANDARD.md` y `EDITORIAL_POLICY.md` (documentos derivados listados en `OPMX_PRODUCT_ROADMAP_v1.0.md` §53), porque bloquean el release siguiente al que habilita esta Fase 2.
- Completar la política de correcciones (`/correcciones/`, `MASTER_SPEC` §48) como contenido real, no solo como sección "pendiente" dentro de `/transparencia/`.

SEO/citabilidad por estudio (Release 1.4) también es P0, pero depende de que existan estudios — se prioriza la infraestructura de páginas de metodología y ficha técnica reutilizable ahora, para que el SEO por estudio no requiera rediseño cuando llegue el primer estudio real.

---

## 9. DIFERENCIAS ENTRE LO PLANEADO Y LO REALMENTE IMPLEMENTADO EN LA FASE 1

| Criterio (`BLUEPRINT_v1.1.md` §13) | Planeado                                                          | Implementado                                                                                                               | Diferencia                                                                                                         |
| ---------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Rutas y páginas                    | Home + institucionales + demo, sin 404/500                        | 18 páginas + 3 rutas técnicas, verificado                                                                                  | Sin diferencia                                                                                                     |
| Responsive                         | 3 breakpoints sin overflow                                        | Verificado en 375/768/1440px en 3 rutas                                                                                    | Sin diferencia                                                                                                     |
| WCAG 2.2 AA                        | 0 errores críticos automatizados + verificación manual de teclado | 0 violaciones axe en 16 rutas + 2 pruebas de teclado; además se encontró y corrigió un bug real de contraste no anticipado | Implementado **más allá** de lo planeado (bug real detectado y corregido)                                          |
| Lighthouse / Core Web Vitals       | LCP < 2.5s, Performance ≥ 90, **medido en staging**               | LCP 0.5s, Performance 1.00, **medido en build local**                                                                      | Diferencia real: la condición "en staging" no se cumplió porque no hay staging                                     |
| Pruebas automatizadas              | Suite unitaria + E2E en CI                                        | 12 unitarias + 40 E2E, CI configurado                                                                                      | Sin diferencia en lo verificable localmente; ejecución real en GitHub Actions no fue re-observada en esta revisión |
| Cero secretos                      | Escaneo (gitleaks o equivalente) sin hallazgos                    | Escaneo por patrones manual limpio + gitleaks configurado en CI, no ejecutado localmente                                   | Diferencia menor, reconocida por el propio reporte                                                                 |
| No exposición de datos sensibles   | Sin PII en el sistema                                             | Sin PII (no hay base de datos ni usuarios)                                                                                 | Sin diferencia                                                                                                     |
| Demo no indexable                  | `noindex` verificado                                              | Verificado por prueba E2E                                                                                                  | Sin diferencia                                                                                                     |
| Documentación                      | README, arquitectura, Blueprint con historial                     | Completa, más `STAGING.md`, `.env.example` y reorganización posterior bajo `docs/`                                         | Implementado más allá de lo planeado                                                                               |
| **Despliegue de staging**          | **URL accesible, desplegada automáticamente desde CI, protegida** | **No existe**                                                                                                              | **Diferencia real y reconocida** — único criterio no satisfecho                                                    |

**Conclusión de esta sección:** de diez criterios, nueve están satisfechos o superados; uno (staging real) no se cumplió, por una razón documentada de antemano (no autorización para usar credenciales de AWS sin confirmación explícita), no por omisión ni por trabajo faltante dentro del alcance técnico.

---

## 10. ESTADO EXACTO DEL STAGING

- **No existe ninguna URL de staging ni de producción desplegada**, en ningún proveedor.
- La barrera de acceso (Basic Auth condicional) está implementada, probada por unidad (7 casos) y verificada manualmente con `curl` contra un servidor local — pero no protege nada real porque no hay ningún despliegue al que aplicarse.
- La causa documentada: el entorno de ejecución cuenta con credenciales de AWS preexistentes; usarlas para crear infraestructura real (S3/CloudFront u otra) sin confirmación explícita del usuario se consideró una acción con costo y persistencia no autorizada. Se preguntó al usuario cómo proceder; no hubo respuesta antes de que el trabajo continuara, y se optó por la opción no destructiva (no desplegar).
- **ADR-001 (hosting) sigue sin resolverse**, y es la dependencia declarada explícitamente tanto en `BLUEPRINT_v1.1.md` §14 como en `STAGING.md` §"Pendiente para tener una URL de staging real".
- Esto significa que el **Release 1.0 "Portal Fundacional"** del Roadmap **no puede considerarse formalmente cerrado**: su propia sección "Estado actual" dice textualmente que _"el despliegue y validación de staging debe cerrarse antes de considerar completamente verificado el release técnico inicial"_ (`OPMX_PRODUCT_ROADMAP_v1.0.md` §7), y su lista de "Criterios de salida" incluye "staging verificable" como punto explícito, no cumplido.
- Este es, por tanto, el hallazgo con mayor peso de esta revisión: **no es un defecto de Fase 1**, es una **decisión pendiente del usuario** (elegir proveedor de hosting, o autorizar el uso de las credenciales presentes, o proveer otras) que ningún trabajo adicional de código puede resolver por sí solo.

---

## 11. DECISIONES ADR QUE BLOQUEAN O NO BLOQUEAN LA FASE 2

Evaluadas contra el alcance recomendado de Fase 2 (Sistema de Estudios + Modelo Metodológico Público, sin base de datos productiva, sin CMS con login, sin FIELD):

| ADR                                 | Bloquea Fase 2 (alcance recomendado)                                                                                                                                             | Razón                                                                                                                                                               |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ADR-001 Hosting                     | **No bloquea el trabajo de Fase 2**, pero **sí bloquea cerrar formalmente Release 1.0** (§10)                                                                                    | El trabajo de Fase 2 aquí recomendado no requiere una URL desplegada; sí la requeriría cualquier reclamo de que Release 1.0 o Fase 2 están "verificados en staging" |
| ADR-002 Object storage              | No bloquea                                                                                                                                                                       | Bloquea Fase 6 (video real), muy posterior                                                                                                                          |
| ADR-003 Base de datos               | **No bloquea**, condicionado a que Fase 2 mantenga el patrón de contenido tipado/versionado en código (igual que la demo de Fase 1), sin introducir una base de datos productiva | Si Fase 2 decidiera introducir una BD real, ADR-003 pasaría a ser bloqueante de inmediato                                                                           |
| ADR-004 Autenticación               | **No bloquea**, mientras Fase 2 no introduzca login ni roles reales (no hay CMS en el alcance recomendado)                                                                       | Bloqueará el Release 1.2 (CMS)                                                                                                                                      |
| ADR-005 Monorepo                    | No bloquea                                                                                                                                                                       | De facto ya resuelto por omisión (paquete único, sin herramienta de monorepo) — pendiente formalizarlo como ADR documentado, no como decisión técnica nueva         |
| ADR-006 CMS                         | **No bloquea el Release 1.1** (Sistema de Estudios)                                                                                                                              | Ver corrección de alcance en §5.3: bloquea el Release 1.2, no la Fase 2 aquí recomendada                                                                            |
| ADR-007 Mapas                       | No bloquea                                                                                                                                                                       | Bloquea Fase 5 (GIS real)                                                                                                                                           |
| ADR-008 Infraestructura como código | No bloquea de forma dura                                                                                                                                                         | Recomendable resolverlo antes de que Release 1.2 introduzca BD + CMS, pero Fase 2 no agrega infraestructura nueva                                                   |

**Conclusión: ningún ADR pendiente bloquea el inicio del alcance de Fase 2 recomendado**, siempre que ese alcance efectivamente evite introducir base de datos productiva, login real o cualquier infraestructura nueva — es decir, siempre que Fase 2 extienda el mismo patrón que ya funcionó en Fase 1 (contenido tipado y versionado en el repositorio).

---

## 12. RIESGOS METODOLÓGICOS, JURÍDICOS, TÉCNICOS, REPUTACIONALES Y DE PRIVACIDAD

### Metodológicos

- No existe todavía un Consejo Editorial y Metodológico (`OPMX_VISION_2030.md` §12), aunque el Roadmap lo prevé para 2026 (`OPMX_PRODUCT_ROADMAP_v1.0.md` §36). Publicar cualquier estudio real sin este órgano constituido contradice el "Principio de Publicación" de la Visión (§37).
- Sin metodología estándar documentada (`METHODOLOGY_STANDARD.md` no existe aún), cada futura ficha técnica corre el riesgo de improvisarse por estudio.

### Jurídicos

- No hay evidencia de revisión jurídica realizada, pese a que tres documentos distintos la exigen antes de producción (`OPMX_MASTER_SPEC_v1.0.md` §22, `BLUEPRINT_v1.1.md` §9, `OPMX_VISION_2030.md` §33). No bloquea el alcance de Fase 2 aquí recomendado (sin datos personales), pero sí bloqueará cualquier avance hacia FIELD o hacia el primer estudio con datos reales de campo.
- `/transparencia/` publica explícitamente responsables y financiamiento como "pendiente" — aceptable como estado honesto en Fase 1, pero no puede seguir así indefinidamente si se acerca un estudio real y patrocinado.

### Técnicos

- Ausencia total de staging/producción (§10) — ningún dato de rendimiento, seguridad o disponibilidad real existe todavía; todo lo medido es de un entorno local no representativo de condiciones de red reales.
- `gitleaks` (el escaneo de secretos "oficial" según `BLUEPRINT_v1.1.md` §13) no se ha ejecutado y verificado fuera de la configuración de CI; su ejecución real en GitHub Actions no fue reconfirmada en esta revisión.
- Ocho ADR sin resolver formalmente (ninguno como documento individual en `docs/adr/`, solo como tabla dentro del Blueprint) — riesgo de que decisiones técnicas se tomen de facto (por ejemplo, ADR-005 monorepo) sin quedar documentadas como tales.

### Reputacionales

- El demo de Michoacán, pese a sus salvaguardas (noindex, advertencias visibles, URL separada), sigue siendo un riesgo residual si se comparte fuera de contexto (captura de pantalla, enlace directo sin las advertencias visibles en el viewport). Las salvaguardas mitigan pero no eliminan este riesgo.
- Publicar un "Sistema de Estudios" visualmente completo sin que exista un estudio real detrás podría, si se comunica mal externamente, dar la impresión de que OPMX ya opera cuando no ha publicado investigación propia — reforzar internamente (y en cualquier comunicación externa futura) que Fase 2 es infraestructura, no un lanzamiento editorial.

### Privacidad

- Riesgo bajo en el alcance de Fase 2 recomendado: no se introduce ningún dato personal. El riesgo real de privacidad queda correctamente diferido a cuando se planee FIELD, ya gated por `OPMX_PRODUCT_ROADMAP_v1.0.md` §13 y por la ausencia de revisión jurídica.

---

## 13. DOCUMENTOS INSTITUCIONALES O TÉCNICOS QUE DEBEN CREARSE ANTES DEL PRIMER ESTUDIO REAL

Derivados de `OPMX_PRODUCT_ROADMAP_v1.0.md` §10 ("Antes de publicar") y §53 ("Documentos derivados"), y de `OPMX_VISION_2030.md` §37:

1. `METHODOLOGY_STANDARD.md` — estándar metodológico institucional (no específico de un estudio).
2. `EDITORIAL_POLICY.md` — política editorial y de publicación.
3. `CORRECTIONS_POLICY.md` — formalización de la política de correcciones (hoy solo esbozada en `/transparencia/`).
4. `PRIVACY_DATA_MAP.md` — mapa de datos y bases de tratamiento (prerequisito de cualquier dato personal futuro, no de Fase 2).
5. Designación real de responsable metodológico y responsable editorial (personas, no solo campos de esquema).
6. Constitución, aunque sea mínima, del Consejo Editorial y Metodológico.
7. Revisión jurídica formal (externa a este proceso técnico) antes de cualquier estudio con datos reales o patrocinio.
8. Protocolo de campo y modelo de consentimiento — **no aplican a Fase 2** (sin FIELD), pero deben existir antes del Release 2.0.

De estos, **1 y 3 son razonablemente iniciables dentro de Fase 2** (documentación, no requieren infraestructura ni decisión legal); 4, 5, 6 y 7 son institucionales/jurídicos y exceden el alcance técnico de esta revisión y de la Fase 2 recomendada.

---

## 14. RECOMENDACIÓN DE ALCANCE PARA LA FASE 2

Se confirma, sin necesidad de desviarse, la prioridad ya indicada por el propio Roadmap y por el encargo de esta revisión:

> **Sistema de Estudios + Modelo Metodológico Público** (`OPMX_PRODUCT_ROADMAP_v1.0.md` Release 1.1), sin base de datos productiva, sin CMS con login, sin OPMX FIELD, sin video, GPS, audio ni datos personales, sin Poll Tracker, sin API pública, sin IA.

Justificación: es el único elemento **P0** del Roadmap (§50) que no depende de nada todavía no resuelto (a diferencia de FIELD, que depende de legal + identidad + infraestructura), y es condición de entrada explícita para "Primer estudio nativo" y "SEO/citabilidad", ambos también P0.

---

## 15. ENTREGABLES PROPUESTOS PARA LA FASE 2

1. **Esquema `Study` formalizado** como tipos/validación en código (extensión del patrón `content/studies/*` de Fase 1 — Zod/TypeScript), sin base de datos, cubriendo los campos de `OPMX_PRODUCT_ROADMAP_v1.0.md` §8 (ficha técnica, fechas, población, cobertura, muestra, técnica, marco muestral, diseño, ponderación, margen de error, patrocinador, responsable, metodología, cuestionario, resultados, notas, limitaciones, versión, correcciones, URL canónica).
2. **Subpáginas de metodología** previstas en `OPMX_MASTER_SPEC_v1.0.md` §63, hoy inexistentes: `/metodologia/muestreo-probabilistico`, `/muestreo-polietapico`, `/ponderacion`, `/raking`, `/margen-de-error`, `/efecto-de-diseno` — contenido educativo genérico, no atado a un estudio real.
3. **Glosario ampliado** a los ~14 términos de `OPMX_MASTER_SPEC_v1.0.md` §62 (Fase 1 dejó 10).
4. **Componente de "ficha técnica" reutilizable**, generalizando el patrón "Datos Clave" ya usado en la página demo, parametrizado para cualquier estudio futuro (sin datos reales todavía).
5. **Página `/correcciones/`** con la política de correcciones como proceso documentado (`MASTER_SPEC` §48), sin casos reales aún.
6. **Modelo de personas/candidaturas/partidos como contenido de ejemplo estructurado** (no un estudio real), aplicando el modelo corregido de `BLUEPRINT_v1.1.md` §6 (`candidacies`, `coalitions`, `common_candidacies`), para validar que el esquema sostiene los casos reales del sistema electoral mexicano antes de que exista un estudio real que lo use.
7. **Borrador inicial** de `METHODOLOGY_STANDARD.md` y `EDITORIAL_POLICY.md` (no su aprobación institucional, que excede el alcance técnico).
8. Pruebas unitarias y E2E equivalentes en rigor a las de Fase 1 para todo lo anterior.

---

## 16. ELEMENTOS EXPLÍCITAMENTE FUERA DE LA FASE 2

- OPMX FIELD, video, GPS, audio, datos personales de cualquier tipo (instrucción explícita del encargo, además confirmada por el Gate 2026→2027 no satisfecho).
- OPMX Poll Tracker, API pública, cualquier forma de IA aplicada al producto (instrucción explícita del encargo).
- CMS editorial completo con usuarios, roles o login real (Release 1.2 — depende de ADR-004/ADR-006, no resueltos; ver §5.3).
- Base de datos productiva (mantiene el patrón de contenido tipado en código; introducirla activaría ADR-003 de inmediato).
- Publicación de un estudio real con datos reales (Release 1.3 — requiere metodología aprobada, revisión jurídica, Consejo Editorial; ver §13).
- Resolución de ADR-001 (hosting) y despliegue de staging/producción — importante y pendiente (§10), pero es una decisión de negocio/proveedor, no trabajo de construcción de "Sistema de Estudios"; se recomienda resolverla en paralelo, no como entregable de Fase 2.
- Cualquier uso de las credenciales de AWS presentes en el entorno, y cualquier despliegue de infraestructura — igual que en fases anteriores.

---

## 17. DEPENDENCIAS DE LA FASE 2

- Fase 1 completa (✅ satisfecha, con la salvedad reconocida de staging — ver §9).
- Este Alignment Review, leído y considerado por el usuario (no necesariamente "resuelto" en todos sus puntos, pero sí conocido antes de autorizar).
- Decisión del usuario sobre si Fase 2 procede **en paralelo** a que ADR-001/staging sigan pendientes, o si prefiere insistir en el Paso 1 del Roadmap (cerrar staging) antes de autorizar cualquier construcción adicional — ver §20.
- Ninguna dependencia técnica adicional: no depende de resolver ningún otro ADR (§11), no depende de infraestructura nueva, no depende de datos reales.

---

## 18. CRITERIOS DE ENTRADA

Fase 2 puede comenzar cuando:

1. El usuario confirme el alcance de §14 (o lo ajuste explícitamente).
2. El usuario resuelva la tensión de §10/§20: autorizar en paralelo al staging pendiente, o exigir su cierre primero.
3. Se confirme que Fase 2 no introducirá base de datos productiva ni login real (si esa condición cambiara, ADR-003/ADR-004 pasarían a ser bloqueantes y deberían resolverse antes de empezar esa parte específica).
4. Autorización explícita para comenzar — igual que en Fase 1, este documento **no autoriza por sí mismo** el inicio de la construcción.

---

## 19. CRITERIOS DE ACEPTACIÓN MEDIBLES PARA LA FASE 2

Siguiendo el mismo estándar de rigor que `BLUEPRINT_v1.1.md` §13 aplicó a Fase 1:

| Criterio                    | Umbral                                                                                                                                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Esquema `Study`             | Tipado, validado, con pruebas unitarias; documentado en `ARCHITECTURE.md`                                                                                                                      |
| Subpáginas de metodología   | Las 6 de `MASTER_SPEC` §63 publicadas, indexables, con contenido real (no relleno), mismos checks de accesibilidad/SEO que Fase 1                                                              |
| Glosario                    | ≥ 14 términos de `MASTER_SPEC` §62, cada uno enlazable                                                                                                                                         |
| `/correcciones/`            | Publicada, con el proceso documentado, sin casos inventados                                                                                                                                    |
| Modelo electoral de ejemplo | `candidacies`/`coalitions`/`common_candidacies` representables en contenido tipado, con pruebas que verifiquen que una persona puede tener múltiples candidaturas históricas sin sobrescritura |
| Accesibilidad               | 0 violaciones axe nuevas; mismos tags WCAG 2.2 AA que Fase 1                                                                                                                                   |
| Rendimiento                 | Lighthouse Performance/Accessibility/Best Practices/SEO en el mismo rango que Fase 1 para las páginas nuevas                                                                                   |
| Pruebas                     | Suite unitaria + E2E ampliada, CI en verde                                                                                                                                                     |
| Seguridad                   | 0 secretos nuevos; sin cambios que requieran nueva superficie de autenticación                                                                                                                 |
| No fabricación              | 0 datos personales, 0 cifras inventadas, 0 estudio real presentado como tal                                                                                                                    |
| Documentación               | `METHODOLOGY_STANDARD.md` y `EDITORIAL_POLICY.md` con borrador inicial versionado en el repositorio                                                                                            |
| Staging (aclaración)        | **No es criterio de aceptación de Fase 2** — sigue siendo un pendiente de Release 1.0, tratado por separado (§10)                                                                              |

---

## 20. RECOMENDACIÓN FINAL

**Autorizar la Fase 2 con condiciones — no autorizar de forma incondicional, y no negar la autorización.**

Razones para no autorizar sin condiciones:

- El propio Roadmap ordena cerrar staging antes de este mismo Alignment Review (§5.2, §10), y eso no ha ocurrido. Ignorar esa secuencia sin decirlo explícitamente sería presentar una alineación más limpia de la que existe.
- Release 1.0 no puede declararse formalmente cerrado mientras ADR-001 siga sin resolverse.

Razones para no negar la autorización:

- El alcance de Fase 2 aquí recomendado (§14–§16) no depende de resolver ningún ADR (§11), no requiere staging, no introduce datos personales ni infraestructura nueva, y es exactamente el elemento P0 que el propio Roadmap identifica como siguiente paso lógico (§8).
- Negar la autorización penalizaría trabajo de documentación y modelado que no tiene relación causal con el problema real (la falta de una decisión de hosting).

**Condiciones para autorizar:**

1. El usuario decide explícitamente si Fase 2 avanza en paralelo al pendiente de staging/ADR-001, o si prefiere resolver ese pendiente primero — cualquiera de las dos opciones es defendible; lo que no es defendible es avanzar sin que la decisión quede registrada.
2. El alcance se mantiene exactamente dentro de §14–§16 (sin base de datos, sin CMS con login, sin ningún elemento de la lista de exclusiones).
3. Los criterios de aceptación de §19 se verifican con la misma disciplina que en Fase 1 (comandos ejecutados, evidencia documentada, ningún criterio marcado como cumplido sin verificación).
4. Se inicia en paralelo, no como bloqueo, el registro formal de al menos ADR-001 y ADR-005 como documentos individuales en `docs/adr/` (ADR-005 porque ya está de facto resuelto y solo falta documentarlo; ADR-001 porque es la dependencia más visible pendiente).

---

# FIN DE OPMX ALIGNMENT REVIEW v1.0
