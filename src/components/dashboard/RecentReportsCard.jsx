import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import { ReportStatusBadge } from '../ui/StatusBadge';
import { formatDate } from '../../utils/date';
import EmptyState from '../ui/EmptyState';
import { ClipboardList } from 'lucide-react';

export default function RecentReportsCard({ reports }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">Your recent reports</h3>
        <Link to="/reports" className="flex items-center gap-1 text-xs font-semibold text-forest-700 hover:underline">
          View all <ArrowRight size={12} />
        </Link>
      </div>

      {reports.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No reports yet"
          description="Reports you submit will show up here."
        />
      ) : (
        <ul className="divide-y divide-forest-50">
          {reports.map((r) => (
            <li key={r.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{r.title}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                  <MapPin size={11} /> {r.location} · {formatDate(r.date)}
                </p>
              </div>
              <ReportStatusBadge status={r.status} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
