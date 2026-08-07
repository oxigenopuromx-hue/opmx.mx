# OPMX — AUDIT + BLUEPRINT

**Proyecto:** OPMX — Opinión Pública de México · **Dominio:** OPMX.COM.MX
**Basado en:** OPMX MASTER SPEC v1.0 (6 de agosto de 2026)
**Estado:** Entrega inicial obligatoria (Sección 8, 9 y 93 del spec). **No se ha implementado la plataforma.**

> Este documento cumple la "PRIMERA ORDEN A CLAUDE CODE" (Sección 93): inspeccionar el entorno y entregar arquitectura, stack, modelo de datos, API, seguridad, privacidad, OPMX FIELD, GIS, video, auditoría, SEO, AI Search, UX/UI, infraestructura, roadmap, riesgos, dependencias, costos estimados y plan de pruebas. **Al final: DETENTE Y ESPERA AUTORIZACIÓN.**

---

## 0. AUDITORÍA DEL ENTORNO ACTUAL

Inspección del repositorio `oxigenopuromx-hue/opmx.mx`:

- Contenido: un único archivo `README` con el texto `Hola, mundo`. Sin código fuente, sin `package.json`/`requirements.txt`/manifiestos, sin infraestructura como código, sin CI/CD configurado.
- Historial: un solo commit (`Create README`), rama `main`, sin releases ni tags.
- **Conclusión:** proyecto *greenfield*. No existen dependencias que preservar ni funcionalidades que puedan romperse. El stack propuesto abajo no está condicionado por infraestructura preexistente — es una recomendación desde cero, evaluada contra los requisitos del spec (SEO, GIS, video, app móvil offline-first, auditoría, escalabilidad).
- No se detectaron riesgos de compatibilidad hacia atrás. No se detectaron secretos, credenciales ni datos sensibles en el repo.

---

## 1. ARQUITECTURA GENERAL

Arquitectura de servicios separados por dominio, coherente con la Sección 7 del spec:

```
                         ┌─────────────────────┐
                         │   CDN / Edge (WAF,   │
                         │   rate limiting)     │
                         └──────────┬───────────┘
                                    │
        ┌───────────────────────────┴───────────────────────────┐
        │                                                        │
┌───────▼────────┐                                     ┌─────────▼────────┐
│  FRONTEND       │  SSR/SSG, contenido público,        │  ADMIN            │
│  (portal        │  SEO-critical, hubs temáticos       │  (panel interno:   │
│  público)       │                                     │  CMS, supervisión, │
└───────┬────────┘                                      │  auditoría)        │
        │                                               └─────────┬────────┘
        │              ┌──────────────────────┐                   │
        └──────────────►      BACKEND / API     ◄──────────────────┘
                       │  (/api/v1, lógica de   │
                       │  negocio, auth, RBAC)  │
                       └──────┬───────┬─────────┘
                              │       │
                 ┌────────────┘       └────────────┐
        ┌────────▼────────┐               ┌────────▼─────────┐
        │  DATA            │               │  SERVICIO         │
        │  Postgres+PostGIS│               │  ESTADÍSTICO       │
        │  (estudios,      │◄──────────────┤  (ponderación,     │
        │  resultados)     │               │  IPF/Raking,       │
        └────────┬─────────┘               │  antifraude/score) │
                 │                          └────────────────────┘
        ┌────────▼─────────┐      ┌───────────────────┐
        │  OBJECT STORAGE   │      │  AUDIT / LOGGING    │
        │  (evidencia, video,│      │  (audit_logs,       │
        │  cifrado en reposo)│      │  audit trail,       │
        └────────▲──────────┘      │  append-only)       │
                 │                 └───────────────────┘
        ┌────────┴─────────┐
        │  OPMX FIELD (app  │
        │  móvil offline-   │
        │  first + sync)    │
        └───────────────────┘

        ┌───────────────────────────┐
        │  PUBLIC DATA / SEO-DISCOVERY │  → datasets anonimizados, sitemaps,
        │  (capa de solo lectura,       │    JSON-LD, feeds, API pública
        │  agregada, sin PII)            │
        └───────────────────────────┘
```

Principios de diseño:

