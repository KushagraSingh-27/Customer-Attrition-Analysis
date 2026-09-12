import { Search, RotateCcw } from 'lucide-react';
import type { CustomerFilters } from '@/data/dataService';

interface FilterBarProps {
  filters: CustomerFilters;
  onChange: (filters: CustomerFilters) => void;
  onReset: () => void;
}

const selectClass =
  'rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-navy-700 dark:bg-navy-800 dark:text-navy-200';

export function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search by Customer ID…"
          className={`${selectClass} w-full pl-9`}
          aria-label="Search by Customer ID"
        />
      </div>

      <select
        value={filters.attritionStatus}
        onChange={(e) =>
          onChange({ ...filters, attritionStatus: e.target.value as CustomerFilters['attritionStatus'] })
        }
        className={selectClass}
        aria-label="Filter by attrition status"
      >
        <option value="all">All Attrition Status</option>
        <option value="Yes">Attrited</option>
        <option value="No">Active</option>
      </select>

      <select
        value={filters.contract}
        onChange={(e) =>
          onChange({ ...filters, contract: e.target.value as CustomerFilters['contract'] })
        }
        className={selectClass}
        aria-label="Filter by contract type"
      >
        <option value="all">All Contracts</option>
        <option value="Month-to-month">Month-to-month</option>
        <option value="One year">One year</option>
        <option value="Two year">Two year</option>
      </select>

      <select
        value={filters.internetService}
        onChange={(e) =>
          onChange({ ...filters, internetService: e.target.value as CustomerFilters['internetService'] })
        }
        className={selectClass}
        aria-label="Filter by internet service"
      >
        <option value="all">All Internet</option>
        <option value="DSL">DSL</option>
        <option value="Fiber optic">Fiber optic</option>
        <option value="No">No internet</option>
      </select>

      <select
        value={filters.riskLevel}
        onChange={(e) =>
          onChange({ ...filters, riskLevel: e.target.value as CustomerFilters['riskLevel'] })
        }
        className={selectClass}
        aria-label="Filter by risk level"
      >
        <option value="all">All Risk Levels</option>
        <option value="High">High Risk</option>
        <option value="Medium">Medium Risk</option>
        <option value="Low">Low Risk</option>
      </select>

      <button
        onClick={onReset}
        className="flex items-center gap-1.5 rounded-lg border border-navy-200 px-3 py-2 text-sm font-medium text-navy-600 hover:bg-navy-100 dark:border-navy-700 dark:text-navy-300 dark:hover:bg-navy-800"
      >
        <RotateCcw className="h-4 w-4" />
        Reset
      </button>
    </div>
  );
}
