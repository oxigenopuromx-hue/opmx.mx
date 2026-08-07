# OPMX — BLUEPRINT v1.1

**Proyecto:** OPMX — Opinión Pública de México · **Dominio:** OPMX.COM.MX
**Basado en:** OPMX MASTER SPEC v1.0 + observaciones de aprobación conceptual sobre `BLUEPRINT.md`
**Estado:** Ajustes obligatorios incorporados. **Sigue sin autorizarse implementación de producción.**

> `BLUEPRINT.md` (v1.0) se conserva intacto como registro histórico de la primera propuesta. Este documento no lo reemplaza — lo corrige y lo detalla en los 14 puntos observados en la aprobación conceptual. Donde v1.1 no dice lo contrario, el contenido de v1.0 sigue vigente (roadmap de 12 fases, entidades base del modelo de datos, principios de privacidad por capas, etc.).

---

## 0. RESUMEN DE CAMBIOS RESPECTO A v1.0

| # | Observación | Sección de este documento |
|---|---|---|
| 1 | Modular monolith en vez de microservicios desde el día uno | §1, §2 |
| 2 | Fase 1 delimitada con entregables y criterios de aceptación | §3, §13 |
| 3 | Documentar que el demo suma 97%, no 100% | §4, §16 |
| 4 | Identidad/auth unificada portal+API+FIELD | §5 |
| 5 | Modelo electoral corregido (candidaturas, coaliciones, etc.) | §6 |
| 6 | Reevaluar `respondents` persistente | §7 |
| 7 | Modelo de consentimiento ampliado | §8 |
| 8 | Jurisdicción de datos no asumida | §9 |
| 9 | Comparación real de object storage | §10 |
| 10 | Tres escenarios de costos | §11 |
| 11 | Seguridad/privacidad/accesibilidad/pruebas transversales | §12 |
| 12 | Demo Michoacán en `noindex`, fuera de sitemap | §16 |
| 13 | Criterios de aceptación medibles de Fase 1 | §13 |
| 14 | Registro de ADR pendientes | §14 |

---

## 1. ARQUITECTURA: MODULAR MONOLITH

La propuesta v1.0 (Next.js + NestJS + FastAPI + Redis + BullMQ desde la Fase 1) se descarta como punto de partida. Levantar cuatro runtimes y una cola distribuida antes de tener un solo usuario real es sobre-ingeniería que v1.0 debía haber evitado (Sección 84 del Master Spec: *"No sobredimensionar infraestructura inicial sin necesidad"*).

**Punto de partida (Fase 1 en adelante):** una sola aplicación desplegable.

```
opmx-app (modular monolith)
├── módulo: web-público          → SSR/SSG de todo el contenido público
├── módulo: admin                → CMS y panel, mismo runtime, rutas protegidas por RBAC
├── módulo: identity              → usuarios, roles, sesiones, MFA (ver §5)
├── módulo: studies                → estudios, encuestas, resultados, metodología (datos estáticos/CMS en Fase 1)
├── módulo: audit                  → audit_logs, sólo lectura por ahora
└── módulo: shared                 → tipos, validación, diseño (design system)
```

Todos los módulos comparten **un solo proceso, un solo repositorio de código y una sola base de datos** (Postgres). No hay Redis, no hay cola de mensajes, no hay segundo runtime en Python. La separación es **lógica** (carpetas/módulos con límites claros e interfaces internas), no física — precisamente para poder extraer un módulo a servicio propio más adelante sin reescritura completa.

### Qué es indispensable para el MVP

| Componente | ¿Indispensable en Fase 1? | Motivo |
|---|---|---|
| Framework full-stack con SSR/SSG (Next.js) | Sí | Requisito de SEO desde el día uno (Sección 50 del Master Spec) |
| PostgreSQL | Sí | Persistencia de estudios/CMS; PostGIS se **habilita** pero no se usa activamente hasta que haya datos geoespaciales reales (Fase 5+) |
| Object storage básico (imágenes del CMS) | Sí, mínimo | Portadas de análisis, imágenes sociales |
| Redis | **No** | No hay carga que lo justifique en Fase 1 (sin sync de FIELD, sin colas de video) |
| Cola de trabajos (BullMQ/Celery) | **No** | No hay jobs asíncronos reales todavía; la generación de páginas usa ISR/SSG del propio framework |
| Backend separado (NestJS) | **No** | Las rutas de API viven dentro del mismo monolito (route handlers) |
| Servicio estadístico (FastAPI/Python) | **No** | No hay ponderación productiva sobre datos reales en Fase 1 — el estudio demo usa cifras fijas, no un pipeline de cálculo |
| App móvil OPMX FIELD | **No** | Explícitamente fuera de alcance de Fase 1 (ver §3) |

### Condiciones de extracción (cuándo dejar de ser monolito)

Ningún módulo se separa "porque es más limpio". Se separa cuando aparece una señal concreta:

