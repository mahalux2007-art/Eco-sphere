import { MapPin, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import { ReportStatusBadge, CategoryBadge } from '../ui/StatusBadge';
import { formatDate } from '../../utils/date';

export default function ReportCard({ report, onClick }) {
  return (
    <Card hover className="flex cursor-pointer flex-col gap-3 p-5 text-left" onClick={() => onClick(report)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={report.category} />
        </div>
        <ReportStatusBadge status={report.status} />
      </div>

      <h3 className="text-sm font-semibold leading-snug text-ink line-clamp-2">{report.title}</h3>
      <p className="text-sm text-muted line-clamp-2">{report.description}</p>

      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {report.location}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={12} /> {formatDate(report.date)}
        </span>
      </div>
    </Card>
  );
}
