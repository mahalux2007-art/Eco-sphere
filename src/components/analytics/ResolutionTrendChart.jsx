import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import Card from '../ui/Card';

export default function ResolutionTrendChart({ data }) {
  return (
    <Card className="p-5">
      <h3 className="mb-1 text-sm font-semibold text-ink">Issue resolution trend</h3>
      <p className="mb-4 text-xs text-muted">Submitted vs. resolved reports over time</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#EEF5F0" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#647067', fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#647067', fontSize: 12 }} width={32} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #DCFCE7', fontSize: 13 }}
              labelStyle={{ color: '#17251B', fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#647067' }} />
            <Line type="monotone" dataKey="submitted" name="Submitted" stroke="#86EFAC" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#166534" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
