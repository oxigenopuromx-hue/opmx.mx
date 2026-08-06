/**
 * Constantes de SEO/metadata compartidas. La URL final de producción
 * (ADR-001, BLUEPRINT_v1.1.md §14) todavía no está decidida; el valor por
 * defecto usa el dominio declarado en el Master Spec y se puede
 * sobreescribir por entorno (staging, previews) con NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://opmx.com.mx"
).replace(/\/$/, "");

export const SITE_NAME = "OPMX — Opinión Pública de México";
