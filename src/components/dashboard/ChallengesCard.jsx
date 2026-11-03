import { Target } from 'lucide-react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

export default function ChallengesCard({ challenges }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <Target size={16} className="text-forest-600" />
        <h3 className="text-sm font-semibold text-ink">Upcoming challenges</h3>
      </div>
      <ul className="space-y-4">
        {challenges.map((c) => (
          <li key={c.id}>
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-sm font-medium text-ink">{c.title}</p>
              <span className="shrink-0 text-xs font-semibold text-forest-600">+{c.reward} pts</span>
            </div>
            <ProgressBar value={c.progress} max={c.goal} />
            <p className="mt-1 text-xs text-muted">
              {c.progress}/{c.goal} complete
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
