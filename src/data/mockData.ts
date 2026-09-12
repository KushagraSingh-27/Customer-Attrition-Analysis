import type {
  Customer,
  ContractType,
  InternetServiceType,
  PaymentMethod,
  RiskLevel,
  AttritionStatus,
} from '@/types';

// ---------------------------------------------------------------------------
// MOCK DATA GENERATOR
// ---------------------------------------------------------------------------
// This file produces realistic sample customer records so the dashboard is
// fully functional without the real dataset.  When you are ready to connect
// your own CSV files, replace the `loadCustomersFromCsv` function in
// `src/data/dataService.ts` with a fetch / parser call and delete this mock
// generator (or keep it as a fallback).
// ---------------------------------------------------------------------------

const contracts: ContractType[] = ['Month-to-month', 'One year', 'Two year'];
const internetServices: InternetServiceType[] = ['DSL', 'Fiber optic', 'No'];
const paymentMethods: PaymentMethod[] = [
  'Electronic check',
  'Mailed check',
  'Bank transfer (automatic)',
  'Credit card (automatic)',
];

// Seeded pseudo-random generator so the dataset is stable between reloads.
let seed = 42;
function rand(): number {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}
function randInt(min: number, max: number): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}
function randFloat(min: number, max: number, decimals = 2): number {
  const v = rand() * (max - min) + min;
  return parseFloat(v.toFixed(decimals));
}

function assignRisk(
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

function generateCustomer(i: number): Customer {
  const gender = rand() > 0.5 ? 'Male' : 'Female';
  const seniorCitizen = rand() > 0.84;
  const partner = rand() > 0.5;
  const dependents = rand() > 0.7;
  const tenure = randInt(1, 72);
  const phoneService = rand() > 0.1;
  const multipleLines = phoneService
    ? rand() > 0.5
      ? 'Yes'
      : 'No'
      : 'No phone service';
  const internetService = pick(internetServices);
  const hasInternet = internetService !== 'No';
  const onlineSecurity = hasInternet
    ? rand() > 0.6
      ? 'Yes'
      : 'No'
    : 'No internet service';
  const onlineBackup = hasInternet
    ? rand() > 0.55
      ? 'Yes'
      : 'No'
    : 'No internet service';
  const deviceProtection = hasInternet
    ? rand() > 0.55
      ? 'Yes'
      : 'No'
    : 'No internet service';
  const techSupport = hasInternet
    ? rand() > 0.63
      ? 'Yes'
      : 'No'
    : 'No internet service';
  const streamingTV = hasInternet
    ? rand() > 0.5
      ? 'Yes'
      : 'No'
    : 'No internet service';
  const streamingMovies = hasInternet
    ? rand() > 0.5
      ? 'Yes'
      : 'No'
    : 'No internet service';
  const contract = pick(contracts);
  const paperlessBilling = rand() > 0.4;
  const paymentMethod = pick(paymentMethods);

  let monthlyCharges = 18;
  if (phoneService) monthlyCharges += randFloat(15, 25);
  if (hasInternet) {
    if (internetService === 'DSL') monthlyCharges += randFloat(25, 40);
    else monthlyCharges += randFloat(45, 75);
  }
  if (onlineSecurity === 'Yes') monthlyCharges += randFloat(2, 6);
  if (onlineBackup === 'Yes') monthlyCharges += randFloat(2, 6);
  if (deviceProtection === 'Yes') monthlyCharges += randFloat(2, 6);
  if (techSupport === 'Yes') monthlyCharges += randFloat(3, 8);
  if (streamingTV === 'Yes') monthlyCharges += randFloat(8, 15);
  if (streamingMovies === 'Yes') monthlyCharges += randFloat(8, 15);
  monthlyCharges = parseFloat(monthlyCharges.toFixed(2));

  const totalCharges = parseFloat((monthlyCharges * tenure).toFixed(2));

  const riskLevel = assignRisk(contract, tenure, monthlyCharges, paymentMethod);

  // Attrition probability influenced by risk level
  let attritionProb = 0.15;
  if (riskLevel === 'High') attritionProb = 0.55;
  else if (riskLevel === 'Medium') attritionProb = 0.25;
  else attritionProb = 0.08;
  const attrition: AttritionStatus = rand() < attritionProb ? 'Yes' : 'No';

  return {
    customerID: `C-${String(i + 1).padStart(4, '0')}`,
    gender,
    seniorCitizen,
    partner,
    dependents,
    tenure,
    phoneService,
    multipleLines,
    internetService,
    onlineSecurity,
    onlineBackup,
    deviceProtection,
    techSupport,
    streamingTV,
    streamingMovies,
    contract,
    paperlessBilling,
    paymentMethod,
    monthlyCharges,
    totalCharges,
    attrition,
    riskLevel,
  };
}

export function generateMockCustomers(count = 300): Customer[] {
  seed = 42; // reset seed for deterministic output
  return Array.from({ length: count }, (_, i) => generateCustomer(i));
}
