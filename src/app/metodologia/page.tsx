import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

const description =
  "El marco metodológico de OPMX: diseño muestral probabilístico y polietápico, ponderación documentada y comunicación honesta del margen de error.";

export const metadata: Metadata = {
  title: "Metodología",
  description,
  alternates: { canonical: "/metodologia" },
  openGraph: { url: "/metodologia", title: "Metodología — OPMX", description },
};

export default function MetodologiaPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Metodología" }]} />
      <PageHeader
        title="Metodología"
        description="Este es el marco metodológico que OPMX está construido para seguir. Cada estudio real publicará su propia ficha técnica completa; esta página describe los principios generales, no resultados de un estudio en particular."
      />

      <div className="flex flex-col gap-10 pb-24">
        <section>
          <h2 className="mb-2 text-lg font-semibold">Diseño muestral</h2>
          <p className="text-ink-2 dark:text-fog leading-relaxed">
            Los estudios de OPMX se diseñan sobre muestreo probabilístico y polietápico:
            selección de unidades primarias con probabilidad proporcional al tamaño,
            selección aleatoria de puntos de arranque, selección sistemática de viviendas
            y selección aleatoria del entrevistado dentro del hogar. Cada etapa queda
            documentada como metadato del estudio correspondiente.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">Ponderación</h2>
          <p className="text-ink-2 dark:text-fog leading-relaxed">
            Cuando un estudio requiere ponderación, OPMX documenta el factor de expansión,
            la probabilidad de selección y los ajustes aplicados (por ejemplo, por sexo,
            edad, escolaridad o estrato), incluyendo el método utilizado, como el ajuste
            iterativo proporcional (raking). Cada versión de ponderación registra fecha,
            responsable, variables, parámetros y resultado.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">
            Margen de error y confianza estadística
          </h2>
          <p className="text-ink-2 dark:text-fog leading-relaxed">
            El margen de error y el nivel de confianza se calculan de forma específica
            para cada estudio, considerando su diseño muestral y su efecto de diseño. OPMX
            no presenta un margen de error como universal ni como garantía absoluta: cada
            estimación puede tener características estadísticas particulares.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">Compromiso de transparencia</h2>
          <p className="text-ink-2 dark:text-fog leading-relaxed">
            Cada estudio real que OPMX publique incluirá su ficha técnica, su metodología
            específica y la evidencia disponible. OPMX no afirma haber realizado ni
            auditado un estudio hasta que ese trabajo de campo exista efectivamente.
          </p>
        </section>
      </div>
    </Container>
  );
}
