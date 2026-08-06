import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { UnderConstruction } from "@/components/ui/UnderConstruction";

export const metadata: Metadata = {
  title: "Partidos",
  robots: { index: false, follow: false },
};

export default function PartidosPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Partidos" }]} />
      <UnderConstruction
        title="Partidos"
        description="Fichas de partidos nacionales y locales, con su participación real en coaliciones, candidaturas comunes y elecciones. Todavía no hay fichas publicadas."
      />
    </Container>
  );
}