- **Separación de datos por sensibilidad** (públicos / restringidos / personales — Sección 22) implementada como *capas de acceso*, no solo como convención: distintos roles de base de datos y distintos servicios exponen cada capa.
- **La capa "PUBLIC DATA / SEO-DISCOVERY" nunca consulta directamente tablas con PII** — se alimenta de vistas materializadas/agregadas.
- **El servicio estadístico (ponderación, antifraude) es un componente separable**, no acoplado al backend web, porque su carga de trabajo y su lenguaje natural (procesamiento numérico) difieren del resto.
- **OPMX FIELD nunca escribe directamente a la base de datos principal**: sincroniza contra el API con validación, colas y control de idempotencia (evita duplicar entrevistas al reintentar sync).

---

## 2. STACK TECNOLÓGICO RECOMENDADO

Sin restricciones heredadas (repo vacío), la propuesta se basa en los requisitos del spec: SEO/SSR crítico, GIS, procesamiento estadístico, video con integridad criptográfica, app móvil offline-first, y escalabilidad progresiva sin sobredimensionar.

| Capa | Propuesta | Justificación |
|---|---|---|
| **Frontend** | Next.js (App Router) + TypeScript + Tailwind CSS | SSR/SSG/ISR nativo → cumple Sección 50 (HTML rastreable sin depender de JS). Ecosistema maduro para Core Web Vitals. |
| **Componentes UI** | Radix UI / shadcn (headless, accesible) | Base sólida para WCAG 2.2 AA (Sección 73) sin reinventar primitivos de accesibilidad. |
| **Gráficas** | Observable Plot / Recharts (2D, sin 3D) | Cumple Sección 27 (evitar 3D y distorsión). |
| **Mapas** | MapLibre GL + PostGIS + vector tiles propios | Evita dependencia de proveedores propietarios y sus términos de marca; control total sobre qué se agrega/anonimiza antes de renderizar. |
| **Backend / API** | Node.js + NestJS (o Next.js Route Handlers para lo simple) | TypeScript compartido con el frontend; NestJS aporta estructura para RBAC, módulos por dominio (studies, field, audit). |
| **Servicio estadístico** | Python (FastAPI) + pandas/numpy/scipy | IPF/Raking, diseño muestral y detección de anomalías son tareas naturalmente estadísticas; Python tiene el ecosistema maduro (no reinventar en JS). |
| **Base de datos** | PostgreSQL + extensión PostGIS | Soporta GIS nativo, Row-Level Security para separar capas públicas/restringidas/personales, JSONB para metadatos de metodología versionados. |
| **Cache** | Redis | Cache de resultados agregados, rate limiting, colas ligeras. |
| **Colas / procesamiento asíncrono** | BullMQ (Node) para orquestación; jobs pesados delegados al servicio Python | Sincronización de FIELD, procesamiento de video, cálculo de ponderaciones, generación de datasets. |
| **Almacenamiento de objetos** | S3-compatible (AWS S3 o Cloudflare R2) con cifrado en reposo (SSE) | Evidencia audiovisual, PDFs, datasets exportados. Acceso vía URLs firmadas de corta duración. |
| **App móvil OPMX FIELD** | React Native (Expo) + SQLite local (offline-first) | Multiplataforma iOS/Android, funciona con conectividad intermitente (Sección 19), un solo código base. |
| **Autenticación** | Auth.js/NextAuth (admin/portal) + TOTP para MFA; OAuth2/JWT de vida corta + refresh rotativo para OPMX FIELD | RBAC por rol (Sección 8/72). |
| **CDN / Edge** | Cloudflare (CDN, WAF, rate limiting, bot management) | Cumple Sección 84 sin sobredimensionar desde el día uno. |
| **Hosting** | Frontend en plataforma con SSR/ISR gestionado (ej. Vercel) o contenedores propios (ej. Fly.io/Render/K8s) — **decisión pendiente de revisión legal sobre residencia de datos en México** | Ver Sección 21 (Riesgos legales). No se asume jurisdicción de hosting hasta validación. |
| **Observabilidad** | Sentry (errores) + OpenTelemetry → Grafana/Prometheus o proveedor gestionado | Sección 85, sin exponer PII en logs. |
| **CI/CD** | GitHub Actions | Tests, lint, escaneo de seguridad (dependabot/CodeQL), despliegue por ambiente. |

