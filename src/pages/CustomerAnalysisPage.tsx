import { useState, useMemo } from 'react';
import type { Customer } from '@/types';
import { Card } from '@/components/Card';
import { FilterBar } from '@/components/FilterBar';
import { CustomerTable } from '@/components/CustomerTable';
import { Pagination } from '@/components/Pagination';
import { EmptyState } from '@/components/EmptyState';
import { CustomerDetailModal } from '@/components/CustomerDetailModal';
import {
  filterCustomers,
  defaultFilters,
  type CustomerFilters,
} from '@/data/dataService';

interface Props {
  customers: Customer[];
}

const PAGE_SIZE = 10;

export function CustomerAnalysisPage({ customers }: Props) {
  const [filters, setFilters] = useState<CustomerFilters>(defaultFilters);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = useMemo(
    () => filterCustomers(customers, filters),
    [customers, filters],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  // Reset to page 1 when filters change
  const handleFilterChange = (f: CustomerFilters) => {
    setFilters(f);
    setPage(1);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-navy-900 dark:text-white">
              Customer Records
            </h3>
            <p className="text-sm text-navy-500 dark:text-navy-400">
              {filtered.length} of {customers.length} customers match the current filters
            </p>
          </div>
        </div>
        <FilterBar
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleReset}
        />
      </Card>

      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <CustomerTable
              customers={filtered}
              onSelect={setSelected}
              page={page}
              pageSize={PAGE_SIZE}
            />
            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </>
        )}
      </Card>

      <CustomerDetailModal customer={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
