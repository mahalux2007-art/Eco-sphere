import { useEffect, useState } from 'react';
import { CheckCircle2, Recycle, Users2, Info } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import KpiCard from '../components/analytics/KpiCard';
import MonthlyReportsChart from '../components/analytics/MonthlyReportsChart';
import ResolutionTrendChart from '../components/analytics/ResolutionTrendChart';
import CategoryDoughnutChart from '../components/analytics/CategoryDoughnutChart';
import { CardSkeleton } from '../components/ui/Skeleton';
import { getAnalyticsOverview } from '../services/analyticsService';

const PERIODS = [
  { value: '3m', label: 'Last 3 months' },
  { value: '6m', label: 'Last 6 months' },
  { value: '12m', label: 'Last 12 months' },
];

export default function Analytics() {
  const [period, setPeriod] = useState('6m');
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    getAnalyticsOverview(period).then(setData);
  }, [period]);

  return (
    <div>
      <PageHeader
        title="Sustainability Analytics"
        description="Track trends in reporting, resource reuse, and community participation."
        actions={
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            aria-label="Select time period"
            className="input w-auto appearance-none py-2"
          >
            {PERIODS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        }
      />

      {data === null ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <KpiCard icon={CheckCircle2} label="Reports Resolved" value={data.kpis.reportsResolved} sublabel="Across all categories" />
            <KpiCard icon={Recycle} label="Resources Reused" value={data.kpis.resourcesReused} sublabel="Items shared or exchanged" />
            <KpiCard icon={Users2} label="Community Participation" value={data.kpis.communityParticipation} sublabel="Initiative sign-ups" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <MonthlyReportsChart data={data.monthlyReports} />
            <ResolutionTrendChart data={data.resolutionTrends} />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <CategoryDoughnutChart data={data.categoryBreakdown} />

            <div className="card p-5">
              <h3 className="mb-3 text-sm font-semibold text-ink">Measured vs. estimated impact</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-xl bg-forest-50/60 p-3">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-forest-600" />
                  <div>
                    <p className="text-sm font-medium text-ink">Measured: report counts & participation</p>
                    <p className="text-xs text-muted">
                      Numbers of reports, resolutions, and initiative sign-ups are counted directly from
                      platform activity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-3">
                  <Info size={16} className="mt-0.5 shrink-0 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-ink">Estimated: environmental impact</p>
                    <p className="text-xs text-muted">
                      Figures like water or energy saved are not yet measured by real sensors — they would
                      require integration with campus facilities data in a future version.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-xl border border-dashed border-forest-200 bg-white px-4 py-3 text-xs text-muted">
            <Info size={14} className="mt-0.5 shrink-0 text-forest-600" />
            All figures on this page are sample demonstration data generated for this project and do not
            represent verified real-world environmental measurements.
          </div>
        </>
      )}
    </div>
  );
}