**Nota:** este stack es una recomendación inicial, no una decisión cerrada. Cambios de fondo (ej. sustituir NestJS, cambiar de proveedor de hosting) deben re-evaluarse cuando se conozcan restricciones de presupuesto, equipo y hosting en México.

---

## 3. ESTRUCTURA DE CARPETAS PROPUESTA

```
opmx.mx/
├── apps/
│   ├── web/                 # Next.js — portal público + admin (rutas protegidas)
│   ├── api/                 # NestJS — API de negocio, auth, RBAC
│   ├── stats-service/       # FastAPI — ponderación, muestreo, antifraude
│   └── field/                # React Native (Expo) — OPMX FIELD
├── packages/
│   ├── ui/                  # Design system compartido (tokens, componentes)
│   ├── types/                # Tipos/esquemas compartidos (Zod/TS + OpenAPI)
│   └── config/                # ESLint/TS/Tailwind config compartida
├── infra/
│   ├── migrations/           # Migraciones SQL (Postgres+PostGIS)
│   ├── terraform|pulumi/     # IaC (a definir en Fase 1)
│   └── ci/                   # Workflows de GitHub Actions
├── docs/
│   ├── methodology/           # Fuente de metodología publicada como contenido
│   └── api/                   # OpenAPI spec
└── BLUEPRINT.md               # Este documento
```

Esto es una propuesta de referencia; se ajustará en el Blueprint técnico detallado de Fase 1 si el equipo humano define otras convenciones (ej. monorepo con Turborepo/Nx vs. repos separados).

---

## 4. MODELO DE DATOS Y RELACIONES

Entidades mínimas (Sección 32), normalizadas, **sin usar PII como identificador** (Sección 33 — IDs estilo `OPMX-2026-MICH-000001`).

### Núcleo de estudios
- `organizations` → `users` (N:M vía `roles`) — quién publica/opera.
- `studies` (1) → `surveys` (N) → `questions` (N) → `answers` (N)
- `studies` → `methodology_versions` (N, versionado inmutable)
- `studies` → `weighting_models` (N, versionado con responsable/fecha/parámetros)
- `studies` → `results` (N, agregados publicables)
- `studies` → `revisions` (N) — correcciones con versión anterior/actual/motivo (Sección 28/48)
- `studies` → `publications` (N) — control editorial/CMS

### Muestreo y campo
- `studies` → `electoral_sections` (N:M, secciones seleccionadas con PPT)
- `electoral_sections` → `sampling_points` (N)
- `sampling_points` → `field_assignments` (N) → `interviewers`
- `field_assignments` → `interviews` (N)
- `interviews` → `respondents` (1:1, ID anonimizado, sin PII directa)
- `interviews` → `locations` (1:1, restringido — lat/lon/precisión/timestamp)
- `interviews` → `evidence_files` (N) → `videos`, `consent_records`
- `interviews` → `validation_events` (N), `anomalies` (N), field quality score

### Entidades electorales/editoriales
- `elections` → `states` (N:1) → `candidates` (N:M vía elección) → `parties` (N:1)
- `candidates`/`parties` referenciados desde `results` y `answers`

### Auditoría
- `audit_logs` — append-only, referencia genérica (entidad + acción + actor + timestamp + diff), nunca editable ni borrable desde la aplicación.

### Reglas de modelado
- Toda entidad con datos personales potenciales (`respondents`, `interviewers`, `locations`, `videos`) vive en el esquema **restringido**, con Row-Level Security y sin exposición directa vía API pública.
- Las vistas públicas (`results`, `studies`, `methodology_versions`, datasets) son generadas/materializadas a partir de datos agregados — nunca joins directos a tablas restringidas desde endpoints públicos.
- `interviews.respondent_id` y `interviews.interviewer_id` son claves foráneas a identificadores internos, no a nombres/teléfonos.

*(El diagrama entidad-relación completo con tipos de columna, índices y políticas RLS se entrega como parte del blueprint técnico detallado de Fase 1/2, una vez autorizada la implementación — hacerlo ahora sin autorización excedería el alcance de esta primera entrega.)*

