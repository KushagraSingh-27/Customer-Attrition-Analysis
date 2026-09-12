import {
  LayoutDashboard,
  Users,
  TrendingDown,
  ShieldAlert,
  Lightbulb,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Moon,
  Smartphone,
  RefreshCw,
} from 'lucide-react';
import { Card } from '@/components/Card';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Overview Dashboard',
    description:
      'Get an at-a-glance view of key metrics — total customers, attrition rate, average monthly charges, and revenue at risk — all in one place.',
  },
  {
    icon: Users,
    title: 'Customer Analysis',
    description:
      'Search, sort, and filter through every customer record. Drill into individual profiles to see contract type, services, billing, and attrition status.',
  },
  {
    icon: TrendingDown,
    title: 'Attrition Drivers',
    description:
      'Explore six interactive charts that reveal which factors — contract type, tenure, payment method, monthly charges, and internet service — are most linked to attrition.',
  },
  {
    icon: ShieldAlert,
    title: 'Risk Segmentation',
    description:
      'See customers grouped into High, Medium, and Low risk categories with clear counts, attrition rates, and average charges for each segment.',
  },
  {
    icon: Lightbulb,
    title: 'Business Insights',
    description:
      'Read structured, actionable recommendations — each with a finding, supporting evidence, business implication, and suggested next step.',
  },
  {
    icon: Search,
    title: 'Search & Filter',
    description:
      'Find any customer instantly by ID. Narrow results by attrition status, contract type, internet service, or risk level with one click.',
  },
  {
    icon: BarChart3,
    title: 'Interactive Charts',
    description:
      'Hover over any chart for detailed tooltips, legends, and labels. Charts resize automatically to fit any screen size.',
  },
  {
    icon: PieChart,
    title: 'Visual Risk Breakdown',
    description:
      'A donut chart shows the share of customers in each risk category, making it easy to spot where attention is needed most.',
  },
  {
    icon: Filter,
    title: 'Reset Filters Anytime',
    description:
      'Made a mistake or want to start over? One reset button clears every filter and brings back the full customer list.',
  },
  {
    icon: Moon,
    title: 'Dark & Light Mode',
    description:
      'Toggle between a clean light theme and a comfortable dark theme — your preference is applied instantly across the entire dashboard.',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    description:
      'The dashboard works seamlessly on desktop, tablet, and mobile. The sidebar collapses into a mobile menu on smaller screens.',
  },
  {
    icon: RefreshCw,
    title: 'Loading & Error States',
    description:
      'See clear loading indicators while data loads, friendly empty states when no customers match your filters, and error messages with retry if something goes wrong.',
  },
];

export function AboutPage() {
  return (
    <div className="space-y-6">
      <Card title="What This Dashboard Does" description="A customer attrition analytics tool for telecom data">
        <p className="text-sm leading-relaxed text-navy-600 dark:text-navy-300">
          This dashboard helps you understand why customers leave a telecom company.
          It turns raw customer data into clear visualizations, searchable records, and
          actionable insights — so you can spot at-risk customers early, see which
          factors drive attrition, and take steps to improve retention. Whether you are
          a data analyst, a business stakeholder, or a recruiter reviewing this portfolio
          project, everything is designed to be easy to navigate and interpret.
        </p>
      </Card>

      <Card title="Features" description="Everything the dashboard offers">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-lg border border-navy-200 p-4 dark:border-navy-700"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/40">
                  <Icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-navy-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      <p className="text-center text-xs text-navy-400">
        Values shown are based on sample mock data. Connect your CSV files to display real results.
      </p>
    </div>
  );
}
