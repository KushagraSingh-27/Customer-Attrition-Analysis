// ---------------------------------------------------------------------------
// DATA SERVICE LAYER
// ---------------------------------------------------------------------------
// This module is the single place where the dashboard reads customer data.
// Every page imports from here — never from the mock generator directly.
//
// >>> CONNECTING YOUR REAL CSV FILES <<<
// 1. Drop your CSV files into the `public/data/` folder:
//      - customer_attrition_dataset.csv        (raw data)
//      - customer_attrition_cleaned.csv       (cleaned data)
//      - customer_attrition_scored_active.csv (active customers with risk scores)
// 2. Uncomment the `loadCustomersFromCsv` function below and replace the
//    mock-data fallback in `loadCustomers` with a call to it.
// 3. The CSV must include at minimum these columns (case-insensitive):
//      customerID, gender, SeniorCitizen, Partner, Dependents, tenure,
//      PhoneService, MultipleLines, InternetService, OnlineSecurity,
//      OnlineBackup, DeviceProtection, TechSupport, StreamingTV,
//      StreamingMovies, Contract, PaperlessBilling, PaymentMethod,
//      MonthlyCharges, TotalCharges, Attrition
// 4. The riskLevel column is optional — if missing it will be computed by
//    `assignRiskSegment` automatically.
// ---------------------------------------------------------------------------

import type {
  Customer,
  KpiData,
  RiskLevel,
  RiskSegment,
  GroupedAttritionData,
  ContractType,
  InternetServiceType,
  PaymentMethod,
  AttritionStatus,
} from '@/types';
import { generateMockCustomers } from './mockData';

// ---- Loading ---------------------------------------------------------------

// import Papa from 'papaparse'; // npm install papaparse — uncomment when connecting real CSV
//
// async function loadCustomersFromCsv(
//   url: string
// ): Promise<Customer[]> {
//   const res = await fetch(url);
//   if (!res.ok) throw new Error(`Failed to load ${url}`);
//   const text = await res.text();
//   const parsed = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: true });
//   return parsed.data.map(normalizeRow);
// }

export function loadCustomers(): Customer[] {
  // >>> MOCK DATA — replace with loadCustomersFromCsv('/data/customer_attrition_cleaned.csv') <<<
  return generateMockCustomers(300);
}

// ---- KPIs -------------------------------------------------------------------

export function calculateKpis(customers: Customer[]): KpiData {
  const totalCustomers = customers.length;
  const attritedCustomers = customers.filter((c) => c.attrition === 'Yes').length;
  const retainedCustomers = totalCustomers - attritedCustomers;
  const attritionRate = totalCustomers ? (attritedCustomers / totalCustomers) * 100 : 0;
  const averageMonthlyCharges = totalCustomers
    ? customers.reduce((sum, c) => sum + c.monthlyCharges, 0) / totalCustomers
    : 0;
  const revenueAtRisk = customers
    .filter((c) => c.attrition === 'Yes')
    .reduce((sum, c) => sum + c.monthlyCharges, 0);
  return {
    totalCustomers,
    attritedCustomers,
    retainedCustomers,
    attritionRate,
    averageMonthlyCharges,
    revenueAtRisk,
  };
}

// ---- Filtering --------------------------------------------------------------

export interface CustomerFilters {
  search: string;
  attritionStatus: 'all' | AttritionStatus;
  contract: 'all' | ContractType;
  internetService: 'all' | InternetServiceType;
  riskLevel: 'all' | RiskLevel;
}

export const defaultFilters: CustomerFilters = {
  search: '',
  attritionStatus: 'all',
  contract: 'all',
  internetService: 'all',
  riskLevel: 'all',
};

export function filterCustomers(
  customers: Customer[],
  filters: CustomerFilters,
): Customer[] {
  const q = filters.search.trim().toLowerCase();
  return customers.filter((c) => {
    if (q && !c.customerID.toLowerCase().includes(q)) return false;
    if (filters.attritionStatus !== 'all' && c.attrition !== filters.attritionStatus) return false;
    if (filters.contract !== 'all' && c.contract !== filters.contract) return false;
    if (filters.internetService !== 'all' && c.internetService !== filters.internetService) return false;
    if (filters.riskLevel !== 'all' && c.riskLevel !== filters.riskLevel) return false;
    return true;
  });
}

// ---- Grouping for charts ----------------------------------------------------

