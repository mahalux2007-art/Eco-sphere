import Card from '../ui/Card';

export default function SummaryCard({ icon: Icon, label, value, accent = 'bg-forest-100 text-forest-700' }) {
  return (
    <Card hover className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted">{label}</p>
          <p className="mt-1.5 text-2xl font-bold text-ink">{value}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent}`}>
          <Icon size={18} />
        </div>
      </div>
    </Card>
  );
}