| Servicio a extraer | Se extrae cuando... |
|---|---|
| **Servicio estadístico (Python)** | Exista una necesidad real de ejecutar ponderación (raking/IPF) o diseño muestral sobre datos de campo reales — no antes de Fase 3, y solo si el cálculo es costoso/bloqueante para el proceso web. |
| **Cola + Redis (async jobs)** | Aparezca el primer trabajo asíncrono real que no pueda resolverse con ISR/cron simple: generación de datasets descargables grandes, envío de notificaciones, o sincronización de FIELD. Estimado: Fase 2-4. |
| **Servicio de sincronización FIELD** | OPMX FIELD entre en operación real con encuestadores en campo (Fase 4+) y el volumen de sync/reconciliación offline requiera aislamiento de carga respecto al tráfico público. |
| **Pipeline de video** | Se capture evidencia audiovisual real (Fase 6+), momento en que transcodificación y almacenamiento de video necesitan colas dedicadas y no deben compartir runtime con el sitio público. |
| **Separar admin del sitio público** | El equipo crezca lo suficiente para requerir ciclos de despliegue independientes, o el panel administrativo tenga requisitos de disponibilidad/seguridad distintos al sitio público. No es una condición técnica de Fase 1-3. |

Cada extracción debe justificarse por una señal medible (latencia, acoplamiento de despliegue, carga), no por preferencia arquitectónica, y debe documentarse como ADR (ver §14).

---

## 2. STACK TECNOLÓGICO — MVP PRIMERO

| Capa | Fase 1 (MVP) | Se añade más adelante, cuando... |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript + Tailwind | — |
| API | Route handlers dentro del mismo Next.js app | Se extrae a servicio propio solo bajo las condiciones de §1 |
| Base de datos | PostgreSQL (con extensión PostGIS instalada pero inactiva) | PostGIS se usa activamente cuando haya secciones electorales/puntos de muestreo reales (Fase 5) |
| Cache/queue | Ninguno (ISR + cron simple si hace falta) | Redis + BullMQ cuando exista el primer job asíncrono real (§1) |
| Object storage | Un bucket S3-compatible para imágenes del CMS | Ampliación a evidencia/video cuando existan datos reales (Fase 6), tras comparación formal (§10) |
| Auth | Módulo `identity` propio dentro del monolito (ver §5) | Migración a proveedor externo (Auth0/Clerk) solo si un ADR lo justifica (§14) |
| CI/CD | GitHub Actions: lint, test, build, deploy a staging | Pipelines adicionales (seguridad, carga) se añaden en fases posteriores, no se posponen a Fase 12 (ver §12) |
| Hosting | Un entorno de staging + un entorno de producción mínimos | Multi-AZ, réplicas, CDN avanzado según tráfico real |
| Componentes UI | Radix UI / shadcn | — |
| Mapas | Diferido — Fase 1 no requiere mapas reales (demo Michoacán es un estudio único, no serie geoespacial) | Se activa con GIS real (Fase 5) |

**Decisión explícita:** NestJS, FastAPI, Redis, BullMQ y React Native/Expo **no se instalan ni se configuran en Fase 1**. Se documentan como parte del roadmap, no como setup inicial.

---

## 3. FASE 1 — ALCANCE DELIMITADO

Fase 1 se redefine estrictamente. Incluye **únicamente**:

1. **Configuración inicial del repositorio**: estructura de carpetas del monolito, linting, TypeScript estricto, convenciones de commits, `.env.example` sin secretos reales, README de arranque.
2. **Sistema visual**: tokens de diseño (color, tipografía, espaciado) conforme a Sección 4 del Master Spec, componentes base (botones, tarjetas, tablas, navegación) documentados.
3. **Landing pública**: home con hero, CTAs, secciones (encuestas recientes, tendencias, estados, metodología, auditoría, datos, análisis, sobre OPMX) — con contenido real donde exista (el estudio demo) y estados vacíos honestos donde no exista contenido aún (nunca contenido inventado).
4. **Navegación**: menú principal completo (Sección 6 del Master Spec) y breadcrumbs, aunque varias secciones destino sean páginas mínimas "en construcción" explícitamente etiquetadas como tales.
5. **Páginas institucionales básicas**: `/sobre-opmx/`, `/transparencia/`, `/metodologia/` (hub), `/glosario/` (puede iniciar parcial).
6. **Experiencia demo de Michoacán**: la ficha del estudio demo completa (ver §16), con toda la advertencia de "no es una encuesta vigente" y **en `noindex`**.
7. **SEO técnico básico**: metadata por página, `robots.txt`, `sitemap.xml` (sin incluir la demo), canonical, Open Graph, estructura HTML rastreable (SSR).
8. **Accesibilidad**: WCAG 2.2 AA en lo entregado — navegación por teclado, contraste, labels, alt text, foco visible.
9. **Pruebas**: unitarias de componentes/lógica de presentación, E2E (Playwright) de los flujos de navegación y de la ficha demo, accesibilidad automatizada (axe).
10. **CI**: pipeline en GitHub Actions que corre lint + tests + build en cada PR, bloquea merge si falla.
11. **Staging**: entorno desplegado, accesible solo para el equipo (protegido, ej. Basic Auth o allowlist), sirviendo la rama principal.

