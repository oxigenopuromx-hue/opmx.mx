import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { UnderConstruction } from "@/components/ui/UnderConstruction";

export const metadata: Metadata = {
  title: "Archivo",
  robots: { index: false, follow: false },
};

export default function ArchivoPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Archivo" }]} />
      <UnderConstruction
        title="Archivo OPMX"
        description="Archivo histórico navegable por año, estado, elección, partido, candidato y tema. Los estudios históricos nunca se modifican silenciosamente; toda corrección queda registrada con su versión anterior y su motivo."
      />
    </Container>
  );
}
