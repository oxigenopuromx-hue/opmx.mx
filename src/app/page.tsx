import Link from "next/link";
import { HomeSectionCard } from "@/components/home/HomeSectionCard";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { homeSections } from "@/content/home-sections";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-line dark:border-ink-2 border-b py-20 sm:py-28">
        <Container className="max-w-3xl">
          <h1 className="text-4xl leading-tight font-semibold tracking-tight uppercase sm:text-5xl">
            Opinión pública, con datos que pueden ser auditados
          </h1>
          <p className="text-ink-2 dark:text-fog mt-6 text-lg leading-relaxed sm:text-xl">
            Investigamos, medimos y documentamos la opinión pública de México mediante
            metodología científica y tecnología aplicada al trabajo de campo.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/encuestas">Explorar encuestas</ButtonLink>
            <ButtonLink href="/metodologia" variant="secondary">
              Conocer nuestra metodología
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homeSections.map((section) => (
              <HomeSectionCard key={section.href} section={section} />
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <Link
            href="/demo/michoacan-gubernatura-junio-2026"
            className="border-line dark:border-ink-2 hover:border-ink-3 dark:hover:border-fog flex flex-col gap-3 rounded-lg border border-dashed p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge>Demostración de interfaz</Badge>
              </div>
              <p className="text-sm font-medium">
                Cómo se vería la ficha de un estudio en OPMX, con datos de referencia de
                Michoacán (junio de 2026)
              </p>
              <p className="text-ink-3 dark:text-fog mt-1 text-sm">
                No es una investigación realizada por OPMX ni una encuesta vigente.
              </p>
            </div>
            <span className="text-ink-2 dark:text-fog shrink-0 text-sm font-medium">
              Ver demostración →
            </span>
          </Link>
        </Container>
      </section>
    </div>
  );
}