### Explícitamente fuera de Fase 1

- OPMX FIELD (app móvil) — ni siquiera el esqueleto del proyecto.
- Captura o almacenamiento de video real.
- Cualquier dato personal real (encuestados, encuestadores, coordenadas reales).
- Sistema estadístico productivo (ponderación/raking sobre datos reales — el demo usa cifras fijas del spec, no un pipeline de cálculo).
- Infraestructura sobredimensionada: sin Redis, sin colas, sin multi-región, sin CDN de video.

---

## 4. NOTA CRÍTICA SOBRE LOS PORCENTAJES DEL DEMO

Verificación aritmética de las cifras del Master Spec (Sección 11):

```
PAN 20 + PRI 10 + Verde 8 + PT 5 + MC 3 + MORENA 40 + PRD 2 + "Michoacán" 6 + No respuesta 3
= 97
```

**Los porcentajes suman 97, no 100.** El material fuente proporcionado no explica la diferencia de 3 puntos (podría deberse a redondeo, una categoría omitida, u otra causa no documentada — no se asume ninguna explicación). Conforme a las reglas del propio Master Spec (Sección 3: *"no inventar cifras faltantes"*, *"no alterar cifras"*), **no se completará ni se ajustará el 3% faltante bajo ninguna circunstancia.**

### Tratamiento en interfaz (obligatorio, no opcional)

- Debajo de la gráfica de resultados del demo, nota visible y permanente (no en tooltip oculto):
  > *"Los porcentajes mostrados suman 97%, no 100%. Esta es una discrepancia presente en los datos fuente originales, que no se ha alterado ni completado. OPMX no modifica cifras para forzar totales redondos."*
- La misma nota se incluye en la ficha técnica del estudio y en el bloque "DATOS CLAVE" machine-readable (Sección 59 del Master Spec), como campo explícito `nota_de_calidad_de_datos`.
- Se incluye también en el JSON-LD (`Dataset`/`Article`) como `description` adicional o `disambiguatingDescription`, para que cualquier sistema que lea la página (buscador, IA) encuentre la aclaración junto con los datos, no solo en la UI visual.
- Esta nota es parte de los criterios de aceptación de Fase 1 (§13): no se considera completa la ficha demo sin ella.

---

## 5. IDENTIDAD, AUTENTICACIÓN Y AUTORIZACIÓN UNIFICADAS

v1.0 dejaba implícito el riesgo de terminar con dos sistemas de identidad (uno para el portal/admin, otro ad-hoc para OPMX FIELD). Se corrige explícitamente: **un solo núcleo de identidad**, consumido por portal, API y FIELD por igual.

### Núcleo `identity` (dentro del monolito en Fase 1; extraíble más adelante solo si un ADR lo justifica)

Entidades:

- `users` — identidad única, independiente del canal de acceso (web o app móvil). Un encuestador de FIELD **es** un `user` con rol `encuestador`, no una entidad separada.
- `roles` / `permissions` — RBAC centralizado: `admin`, `responsable_metodologico`, `supervisor_campo`, `encuestador`, `editor_cms`, `analista`, `consumidor_api`.
- `credentials` — hash de contraseña y/o proveedor externo (si se decide vía ADR), nunca contraseñas en claro.
- `mfa_credentials` — TOTP u otro factor, obligatorio para `admin` y `responsable_metodologico`.
- `devices` — dispositivos registrados por usuario (crítico para FIELD: cada instalación de la app es un `device` vinculado a un `user`, permitiendo revocar un dispositivo específico sin afectar la cuenta completa).
- `sessions` — sesiones web (cookie httpOnly) y tokens móviles (JWT de vida corta + refresh rotativo) modelados con la **misma tabla base** y los mismos metadatos (IP, user agent/device, fecha de emisión, fecha de expiración, estado).
- `revocations` — lista de revocación consultada tanto por el middleware web como por el endpoint de validación de token de FIELD; revocar un usuario invalida simultáneamente sus sesiones web y sus tokens móviles.
- `auth_audit_log` — todo login, MFA challenge, revocación, cambio de rol o de dispositivo, con actor, IP, timestamp — alimenta el Centro de Auditoría general.

### Principio de diseño

> **Un solo lugar decide "quién es este usuario y qué puede hacer"**, sin importar si la petición viene del navegador del portal, de una llamada a `/api/v1/*` o de la app OPMX FIELD. El middleware de autorización de cada canal consulta el mismo núcleo — no hay una tabla de usuarios para el CMS y otra tabla de "encuestadores" desconectada.

