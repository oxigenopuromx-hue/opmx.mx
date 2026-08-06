import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { UnderConstruction } from "@/components/ui/UnderConstruction";

export const metadata: Metadata = {
  title: "Estados",
  robots: { index: false, follow: false },
};

export default function EstadosPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Estados" }]} />
      <UnderConstruction
        title="Estados"
        description="Cada entidad tendrá su propia página con encuestas, elecciones, candidaturas, partidos y tendencias reales de esa entidad. Se publican solo cuando hay contenido real que mostrar, nunca en bloque."
      />
    </Container>
  );
}
