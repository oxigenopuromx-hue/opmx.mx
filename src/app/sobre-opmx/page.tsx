import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Sobre OPMX",
  description:
    "OPMX es una plataforma mexicana de investigación y publicación de opinión pública construida sobre datos, metodología, tecnología, trazabilidad, transparencia y auditoría.",
};

const principios = [
  "Independiente",
  "Técnico",
  "Transparente",
  "Verificable",
  "Neutral en la presentación de resultados",
  "Seguro",
  "Respetuoso de la privacidad",
  "Metodológicamente responsable",
  "Accesible",
];

const compromisos = [
  "No fabricar resultados.",
  "No alterar resultados para favorecer a un candidato.",
  "No ocultar patrocinadores cuando corresponda.",
  "No inventar metodología.",
  "No presentar datos demo como datos actuales.",
  "No publicar información personal innecesaria.",
  "No exponer coordenadas exactas de participantes.",
  "No prometer una auditoría que no se haya realizado.",
];

export default function SobreOpmxPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Sobre OPMX" }]} />
      <PageHeader
        eyebrow="Sobre OPMX"
        title="Opinión pública, con datos que pueden ser auditados"
        description="OPMX investiga, mide y documenta la opinión pública de México mediante metodología científica y tecnología aplicada al trabajo de campo."
      />

      <div className="grid gap-12 pb-24 sm:grid-cols-2">
        <section>
          <h2 className="mb-3 text-lg font-semibold">Principio central</h2>
          <p className="text-ink-2 dark:text-fog leading-relaxed">
            La confianza no se pide. Se demuestra. No pedimos que nos crean: mostramos
            cómo obtuvimos los datos — qué se midió, cuándo, dónde, a quién, cómo se
            seleccionó la muestra, cómo se ponderaron los datos y qué controles se
            aplicaron.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Principios rectores</h2>
          <ul className="text-ink-2 dark:text-fog grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
            {principios.map((p) => (
              <li key={p}>· {p}</li>
            ))}
          </ul>
        </section>

        <section className="sm:col-span-2">
          <h2 className="mb-3 text-lg font-semibold">Compromisos permanentes</h2>
          <ul className="text-ink-2 dark:text-fog grid grid-cols-1 gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
            {compromisos.map((c) => (
              <li key={c}>· {c}</li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
