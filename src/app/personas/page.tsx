import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { UnderConstruction } from "@/components/ui/UnderConstruction";

export const metadata: Metadata = {
  title: "Personas",
  robots: { index: false, follow: false },
};

export default function PersonasPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Personas" }]} />
      <UnderConstruction
        title="Personas"
        description="Fichas de personas con presencia en la vida pública, mostrando solo información verificable: conocimiento, opinión, balance y evolución en encuestas reales. Todavía no hay fichas publicadas."
      />
    </Container>
  );
}