Esto no obliga a que FIELD y el portal compartan *sesión* (un login en el portal no autentica la app móvil), pero sí obliga a que ambos se autentiquen contra el mismo `users`/`roles`/`revocations`, de modo que una acción administrativa (desactivar a un encuestador, forzar reautenticación) tenga efecto inmediato en todos los canales.

En Fase 1 esto se implementa de forma mínima (solo hay usuarios `admin`/`editor_cms` para el CMS; no hay encuestadores todavía), pero el esquema de datos se diseña desde ahora para no requerir una migración destructiva cuando se active FIELD en Fase 4.

---

## 6. MODELO ELECTORAL CORREGIDO

v1.0 asumía implícitamente que un `candidate` pertenece de forma permanente a un `party`. Esto es incorrecto en el sistema electoral mexicano: una persona puede cambiar de partido entre elecciones, competir vía coalición, candidatura común, como independiente, o representar a un partido local en un estado y a otro (o ninguno) en otra elección. El modelo se corrige así:

### Entidades

- `persons` — identidad de la persona política, **sin partido asociado de forma permanente**. Atributos biográficos verificables únicamente (Sección 39/46 del Master Spec).
- `parties` — con `scope` (`nacional` | `local`) y `state_id` cuando aplica a partido local; incluye bandera `is_independent_support` para casos de apoyo a independientes cuando la legislación lo permita.
- `coalitions` — coalición formal para una elección específica; agrupa 2+ `parties` mediante `coalition_parties` (N:M).
- `common_candidacies` (candidatura común) — figura legal distinta de la coalición en varias legislaciones estatales mexicanas; se modela como entidad separada, también agrupando `parties` vía `common_candidacy_parties`, para no forzarla dentro del concepto de coalición.
- `elections` — evento electoral concreto (estado, tipo de cargo, año, fecha).
- `candidacies` — **entidad central que resuelve la relación real**: `person_id` + `election_id` + cargo, y exactamente una de estas fuentes de postulación: `party_id` (partido único) **o** `coalition_id` **o** `common_candidacy_id` **o** `is_independent = true`. Esta tabla es la que cambia por elección — nunca se sobrescribe entre elecciones, se acumula históricamente.

### Regla de integridad

Una persona puede tener múltiples filas en `candidacies` a lo largo del tiempo (distintas elecciones, distintos partidos o coaliciones), y el historial se conserva completo — igual que las correcciones de estudios (Sección 28 del Master Spec: nunca sobrescribir silenciosamente). Las páginas de `/personas/[slug]` (Sección 39) muestran la evolución de candidaturas, no una afiliación fija.

Esto también corrige el módulo de "Contienda interna MORENA" (Sección 13 del Master Spec): se modela como una `election` de tipo interno/proceso interno de partido, con `candidacies` propias, sin necesidad de una tabla especial ad-hoc.

---

## 7. REEVALUACIÓN DE `respondents`

v1.0 incluía `respondents` como entidad persistente reutilizable entre estudios, siguiendo el listado mínimo del Master Spec (Sección 32). Se corrige aplicando minimización de datos real:

### Regla por defecto (estudios transversales — la inmensa mayoría)

**No existe una entidad `respondents` persistente ni reutilizable entre estudios.** Los datos demográficos y de respuesta de cada entrevista se almacenan **ligados únicamente a esa entrevista** (`interviews` con sus `answers`), con un identificador generado por entrevista, no por persona. No hay forma de vincular a la misma persona entre dos estudios distintos por diseño — esto elimina el riesgo de crear perfiles longitudinales o reidentificables sin que exista una razón metodológica para ello.

### Excepción: estudios panel (seguimiento de las mismas personas en el tiempo)

Cuando el diseño metodológico de un estudio *requiere* explícitamente medir a las mismas personas en distintas oleadas (panel), se activa una entidad separada y explícitamente gobernada:

- `panel_participants` — identidad pseudónima estable **solo** para estudios marcados como panel, con:
  - referencia al `consent_record` específico que autoriza seguimiento longitudinal (distinto del consentimiento de una entrevista puntual — ver §8),
  - política de retención propia y más estricta,
  - acceso restringido a un rol adicional (`responsable_metodologico` + justificación registrada),
  - fecha de expiración obligatoria del panel (no es indefinido por defecto).

Este mecanismo no se activa para el estudio demo Michoacán (es un corte transversal único) ni para ningún estudio hasta que exista una justificación metodológica documentada y el consentimiento específico correspondiente.

---

## 8. MODELO DE CONSENTIMIENTO AMPLIADO

`consent_records` se rediseña con granularidad completa, reemplazando el campo genérico "consentimiento" de v1.0:

