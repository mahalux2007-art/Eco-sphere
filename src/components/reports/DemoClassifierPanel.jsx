import { Sparkles, Wand2 } from 'lucide-react';
import { CategoryBadge } from '../ui/StatusBadge';

export default function DemoClassifierPanel({ suggestion, onApply, applied }) {
  if (!suggestion) return null;

  return (
    <div className="rounded-xl border border-dashed border-forest-300 bg-forest-50/60 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-forest-700">
        <Sparkles size={14} />
        Demo AI classification (local, rule-based)
      </div>
      <p className="mt-2 text-sm text-ink">
        Based on keywords in your title and description, this looks like a{' '}
        <CategoryBadge category={suggestion.category} /> issue.
      </p>
      <p className="mt-1.5 text-xs text-muted">
        This suggestion runs entirely in your browser using simple keyword matching — it does not call any
        real AI service.
      </p>
      {!applied && (
        <button
          type="button"
          onClick={onApply}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-forest-700 border border-forest-200 hover:bg-forest-100"
        >
          <Wand2 size={13} /> Use this category
        </button>
      )}
    </div>
  );
}
