import { MapPin, Calendar, User } from 'lucide-react';
import Modal from '../ui/Modal';
import { ReportStatusBadge, CategoryBadge } from '../ui/StatusBadge';
import { formatDate } from '../../utils/date';
import { REPORT_STATUSES } from '../../data/constants';
import Button from '../ui/Button';

export default function ReportDetailModal({ report, onClose, onStatusChange, allowStatusChange = false }) {
  if (!report) return null;

  return (
    <Modal open={Boolean(report)} onClose={onClose} title="Report details" size="md">
      <div className="space-y-4">
        {report.imageUrl && (
          <img src={report.imageUrl} alt="" className="h-48 w-full rounded-xl object-cover" />
        )}

        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={report.category} />
          <ReportStatusBadge status={report.status} />
        </div>

        <h3 className="text-lg font-semibold text-ink">{report.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{report.description}</p>

        <dl className="grid grid-cols-1 gap-3 rounded-xl bg-forest-50/60 p-4 text-sm sm:grid-cols-2">
          <div className="flex items-start gap-2">
            <MapPin size={15} className="mt-0.5 shrink-0 text-forest-600" />
            <div>
              <dt className="text-xs text-muted">Location</dt>
              <dd className="font-medium text-ink">{report.location}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar size={15} className="mt-0.5 shrink-0 text-forest-600" />
            <div>
              <dt className="text-xs text-muted">Reported on</dt>
              <dd className="font-medium text-ink">{formatDate(report.date)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2 sm:col-span-2">
            <User size={15} className="mt-0.5 shrink-0 text-forest-600" />
            <div>
              <dt className="text-xs text-muted">Reported by</dt>
              <dd className="font-medium text-ink">{report.reporterName}</dd>
            </div>
          </div>
        </dl>

        {allowStatusChange && (
          <div>
            <label htmlFor="status-change" className="label">
              Update status
            </label>
            <select
              id="status-change"
              value={report.status}
              onChange={(e) => onStatusChange(report.id, e.target.value)}
              className="input appearance-none"
            >
              {REPORT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </Modal>
  );
}