export function groupAttritionByField<K extends keyof Customer>(
  customers: Customer[],
  field: K,
): GroupedAttritionData[] {
  const map = new Map<string, { total: number; attrited: number }>();
  for (const c of customers) {
    const key = String(c[field]);
    const entry = map.get(key) ?? { total: 0, attrited: 0 };
    entry.total += 1;
    if (c.attrition === 'Yes') entry.attrited += 1;
    map.set(key, entry);
  }
  return Array.from(map.entries())
    .map(([label, { total, attrited }]) => ({
      label,
      total,
      attrited,
      attritionRate: total ? (attrited / total) * 100 : 0,
    }))
    .sort((a, b) => b.attritionRate - a.attritionRate);
}

export function groupAttritionByTenure(customers: Customer[]): GroupedAttritionData[] {
  const buckets = [
    { label: '0–12 mo', min: 0, max: 12 },
    { label: '13–24 mo', min: 13, max: 24 },
    { label: '25–36 mo', min: 25, max: 36 },
    { label: '37–48 mo', min: 37, max: 48 },
    { label: '49–60 mo', min: 49, max: 60 },
    { label: '61–72 mo', min: 61, max: 72 },
  ];
  return buckets.map(({ label, min, max }) => {
    const subset = customers.filter((c) => c.tenure >= min && c.tenure <= max);
    const total = subset.length;
    const attrited = subset.filter((c) => c.attrition === 'Yes').length;
    return { label, total, attrited, attritionRate: total ? (attrited / total) * 100 : 0 };
  });
}

export function monthlyChargesByAttrition(
  customers: Customer[],
): { label: string; avg: number; min: number; max: number }[] {
  const groups = [
    { label: 'Retained', list: customers.filter((c) => c.attrition === 'No') },
    { label: 'Attrited', list: customers.filter((c) => c.attrition === 'Yes') },
  ];
  return groups.map(({ label, list }) => {
    const charges = list.map((c) => c.monthlyCharges);
    const avg = charges.length ? charges.reduce((a, b) => a + b, 0) / charges.length : 0;
    const min = charges.length ? Math.min(...charges) : 0;
    const max = charges.length ? Math.max(...charges) : 0;
    return {
      label,
      avg: parseFloat(avg.toFixed(2)),
      min: parseFloat(min.toFixed(2)),
      max: parseFloat(max.toFixed(2)),
    };
  });
}

// ---- Attrition rate helper ------------------------------------------------------

export function attritionRate(customers: Customer[]): number {
  if (!customers.length) return 0;
  return (customers.filter((c) => c.attrition === 'Yes').length / customers.length) * 100;
}

// ---- Risk segmentation ------------------------------------------------------

export function assignRiskSegment(
  contract: ContractType,
  tenure: number,
  monthlyCharges: number,
  paymentMethod: PaymentMethod,
): RiskLevel {
  let score = 0;
  if (contract === 'Month-to-month') score += 2;
  if (tenure <= 12) score += 2;
  else if (tenure <= 24) score += 1;
  if (monthlyCharges > 70) score += 2;
  else if (monthlyCharges > 50) score += 1;
  if (paymentMethod === 'Electronic check') score += 2;
  if (score >= 5) return 'High';
  if (score >= 3) return 'Medium';
  return 'Low';
}

export function calculateRiskSegments(customers: Customer[]): RiskSegment[] {
  const levels: RiskLevel[] = ['High', 'Medium', 'Low'];
  const colors: Record<RiskLevel, string> = {
    High: '#ef4444',
    Medium: '#f59e0b',
    Low: '#10b981',
  };
  return levels.map((level) => {
    const subset = customers.filter((c) => c.riskLevel === level);
    const count = subset.length;
    const attrited = subset.filter((c) => c.attrition === 'Yes').length;
    const attritionRateVal = count ? (attrited / count) * 100 : 0;
    const avg =
      count
        ? subset.reduce((s, c) => s + c.monthlyCharges, 0) / count
        : 0;
    return {
      level,
      count,
      attritionRate: parseFloat(attritionRateVal.toFixed(1)),
      averageMonthlyCharges: parseFloat(avg.toFixed(2)),
      color: colors[level],
    };
  });
}

export function rankHighRiskCustomers(
  customers: Customer[],
  limit = 20,
): Customer[] {
  return customers
    .filter((c) => c.riskLevel === 'High')
    .sort((a, b) => b.monthlyCharges - a.monthlyCharges)
    .slice(0, limit);
}
