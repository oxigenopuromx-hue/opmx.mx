import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/content/nav";

export function SiteFooter() {
  return (
    <footer className="border-line dark:border-ink-2 mt-24 border-t">
      <Container className="flex flex-col gap-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink-3 dark:text-fog">
          © {new Date().getFullYear()} OPMX — Opinión Pública de México.
        </p>
        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink-2 dark:hover:text-fog">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
