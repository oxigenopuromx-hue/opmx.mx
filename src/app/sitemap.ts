import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Solo rutas con contenido real e indexable (Master Spec Sección 51: "no
 * incluir URLs no indexables"). Las secciones "en construcción" y la demo
 * de Michoacán llevan `noindex` y quedan fuera de este sitemap a propósito.
 */
const indexableRoutes = [
  "/",
  "/sobre-opmx",
  "/transparencia",
  "/metodologia",
  "/glosario",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
