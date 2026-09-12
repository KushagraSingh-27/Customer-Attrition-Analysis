import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between border-t border-navy-200 px-4 py-3 dark:border-navy-700">
      <p className="text-sm text-navy-500 dark:text-navy-400">
        Showing {start}–{end} of {totalItems}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-lg border border-navy-200 p-1.5 text-navy-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-navy-100 dark:border-navy-700 dark:text-navy-300 dark:hover:bg-navy-800"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium text-navy-700 dark:text-navy-200">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-lg border border-navy-200 p-1.5 text-navy-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-navy-100 dark:border-navy-700 dark:text-navy-300 dark:hover:bg-navy-800"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