---

## 5. API

Base: `/api/v1/` — versionado desde el día uno, documentado con **OpenAPI 3**.

Recursos conceptuales (Sección 31): `/studies`, `/surveys`, `/results`, `/elections`, `/states`, `/candidates`, `/parties`, `/methodology`, `/audit`, `/field`.

Diseño:
- **Público** (solo lectura, datos agregados/anonimizados): `/studies`, `/results`, `/elections`, `/states`, `/candidates`, `/parties`, `/methodology`. Rate-limited, cacheable, sin autenticación para lectura de datos publicados.
- **Restringido** (autenticado, RBAC): `/field/*`, `/audit/*`, escritura en cualquier recurso, acceso a evidencia y georreferenciación.
- **Sincronización FIELD**: endpoints idempotentes (`interview_id` generado en el dispositivo como UUID + hash) para evitar duplicados en reconexión; subida de evidencia vía URLs firmadas para no saturar el API con binarios.
- Todos los endpoints de escritura pasan por validación de esquema (Zod/class-validator) y quedan registrados en `audit_logs`.

---

## 6. ARQUITECTURA OPMX FIELD

App móvil offline-first (React Native/Expo):

1. **Auth**: login con MFA opcional, sesión de encuestador con alcance limitado (solo sus asignaciones).
2. **Asignación**: descarga de estudio → sección → punto de arranque asignados por el supervisor.
3. **Cuestionario**: renderizado dinámico desde definición versionada del estudio (evita reinstalar la app por cada cuestionario nuevo).
4. **Captura de entrevista**: registra fecha/hora/duración, ubicación (lat/lon/precisión GPS), device ID, versión de app, estado de conectividad.
5. **Evidencia**: captura opcional de audio/video/foto **solo si el protocolo del estudio lo requiere y existe consentimiento explícito registrado antes de capturar** — el flujo de consentimiento bloquea la captura si no se otorga.
6. **Almacenamiento local**: SQLite cifrado en el dispositivo; cola de sincronización persistente.
7. **Sincronización**: al recuperar conectividad, sube en batch con reintentos exponenciales, verificación de integridad (hash) y confirmación server-side antes de purgar del dispositivo.
8. **Validación**: reglas básicas en el dispositivo (completitud, rangos) + validación server-side al recibir.

Este documento describe la arquitectura conceptual; no se ha generado código de la app en esta entrega.

---

## 7. AUTENTICACIÓN Y RBAC

Roles mínimos: `admin`, `responsable_metodológico`, `supervisor_campo`, `encuestador`, `editor_cms`, `analista`, `consumidor_api` (público autenticado para tiers superiores), `lector_público` (sin cuenta).

- MFA obligatorio (TOTP) para `admin` y `responsable_metodológico` (Sección 72).
- Sesiones de panel: cookies httpOnly + CSRF protection.
- OPMX FIELD: JWT de vida corta + refresh token rotativo, revocable por dispositivo.
- Todo acceso a datos restringidos (video, coordenadas exactas, PII) exige rol explícito — nunca "admin implícito por estar autenticado".

---

## 8. CENTRO DE AUDITORÍA

- `audit_logs` append-only: quién, qué, cuándo, diff antes/después, para toda modificación relevante en estudios, ponderaciones, resultados y correcciones.
- Vistas del Centro de Auditoría (Sección 23): diseño muestral, secciones seleccionadas, puntos de levantamiento, entrevistas realizadas, distribución temporal/geográfica agregada, validaciones, anuladas, controles de calidad, integridad de archivos (hash), ponderación, versiones.
- **Nunca sobrescribir un estudio histórico**: toda corrección crea una nueva versión enlazada a la anterior (Sección 28/48), visible públicamente cuando afecta datos publicados.

---

## 9. SEGURIDAD

