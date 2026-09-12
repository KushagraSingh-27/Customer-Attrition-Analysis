import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: 'navy' | 'indigo' | 'teal' | 'risk';
  subtitle?: string;
}

const accentClasses = {
  navy: 'bg-navy-100 text-navy-700 dark:bg-navy-700 dark:text-navy-100',
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-100',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-100',
  risk: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
};

export function KpiCard({
  label,
  value,
  icon: Icon,
  accent = 'navy',
  subtitle,
}: KpiCardProps) {
  return (
    <div className="card card-hover p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-navy-500 dark:text-navy-300">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-navy-900 dark:text-white">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-navy-400 dark:text-navy-400">
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${accentClasses[accent]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
