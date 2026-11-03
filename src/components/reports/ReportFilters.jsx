import { Search } from 'lucide-react';
import { REPORT_CATEGORIES, REPORT_STATUSES } from '../../data/constants';

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-forest-700 bg-forest-700 text-white'
          : 'border-forest-100 bg-white text-muted hover:border-forest-300 hover:text-forest-700'
      }`}
    >
      {children}
    </button>
  );
}

export default function ReportFilters({ search, onSearch, category, onCategory, status, onStatus }) {
  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search reports by title or location..."
          aria-label="Search reports"
          className="input pl-9 bg-white"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Pill active={category === 'All'} onClick={() => onCategory('All')}>
          All categories
        </Pill>
        {REPORT_CATEGORIES.map((c) => (
          <Pill key={c} active={category === c} onClick={() => onCategory(c)}>
            {c}
          </Pill>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Pill active={status === 'All'} onClick={() => onStatus('All')}>
          All statuses
        </Pill>
        {REPORT_STATUSES.map((s) => (
          <Pill key={s} active={status === s} onClick={() => onStatus(s)}>
            {s}
          </Pill>
        ))}
      </div>
    </div>
  );
}
