import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({
  title = 'No customers found',
  message = 'Try adjusting your filters or resetting them to see all customers.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-100 dark:bg-navy-700">
        <SearchX className="h-7 w-7 text-navy-400" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-navy-800 dark:text-navy-100">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-navy-500 dark:text-navy-400">
        {message}
      </p>
    </div>
  );
}
