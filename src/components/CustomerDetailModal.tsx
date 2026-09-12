import { X, Phone, Globe, CreditCard, FileText, User } from 'lucide-react';
import type { Customer } from '@/types';
import { RiskBadge, AttritionBadge } from './Badge';

interface CustomerDetailModalProps {
  customer: Customer | null;
  onClose: () => void;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-navy-100 py-2 dark:border-navy-700">
      <span className="text-sm text-navy-500 dark:text-navy-400">{label}</span>
      <span className="text-sm font-medium text-navy-800 dark:text-navy-100">
        {value}
      </span>
    </div>
  );
}

export function CustomerDetailModal({ customer, onClose }: CustomerDetailModalProps) {
  if (!customer) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl dark:bg-navy-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy-200 px-6 py-4 dark:border-navy-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 dark:bg-navy-700">
              <User className="h-5 w-5 text-navy-600 dark:text-navy-300" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold text-navy-900 dark:text-white">
                {customer.customerID}
              </h3>
              <div className="mt-0.5 flex items-center gap-2">
                <AttritionBadge status={customer.attrition} />
                <RiskBadge level={customer.riskLevel} />
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-navy-500 hover:bg-navy-100 dark:hover:bg-navy-700"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="grid gap-6 px-6 py-5 md:grid-cols-2">
          <div>
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-navy-400">
              <User className="h-3.5 w-3.5" /> Demographics
            </h4>
            <DetailRow label="Gender" value={customer.gender} />
            <DetailRow label="Senior Citizen" value={customer.seniorCitizen ? 'Yes' : 'No'} />
            <DetailRow label="Partner" value={customer.partner ? 'Yes' : 'No'} />
            <DetailRow label="Dependents" value={customer.dependents ? 'Yes' : 'No'} />
            <DetailRow label="Tenure" value={`${customer.tenure} months`} />
          </div>

          <div>
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-navy-400">
              <Phone className="h-3.5 w-3.5" /> Phone & Internet
            </h4>
            <DetailRow label="Phone Service" value={customer.phoneService ? 'Yes' : 'No'} />
            <DetailRow label="Multiple Lines" value={customer.multipleLines} />
            <DetailRow label="Internet Service" value={customer.internetService} />
            <DetailRow label="Online Security" value={customer.onlineSecurity} />
            <DetailRow label="Online Backup" value={customer.onlineBackup} />
            <DetailRow label="Device Protection" value={customer.deviceProtection} />
            <DetailRow label="Tech Support" value={customer.techSupport} />
          </div>

          <div>
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-navy-400">
              <Globe className="h-3.5 w-3.5" /> Streaming
            </h4>
            <DetailRow label="Streaming TV" value={customer.streamingTV} />
            <DetailRow label="Streaming Movies" value={customer.streamingMovies} />
          </div>

          <div>
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-navy-400">
              <CreditCard className="h-3.5 w-3.5" /> Billing
            </h4>
            <DetailRow label="Contract" value={customer.contract} />
            <DetailRow label="Paperless Billing" value={customer.paperlessBilling ? 'Yes' : 'No'} />
            <DetailRow label="Payment Method" value={customer.paymentMethod} />
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-navy-400">
              <FileText className="h-3.5 w-3.5" /> Charges
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-navy-50 p-4 dark:bg-navy-700/40">
                <p className="text-xs text-navy-500 dark:text-navy-400">Monthly Charges</p>
                <p className="mt-1 text-xl font-bold text-navy-900 dark:text-white">
                  ${customer.monthlyCharges.toFixed(2)}
                </p>
              </div>
              <div className="rounded-lg bg-navy-50 p-4 dark:bg-navy-700/40">
                <p className="text-xs text-navy-500 dark:text-navy-400">Total Charges</p>
                <p className="mt-1 text-xl font-bold text-navy-900 dark:text-white">
                  ${customer.totalCharges.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
