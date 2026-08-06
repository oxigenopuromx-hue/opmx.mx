/**
 * Secciones de la home (Master Spec Sección 5). Cada una declara si tiene
 * contenido real o si todavía muestra un estado vacío honesto — la home
 * nunca simula contenido que no existe (BLUEPRINT_v1.1.md §3).
 */
export type HomeSection = {
  title: string;
  href: string;
  status: "available" | "placeholder";
  description: string;
  cta: string;
};

export const homeSections: HomeSection[] = [
  {
    title: "Encuestas recientes",
    href: "/encuestas",
    status: "placeholder",
    description: "Todavía no hay estudios publicados por OPMX en esta sección.",
    cta: "Ver encuestas",
  },
  {
    title: "Tendencias",
    href: "/tendencias",
    status: "placeholder",
    description:
      "Las series históricas se activan cuando existe más de una medición comparable.",
    cta: "Ver tendencias",
  },
  {
    title: "Estados",
    href: "/estados",
    status: "placeholder",
    description:
      "Páginas estatales con encuestas y candidaturas reales, publicadas una por una.",
    cta: "Ver estados",
  },
  {
    title: "Metodología",
    href: "/metodologia",
    status: "available",
    description:
      "Muestreo probabilístico y polietápico, ponderación documentada y margen de error calculado por estudio.",
    cta: "Conocer la metodología",
  },
  {
    title: "Auditoría",
    href: "/auditoria",
    status: "placeholder",
    description:
      "El Centro de Auditoría se activa cuando exista trabajo de campo real que auditar.",
    cta: "Ver auditoría",
  },
  {
    title: "Datos",
    href: "/datos",
    status: "placeholder",
    description:
      "Panel público filtrable por estado, elección, fecha, partido, candidato e indicador.",
    cta: "Explorar datos",
  },
  {
    title: "Últimos análisis",
    href: "/analisis",
    status: "placeholder",
    description:
      "Interpretación editorial con autoría y responsabilidad metodológica declaradas.",
    cta: "Ver análisis",
  },
  {
    title: "Sobre OPMX",
    href: "/sobre-opmx",
    status: "available",
    description:
      "La confianza no se pide. Se demuestra: qué medimos, cómo y con qué controles.",
    cta: "Conocer OPMX",
  },
];
