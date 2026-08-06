import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { HomeSection } from "@/content/home-sections";

export function HomeSectionCard({ section }: { section: HomeSection }) {
  return (
    <Link
      href={section.href}
      className="border-line dark:border-ink-2 hover:border-ink-3 dark:hover:border-fog flex flex-col gap-3 rounded-lg border p-6 transition-colors"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold">{section.title}</h3>
        {section.status === "placeholder" ? <Badge>Próximamente</Badge> : null}
      </div>
      <p className="text-ink-2 dark:text-fog text-sm leading-relaxed">
        {section.description}
      </p>
      <span className="text-ink-3 dark:text-fog mt-auto text-sm font-medium">
        {section.cta} →
      </span>
    </Link>
  );
}
