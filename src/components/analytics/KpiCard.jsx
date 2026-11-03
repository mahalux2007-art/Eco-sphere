import Card from '../ui/Card';

export default function KpiCard({ icon: Icon, label, value, sublabel }) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
        <Icon size={18} />
      </div>
      <p className="text-2xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-xs font-medium text-muted">{label}</p>
      {sublabel && <p className="mt-2 text-xs text-muted">{sublabel}</p>}
    </Card>
  );
}
