import { MapPin, Calendar, Users2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { InitiativeStatusBadge } from '../ui/StatusBadge';
import { INITIATIVE_ICONS } from './initiativeIcons';
import { formatDate } from '../../utils/date';

export default function InitiativeCard({ initiative, onJoin, onLeave, busy }) {
  const Icon = INITIATIVE_ICONS[initiative.type] || Users2;
  const isPast = initiative.status === 'Completed';

  return (
    <Card hover className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
            <Icon size={18} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted">{initiative.type}</p>
            <h3 className="text-sm font-semibold text-ink">{initiative.title}</h3>
          </div>
        </div>
        <InitiativeStatusBadge status={initiative.status} />
      </div>

      <p className="text-sm text-muted">{initiative.description}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <span className="flex items-center gap-1">
          <Calendar size={12} /> {formatDate(initiative.date)}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {initiative.location}
        </span>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1">
            <Users2 size={12} /> {initiative.participantCount} / {initiative.goalCount} joined
          </span>
          <span>{Math.round((initiative.participantCount / initiative.goalCount) * 100)}%</span>
        </div>
        <ProgressBar value={initiative.participantCount} max={initiative.goalCount} />
      </div>

      {!isPast && (
        <Button
          variant={initiative.joined ? 'secondary' : 'primary'}
          className="w-full"
          loading={busy}
          onClick={() => (initiative.joined ? onLeave(initiative.id) : onJoin(initiative.id))}
        >
          {initiative.joined ? 'Leave initiative' : 'Join initiative'}
        </Button>
      )}
    </Card>
  );
}