| Campo | Descripción |
|---|---|
| `consent_version` | Identificador de la versión exacta del texto de consentimiento mostrado (los textos se versionan igual que la metodología — Sección 17 del Master Spec) |
| `consent_datetime` | Fecha y hora exactas del otorgamiento |
| `language` | Idioma en el que se presentó y otorgó el consentimiento |
| `consent_survey` | Booleano — consentimiento para participar en la entrevista/cuestionario |
| `consent_audio` | Booleano **independiente** — consentimiento específico para grabación de audio |
| `consent_video` | Booleano **independiente** — consentimiento específico para captura de video |
| `partial_refusal` | Estructura que registra qué se aceptó y qué se rechazó (ej. acepta encuesta, rechaza video) — el rechazo parcial nunca invalida ni oculta el resto |
| `revocation_datetime` / `revocation_method` | Si la persona revoca posteriormente, cuándo y por qué canal |
| `retention_period` | Plazo de conservación aplicable a esa evidencia/registro específico |
| `deletion_scheduled_at` / `deletion_executed_at` | Cuándo debe eliminarse y cuándo se eliminó efectivamente (auditable) |

Reglas de negocio:

- `consent_audio` y `consent_video` son independientes entre sí y de `consent_survey` — aceptar la entrevista no implica aceptar grabación.
- La app OPMX FIELD (cuando exista, Fase 6) **bloquea técnicamente** la captura de audio/video si el campo correspondiente no está en `true` antes de iniciar la captura (ya descrito en v1.0, ahora con el modelo de datos que lo soporta).
- Una revocación posterior dispara el flujo de eliminación (`deletion_scheduled_at`) conforme al plazo que determine la revisión jurídica (§9), no un plazo asumido por el equipo técnico.

---

## 9. JURISDICCIÓN Y RESIDENCIA DE DATOS — NO ASUMIDA

v1.0 sugería veladamente hosting en México sin fundamentarlo. Se corrige: **no se asume ninguna obligación de residencia de datos en territorio mexicano.** Es una decisión pendiente, condicionada a:

1. **Revisión jurídica**: si la LFPDPPP, normativa electoral (INE/OPLE) o algún contrato específico (ej. con un cliente gubernamental) exige residencia en México para cierto tipo de dato.
2. **Revisión contractual**: si algún acuerdo con fuentes de datos (INE, INEGI) impone condiciones de manejo o localización.
3. **Revisión de seguridad**: capacidades reales de cifrado, gestión de llaves y cumplimiento (ISO 27001, SOC 2, etc.) de los proveedores candidatos, que pueden pesar más que la ubicación geográfica per se.

Hasta que estas tres revisiones concluyan, el Blueprint **no elige** proveedor de hosting/storage ni jurisdicción. Se documenta como ADR pendiente (§14). Es razonable anticipar que **distintos tipos de dato podrían tener distintos requisitos** (ej. video con PII bajo reglas más estrictas que datasets públicos agregados) — el diseño de capas por sensibilidad (Sección 22 del Master Spec) ya lo permite sin cambios estructurales.

---

## 10. COMPARACIÓN DE OBJECT STORAGE PARA EVIDENCIA

v1.0 mencionaba "S3 o Cloudflare R2" como si fueran intercambiables. Se corrige con una comparación real sobre los criterios que importan para evidencia audiovisual con PII:

| Criterio | Amazon S3 | Cloudflare R2 | Backblaze B2 | Google Cloud Storage |
|---|---|---|---|---|
| **Residencia** | Regiones específicas seleccionables, incl. posibilidad de mantenerse fuera/dentro de México según la región elegida | Red global de Cloudflare; menor granularidad de selección de región específica que S3/GCS | Regiones limitadas (US/EU) | Regiones específicas seleccionables, incl. `northamerica-south1` (México, Querétaro) |
| **Cifrado** | SSE-S3, SSE-KMS (llave gestionada por AWS o por el cliente) | Cifrado en reposo estándar; gestión de llaves propia más limitada que KMS de AWS/GCP | Cifrado en reposo estándar | Cifrado por defecto + Cloud KMS (llaves gestionadas por el cliente) |
| **Gestión de llaves (BYOK/CMK)** | Sí (KMS) | Limitado | No | Sí (Cloud KMS) |
| **Versionado** | Sí, maduro | Sí | Sí | Sí, maduro |
| **Retención / Object Lock (WORM)** | Sí (Object Lock, útil para evidencia que no debe alterarse) | No nativo equivalente a Object Lock | Sí (Object Lock) | Sí (Bucket Lock) |
| **Eliminación / lifecycle** | Políticas de lifecycle maduras | Políticas de lifecycle disponibles | Políticas de lifecycle disponibles | Políticas de lifecycle maduras |
| **Egress (costo de salida, crítico para video)** | Alto (histórico punto débil de AWS) | **Cero egress** (diferenciador principal de R2) | Egress gratuito hasta cierto múltiplo del almacenamiento, luego bajo costo | Alto, similar a S3 |
| **Auditoría de acceso** | CloudTrail, muy maduro | Logs disponibles, ecosistema de auditoría menos maduro que AWS/GCP | Básico | Cloud Audit Logs, maduro |
| **Costo de almacenamiento de video a escala** | Competitivo, pero el egress dispara el costo total si se sirve video directamente al público | Atractivo específicamente por el egress cero — relevante si se planea distribuir video (no solo archivarlo) | Atractivo para archivo puro (bajo costo de almacenamiento) | Competitivo, mismo problema de egress que S3 |

