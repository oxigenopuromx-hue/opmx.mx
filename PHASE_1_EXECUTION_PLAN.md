# OPMX — Plan de Ejecución de Fase 1

**Basado en:** `BLUEPRINT_v1.1.md`, secciones 3, 12, 13 y 16 (alcance y criterios de aceptación aprobados).
**Estado:** Autorizado para ejecución. Este documento fija las precisiones adicionales recibidas en la autorización antes de empezar a construir.

---

## 1. Precisión sobre PostgreSQL

PostgreSQL **no bloquea** la entrega visual de Fase 1.

- Se prepara el esquema conceptual, las migraciones y los adaptadores de acceso a datos como código (interfaces, tipos), pero **no se selecciona todavía un proveedor definitivo de base de datos gestionada** (ADR-003 sigue pendiente, ver `BLUEPRINT_v1.1.md` §14).
- La experiencia demo de Michoacán **no depende de una base de datos en Fase 1**. Los datos (título, tema, pregunta, resultados, ficha técnica) se implementan como **datos tipados en TypeScript, versionados en el repositorio y tratados como inmutables** (`as const`, con un campo de versión propio del contenido y comentario de procedencia). Cualquier futura migración a Postgres se hará leyendo desde este mismo módulo de datos como fuente de verdad transicional, sin duplicar ni reinterpretar cifras.
- El código de acceso a datos se escribe detrás de una interfaz simple (`content/studies`) para que, cuando exista base de datos real, el cambio de fuente no obligue a tocar las páginas/componentes que la consumen.

## 2. Precisión sobre la demo de Michoacán

- **No se usa `Dataset` (ni ningún otro structured data que implique investigación producida por OPMX)** en la página de la demo. No se agrega JSON-LD de `Dataset`, `Article` de investigación, ni marcado que sugiera autoría metodológica de OPMX sobre estos datos.
- La cifra y advertencia de que los porcentajes suman 97% (no 100%) se mantienen **en HTML visible**, siempre acompañando la gráfica/tabla de resultados.
- Metadata: solo metadata básica de página (`title`, `description`, `robots: noindex, nofollow`) — sin Open Graph de tipo artículo/estudio, sin autor, sin fecha editorial de publicación como si fuera contenido periodístico propio.
- La página deja explícito en el texto visible que es una **demostración de interfaz** construida sobre datos históricos proporcionados como material de referencia, **no una investigación realizada ni auditada por OPMX**, y no una encuesta vigente.
- `noindex` en metadata, ausencia total en `sitemap.xml` y en cualquier sitemap segmentado, sin enlaces desde hubs SEO (`/encuestas/`, etc.) que no existen todavía en Fase 1.

## 3. Decisiones preliminares vigentes para Fase 1

Confirmadas por la autorización recibida, se listan aquí para que cada entrega pequeña pueda verificarse contra ellas:

- Arquitectura portable, sin dependencias exclusivas de un proveedor de nube o de base de datos.
- Sin OPMX FIELD.
- Sin video, audio, GPS ni datos personales de ningún tipo.
- Sin instalar NestJS, FastAPI, Redis, BullMQ ni React Native.
- Sin CMS productivo completo (el contenido de Fase 1 es código versionado, no un editor de contenido).
- Sin el sistema completo de identidad destinado a OPMX FIELD (no hay login, roles ni MFA en Fase 1 — no hay todavía superficie que proteger con esas capacidades).
- Staging protegido con una **barrera temporal y documentada a nivel de despliegue** (ej. Basic Auth en el borde/servidor), explícitamente no destinada a ser la autenticación definitiva de OPMX.
- El portal **no se publica como producción abierta e indexable** en esta fase.
- Sin contenido inventado en secciones sin información real — donde no hay información real (ej. responsables, financiamiento, patrocinadores concretos), se muestra un estado vacío honesto, explícito, en vez de texto de relleno.
- Cifras del demo sin alterar.

## 4. Staging — nota de alcance

Este entorno de ejecución cuenta con credenciales de AWS preexistentes, pero **no se usarán para aprovisionar infraestructura real** (S3/CloudFront/etc.) sin confirmación explícita, dado que implicaría crear recursos con costo y persistencia en una cuenta no verificada por este proceso, y el proveedor de hosting (ADR-001) sigue sin resolverse. Se prepara el pipeline de build + CI + un workflow de despliegue documentado, dejando la URL de staging como entregable pendiente de una decisión de hosting explícita. Esto se documentará como limitación conocida en `PHASE_1_REPORT.md`, no como un criterio de aceptación incumplido por omisión silenciosa.

## 5. Orden de trabajo

1. `PHASE_1_EXECUTION_PLAN.md` (este archivo).
2. Estructura inicial del monolito (Next.js + TypeScript, sin monorepo tooling — ADR-005 pendiente, innecesario en este tamaño).
3. TypeScript estricto, lint, formato, pruebas, CI.
4. Sistema visual (tokens + componentes base).
5. Navegación + páginas institucionales.
6. Landing.
7. Experiencia demo de Michoacán.
8. SEO técnico básico, `robots.txt`, `sitemap.xml`.
9. Accesibilidad y pruebas.
10. Preparar staging protegido (con la limitación de §4 documentada si no se aprovisiona infraestructura real).
11. Verificación de todos los criterios de aceptación (`BLUEPRINT_v1.1.md` §13).
12. `PHASE_1_REPORT.md` con evidencia.

Cada paso se entrega en commits pequeños y descriptivos. Ningún criterio de aceptación se marca como cumplido si no se verificó con un comando o revisión concreta.
