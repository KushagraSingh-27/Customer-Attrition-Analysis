import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import type { GroupedAttritionData } from '@/types';

interface Props {
  data: GroupedAttritionData[];
}

export function AttritionByPaymentChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 20, left: 80, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
        <YAxis
          type="category"
          dataKey="label"
          tick={{ fontSize: 11 }}
          width={100}
        />
        <Tooltip
          formatter={(value: number, _name, props) => [
            `${value.toFixed(1)}% attrited`,
            `${props?.payload?.attrited ?? 0} of ${props?.payload?.total ?? 0} customers`,
          ]}
          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}
        />
        <Bar dataKey="attritionRate" name="Attrition Rate" radius={[0, 6, 6, 0]}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.attritionRate > 40 ? '#ef4444' : entry.attritionRate > 25 ? '#f59e0b' : '#0d9488'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
