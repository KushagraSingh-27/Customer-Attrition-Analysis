export type AttritionStatus = 'Yes' | 'No';
export type RiskLevel = 'High' | 'Medium' | 'Low';
export type ContractType = 'Month-to-month' | 'One year' | 'Two year';
export type InternetServiceType = 'DSL' | 'Fiber optic' | 'No';
export type PaymentMethod =
  | 'Electronic check'
  | 'Mailed check'
  | 'Bank transfer (automatic)'
  | 'Credit card (automatic)';

export interface Customer {
  customerID: string;
  gender: 'Male' | 'Female';
  seniorCitizen: boolean;
  partner: boolean;
  dependents: boolean;
  tenure: number;
  phoneService: boolean;
  multipleLines: 'Yes' | 'No' | 'No phone service';
  internetService: InternetServiceType;
  onlineSecurity: 'Yes' | 'No' | 'No internet service';
  onlineBackup: 'Yes' | 'No' | 'No internet service';
  deviceProtection: 'Yes' | 'No' | 'No internet service';
  techSupport: 'Yes' | 'No' | 'No internet service';
  streamingTV: 'Yes' | 'No' | 'No internet service';
  streamingMovies: 'Yes' | 'No' | 'No internet service';
  contract: ContractType;
  paperlessBilling: boolean;
  paymentMethod: PaymentMethod;
  monthlyCharges: number;
  totalCharges: number;
  attrition: AttritionStatus;
  riskLevel: RiskLevel;
}

export interface KpiData {
  totalCustomers: number;
  attritedCustomers: number;
  retainedCustomers: number;
  attritionRate: number;
  averageMonthlyCharges: number;
  revenueAtRisk: number;
}

export interface RiskSegment {
  level: RiskLevel;
  count: number;
  attritionRate: number;
  averageMonthlyCharges: number;
  color: string;
}

export interface GroupedAttritionData {
  label: string;
  total: number;
  attrited: number;
  attritionRate: number;
}

export interface Insight {
  id: string;
  title: string;
  finding: string;
  evidence: string;
  implication: string;
  recommendation: string;
  icon: string;
}

export type PageId =
  | 'overview'
  | 'customers'
  | 'drivers'
  | 'segmentation'
  | 'insights'
  | 'about';
