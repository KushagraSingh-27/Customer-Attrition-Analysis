import { ShieldAlert } from 'lucide-react';
import type { Customer } from '@/types';
import { Card } from '@/components/Card';
import { RiskBadge } from '@/components/Badge';
import { RiskDonutChart } from '@/components/charts/RiskDonutChart';
import {
  calculateRiskSegments,
  rankHighRiskCustomers,
} from '@/data/dataService';

interface Props {
  customers: Customer[];
}

export function RiskSegmentationPage({ customers }: Props) {
  const segments = calculateRiskSegments(customers);
  const highRisk = rankHighRiskCustomers(customers, 20);

  return (
    <div className="space-y-6">
      {/* Segment cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {segments.map((seg) => (
          <Card key={seg.level}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${seg.color}20` }}
                >
                  <ShieldAlert className="h-5 w-5" style={{ color: seg.color }} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-navy-900 dark:text-white">
                    {seg.level} Risk
                  </h3>
                  <p className="text-xs text-navy-400">
                    {seg.count} customers
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-navy-500 dark:text-navy-400">
                  Attrition Rate
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: seg.color }}
                >
                  {seg.attritionRate}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-navy-500 dark:text-navy-400">
                  Avg Monthly Charges
                </span>
                <span className="text-sm font-medium text-navy-800 dark:text-navy-100">
                  ${seg.averageMonthlyCharges.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Donut chart + risk logic */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          title="Risk Segment Distribution"
          description="Share of customers in each risk category"
          className="lg:col-span-2"
        >
          <RiskDonutChart data={segments} />
        </Card>

        <Card title="Risk Scoring Rules">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
              <span className="text-navy-600 dark:text-navy-300">
                <span className="font-medium text-navy-800 dark:text-navy-100">
                  High Risk:
                </span>{' '}
                Month-to-month contract, tenure ≤ 12 months, monthly charges &gt; $70,
                or electronic check payment.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              <span className="text-navy-600 dark:text-navy-300">
                <span className="font-medium text-navy-800 dark:text-navy-100">
                  Medium Risk:
                </span>{' '}
                Moderate tenure (13–24 months) and a mix of risk indicators.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              <span className="text-navy-600 dark:text-navy-300">
                <span className="font-medium text-navy-800 dark:text-navy-100">
                  Low Risk:
                </span>{' '}
                Long-term contract, tenure &gt; 24 months, and stable account
                characteristics.
              </span>
            </li>
          </ul>
        </Card>
      </div>

      {/* High-risk table */}
      <Card title="Top High-Risk Customers" description="Ranked by monthly charges (highest first)">
        {highRisk.length === 0 ? (
          <p className="py-8 text-center text-sm text-navy-500">
            No high-risk customers found in the current dataset.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-200 dark:border-navy-700">
                  <th className="px-4 py-3 font-semibold text-navy-700 dark:text-navy-200">Customer ID</th>
                  <th className="px-4 py-3 font-semibold text-navy-700 dark:text-navy-200">Tenure</th>
                  <th className="px-4 py-3 font-semibold text-navy-700 dark:text-navy-200">Contract</th>
                  <th className="px-4 py-3 font-semibold text-navy-700 dark:text-navy-200">Payment</th>
                  <th className="px-4 py-3 font-semibold text-navy-700 dark:text-navy-200">Monthly</th>
                  <th className="px-4 py-3 font-semibold text-navy-700 dark:text-navy-200">Attrition</th>
                  <th className="px-4 py-3 font-semibold text-navy-700 dark:text-navy-200">Risk</th>
                </tr>
              </thead>
              <tbody>
                {highRisk.map((c) => (
                  <tr
                    key={c.customerID}
                    className="border-b border-navy-100 dark:border-navy-800"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-navy-600 dark:text-navy-300">
                      {c.customerID}
                    </td>
                    <td className="px-4 py-3 text-navy-700 dark:text-navy-200">{c.tenure} mo</td>
                    <td className="px-4 py-3 text-navy-700 dark:text-navy-200">{c.contract}</td>
                    <td className="px-4 py-3 text-navy-700 dark:text-navy-200">{c.paymentMethod}</td>
                    <td className="px-4 py-3 font-medium text-navy-800 dark:text-navy-100">
                      ${c.monthlyCharges.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={c.attrition === 'Yes' ? 'text-red-600' : 'text-emerald-600'}>
                        {c.attrition === 'Yes' ? 'Attrited' : 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <RiskBadge level={c.riskLevel} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
