import {
  CalendarClock,
  DollarSign,
  CreditCard,
  Headphones,
  FileText,
  TrendingDown,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';
import type { Insight } from '@/types';
import { Card } from '@/components/Card';

const insights: Insight[] = [
  {
    id: 'contract',
    title: 'Month-to-Month Contracts Drive Attrition',
    finding:
      'Customers on month-to-month plans attrition at a substantially higher rate than those on annual contracts.',
    evidence:
      'The attrition rate for month-to-month customers is roughly 2–3× higher than for one-year and two-year contract customers (sample data).',
    implication:
      'Short-term contracts remove barriers to leaving, making it easy for dissatisfied customers to cancel at any time.',
    recommendation:
      'Encourage month-to-month customers to move to annual contracts by offering a small discount or added service benefit for committing.',
    icon: 'FileText',
  },
  {
    id: 'tenure',
    title: 'New Customers Are Most Vulnerable',
    finding:
      'Customers in their first year of service have the highest attrition rate, with attrition declining steadily as tenure increases.',
    evidence:
      'The 0–12 month tenure group shows the highest attrition rate across all tenure brackets (sample data).',
    implication:
      'The first year is a critical retention window — if a customer stays past 12 months, they are much more likely to remain long-term.',
    recommendation:
      'Contact newer customers during their first year with onboarding check-ins, satisfaction surveys, and proactive support to build loyalty early.',
    icon: 'CalendarClock',
  },
  {
    id: 'pricing',
    title: 'High Monthly Charges Correlate with Attrition',
    finding:
      'Customers who attrition tend to have higher average monthly charges than those who stay.',
    evidence:
      'The average monthly charge for attrited customers is higher than for retained customers (sample data).',
    implication:
      'Price sensitivity may be a factor — customers paying more may feel they are not getting sufficient value, especially if they experience service issues.',
    recommendation:
      'Review pricing and service quality for high-charge customers. Consider bundling discounts or loyalty rewards for long-term, high-value accounts.',
    icon: 'DollarSign',
  },
  {
    id: 'payment',
    title: 'Electronic Check Users Attrition More',
    finding:
      'Customers who pay by electronic check have a notably higher attrition rate than those using automatic payment methods.',
    evidence:
      'Electronic check users show the highest attrition rate among all payment methods (sample data).',
    implication:
      'Manual payment methods may indicate lower engagement or a weaker relationship with the service. Automatic payments reduce friction and increase stickiness.',
    recommendation:
      'Offer incentives for customers to switch to automatic payment methods (bank transfer or credit card), such as a small monthly discount.',
    icon: 'CreditCard',
  },
  {
    id: 'support',
    title: 'Proactive Support Reduces Risk',
    finding:
      'High-risk customers — identified by short tenure, month-to-month contracts, high charges, and electronic check payments — are concentrated in a predictable segment.',
    evidence:
      'The rule-based risk segmentation flags a clear group of high-risk customers with attrition rates well above average (sample data).',
    implication:
      'Because high-risk customers can be identified by a few key attributes, retention efforts can be targeted rather than broad.',
    recommendation:
      'Provide proactive support to high-risk customers: dedicated outreach, service check-ins, and personalized retention offers before they consider leaving.',
    icon: 'Headphones',
  },
];

const iconMap: Record<string, LucideIcon> = {
  FileText,
  CalendarClock,
  DollarSign,
  CreditCard,
  Headphones,
  TrendingDown,
  Lightbulb,
};

const accentColors = [
  'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400',
  'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400',
  'text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400',
  'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400',
  'text-navy-600 bg-navy-100 dark:bg-navy-700 dark:text-navy-200',
];

export function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {insights.map((insight, i) => {
          const Icon = iconMap[insight.icon] ?? Lightbulb;
          return (
            <Card key={insight.id}>
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accentColors[i % accentColors.length]}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-navy-900 dark:text-white">
                    {insight.title}
                  </h3>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Finding
                  </p>
                  <p className="mt-1 text-sm text-navy-600 dark:text-navy-300">
                    {insight.finding}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Evidence
                  </p>
                  <p className="mt-1 text-sm text-navy-600 dark:text-navy-300">
                    {insight.evidence}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Business Implication
                  </p>
                  <p className="mt-1 text-sm text-navy-600 dark:text-navy-300">
                    {insight.implication}
                  </p>
                </div>
                <div className="rounded-lg bg-teal-50 p-3 dark:bg-teal-900/20">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    Recommended Action
                  </p>
                  <p className="mt-1 text-sm text-navy-700 dark:text-navy-200">
                    {insight.recommendation}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
