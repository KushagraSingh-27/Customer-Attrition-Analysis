# Customer Attrition Analysis

An end-to-end customer attrition analytics dashboard that uses exploratory data analysis, customer segmentation, and risk scoring to identify attrition drivers and support data-driven retention strategies.

## Overview

This project is a portfolio-ready web dashboard for analyzing telecom customer attrition. It visualizes key attrition drivers, segments customers by risk level, and presents actionable retention recommendations. The dashboard currently runs on **sample mock data** — it is designed so you can swap in your real CSV files with minimal changes.

## Features

- **Overview Dashboard** — KPI cards (total customers, attrition rate, revenue at risk), executive summary, and analysis status tracker.
- **Customer Analysis** — searchable, sortable, filterable customer table with pagination and a detail modal.
- **Attrition Drivers** — six interactive charts covering contract type, tenure, payment method, monthly charges, internet service, and overall distribution.
- **Risk Segmentation** — rule-based High/Medium/Low risk segments with donut chart and ranked high-risk customer table.
- **Business Insights** — structured insight cards with findings, evidence, implications, and recommended actions.
- **About Project** — problem statement, dataset description, cleaning/EDA process, technologies, and project workflow.
- **Dark/Light Mode** — toggle between light and dark themes.
- **Fully Responsive** — works on desktop, tablet, and mobile.

## Technologies Used

### Analysis (Python)
- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Jupyter Notebook

### Dashboard (Web)
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/customer-attrition-analysis-main.git
cd customer-attrition-analysis-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dashboard will open at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## Connecting Your Real CSV Data

The dashboard uses a data service layer (`src/data/dataService.ts`) as the single entry point for all data. To replace the mock data with your real CSV files:

1. Place your CSV files in the `public/data/` folder:
   - `customer_attrition_dataset.csv` — raw data
   - `customer_attrition_cleaned.csv` — cleaned data
   - `customer_attrition_scored_active.csv` — active customers with risk scores

2. Install a CSV parser:
   ```bash
   npm install papaparse
   npm install -D @types/papaparse
   ```

3. Open `src/data/dataService.ts` and follow the instructions at the top of the file. Uncomment the `loadCustomersFromCsv` function and update `loadCustomers()` to call it instead of `generateMockCustomers()`.

4. Your CSV must include these columns (case-insensitive):
   - customerID, gender, SeniorCitizen, Partner, Dependents, tenure
   - PhoneService, MultipleLines, InternetService, OnlineSecurity
   - OnlineBackup, DeviceProtection, TechSupport, StreamingTV
   - StreamingMovies, Contract, PaperlessBilling, PaymentMethod
   - MonthlyCharges, TotalCharges, Attrition

5. The `riskLevel` column is optional — if missing, it will be computed automatically using the rule-based segmentation logic.

### Sample CSV

A sample CSV file is included at `public/data/customer_attrition_dataset.csv` showing the expected format.

## Project Structure

```
customer-attrition-analysis-main/
├── public/
│   └── data/
│       └── customer_attrition_dataset.csv   # Sample CSV (replace with real data)
├── src/
│   ├── components/
│   │   ├── charts/                       # Recharts chart components
│   │   ├── Badge.tsx                     # Risk & attrition badges
│   │   ├── Card.tsx                      # Reusable card wrapper
│   │   ├── ChartContainer.tsx            # Chart + explanation wrapper
│   │   ├── CustomerDetailModal.tsx       # Customer detail popup
│   │   ├── CustomerTable.tsx             # Sortable customer table
│   │   ├── EmptyState.tsx                # No-results placeholder
│   │   ├── ErrorState.tsx                # Error placeholder
│   │   ├── FilterBar.tsx                 # Filter controls
│   │   ├── Header.tsx                    # Top bar with theme toggle
│   │   ├── KpiCard.tsx                   # KPI metric card
│   │   ├── LoadingState.tsx              # Loading spinner
│   │   ├── Pagination.tsx               # Table pagination
│   │   └── Sidebar.tsx                   # Navigation sidebar
│   ├── context/
│   │   └── ThemeContext.tsx              # Dark/light mode provider
│   ├── data/
│   │   ├── dataService.ts                # >>> CONNECT CSV HERE <<<
│   │   └── mockData.ts                   # Sample data generator
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── AttritionDriversPage.tsx
│   │   ├── CustomerAnalysisPage.tsx
│   │   ├── InsightsPage.tsx
│   │   ├── OverviewPage.tsx
│   │   └── RiskSegmentationPage.tsx
│   ├── types/
│   │   └── index.ts                      # TypeScript types
│   ├── App.tsx                           # Main app + routing
│   ├── main.tsx                          # Entry point
│   └── index.css                         # Global styles
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Risk Segmentation Logic

The dashboard uses an exploratory, rule-based scoring system (not a trained ML model):

| Risk Level | Criteria |
|------------|----------|
| **High** | Month-to-month contract, tenure ≤ 12 months, monthly charges > $70, or electronic check payment |
| **Medium** | Moderate tenure (13–24 months) and mixed risk indicators |
| **Low** | Long-term contract, tenure > 24 months, and stable account characteristics |

## Disclaimer

All data shown in this dashboard is **sample mock data** generated for portfolio demonstration purposes. Findings, attrition rates, and insights should not be treated as verified results until the real dataset is connected.

## License

This project is created for portfolio and educational purposes.