- HTTPS obligatorio (HSTS), TLS moderno.
- Gestión de secretos vía secret manager del proveedor de hosting/cloud (nunca en código ni en `.env` versionado).
- RBAC + MFA para roles administrativos.
- Rate limiting en API pública y en login (mitigar fuerza bruta y scraping abusivo).
- Validación estricta de archivos subidos (tipo MIME real, tamaño, escaneo) antes de aceptarlos como evidencia.
- Logs de seguridad separados de logs de auditoría de negocio, sin PII en texto plano.
- Dependencias con escaneo automático (Dependabot/CodeQL) en CI.
- Backups cifrados con pruebas de restauración periódicas (ver Sección 24 del blueprint).

---

## 10. PRIVACIDAD

**Privacy by Design**, tres capas (Sección 22):

| Capa | Contenido | Acceso |
|---|---|---|
| **Pública** | Resultados agregados, metodología, ficha técnica, muestra, fechas | Sin autenticación |
| **Restringida** | Video, coordenadas exactas, identificadores internos, logs, info de encuestadores | RBAC estricto, solo roles operativos/auditoría |
| **Personal** | Cualquier dato que pudiera identificar a un respondiente o encuestador | Minimización, acceso controlado, retención y eliminación definidas |

Reglas duras (no negociables, del propio spec):
- Nunca publicar coordenadas exactas de domicilios/participantes — solo agregación por sección o mayor.
- Nunca usar PII como identificador de entidad.
- Consentimiento explícito y registrado antes de cualquier captura audiovisual.

**Esto NO es asesoría legal.** El cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y normativa electoral aplicable (INE/OPLES) **requiere revisión jurídica especializada antes de producción** — no se asume ni se declara cumplimiento en este documento (cumpliendo Sección 22: "No inventar cumplimiento legal").

---

## 11. ALMACENAMIENTO AUDIOVISUAL

- Object storage cifrado en reposo, con URLs firmadas de acceso temporal (nunca URLs públicas permanentes a video).
- Cada archivo de evidencia se asocia a: ID único de entrevista, estudio, encuestador, timestamp, ubicación técnica, duración, **hash SHA-256**, estado de validación, registro de consentimiento, versión del protocolo.
- El hash certifica integridad del archivo (no fue alterado post-captura); **no constituye por sí solo prueba de validez estadística de la entrevista** (aclaración explícita del spec, Sección 21).
- Política de retención y eliminación a definir junto con la revisión jurídica (Sección 10 de este documento).

---

## 12. GIS

- PostGIS como motor geoespacial.
- Marco muestral documentable por fuente (Catálogo de Información Geoelectoral del INE, Lista Nominal, catálogo de manzanas, planos cartográficos por sección, información censal INEGI) — **sin afirmar que un estudio real ya usa una fuente concreta hasta que esté metodológicamente definida y documentada** (Sección 14).
- Selección de secciones con probabilidad proporcional al tamaño (primera etapa), puntos de arranque aleatorios (segunda), viviendas sistemáticas (tercera), entrevistado aleatorio en hogar (cuarta) — cada etapa almacenada como metadato del diseño muestral.
- Mapas públicos: agregación mínima por sección electoral o superior; nunca puntos individuales de entrevista.
- Renderizado con MapLibre GL + tiles vectoriales propios generados desde PostGIS.

---

## 13. UX / UI

- Sistema de diseño: minimalista, premium, editorial, tecnológico (Sección 4). Paleta base negro/blanco/grises; color solo con función informativa (gráficas, mapas, estados, alertas) — nunca como identidad partidista.
- Tipografía moderna, mucho espacio en blanco, animaciones suaves y funcionales (no decorativas).
- Componentes base: Radix UI/shadcn por accesibilidad nativa (foco, teclado, ARIA).
- Mobile-first en portal público; dashboards internos optimizados para desktop/tablet (Sección 74).
- Cada gráfica indica fuente, fecha, muestra y metodología cuando corresponda (Sección 27).

---

## 14. MAPA COMPLETO DEL SITIO

