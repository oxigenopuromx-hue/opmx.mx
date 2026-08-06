import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { UnderConstruction } from "@/components/ui/UnderConstruction";

export const metadata: Metadata = {
  title: "Encuestas",
  robots: { index: false, follow: false },
};

export default function EncuestasPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Encuestas" }]} />
      <UnderConstruction
        title="Encuestas"
        description="Aquí se publicarán los estudios de opinión pública realizados por OPMX, cada uno con su ficha técnica, metodología completa y resultados. Todavía no hay estudios publicados en esta sección."
      />
    </Container>
  );
}
