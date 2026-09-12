import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Eye } from 'lucide-react';
import type { Customer } from '@/types';
import { RiskBadge, AttritionBadge } from './Badge';

type SortField = 'customerID' | 'tenure' | 'monthlyCharges' | 'totalCharges';
type SortDir = 'asc' | 'desc';

interface CustomerTableProps {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
  page: number;
  pageSize: number;
}

const columns: { key: SortField | 'contract' | 'internetService' | 'attrition' | 'riskLevel'; label: string; sortable: boolean }[] = [
  { key: 'customerID', label: 'Customer ID', sortable: true },
  { key: 'tenure', label: 'Tenure', sortable: true },
  { key: 'contract', label: 'Contract', sortable: false },
  { key: 'internetService', label: 'Internet', sortable: false },
  { key: 'monthlyCharges', label: 'Monthly', sortable: true },
  { key: 'totalCharges', label: 'Total', sortable: true },
  { key: 'attrition', label: 'Attrition', sortable: false },
  { key: 'riskLevel', label: 'Risk', sortable: false },
];

export function CustomerTable({
  customers,
  onSelect,
  page,
  pageSize,
}: CustomerTableProps) {
  const [sortField, setSortField] = useState<SortField>('customerID');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const sorted = [...customers].sort((a, b) => {
    const av = a[sortField];
    const bv = b[sortField];
    let cmp = 0;
    if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
    else cmp = String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const start = (page - 1) * pageSize;
  const pageData = sorted.slice(start, start + pageSize);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ChevronsUpDown className="h-3.5 w-3.5 text-navy-300" />;
    return sortDir === 'asc' ? (
      <ChevronUp className="h-3.5 w-3.5 text-teal-500" />
    ) : (
      <ChevronDown className="h-3.5 w-3.5 text-teal-500" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-navy-200 dark:border-navy-700">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-semibold text-navy-700 dark:text-navy-200"
              >
                {col.sortable ? (
                  <button
                    onClick={() => handleSort(col.key as SortField)}
                    className="flex items-center gap-1 hover:text-teal-600"
                  >
                    {col.label}
                    <SortIcon field={col.key as SortField} />
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {pageData.map((c) => (
            <tr
              key={c.customerID}
              className="border-b border-navy-100 transition-colors hover:bg-navy-50 dark:border-navy-800 dark:hover:bg-navy-800/50"
            >
              <td className="px-4 py-3 font-mono text-xs text-navy-600 dark:text-navy-300">
                {c.customerID}
              </td>
              <td className="px-4 py-3 text-navy-700 dark:text-navy-200">
                {c.tenure} mo
              </td>
              <td className="px-4 py-3 text-navy-700 dark:text-navy-200">
                {c.contract}
              </td>
              <td className="px-4 py-3 text-navy-700 dark:text-navy-200">
                {c.internetService}
              </td>
              <td className="px-4 py-3 text-navy-700 dark:text-navy-200">
                ${c.monthlyCharges.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-navy-700 dark:text-navy-200">
                ${c.totalCharges.toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <AttritionBadge status={c.attrition} />
              </td>
              <td className="px-4 py-3">
                <RiskBadge level={c.riskLevel} />
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onSelect(c)}
                  className="rounded-lg p-1.5 text-navy-500 hover:bg-navy-100 hover:text-teal-600 dark:hover:bg-navy-700"
                  aria-label={`View details for ${c.customerID}`}
                >
                  <Eye className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
