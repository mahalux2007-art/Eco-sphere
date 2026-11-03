import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ClipboardList, SearchX } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import ReportFilters from '../components/reports/ReportFilters';
import ReportCard from '../components/reports/ReportCard';
import ReportDetailModal from '../components/reports/ReportDetailModal';
import EmptyState from '../components/ui/EmptyState';
import { CardSkeleton } from '../components/ui/Skeleton';
import { getReports } from '../services/reportsService';

export default function Reports() {
  const [reports, setReports] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getReports().then(setReports);
  }, []);

  const filtered = useMemo(() => {
    if (!reports) return [];
    const q = search.trim().toLowerCase();
    return reports.filter((r) => {
      const matchesSearch = !q || r.title.toLowerCase().includes(q) || r.location.toLowerCase().includes(q);
      const matchesCategory = category === 'All' || r.category === category;
      const matchesStatus = status === 'All' || r.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [reports, search, category, status]);

  return (
    <div>
      <PageHeader
        title="Environmental Reports"
        description="Browse issues reported across campus and track their resolution."
        actions={
          <Link to="/reports/new" className="btn-primary">
            <Plus size={16} /> New Report
          </Link>
        }
      />

      <ReportFilters
        search={search}
        onSearch={setSearch}
        category={category}
        onCategory={setCategory}
        status={status}
        onStatus={setStatus}
      />

      <div className="mt-6">
        {reports === null ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={reports.length === 0 ? ClipboardList : SearchX}
            title={reports.length === 0 ? 'No reports yet' : 'No matching reports'}
            description={
              reports.length === 0
                ? 'Be the first to report an environmental issue on campus.'
                : 'Try a different search term or clear your filters.'
            }
            action={
              reports.length === 0 ? (
                <Link to="/reports/new" className="btn-primary">
                  <Plus size={16} /> New Report
                </Link>
              ) : undefined
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <ReportCard key={r.id} report={r} onClick={setSelected} />
            ))}
          </div>
        )}
      </div>

      <ReportDetailModal report={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
