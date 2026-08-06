import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { UnderConstruction } from "@/components/ui/UnderConstruction";

export const metadata: Metadata = {
  title: "Análisis",
  robots: { index: false, follow: false },
};

export default function AnalisisPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Análisis" }]} />
      <UnderConstruction
        title="Análisis"
        description="Interpretación editorial de tendencias, siempre con autoría, responsabilidad editorial y revisión humana. Todavía no hay análisis publicados."
      />
    </Container>
  );
}
