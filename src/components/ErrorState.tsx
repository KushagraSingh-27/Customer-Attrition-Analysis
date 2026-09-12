import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Could not load the dataset. Please check that the data file is available and try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
        <AlertCircle className="h-7 w-7 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-navy-800 dark:text-navy-100">
        Data Loading Error
      </h3>
      <p className="mt-1 max-w-md text-sm text-navy-500 dark:text-navy-400">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