### Lectura de la comparación (no es una decisión final — insumo para el ADR)

- Si el video se **archiva** como evidencia (acceso interno, poco tráfico de salida) y se requiere **Object Lock/WORM** para garantizar inmutabilidad de evidencia, **S3 o GCS** tienen ventaja por madurez de compliance/retención.
- Si el video llegara a **servirse** con cierta frecuencia (ej. desde el Centro de Auditoría a personal autorizado, o eventualmente clips públicos agregados), el **egress cero de R2** cambia significativamente el costo total.
- **Ningún proveedor domina en todos los criterios.** La elección real depende del patrón de acceso que tenga OPMX FIELD en producción (Fase 6+), que hoy no existe. Por eso queda como ADR pendiente y no como valor por defecto en el stack de Fase 1 (que de hecho no maneja video real).

---

## 11. TRES ESCENARIOS DE COSTOS

Reemplaza la tabla única de v1.0. Estimaciones **orientativas**, no cotizaciones; asumen proveedores tipo AWS/GCP/Cloudflare a precios de lista.

### Escenario A — Prototipo (Fase 1)

Portal público estático/SSR con CMS básico, sin datos personales, sin FIELD, sin video.

| Rubro | Estimado mensual |
|---|---|
| Hosting (staging + producción mínima) | $0–40 USD (tiers gratuitos/iniciales de la mayoría de proveedores SSR) |
| Base de datos Postgres gestionada (instancia pequeña) | $15–30 USD |
| Object storage (imágenes CMS) | < $5 USD |
| CDN/WAF | Tier gratuito |
| Observabilidad básica (Sentry free tier) | $0 |
| Dominio/DNS | ~$1–2 USD |
| **Total aproximado** | **$20–80 USD/mes** |

### Escenario B — MVP operativo (Fase 2-3: CMS completo, dashboards, resultados, sin FIELD ni video)

| Rubro | Estimado mensual |
|---|---|
| Hosting producción + staging separados | $40–150 USD |
| Postgres gestionado (con PostGIS, instancia media, backups automáticos) | $50–150 USD |
| Redis (introducido en esta fase, ver §1) | $15–40 USD |
| Object storage (imágenes, datasets descargables) | $10–30 USD |
| CDN/WAF | $0–20 USD (según tráfico) |
| Observabilidad (errores + métricas básicas) | $0–30 USD |
| Backups (snapshots adicionales, retención extendida) | $10–20 USD |
| **Total aproximado** | **$125–440 USD/mes** |

### Escenario C — Operación estatal con OPMX FIELD y video real (Fase 4-7+)

| Rubro | Estimado mensual |
|---|---|
| Hosting producción (multi-instancia) + staging | $150–400 USD |
| Postgres gestionado con PostGIS activo, réplica de lectura | $150–500 USD |
| Redis + colas (sync FIELD, jobs de video) | $50–150 USD |
| Object storage de evidencia/video (según volumen real de un levantamiento estatal — orden de magnitud de cientos de GB a pocos TB por estudio) | $100–800 USD (altamente dependiente del proveedor elegido, ver §10, y de si el video se sirve o solo se archiva) |
| Transferencia/egress (crítico si se accede a video con frecuencia) | $0–500+ USD (puede ser el rubro más variable; motivo central de la comparación en §10) |
| Transcodificación de video (procesamiento) | $50–300 USD, según volumen |
| CDN/WAF a escala | $30–100 USD |
| Observabilidad completa (logs, métricas, alertas, trazas) | $50–150 USD |
| Backups (base de datos + object storage, con pruebas de restauración) | $50–150 USD |
| Notificaciones push/SMS para FIELD (si aplica) | $10–50 USD |
| **Total aproximado** | **$640–3,100+ USD/mes** |

**Nota:** el escenario C tiene el rango más amplio porque el costo de video (almacenamiento + egress + transcodificación) depende enteramente de decisiones aún no tomadas (§9, §10) y del volumen real de un levantamiento estatal, que no puede estimarse con precisión sin datos de campo. No se incluye costo de equipo humano, licencias de software de gestión ni la revisión jurídica, por estar fuera del alcance técnico de este documento.

---

## 12. SEGURIDAD, PRIVACIDAD, ACCESIBILIDAD Y PRUEBAS COMO REQUISITOS TRANSVERSALES

v1.0 dejaba estos temas concentrados como si "vivieran" principalmente en fases tardías (7, 8, 12, 13 del Master Spec). Se corrige: **son requisitos de todas las fases**, no una fase aparte.

