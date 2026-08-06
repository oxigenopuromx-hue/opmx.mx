import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="border-line text-ink-2 dark:border-ink-2 dark:text-fog inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase">
      {children}
    </span>
  );
}
