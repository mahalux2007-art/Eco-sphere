import { useEffect, useMemo, useState } from 'react';
import { ShieldCheck, ClipboardList, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { CategoryBadge } from '../components/ui/StatusBadge';
import { CardSkeleton } from '../components/ui/Skeleton';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import KpiCard from '../components/analytics/KpiCard';
import { REPORT_STATUSES, REPORT_CATEGORIES } from '../data/constants';
import { formatDate } from '../utils/date';
import { getReports, updateReportStatus } from '../services/reportsService';
import { useAuth } from '../hooks/AuthContext';
import { useToast } from '../hooks/ToastContext';
import { SEED_ACTIVITY_FEED } from '../data/seedData';

export default function Admin() {
  const { isModerator, switchRole } = useAuth();
  const { showToast } = useToast();

  const [reports, setReports] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (isModerator) getReports().then(setReports);
  }, [isModerator]);

  const filtered = useMemo(() => {
    if (!reports) return [];
    return reports.filter(
      (r) =>
        (statusFilter === 'All' || r.status === statusFilter) &&
        (categoryFilter === 'All' || r.category === categoryFilter)
    );
  }, [reports, statusFilter, categoryFilter]);

  const counts = useMemo(() => {
    const base = { Submitted: 0, 'Under Review': 0, 'In Progress': 0, Resolved: 0 };
    reports?.forEach((r) => (base[r.status] = (base[r.status] || 0) + 1));
    return REPORT_STATUSES.map((s) => ({ status: s, count: base[s] || 0 }));
  }, [reports]);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    const updated = await updateReportStatus(id, status);
    setReports((prev) => prev.map((r) => (r.id === id ? updated : r)));
    setUpdatingId(null);
    showToast(`Report status updated to "${status}".`, { type: 'success' });
  };

  if (!isModerator) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <ShieldCheck size={26} />
        </div>
        <h1 className="text-lg font-bold text-ink">Moderator access required</h1>
        <p className="mt-2 text-sm text-muted">
          This demo page is only visible in moderator demo mode. Switch roles to preview the admin
          dashboard — this is a frontend-only demo switch, not a real permissions change.
        </p>
        <Button className="mt-5" onClick={() => switchRole('moderator')}>
          Switch to moderator demo mode
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Review and manage environmental reports across campus."
        actions={
          <Badge bg="bg-amber-50" text="text-amber-700">
            <ShieldCheck size={13} /> Moderator demo mode
          </Badge>
        }
      />

      {reports === null ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <KpiCard icon={ClipboardList} label="Total Reports" value={reports.length} />
            <KpiCard icon={AlertCircle} label="Under Review" value={reports.filter((r) => r.status === 'Under Review').length} />
            <KpiCard icon={Clock} label="In Progress" value={reports.filter((r) => r.status === 'In Progress').length} />
            <KpiCard icon={CheckCircle2} label="Resolved" value={reports.filter((r) => r.status === 'Resolved').length} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Card className="p-5 lg:col-span-2">
              <h3 className="mb-4 text-sm font-semibold text-ink">Reports by status</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={counts} layout="vertical" margin={{ left: 8, right: 16 }}>
                    <CartesianGrid horizontal={false} stroke="#EEF5F0" />
                    <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#647067', fontSize: 12 }} />
                    <YAxis type="category" dataKey="status" tickLine={false} axisLine={false} width={100} tick={{ fill: '#647067', fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DCFCE7', fontSize: 13 }} cursor={{ fill: '#F0FAF3' }} />
                    <Bar dataKey="count" fill="#166534" radius={[0, 6, 6, 0]} maxBarSize={22} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <ActivityFeed items={SEED_ACTIVITY_FEED.slice(0, 5)} />
          </div>

          <Card className="mt-6 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest-100 p-4">
              <h3 className="text-sm font-semibold text-ink">Report management</h3>
              <div className="flex flex-wrap gap-2">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  aria-label="Filter by category"
                  className="input w-auto appearance-none py-1.5 text-xs"
                >
                  <option value="All">All categories</option>
                  {REPORT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                  className="input w-auto appearance-none py-1.5 text-xs"
                >
                  <option value="All">All statuses</option>
                  {REPORT_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-forest-100 text-xs text-muted">
                    <th className="px-4 py-3 font-medium">Report</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Reporter</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b border-forest-50 last:border-0 hover:bg-forest-50/40">
                      <td className="px-4 py-3">
                        <p className="max-w-xs truncate font-medium text-ink">{r.title}</p>
                        <p className="truncate text-xs text-muted">{r.location}</p>
                      </td>
                      <td className="px-4 py-3"><CategoryBadge category={r.category} /></td>
                      <td className="px-4 py-3 text-ink">{r.reporterName}</td>
                      <td className="px-4 py-3 text-muted">{formatDate(r.date)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <select
                            value={r.status}
                            disabled={updatingId === r.id}
                            onChange={(e) => handleStatusChange(r.id, e.target.value)}
                            aria-label={`Update status for ${r.title}`}
                            className="input w-auto appearance-none py-1.5 text-xs"
                          >
                            {REPORT_STATUSES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <p className="px-4 py-10 text-center text-sm text-muted">No reports match these filters.</p>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
