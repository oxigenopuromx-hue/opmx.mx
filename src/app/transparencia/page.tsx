import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

const description =
  "Quién publica OPMX, su política de correcciones y su política de datos. Los apartados sin información real publicada se marcan explícitamente como pendientes.";

export const metadata: Metadata = {
  title: "Transparencia",
  description,
  alternates: { canonical: "/transparencia" },
  openGraph: { url: "/transparencia", title: "Transparencia — OPMX", description },
};

export default function TransparenciaPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Transparencia" }]} />
      <PageHeader
        title="Transparencia"
        description="Esta página declara quién publica OPMX y las políticas que rigen correcciones y datos. Los apartados que aún no tienen información real definida se marcan explícitamente como pendientes — OPMX no publica contenido de relleno."
      />

      <div className="flex flex-col gap-10 pb-24">
        <section>
          <h2 className="mb-2 text-lg font-semibold">Quién publica</h2>
          <p className="text-ink-2 dark:text-fog leading-relaxed">
            OPMX (Opinión Pública de México), operado bajo el dominio OPMX.COM.MX.
          </p>
        </section>

        <section>
          <div className="mb-2 flex items-center gap-3">
            <h2 className="text-lg font-semibold">Responsables</h2>
            <Badge>Pendiente de publicación</Badge>
          </div>
          <p className="text-ink-2 dark:text-fog leading-relaxed">
            Los responsables editorial y metodológico se publicarán con nombre y
            experiencia verificable en cuanto estén designados formalmente. OPMX no
            inventa credenciales.
          </p>
        </section>

        <section>
          <div className="mb-2 flex items-center gap-3">
            <h2 className="text-lg font-semibold">Financiamiento y patrocinadores</h2>
            <Badge>Pendiente de publicación</Badge>
          </div>
          <p className="text-ink-2 dark:text-fog leading-relaxed">
            A la fecha no hay financiamiento ni patrocinadores que declarar. Si en el
            futuro existieran, se declararán aquí de forma explícita, incluyendo cualquier
            estudio patrocinado.
          </p>
        </section>

        <section>
          <div className="mb-2 flex items-center gap-3">
            <h2 className="text-lg font-semibold">Conflictos de interés</h2>
            <Badge>Pendiente de publicación</Badge>
          </div>
          <p className="text-ink-2 dark:text-fog leading-relaxed">
            A la fecha no hay conflictos de interés que declarar respecto a partidos,
            candidatos, gobiernos o clientes. Si surgieran, se declararán aquí.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">Política de correcciones</h2>
          <p className="text-ink-2 dark:text-fog leading-relaxed">
            Ningún estudio histórico se modifica silenciosamente. Cuando exista una
            corrección, OPMX publicará la versión original, la versión corregida, la fecha
            y el motivo del cambio. Esta política aplica desde el primer estudio que se
            publique.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">Política de datos</h2>
          <p className="text-ink-2 dark:text-fog leading-relaxed">
            Los datos se organizan en tres capas — públicos, restringidos y personales —
            con minimización y control de acceso. Nunca se publican coordenadas exactas de
            domicilios o participantes, ni identificadores personales. El detalle completo
            se documenta en{" "}
            <Link href="/metodologia" className="underline underline-offset-2">
              metodología
            </Link>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
