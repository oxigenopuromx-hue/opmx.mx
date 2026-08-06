import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { UnderConstruction } from "@/components/ui/UnderConstruction";

export const metadata: Metadata = {
  title: "Auditoría",
  robots: { index: false, follow: false },
};

export default function AuditoriaPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Auditoría" }]} />
      <UnderConstruction
        title="Centro de Auditoría"
        description="Diseño muestral, secciones seleccionadas, validaciones, controles de calidad e integridad de archivos de cada estudio real de OPMX. Se activa cuando exista trabajo de campo auditable — no antes."
      />
    </Container>
  );
}
