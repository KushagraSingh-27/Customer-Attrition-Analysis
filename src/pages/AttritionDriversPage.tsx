import { useMemo } from 'react';
import type { Customer } from '@/types';
import { ChartContainer } from '@/components/ChartContainer';
import { AttritionDistributionChart } from '@/components/charts/AttritionDistributionChart';
import { AttritionByContractChart } from '@/components/charts/AttritionByContractChart';
import { AttritionByTenureChart } from '@/components/charts/AttritionByTenureChart';
import { AttritionByPaymentChart } from '@/components/charts/AttritionByPaymentChart';
import { MonthlyChargesChart } from '@/components/charts/MonthlyChargesChart';
import { AttritionByInternetChart } from '@/components/charts/AttritionByInternetChart';
import {
  groupAttritionByField,
  groupAttritionByTenure,
  monthlyChargesByAttrition,
} from '@/data/dataService';

interface Props {
  customers: Customer[];
}

export function AttritionDriversPage({ customers }: Props) {
  const contractData = useMemo(
    () => groupAttritionByField(customers, 'contract'),
    [customers],
  );
  const tenureData = useMemo(
    () => groupAttritionByTenure(customers),
    [customers],
  );
  const paymentData = useMemo(
    () => groupAttritionByField(customers, 'paymentMethod'),
    [customers],
  );
  const chargesData = useMemo(
    () => monthlyChargesByAttrition(customers),
    [customers],
  );
  const internetData = useMemo(
    () => groupAttritionByField(customers, 'internetService'),
    [customers],
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartContainer
          title="Attrition Distribution"
          explanation="This donut chart shows the overall split between customers who attrited and those who stayed. It gives a quick sense of the scale of attrition in the dataset."
        >
          <AttritionDistributionChart customers={customers} />
        </ChartContainer>

        <ChartContainer
          title="Attrition Rate by Contract Type"
          explanation="Customers on month-to-month contracts typically attrition at a much higher rate than those on one- or two-year commitments. Longer contracts create a natural retention barrier."
        >
          <AttritionByContractChart data={contractData} />
        </ChartContainer>

        <ChartContainer
          title="Attrition Rate by Tenure Group"
          explanation="Attrition is concentrated among newer customers (0–12 months). Customers who stay past the first year are significantly less likely to leave, suggesting the first year is a critical retention window."
        >
          <AttritionByTenureChart data={tenureData} />
        </ChartContainer>

        <ChartContainer
          title="Attrition Rate by Payment Method"
          explanation="Customers paying by electronic check show notably higher attrition rates than those using automatic payment methods. This may signal lower engagement or trust."
        >
          <AttritionByPaymentChart data={paymentData} />
        </ChartContainer>

        <ChartContainer
          title="Average Monthly Charges by Attrition Status"
          explanation="Attrited customers tend to have higher average monthly charges, suggesting that price sensitivity may contribute to the decision to leave."
        >
          <MonthlyChargesChart data={chargesData} />
        </ChartContainer>

        <ChartContainer
          title="Attrition Rate by Internet Service"
          explanation="Fiber optic customers show higher attrition rates compared to DSL or no-internet customers. This may reflect pricing pressure or service-quality concerns specific to fiber plans."
        >
          <AttritionByInternetChart data={internetData} />
        </ChartContainer>
      </div>

      <p className="text-center text-xs text-navy-400">
        All charts are based on sample mock data. Connect your CSV files to display real findings.
      </p>
    </div>
  );
}
