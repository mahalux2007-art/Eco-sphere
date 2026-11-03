import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileWarning, CheckCircle2, Star, Recycle, Plus, Share2, Users2 } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import SummaryCard from '../components/dashboard/SummaryCard';
import RecentReportsCard from '../components/dashboard/RecentReportsCard';
import ChallengesCard from '../components/dashboard/ChallengesCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import WeeklyActivityChart from '../components/dashboard/WeeklyActivityChart';
import TipCard from '../components/dashboard/TipCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import { useAuth } from '../hooks/AuthContext';
import { getReports } from '../services/reportsService';
import { getWeeklyActivity } from '../services/analyticsService';
import { SEED_ACTIVITY_FEED, SEED_CHALLENGES, SUSTAINABILITY_TIPS } from '../data/seedData';

export default function Dashboard() {
  const { user } = useAuth();
  const [reports, setReports] = useState(null);
  const [weekly, setWeekly] = useState(null);

  useEffect(() => {
    getReports().then(setReports);
    getWeeklyActivity().then(setWeekly);
  }, []);

  const tip = useMemo(
    () => SUSTAINABILITY_TIPS[Math.floor(Math.random() * SUSTAINABILITY_TIPS.length)],
    []
  );

  const myReports = reports?.filter((r) => r.reporterName === user?.name) ?? [];
  const resolvedCount = myReports.filter((r) => r.status === 'Resolved').length;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={user?.name} size="lg" />
          <div>
            <h1 className="text-xl font-bold text-ink sm:text-2xl">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-sm text-muted">
              {user?.major} · {user?.year}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/reports/new" className="btn-primary">
            <Plus size={16} /> Report an Issue
          </Link>
          <Link to="/marketplace" className="btn-secondary">
            <Share2 size={16} /> Share an Item
          </Link>
          <Link to="/initiatives" className="btn-secondary">
            <Users2 size={16} /> Explore Initiatives
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryCard icon={FileWarning} label="Reports Submitted" value={user?.reportsSubmitted ?? 0} accent="bg-sky-50 text-sky-700" />
        <SummaryCard icon={CheckCircle2} label="Issues Resolved" value={user?.issuesResolved ?? 0} accent="bg-forest-100 text-forest-700" />
        <SummaryCard icon={Star} label="Eco Points" value={user?.ecoPoints ?? 0} accent="bg-amber-50 text-amber-700" />
        <SummaryCard icon={Recycle} label="Resources Reused" value={user?.resourcesReused ?? 0} accent="bg-violet-50 text-violet-700" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {reports === null ? (
            <div className="grid gap-4"><CardSkeleton /></div>
          ) : (
            <RecentReportsCard reports={myReports.slice(0, 4)} />
          )}

          {weekly === null ? <CardSkeleton /> : <WeeklyActivityChart data={weekly} />}

          <ActivityFeed items={SEED_ACTIVITY_FEED} />
        </div>

        <div className="space-y-6">
          <TipCard tip={tip} />
          <ChallengesCard challenges={SEED_CHALLENGES} />
          {resolvedCount > 0 && (
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-ink">Nice work!</h3>
              <p className="mt-1.5 text-sm text-muted">
                {resolvedCount} of your reports have been resolved this semester. Keep an eye out for more.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
