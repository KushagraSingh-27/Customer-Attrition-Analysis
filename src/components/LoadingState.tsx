import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Loading data…' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      <p className="mt-3 text-sm text-navy-500 dark:text-navy-400">{message}</p>
    </div>
  );
}