Cada fase del roadmap (1 a 12) debe cumplir, dentro de su propio alcance, como mínimo:

- **Seguridad**: sin secretos en el repositorio, dependencias escaneadas en CI, HTTPS/HSTS desde el primer despliegue, validación de entrada en todo endpoint nuevo, RBAC aplicado desde que existe el primer rol.
- **Privacidad**: ningún dato personal se introduce en una fase sin que su capa de sensibilidad (pública/restringida/personal) y su base legal estén definidas; minimización por defecto (§7); nada de PII en logs.
- **Accesibilidad**: todo componente/página nueva cumple WCAG 2.2 AA antes de mergear, no se acumula deuda de accesibilidad para "arreglar después".
- **Pruebas**: toda funcionalidad nueva incluye pruebas automatizadas correspondientes (unitarias/integración/E2E según el caso) como parte de la misma entrega, no de una fase de QA posterior.

### Fase 12 redefinida

La Fase 12 del Master Spec ("Seguridad + QA + producción") **no es el inicio de la seguridad del proyecto** — sería tarde y contradictorio con "seguro desde el diseño". Se redefine como:

> **Fase 12 — Auditoría final, hardening y preparación para producción**: revisión de seguridad integral (incluyendo pruebas de penetración por terceros), auditoría de cumplimiento de accesibilidad end-to-end, revisión de todos los ADR pendientes ya resueltos, prueba de restauración de backups, simulacro de recuperación ante desastres, y checklist final de salida a producción real (no la primera vez que se piensa en seguridad, sino la validación de cierre de todo lo aplicado de forma transversal desde la Fase 1).

---

## 13. CRITERIOS DE ACEPTACIÓN MEDIBLES — FASE 1

Fase 1 se considera completa solo si se cumplen **todos** los siguientes puntos, verificables objetivamente:

| Criterio | Umbral / verificación |
|---|---|
| **Rutas y páginas entregadas** | Home, menú completo funcional, `/sobre-opmx/`, `/transparencia/`, `/metodologia/`, `/glosario/` (al menos parcial), ficha del estudio demo Michoacán — todas accesibles y sin errores 404/500 |
| **Responsive** | Verificado en al menos 3 breakpoints (móvil ~375px, tablet ~768px, desktop ~1440px), sin overflow horizontal ni elementos rotos |
| **WCAG** | 2.2 AA: 0 errores críticos en escaneo automatizado (axe-core) + verificación manual de navegación por teclado en flujos principales |
| **Lighthouse / Core Web Vitals** | LCP < 2.5s, CLS < 0.1, INP dentro de rango "bueno", Performance score ≥ 90 en páginas SEO críticas (home, ficha demo), medido en staging |
| **Pruebas automatizadas** | Suite unitaria + E2E (Playwright) corriendo en CI, cubriendo navegación, renderizado de la ficha demo y validaciones de accesibilidad; CI en verde en la rama principal |
| **Cero secretos** | Escaneo de secretos (ej. gitleaks o equivalente) sin hallazgos en el repositorio ni en el historial de commits de esta fase |
| **No exposición de datos sensibles** | No existe ningún dato personal real en el sistema en esta fase (verificación manual: base de datos de Fase 1 no contiene PII); confirmado por revisión de esquema |
| **Demo no indexable** | `noindex` verificado en el `<head>` de la página del demo, URL ausente de `sitemap.xml`, verificado con herramienta de inspección de URL antes de cerrar la fase |
| **Documentación** | README de arranque, documento de arquitectura del monolito (módulos y límites), este Blueprint y su historial de versiones, todos presentes en el repositorio |
| **Despliegue de staging** | URL de staging accesible para el equipo, desplegada automáticamente desde CI al hacer merge a la rama principal, con protección de acceso (no público/indexable) |

---

## 14. REGISTRO DE DECISIONES ARQUITECTÓNICAS PENDIENTES (ADR)

Ninguna de estas decisiones se toma en este documento. Se listan como pendientes, con sus opciones en evaluación, para resolverse antes de que la fase correspondiente las necesite.

