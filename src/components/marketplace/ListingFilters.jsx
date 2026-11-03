import { Search } from 'lucide-react';
import { LISTING_CATEGORIES } from '../../data/constants';

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

export default function ListingFilters({ search, onSearch, category, onCategory }) {
  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search items..."
          aria-label="Search marketplace listings"
          className="input pl-9 bg-white"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Pill active={category === 'All'} onClick={() => onCategory('All')}>
          All categories
        </Pill>
        {LISTING_CATEGORIES.map((c) => (
          <Pill key={c} active={category === c} onClick={() => onCategory(c)}>
            {c}
          </Pill>
        ))}
      </div>
    </div>
  );
}
