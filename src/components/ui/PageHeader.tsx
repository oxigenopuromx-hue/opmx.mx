import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="max-w-3xl py-12 sm:py-16">
      {eyebrow ? (
        <p className="text-ink-3 dark:text-fog mb-3 text-sm font-medium tracking-wide uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="text-ink-2 dark:text-fog mt-4 text-lg leading-relaxed">
          {description}
        </p>
      ) : null}
    </header>
  );
}
