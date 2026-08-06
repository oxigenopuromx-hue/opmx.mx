import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { glossaryTerms } from "@/content/glosario";

export const metadata: Metadata = {
  title: "Glosario",
  description: "Definiciones técnicas de los conceptos metodológicos que utiliza OPMX.",
};

export default function GlosarioPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Glosario" }]} />
      <PageHeader
        title="Glosario"
        description="Definiciones técnicas de los conceptos metodológicos que utiliza OPMX. Lista inicial, se amplía en fases posteriores."
      />

      <dl className="divide-line dark:divide-ink-2 divide-y pb-24">
        {glossaryTerms.map((item) => (
          <div key={item.term} className="py-6">
            <dt className="text-base font-semibold">{item.term}</dt>
            <dd className="text-ink-2 dark:text-fog mt-2 max-w-2xl leading-relaxed">
              {item.definition}
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