```
/                                   Home
/encuestas/[slug]                   Ficha de estudio (URL canónica permanente)
/encuestas/                         Hub de encuestas
/encuestas-electorales/             Hub SEO
/opinion-publica/                   Hub SEO / página pilar
/elecciones/  → /elecciones-mexico/ Hub + página pilar
/estados/[estado]/                  Página estatal (solo con contenido real)
/personas/[slug]                    Ficha de persona/candidato
/partidos/[slug]                    Ficha de partido
/metodologia/                       Hub + subpáginas:
    /metodologia/muestreo-probabilistico
    /metodologia/muestreo-polietapico
    /metodologia/ponderacion
    /metodologia/raking
    /metodologia/margen-de-error
    /metodologia/efecto-de-diseno
/auditoria/                         Centro de auditoría (vista pública)
/archivo/                           Archivo histórico (año/estado/elección/partido/candidato/tema)
/analisis/                          Hub de análisis editorial
/tendencias/[slug]                  Series históricas por tema/elección
/datos/                             Dashboard público "DATOS OPMX"
/datos-abiertos/ (OPMX Open Data)   Datasets descargables (CSV/JSON/Parquet)
/poll-tracker/ (OPMX Poll Tracker)  Comparador de encuestas
/glosario/                          Definiciones metodológicas
/transparencia/                     Responsables, financiamiento, conflictos de interés
/correcciones/                      Política y registro de correcciones
/autores/[slug]                     Ficha de autor/responsable
/prensa/                            Portal para prensa
/academia/                          Portal académico
/sobre-opmx/                        Quiénes somos
/api/v1/ (+ /api/docs)              API pública documentada
sitemap.xml (+ sitemaps segmentados)
robots.txt
```

Regla explícita del spec: **no generar páginas estatales/de persona vacías ni en masa** — solo cuando exista contenido real.

---

## 15. SEO

- Arquitectura SSR/SSG híbrida (Sección 50): contenido crítico en HTML servido, no dependiente de hidratación JS.
- Metadata única por página (title, description, canonical, Open Graph, idioma, autor, fecha).
- Datos estructurados JSON-LD solo cuando corresponden al contenido visible: `Organization`, `WebSite`, `Article`, `Dataset`, `Person`, `BreadcrumbList`, `VideoObject`, `ImageObject`, `DataCatalog`.
- Breadcrumbs visibles y estructurados en toda página profunda.
- `sitemap.xml` + sitemaps segmentados (`sitemap-encuestas.xml`, `-estados.xml`, `-personas.xml`, `-partidos.xml`, `-analisis.xml`, `-datos.xml`), excluyendo URLs no indexables.
- `robots.txt`: permite contenido público, bloquea panel/admin/APIs privadas/dashboards internos — a revisar antes de producción para no bloquear contenido público por error.
- Objetivo Core Web Vitals: LCP < 2.5s, buen INP, CLS mínimo, imágenes optimizadas, JS mínimo, CDN.

---

## 16. AI SEARCH / DESCUBRIMIENTO POR IA

- Cada estudio con **una única URL canónica permanente** (Sección 58) — todo material (PDFs, redes, datasets) enlaza hacia ella, nunca la reemplaza como fuente.
- Bloque "DATOS CLAVE" machine-readable en HTML (Sección 59): estudio, cobertura, población, muestra, método, levantamiento, confianza, margen, diseño, ponderación.
- Función "Citar este estudio": cita corta, cita académica, URL permanente, fecha de consulta.
- Evaluar `llms.txt`, feeds RSS, JSON-LD y documentación de API como mecanismos de descubrimiento — **sin tratarlos como garantía de posicionamiento o citación** (Sección 57/64, prohibición explícita de técnicas para manipular modelos).
- No bloquear crawlers legítimos de IA por defecto; decisión revisable caso por caso.

---

## 17. INFRAESTRUCTURA, ESCALABILIDAD, BACKUPS Y DR

**Infraestructura inicial (Fase 1-3, sin sobredimensionar):**
- CDN/edge (Cloudflare), hosting frontend con SSR/ISR, base de datos gestionada Postgres+PostGIS con réplica de lectura cuando el tráfico lo justifique, Redis gestionado, object storage con lifecycle policies.

**Escalabilidad:**
- Separación de servicios (web / API / stats-service / field-sync) permite escalar horizontalmente cada uno según su cuello de botella real (ej. picos de sincronización de campo vs. picos de tráfico de lectura pública).
- Cache agresivo en capa pública (resultados publicados cambian con poca frecuencia).
- Procesamiento pesado (ponderación, generación de datasets, transcodificación de video) en colas asíncronas, nunca bloqueando request/response.

