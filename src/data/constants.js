export const REPORT_CATEGORIES = ['Water', 'Waste', 'Energy', 'Other'];

export const REPORT_STATUSES = ['Submitted', 'Under Review', 'In Progress', 'Resolved'];

export const LISTING_CATEGORIES = ['Books', 'Electronics', 'Stationery', 'Clothing', 'Other'];

export const LISTING_TYPES = ['Free', 'Exchange', 'Reusable'];

export const LISTING_CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];

export const INITIATIVE_TYPES = ['Clean-up', 'Recycling', 'Tree Planting', 'Waste Reduction'];

export const INITIATIVE_STATUSES = ['Upcoming', 'Ongoing', 'Completed'];

export const STATUS_STYLES = {
  Submitted: { bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500' },
  'Under Review': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  'In Progress': { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
  Resolved: { bg: 'bg-forest-50', text: 'text-forest-700', dot: 'bg-forest-500' },
};

export const CATEGORY_STYLES = {
  Water: { bg: 'bg-sky-50', text: 'text-sky-700' },
  Waste: { bg: 'bg-amber-50', text: 'text-amber-700' },
  Energy: { bg: 'bg-violet-50', text: 'text-violet-700' },
  Other: { bg: 'bg-slate-100', text: 'text-slate-700' },
};

export const LISTING_TYPE_STYLES = {
  Free: { bg: 'bg-forest-50', text: 'text-forest-700' },
  Exchange: { bg: 'bg-amber-50', text: 'text-amber-700' },
  Reusable: { bg: 'bg-sky-50', text: 'text-sky-700' },
};

export const INITIATIVE_STATUS_STYLES = {
  Upcoming: { bg: 'bg-sky-50', text: 'text-sky-700' },
  Ongoing: { bg: 'bg-forest-50', text: 'text-forest-700' },
  Completed: { bg: 'bg-slate-100', text: 'text-slate-600' },
};
