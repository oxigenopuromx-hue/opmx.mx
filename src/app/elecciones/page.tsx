import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { UnderConstruction } from "@/components/ui/UnderConstruction";

export const metadata: Metadata = {
  title: "Elecciones",
  robots: { index: false, follow: false },
};

export default function EleccionesPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Elecciones" }]} />
      <UnderConstruction
        title="Elecciones"
        description="Catálogo de procesos electorales cubiertos por OPMX, con sus candidaturas, coaliciones y resultados de estudios asociados. Todavía no hay procesos electorales publicados."
      />
    </Container>
  );
}
