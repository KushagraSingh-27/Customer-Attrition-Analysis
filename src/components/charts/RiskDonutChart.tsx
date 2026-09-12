import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { RiskSegment } from '@/types';

interface Props {
  data: RiskSegment[];
}

export function RiskDonutChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="level"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          label={({ level, count, percent }) =>
            `${level}: ${count} (${((percent ?? 0) * 100).toFixed(1)}%)`
          }
          labelLine={false}
        >
          {data.map((entry) => (
            <Cell key={entry.level} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(_value: number, _name, props) => {
            const d = props?.payload;
            return [
              `${d?.count ?? 0} customers — ${d?.attritionRate ?? 0}% attrition rate`,
              `${d?.level} Risk`,
            ];
          }}
          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
