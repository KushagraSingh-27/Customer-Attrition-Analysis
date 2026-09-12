import {
  Users,
  UserMinus,
  Percent,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Database,
  Sparkles,
  FileBarChart,
  TrendingDown,
  ShieldAlert,
  Lightbulb,
} from 'lucide-react';
import type { Customer, PageId } from '@/types';
import { KpiCard } from '@/components/KpiCard';
import { Card } from '@/components/Card';
import { AttritionDistributionChart } from '@/components/charts/AttritionDistributionChart';
import { RiskDonutChart } from '@/components/charts/RiskDonutChart';
import { calculateKpis, calculateRiskSegments, groupAttritionByField } from '@/data/dataService';

interface OverviewPageProps {
  customers: Customer[];
  onNavigate: (page: PageId) => void;
}

export function OverviewPage({ customers, onNavigate }: OverviewPageProps) {
  const kpis = calculateKpis(customers);
  const riskSegments = calculateRiskSegments(customers);
  const contractData = groupAttritionByField(customers, 'contract').slice(0, 3);

  const statusSteps = [
    { label: 'Dataset loaded', icon: Database, done: true, detail: '300 sample records' },
    { label: 'Data cleaned', icon: CheckCircle2, done: true, detail: 'Missing values handled' },
    { label: 'EDA completed', icon: Sparkles, done: true, detail: 'Patterns identified' },
    { label: 'Visualizations prepared', icon: FileBarChart, done: true, detail: '6 chart views' },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          label="Total Customers"
          value={kpis.totalCustomers.toLocaleString()}
          icon={Users}
          accent="navy"
          subtitle="Sample dataset"
        />
        <KpiCard
          label="Attrited Customers"
          value={kpis.attritedCustomers.toLocaleString()}
          icon={UserMinus}
          accent="risk"
          subtitle={`${kpis.retainedCustomers} retained`}
        />
        <KpiCard
          label="Attrition Rate"
          value={`${kpis.attritionRate.toFixed(1)}%`}
          icon={Percent}
          accent="indigo"
          subtitle="Sample-based estimate"
        />
        <KpiCard
          label="Avg Monthly Charges"
          value={`$${kpis.averageMonthlyCharges.toFixed(2)}`}
          icon={DollarSign}
          accent="teal"
          subtitle="Across all customers"
        />
        <KpiCard
          label="Revenue at Risk"
          value={`$${kpis.revenueAtRisk.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={AlertTriangle}
          accent="risk"
          subtitle="From attrited customers / mo"
        />
      </div>

      {/* Analysis Status */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Analysis Status" className="lg:col-span-1">
          <ul className="space-y-3">
            {statusSteps.map((step) => {
              const Icon = step.icon;
              return (
                <li key={step.label} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/40">
                    <Icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-800 dark:text-navy-100">
                      {step.label}
                    </p>
                    <p className="text-xs text-navy-400">{step.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
        <Card title="Quick Actions" className="lg:col-span-2">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('drivers')}
              className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700"
            >
              <TrendingDown className="h-4 w-4" />
              View Attrition Drivers
            </button>
            <button
              onClick={() => onNavigate('segmentation')}
              className="flex items-center gap-2 rounded-lg border border-navy-200 px-4 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50 dark:border-navy-700 dark:text-navy-200 dark:hover:bg-navy-800"
            >
              <ShieldAlert className="h-4 w-4" />
              Risk Segmentation
            </button>
            <button
              onClick={() => onNavigate('insights')}
              className="flex items-center gap-2 rounded-lg border border-navy-200 px-4 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50 dark:border-navy-700 dark:text-navy-200 dark:hover:bg-navy-800"
            >
              <Lightbulb className="h-4 w-4" />
              See Insights
            </button>
          </div>
        </Card>
      </div>

      {/* Charts preview */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Attrition Distribution" description="Attrited vs. retained customers">
          <AttritionDistributionChart customers={customers} />
        </Card>
        <Card title="Risk Segmentation" description="Customers by risk level">
          <RiskDonutChart data={riskSegments} />
        </Card>
      </div>

      {/* Quick stats table */}
      <Card title="Attrition Rate by Contract Type" description="Quick snapshot — see Attrition Drivers for full analysis">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy-200 dark:border-navy-700">
                <th className="py-2 font-semibold text-navy-700 dark:text-navy-200">Contract</th>
                <th className="py-2 font-semibold text-navy-700 dark:text-navy-200">Total</th>
                <th className="py-2 font-semibold text-navy-700 dark:text-navy-200">Attrited</th>
                <th className="py-2 font-semibold text-navy-700 dark:text-navy-200">Attrition Rate</th>
              </tr>
            </thead>
            <tbody>
              {contractData.map((row) => (
                <tr key={row.label} className="border-b border-navy-100 dark:border-navy-800">
                  <td className="py-2 text-navy-700 dark:text-navy-200">{row.label}</td>
                  <td className="py-2 text-navy-700 dark:text-navy-200">{row.total}</td>
                  <td className="py-2 text-navy-700 dark:text-navy-200">{row.attrited}</td>
                  <td className="py-2">
                    <span
                      className={`font-medium ${
                        row.attritionRate > 40
                          ? 'text-red-600'
                          : row.attritionRate > 25
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                      }`}
                    >
                      {row.attritionRate.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-center text-xs text-navy-400">
        Values shown are based on sample mock data. Connect your CSV files to display real results.
      </p>
    </div>
  );
}
