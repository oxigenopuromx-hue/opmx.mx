import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";

type UnderConstructionProps = {
  title: string;
  description: string;
};

/**
 * Estado vacío honesto para secciones del menú principal que todavía no
 * tienen contenido real publicado (BLUEPRINT_v1.1.md §3; Master Spec
 * Sección 38: "no generar páginas vacías" como contenido indexable — por
 * eso estas páginas se marcan `noindex` en su metadata, no en este
 * componente).
 */
export function UnderConstruction({ title, description }: UnderConstructionProps) {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Sección en construcción"
        title={title}
        description={description}
      />
      <div className="border-line dark:border-ink-2 rounded-lg border border-dashed p-8">
        <Badge>Sin contenido publicado todavía</Badge>
        <p className="text-ink-2 dark:text-fog mt-4 max-w-xl text-sm leading-relaxed">
          OPMX no publica contenido de relleno. Esta sección se completará con información
          real conforme el trabajo de campo, la metodología y los estudios
          correspondientes estén listos.
        </p>
      </div>
    </div>
  );
}
