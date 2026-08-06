import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { UnderConstruction } from "@/components/ui/UnderConstruction";

export const metadata: Metadata = {
  title: "Tendencias",
  robots: { index: false, follow: false },
};

export default function TendenciasPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Tendencias" }]} />
      <UnderConstruction
        title="Tendencias"
        description="Las series históricas se publican cuando existe más de una medición comparable de un mismo tema o elección. Todavía no hay mediciones suficientes para mostrar una tendencia."
      />
    </Container>
  );
}
