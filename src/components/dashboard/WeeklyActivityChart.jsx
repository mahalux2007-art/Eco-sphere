import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Card from '../ui/Card';

export default function WeeklyActivityChart({ data }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">Weekly activity</h3>
        <span className="text-xs text-muted">Eco points earned per day</span>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#EEF5F0" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#647067', fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#647067', fontSize: 12 }} width={32} />
            <Tooltip
              cursor={{ fill: '#F0FAF3' }}
              contentStyle={{ borderRadius: 12, border: '1px solid #DCFCE7', fontSize: 13 }}
              labelStyle={{ color: '#17251B', fontWeight: 600 }}
            />
            <Bar dataKey="points" name="Eco points" fill="#22C55E" radius={[6, 6, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
