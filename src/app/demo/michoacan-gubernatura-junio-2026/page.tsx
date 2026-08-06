import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Container } from "@/components/ui/Container";
import { DemoResultsChart } from "@/components/demo/DemoResultsChart";
import {
  demoResultsTotalPercentage,
  michoacanGubernaturaDemo as demo,
} from "@/content/studies/michoacan-gubernatura-2026-demo";

// Metadata deliberadamente mínima: sin Open Graph de tipo artículo/estudio,
// sin autor ni fecha editorial (PHASE_1_EXECUTION_PLAN.md §2). `robots`
// bloquea indexación; la URL además se excluye de sitemap.xml (tarea SEO).
export const metadata: Metadata = {
  title: "Demostración de interfaz — dato histórico de Michoacán",
  description:
    "Demostración de cómo se vería una ficha de estudio en OPMX, usando datos de referencia históricos de Michoacán (junio de 2026). No es una investigación realizada por OPMX.",
  robots: { index: false, follow: false },
};

const resultsSorted = [...demo.results].sort((a, b) => b.percentage - a.percentage);

export default function DemoMichoacanPage() {
  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Demostración de interfaz" },
          { label: "Michoacán · Gubernatura · Junio 2026" },
        ]}
      />

      <div className="max-w-3xl py-10">
        <Callout title="Esto es una demostración de interfaz, no un estudio de OPMX">
          Esta página muestra cómo se vería la ficha de un estudio en OPMX, usando datos
          de referencia históricos proporcionados como material de demostración.{" "}
          <strong>No es una investigación diseñada, levantada o auditada por OPMX</strong>
          , y no representa una encuesta vigente. Esta página no aparece en buscadores ni
          en el archivo público de OPMX.
        </Callout>
      </div>

      <header className="max-w-3xl pb-10">
        <Badge>{demo.label}</Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {demo.title}
        </h1>
        <p className="text-ink-2 dark:text-fog mt-4 text-lg leading-relaxed">
          {demo.topic}
        </p>
      </header>

      <section className="max-w-3xl pb-10">
        <h2 className="mb-3 text-lg font-semibold">Pregunta</h2>
        <p className="border-line dark:border-ink-2 rounded-lg border p-5 text-base leading-relaxed italic">
          “{demo.question}”
        </p>
      </section>

      <section className="max-w-3xl pb-6">
        <h2 className="mb-4 text-lg font-semibold">Resultados (datos de referencia)</h2>
        <DemoResultsChart results={resultsSorted} />
      </section>

      <div className="max-w-3xl pb-10">
        <Callout title={`Los porcentajes suman ${demoResultsTotalPercentage}%, no 100%`}>
          Esta es una discrepancia presente en los datos fuente originales, que no se ha
          alterado ni completado. El material de referencia no explica la diferencia de{" "}
          {100 - demoResultsTotalPercentage} puntos. OPMX no modifica cifras para forzar
          totales redondos, ni siquiera en material de demostración.
        </Callout>
      </div>

      <section className="max-w-3xl pb-10">
        <h2 className="mb-4 text-lg font-semibold">Datos clave</h2>
        <dl className="divide-line dark:divide-ink-2 grid grid-cols-1 divide-y text-sm sm:grid-cols-2 sm:gap-x-8 sm:divide-y-0">
          <Fact label="Cobertura" value={demo.coverage} />
          <Fact label="Población" value={demo.population} />
          <Fact
            label="Muestra"
            value={`${demo.sampleSizeEffective.toLocaleString("es-MX")} entrevistas efectivas`}
          />
          <Fact label="Técnica" value={demo.technique} />
          <Fact
            label="Levantamiento"
            value={`Del ${demo.fieldwork.start} al ${demo.fieldwork.end}`}
          />
          <Fact label="Confianza estadística" value={`${demo.confidenceLevel}%`} />
          <Fact
            label="Margen informado"
            value={`± ${demo.marginOfErrorPercentagePoints} puntos porcentuales (efecto de diseño ${demo.designEffect})`}
          />
        </dl>
      </section>

      <div className="max-w-3xl pb-20">
        <Callout title="Sobre el margen de error">
          Este margen corresponde específicamente a este dato de referencia y no debe
          generalizarse a otros estudios: cada estimación puede tener características
          estadísticas particulares.
        </Callout>
      </div>
    </Container>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 sm:py-2">
      <dt className="text-ink-3 dark:text-fog text-xs font-medium tracking-wide uppercase">
        {label}
      </dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
