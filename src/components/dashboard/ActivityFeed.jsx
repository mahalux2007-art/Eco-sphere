import { FileWarning, CheckCircle2, Recycle, Users2, Star } from 'lucide-react';
import Card from '../ui/Card';
import { timeAgo } from '../../utils/date';

const ICONS = {
  report: { icon: FileWarning, bg: 'bg-sky-50', text: 'text-sky-600' },
  resolved: { icon: CheckCircle2, bg: 'bg-forest-50', text: 'text-forest-600' },
  listing: { icon: Recycle, bg: 'bg-amber-50', text: 'text-amber-600' },
  initiative: { icon: Users2, bg: 'bg-violet-50', text: 'text-violet-600' },
  points: { icon: Star, bg: 'bg-forest-50', text: 'text-forest-600' },
};

export default function ActivityFeed({ items }) {
  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-ink">Community activity</h3>
      <ul className="space-y-4">
        {items.map((item) => {
          const cfg = ICONS[item.type] || ICONS.report;
          const Icon = cfg.icon;
          return (
            <li key={item.id} className="flex items-start gap-3">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${cfg.bg} ${cfg.text}`}>
                <Icon size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-ink">
                  <span className="font-semibold">{item.actor}</span> {item.detail}
                </p>
                <p className="mt-0.5 text-xs text-muted">{timeAgo(item.date)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
