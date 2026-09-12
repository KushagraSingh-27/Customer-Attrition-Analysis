import type { RiskLevel, AttritionStatus } from '@/types';

const riskClasses: Record<RiskLevel, string> = {
  High: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
};

const attritionClasses: Record<AttritionStatus, string> = {
  Yes: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  No: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${riskClasses[level]}`}
    >
      {level}
    </span>
  );
}

export function AttritionBadge({ status }: { status: AttritionStatus }) {
  const label = status === 'Yes' ? 'Attrited' : 'Active';
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${attritionClasses[status]}`}
    >
      {label}
    </span>
  );
}
