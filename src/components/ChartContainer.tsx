import type { ReactNode } from 'react';

interface ChartContainerProps {
  title: string;
  explanation: string;
  children: ReactNode;
}

export function ChartContainer({ title, explanation, children }: ChartContainerProps) {
  return (
    <div className="card p-5">
      <h3 className="text-base font-semibold text-navy-900 dark:text-white">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
      <p className="mt-4 border-t border-navy-100 pt-3 text-sm text-navy-500 dark:border-navy-700 dark:text-navy-400">
        {explanation}
      </p>
    </div>
  );
}
