/**
 * Menú principal (OPMX MASTER SPEC v1.0, Sección 6) y CTA principal.
 *
 * `status: "placeholder"` marca secciones que en Fase 1 todavía no tienen
 * contenido real publicado (BLUEPRINT_v1.1.md §3: "no generar contenido
 * inventado"). Esas rutas existen y son navegables, pero muestran un
 * estado vacío honesto y quedan fuera de indexación/sitemap hasta que
 * exista contenido real (Master Spec Sección 38: "no generar páginas
 * vacías").
 */
export type NavStatus = "available" | "placeholder";

export type NavItem = {
  label: string;
  href: string;
  status: NavStatus;
};

export const primaryNav: NavItem[] = [
  { label: "Encuestas", href: "/encuestas", status: "placeholder" },
  { label: "Datos", href: "/datos", status: "placeholder" },
  { label: "Tendencias", href: "/tendencias", status: "placeholder" },
  { label: "Elecciones", href: "/elecciones", status: "placeholder" },
  { label: "Estados", href: "/estados", status: "placeholder" },
  { label: "Personas", href: "/personas", status: "placeholder" },
  { label: "Partidos", href: "/partidos", status: "placeholder" },
  { label: "Metodología", href: "/metodologia", status: "available" },
  { label: "Auditoría", href: "/auditoria", status: "placeholder" },
  { label: "Archivo", href: "/archivo", status: "placeholder" },
  { label: "Análisis", href: "/analisis", status: "placeholder" },
  { label: "Sobre OPMX", href: "/sobre-opmx", status: "available" },
];

export const primaryCta: NavItem = {
  label: "Explorar datos",
  href: "/datos",
  status: "placeholder",
};

export const footerNav: NavItem[] = [
  { label: "Sobre OPMX", href: "/sobre-opmx", status: "available" },
  { label: "Transparencia", href: "/transparencia", status: "available" },
  { label: "Metodología", href: "/metodologia", status: "available" },
  { label: "Glosario", href: "/glosario", status: "available" },
];