**Backups:**
- Frecuencia: diaria (mínimo) para base de datos, con point-in-time recovery si el proveedor lo soporta.
- Retención: a definir con el equipo (propuesta inicial: 30 días rolling + snapshots mensuales de mayor retención).
- Cifrado en reposo y en tránsito.
- **Pruebas de restauración periódicas obligatorias** — un backup no probado no es un backup confiable.

**Recuperación ante desastres:**
- RPO/RTO a definir formalmente en Fase 1 según SLA que el proyecto necesite.
- Multi-AZ para base de datos cuando el presupuesto lo permita; documentar procedimiento de failover.

---

## 18. ROADMAP (12 fases, Sección 80)

| Fase | Contenido |
|---|---|
| 1 | Blueprint + arquitectura + sistema visual + landing |
| 2 | CMS + encuestas + resultados + metodología |
| 3 | Base de datos + dashboards + visualización |
| 4 | OPMX FIELD |
| 5 | GPS + supervisión |
| 6 | Video + consentimiento + integridad |
| 7 | Auditoría + antifraude |
| 8 | SEO + Search Console + rendimiento |
| 9 | AI Search + datasets + citabilidad |
| 10 | API + Open Data |
| 11 | Poll Tracker |
| 12 | Seguridad + QA + producción |

No se salta ninguna fase crítica sin justificación explícita y autorización.

---

## 19. RIESGOS

### Riesgos técnicos
- Sincronización offline-first de FIELD con conectividad intermitente: riesgo de duplicados/pérdida de datos si el protocolo de idempotencia falla — mitigar con UUIDs generados en dispositivo + confirmación server-side antes de purgar localmente.
- Procesamiento de video a escala (transcodificación, storage) puede crecer en costo rápido si no hay límites de retención/compresión definidos.
- Dependencia de fuentes externas (INE/INEGI) para marco muestral: cambios de formato o disponibilidad pueden romper pipelines de importación.

### Riesgos metodológicos
- La cifra de margen de error (±3.23 pts, 95% confianza, deff 1.3) es específica del estudio demo Michoacán y **no debe generalizarse** a otros estudios — cada estimación requiere su propio cálculo.
- El "Field Quality Score" antifraude debe usarse para priorizar revisión humana, **nunca como acusación automática** — riesgo reputacional/legal si se usa incorrectamente.
- Ponderación (raking/IPF) mal documentada rompe la trazabilidad que es el eje central de la marca ("la confianza se demuestra").

### Riesgos legales / privacidad que requieren revisión profesional
- Cumplimiento LFPDPPP y normativa electoral aplicable a georreferenciación, video y datos personales de encuestados/encuestadores — **requiere abogado especializado antes de producción**, no se asume cumplimiento en este documento.
- Consentimiento informado para evidencia audiovisual: el flujo técnico existe, pero su validez legal depende de redacción jurídica del texto de consentimiento y del protocolo por estudio.
- Residencia/jurisdicción de los datos (hosting dentro o fuera de México) puede tener implicaciones regulatorias — pendiente de definir con asesoría legal antes de elegir proveedor final de hosting/storage.
- Uso de datos de terceros en el Poll Tracker: requiere validar licencias/derechos antes de republicar cualquier resultado ajeno.

---

## 20. DEPENDENCIAS

- Fuentes de datos externas: Catálogo de Información Geoelectoral del INE, Lista Nominal, catálogo de manzanas, INEGI (censal) — acceso, formato y actualización deben confirmarse.
- Proveedores de infraestructura: hosting (frontend/backend), object storage, CDN, base de datos gestionada — a seleccionar en Fase 1 considerando el punto legal de residencia de datos.
- Servicios de terceros: Google Search Console, GA4, proveedor de mapas base (tiles), proveedor de MFA/TOTP si no se implementa in-house.
- App móvil: cuentas de desarrollador Apple/Google para publicación de OPMX FIELD.
- Revisión jurídica externa (no es una dependencia técnica, pero bloquea producción según Sección 22/87).

---

## 21. COSTOS / INFRAESTRUCTURA ESTIMADA

