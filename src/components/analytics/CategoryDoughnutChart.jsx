import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';

const COLORS = ['#166534', '#22C55E', '#86EFAC', '#BBF7D0'];

export default function CategoryDoughnutChart({ data }) {
  return (
    <Card className="p-5">
      <h3 className="mb-1 text-sm font-semibold text-ink">Reports by category</h3>
      <p className="mb-4 text-xs text-muted">Share of reports across issue types</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DCFCE7', fontSize: 13 }} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#647067' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
