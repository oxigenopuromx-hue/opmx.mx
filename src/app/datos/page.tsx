import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { UnderConstruction } from "@/components/ui/UnderConstruction";

export const metadata: Metadata = {
  title: "Datos",
  robots: { index: false, follow: false },
};

export default function DatosPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Datos" }]} />
      <UnderConstruction
        title="Datos OPMX"
        description="Panel público con filtros por estado, elección, fecha, partido, candidato e indicador. Se activará cuando existan resultados reales que consultar."
      />
    </Container>
  );
}
