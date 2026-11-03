import { useState } from 'react';
import { User, Calendar, CheckCircle2 } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { ListingTypeBadge } from '../ui/StatusBadge';
import Badge from '../ui/Badge';
import { formatDate } from '../../utils/date';
import { CATEGORY_ICONS } from './categoryIcons';

export default function ListingDetailModal({ listing, onClose }) {
  const [interested, setInterested] = useState(false);

  if (!listing) return null;
  const Icon = CATEGORY_ICONS[listing.category] || CATEGORY_ICONS.Other;

  return (
    <Modal open={Boolean(listing)} onClose={() => { onClose(); setInterested(false); }} title="Item details" size="md">
      <div className="space-y-4">
        <div className="flex h-44 items-center justify-center rounded-xl bg-forest-50">
          {listing.imageUrl ? (
            <img src={listing.imageUrl} alt="" className="h-full w-full rounded-xl object-cover" />
          ) : (
            <Icon size={44} className="text-forest-300" />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge bg="bg-slate-100" text="text-slate-700">
            {listing.category}
          </Badge>
          <ListingTypeBadge type={listing.listingType} />
          <Badge bg="bg-forest-50" text="text-forest-700">
            {listing.condition}
          </Badge>
        </div>

        <h3 className="text-lg font-semibold text-ink">{listing.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{listing.description}</p>

        <dl className="grid grid-cols-1 gap-3 rounded-xl bg-forest-50/60 p-4 text-sm sm:grid-cols-2">
          <div className="flex items-start gap-2">
            <User size={15} className="mt-0.5 shrink-0 text-forest-600" />
            <div>
              <dt className="text-xs text-muted">Listed by</dt>
              <dd className="font-medium text-ink">{listing.ownerName}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar size={15} className="mt-0.5 shrink-0 text-forest-600" />
            <div>
              <dt className="text-xs text-muted">Posted</dt>
              <dd className="font-medium text-ink">{formatDate(listing.postedDate)}</dd>
            </div>
          </div>
        </dl>

        {interested ? (
          <div className="flex items-center gap-2 rounded-xl bg-forest-50 p-4 text-sm text-forest-700">
            <CheckCircle2 size={18} className="shrink-0" />
            <p>
              You've expressed interest in this item. In a connected version of EcoSphere, {listing.ownerName.split(' ')[0]} would be notified to coordinate a handoff.
            </p>
          </div>
        ) : (
          <Button className="w-full" onClick={() => setInterested(true)}>
            I'm Interested
          </Button>
        )}
      </div>
    </Modal>
  );
}
