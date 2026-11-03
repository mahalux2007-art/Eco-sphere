import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Card from '../ui/Card';

export default function MonthlyReportsChart({ data }) {
  return (
    <Card className="p-5">
      <h3 className="mb-1 text-sm font-semibold text-ink">Monthly reports</h3>
      <p className="mb-4 text-xs text-muted">Total environmental reports submitted per month</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#EEF5F0" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#647067', fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#647067', fontSize: 12 }} width={32} />
            <Tooltip
              cursor={{ fill: '#F0FAF3' }}
              contentStyle={{ borderRadius: 12, border: '1px solid #DCFCE7', fontSize: 13 }}
              labelStyle={{ color: '#17251B', fontWeight: 600 }}
            />
            <Bar dataKey="reports" name="Reports" fill="#166534" radius={[6, 6, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
