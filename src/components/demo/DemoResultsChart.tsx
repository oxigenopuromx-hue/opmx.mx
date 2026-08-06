type ResultItem = {
  option: string;
  percentage: number;
};

/**
 * Lista de resultados con barra decorativa. El número en texto es la
 * fuente de verdad accesible; la barra es puramente visual (aria-hidden).
 */
export function DemoResultsChart({ results }: { results: readonly ResultItem[] }) {
  const max = Math.max(...results.map((r) => r.percentage));

  return (
    <ul className="flex flex-col gap-3">
      {results.map((item) => (
        <li key={item.option} className="flex items-center gap-4">
          <span className="w-40 shrink-0 text-sm">{item.option}</span>
          <div className="bg-mist dark:bg-ink-2 h-3 flex-1 overflow-hidden rounded-full">
            <div
              aria-hidden="true"
              className="bg-ink dark:bg-paper h-full rounded-full"
              style={{ width: `${(item.percentage / max) * 100}%` }}
            />
          </div>
          <span className="w-12 shrink-0 text-right text-sm font-medium tabular-nums">
            {item.percentage}%
          </span>
        </li>
      ))}
    </ul>
  );
}