| ADR | Pregunta a resolver | Opciones en evaluación | Bloquea a partir de |
|---|---|---|---|
| **ADR-001 Hosting** | ¿Dónde se despliega la aplicación (frontend/backend/DB)? | Vercel, Fly.io, Render, AWS/GCP directo, contenedores propios en VPS | Fase 1 (staging), decisión firme antes de producción real |
| **ADR-002 Object storage** | ¿Qué proveedor para evidencia/video? | S3, R2, Backblaze B2, GCS (comparación en §10) | Fase 6 (video real); Fase 1 solo necesita un bucket simple para imágenes, puede resolverse con cualquiera de los mismos candidatos sin comprometer la decisión final |
| **ADR-003 Proveedor de base de datos** | ¿Postgres gestionado por quién? | RDS/Aurora, Cloud SQL, Neon, Supabase, Timescale/Crunchy, autogestionado | Fase 1 |
| **ADR-004 Autenticación** | ¿Núcleo `identity` propio o proveedor externo (Auth0/Clerk/WorkOS)? | Construir in-house (más control, más trabajo) vs. proveedor externo (más rápido, dependencia externa, costo por usuario activo) | Fase 1 (aunque el modelo de datos de §5 es compatible con ambas opciones) |
| **ADR-005 Monorepo** | ¿Herramienta de gestión del monorepo? | Turborepo, Nx, npm/pnpm workspaces simples sin herramienta adicional | Fase 1, antes de que crezca el número de paquetes compartidos |
| **ADR-006 CMS** | ¿CMS headless de terceros o módulo propio dentro del monolito? | Headless (Sanity/Contentful/Payload) vs. CMS propio integrado (más control editorial y de estructura de datos, coherente con el modelo de estudios/metodología) | Fase 2 |
| **ADR-007 Mapas** | ¿Proveedor de tiles/mapas base? | MapLibre + tiles propios, Mapbox, proveedor gestionado de tiles | Fase 5 (GIS real) — no bloquea Fase 1 |
| **ADR-008 Infraestructura como código** | ¿Con qué se define/versiona la infraestructura? | Terraform, Pulumi, configuración manual documentada (aceptable temporalmente en Fase 1 dado el tamaño mínimo de infra) | Fase 2-3, antes de que la infraestructura crezca lo suficiente para justificar el costo de mantenerla como código |

Cada ADR debe resolverse con un documento corto (contexto, opciones, decisión, consecuencias) antes de la fase que lo bloquea, y no antes si no es necesario — evita decisiones prematuras sobre información que aún no existe.

---

## 15. QUÉ SE MANTIENE SIN CAMBIOS DE v1.0

Para no repetir contenido, lo siguiente del `BLUEPRINT.md` original sigue vigente sin modificación:

- Auditoría del entorno (repositorio vacío al inicio).
- Estructura general de separación por dominio (frontend/backend/data/field/audit/admin/public data/SEO) como *concepto*, aunque su implementación en Fase 1 sea un monolito modular (§1).
- Principios de privacidad por capas (pública/restringida/personal).
- Arquitectura de GIS, SEO, AI Search y sitemap del sitio (secciones 12, 14–16 de v1.0), sin cambios de fondo.
- Roadmap de 12 fases como marco general (con Fase 1 y Fase 12 ahora delimitadas con precisión en este documento, §3 y §12).
- Plan de pruebas general (ahora aplicado de forma transversal, §12).

---

## 16. DEMO MICHOACÁN — TRATAMIENTO DEFINITIVO

Reglas obligatorias, verificables en los criterios de aceptación de Fase 1 (§13):

- Meta robots `noindex, nofollow` (o `noindex, follow` si se decide permitir el rastreo de enlaces salientes sin indexar la página — a definir en implementación, pero `noindex` es innegociable).
- **Excluida de `sitemap.xml`** y de cualquier sitemap segmentado.
- Etiqueta visual permanente y prominente: **"ESTUDIO DEMO / LEVANTAMIENTO DEL 04 AL 10 DE JUNIO DE 2026"**, visible antes de cualquier resultado.
- Texto explícito indicando que se trata de una **demostración de interfaz** con datos históricos proporcionados como material de referencia, **no un estudio realizado por OPMX bajo su propia operación de campo**, y no una encuesta vigente.
- Advertencia de la suma de porcentajes (§4) en el mismo bloque.
- Sin botón/mecanismo de "compartir como encuesta actual"; si existe función de compartir, el texto de vista previa social debe incluir la etiqueta de demo, no solo el título del estudio.
- No se referencia desde la home ni desde hubs SEO (`/encuestas/`, `/encuestas-electorales/`) como si fuera contenido editorial regular — puede enlazarse desde una sección claramente marcada como "demostración" si el diseño lo requiere, nunca mezclada con estudios reales futuros.

---

# DETENTE Y ESPERA AUTORIZACIÓN

Este documento incorpora las 14 observaciones obligatorias sobre `BLUEPRINT.md`. **No se ha escrito código de producción ni se ha iniciado la Fase 1.**

Antes de autorizar el inicio de Fase 1, quedan pendientes de tu decisión:

1. Confirmar el alcance de Fase 1 tal como quedó delimitado en §3, o ajustarlo.
2. Resolver, aunque sea de forma preliminar, ADR-001 (hosting), ADR-003 (base de datos) y ADR-004 (autenticación) — son las que bloquean el arranque técnico de Fase 1 según §14.
3. Confirmar que la experiencia demo de Michoacán puede publicarse en staging bajo las condiciones de §16.
4. Autorización explícita para comenzar la implementación de Fase 1.

Quedo a la espera de autorización.