Estimación **orientativa**, en rangos, sujeta a validación real con proveedores una vez definido el stack final y el volumen esperado (no se presenta como cotización):

| Componente | Estimado MVP (Fase 1-3) | Estimado con FIELD + video activos |
|---|---|---|
| Hosting frontend (SSR) | Bajo (~$0-50 USD/mes en tiers gratuitos/iniciales) | Medio, según tráfico |
| Base de datos gestionada (Postgres+PostGIS) | ~$20-100 USD/mes | ~$100-400 USD/mes con réplicas |
| Object storage (video/evidencia) | Mínimo al inicio | Variable — **el costo dominante** una vez que FIELD capture video a escala; depende directamente de retención definida |
| CDN/WAF | Tier gratuito/bajo costo inicial | Escala con tráfico |
| Observabilidad (Sentry, etc.) | Tier gratuito/bajo | Bajo-medio |
| Cuentas de desarrollador móvil | ~$99 USD/año (Apple) + ~$25 USD único (Google) | Igual |

**No se estima costo de equipo humano ni de la revisión jurídica**, por estar fuera del alcance técnico de este documento.

---

## 22. PLAN DE PRUEBAS

- **Unitarias**: lógica de negocio (cálculo de ponderación, validación de cuestionarios, reglas de anonimización) — cobertura obligatoria en servicio estadístico y en reglas de RBAC.
- **Integración**: API contra base de datos real (entorno de test), incluyendo políticas RLS (verificar que un rol sin permiso efectivamente no puede leer datos restringidos).
- **E2E**: flujos críticos del portal (Playwright) — publicación de estudio, filtros del dashboard público, descarga de dataset.
- **Accesibilidad**: auditoría automatizada (axe-core) + verificación manual de navegación por teclado y lector de pantalla, objetivo WCAG 2.2 AA.
- **Rendimiento**: Lighthouse/Core Web Vitals en CI para páginas SEO críticas; pruebas de carga (k6) sobre API pública antes de eventos de alto tráfico (ej. publicación de encuesta electoral).
- **Seguridad**: escaneo de dependencias en CI, revisión de headers de seguridad, prueba de rate limiting, validación de que no haya PII expuesta en endpoints públicos ni en logs.
- **Metodológico**: QA de datos — validar que cifras publicadas coincidan exactamente con datos capturados (sin alteraciones), y que estudios demo estén etiquetados como tal en toda la superficie (home, ficha, metadata, structured data).
- **FIELD offline**: pruebas específicas de pérdida/recuperación de conectividad, verificando que no se dupliquen ni se pierdan entrevistas en el ciclo de sincronización.

---

## NOTA SOBRE EL ESTUDIO DEMO MICHOACÁN

Los datos proporcionados en el spec (PAN 20, PRI 10, Verde 8, PT 5, MC 3, MORENA 40, PRD 2, "Michoacán" 6, No respuesta 3; muestra 1,200; levantamiento 4-10 junio 2026; margen ±3.23 pts al 95%, deff 1.3) se implementarán tal cual, sin alterar ni completar cifras faltantes, y quedarán etiquetados de forma inequívoca como **"ESTUDIO DEMO / LEVANTAMIENTO DEL 04 AL 10 DE JUNIO DE 2026"** en toda la superficie donde aparezcan (UI, metadata, structured data), para no presentarse como una encuesta vigente.

---

# DETENTE Y ESPERA AUTORIZACIÓN

Esta entrega cubre exclusivamente **AUDIT + BLUEPRINT**, conforme a la Sección 8, 9 y 93 del OPMX MASTER SPEC v1.0. **No se ha implementado código de la plataforma.**

Puntos que requieren decisión humana antes de iniciar la Fase 1:
1. Confirmar o ajustar el stack tecnológico propuesto (Sección 2).
2. Definir proveedor de hosting/storage considerando el punto legal de residencia de datos (Sección 10, 17, 20).
3. Programar la revisión jurídica especializada (LFPDPPP, normativa electoral, consentimiento) antes de cualquier captura real de datos personales o video.
4. Autorizar explícitamente el inicio de la Fase 1 (Sección 18).

Quedo a la espera de autorización para comenzar la implementación.
