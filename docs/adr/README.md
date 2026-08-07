# Architecture Decision Records

ADR (Architecture Decision Records) individuales de OPMX, uno por decisión,
con contexto, opciones evaluadas, decisión y consecuencias.

- [`ADR-001-hosting.md`](ADR-001-hosting.md) — proveedor de hosting.
  Estado: `Accepted` — Vercel Pro elegido para el portal, Preview
  Deployments y staging durante Release 1.0 y Fase 2. No cubre OPMX
  FIELD, bases de datos productivas ni otra infraestructura sensible
  (esos componentes tendrán sus propios ADR). El despliegue en sí no
  está ejecutado — ver
  [`../operations/VERCEL_STAGING_DEPLOYMENT_PLAN.md`](../operations/VERCEL_STAGING_DEPLOYMENT_PLAN.md).
  No se usan las credenciales de AWS presentes en el entorno sin
  autorización explícita.
- [`ADR-005-repository-structure.md`](ADR-005-repository-structure.md) —
  estructura del repositorio (paquete único, sin herramienta de monorepo).
  Estado: `Accepted` — formaliza una decisión ya tomada de facto en Fase 1
  y sostenida por evidencia en el propio repositorio.

Las demás decisiones pendientes de `docs/architecture/BLUEPRINT_v1.1.md`
§14 (ADR-002 object storage, ADR-003 base de datos, ADR-004 autenticación,
ADR-006 CMS, ADR-007 mapas, ADR-008 infraestructura como código) siguen
documentadas únicamente como tabla en ese Blueprint — no bloquean el
alcance de Fase 2 (`docs/strategy/OPMX_ALIGNMENT_REVIEW_v1.0.md` §11) y se
formalizarán como archivos individuales aquí cuando la fase que las
necesita esté más próxima.
