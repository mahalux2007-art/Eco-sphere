import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ListingTypeBadge } from '../ui/StatusBadge';
import { CATEGORY_ICONS } from './categoryIcons';
import { timeAgo } from '../../utils/date';

export default function ListingCard({ listing, onClick }) {
  const Icon = CATEGORY_ICONS[listing.category] || CATEGORY_ICONS.Other;

  return (
    <Card hover className="flex cursor-pointer flex-col overflow-hidden text-left" onClick={() => onClick(listing)}>
      <div className="flex h-36 items-center justify-center bg-forest-50">
        {listing.imageUrl ? (
          <img src={listing.imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <Icon size={36} className="text-forest-300" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Badge bg="bg-slate-100" text="text-slate-700">
            {listing.category}
          </Badge>
          <ListingTypeBadge type={listing.listingType} />
        </div>
        <h3 className="text-sm font-semibold leading-snug text-ink line-clamp-2">{listing.title}</h3>
        <p className="mt-auto flex items-center justify-between text-xs text-muted">
          <span>{listing.condition}</span>
          <span>{timeAgo(listing.postedDate)}</span>
        </p>
      </div>
    </Card>
  );
}
