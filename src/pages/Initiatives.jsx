import { useEffect, useState } from 'react';
import { Users2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import InitiativeCard from '../components/initiatives/InitiativeCard';
import EmptyState from '../components/ui/EmptyState';
import { CardSkeleton } from '../components/ui/Skeleton';
import { getInitiatives, joinInitiative, leaveInitiative } from '../services/initiativesService';
import { useToast } from '../hooks/ToastContext';

const FILTERS = ['All', 'Upcoming', 'Ongoing', 'Completed'];

export default function Initiatives() {
  const { showToast } = useToast();
  const [initiatives, setInitiatives] = useState(null);
  const [filter, setFilter] = useState('All');
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    getInitiatives().then(setInitiatives);
  }, []);

  const handleJoin = async (id) => {
    setBusyId(id);
    const updated = await joinInitiative(id);
    setInitiatives(updated);
    setBusyId(null);
    const i = updated.find((x) => x.id === id);
    showToast(`You've joined "${i.title}".`, { type: 'success' });
  };

  const handleLeave = async (id) => {
    setBusyId(id);
    const updated = await leaveInitiative(id);
    setInitiatives(updated);
    setBusyId(null);
    const i = updated.find((x) => x.id === id);
    showToast(`You've left "${i.title}".`, { type: 'info' });
  };

  const filtered = initiatives?.filter((i) => filter === 'All' || i.status === filter) ?? [];

  return (
    <div>
      <PageHeader
        title="Community Initiatives"
        description="Join campus clean-ups, recycling drives, and planting events happening near you."
      />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f
                ? 'border-forest-700 bg-forest-700 text-white'
                : 'border-forest-100 bg-white text-muted hover:border-forest-300 hover:text-forest-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {initiatives === null ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Users2}
            title="No initiatives here"
            description="Check back soon or try a different filter."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((i) => (
              <InitiativeCard
                key={i.id}
                initiative={i}
                onJoin={handleJoin}
                onLeave={handleLeave}
                busy={busyId === i.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
