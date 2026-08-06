import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Master Spec Sección 52: permitir rastreo del contenido público; bloquear
 * panel, APIs privadas, dashboards y endpoints internos. Ninguna de esas
 * áreas existe todavía en Fase 1 (no hay admin ni API con datos), pero se
 * reservan por adelantado porque nunca serán públicas cuando se construyan.
 *
 * Las secciones "en construcción" y la demo NO se bloquean aquí: ya llevan
 * `noindex` en su metadata, que es el mecanismo correcto para excluirlas de
 * los resultados de búsqueda sin impedir que un crawler vea esa instrucción
 * (bloquear por robots.txt en su lugar puede hacer que la URL aparezca
 * igualmente indexada, sin contenido).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
