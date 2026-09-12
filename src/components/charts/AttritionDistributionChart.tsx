import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { Customer } from '@/types';

interface Props {
  customers: Customer[];
}

export function AttritionDistributionChart({ customers }: Props) {
  const attrited = customers.filter((c) => c.attrition === 'Yes').length;
  const retained = customers.length - attrited;
  const data = [
    { name: 'Retained', value: retained, color: '#0d9488' },
    { name: 'Attrited', value: attrited, color: '#ef4444' },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          label={({ name, value, percent }) =>
            `${name}: ${value} (${((percent ?? 0) * 100).toFixed(1)}%)`
          }
          labelLine={false}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [`${value} customers`, '']}
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '13px',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
