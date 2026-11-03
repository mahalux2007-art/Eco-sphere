import { useEffect, useMemo, useState } from 'react';
import { Plus, Recycle, SearchX } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import ListingFilters from '../components/marketplace/ListingFilters';
import ListingCard from '../components/marketplace/ListingCard';
import ListingDetailModal from '../components/marketplace/ListingDetailModal';
import ListingFormModal from '../components/marketplace/ListingFormModal';
import EmptyState from '../components/ui/EmptyState';
import { CardSkeleton } from '../components/ui/Skeleton';
import { getListings, createListing } from '../services/marketplaceService';
import { useAuth } from '../hooks/AuthContext';
import { useToast } from '../hooks/ToastContext';

export default function Marketplace() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [listings, setListings] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getListings().then(setListings);
  }, []);

  const filtered = useMemo(() => {
    if (!listings) return [];
    const q = search.trim().toLowerCase();
    return listings.filter((l) => {
      const matchesSearch = !q || l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q);
      const matchesCategory = category === 'All' || l.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [listings, search, category]);

  const handleCreate = async (data) => {
    setSubmitting(true);
    const newListing = await createListing({ ...data, ownerName: user?.name });
    setListings((prev) => [newListing, ...prev]);
    setSubmitting(false);
    setFormOpen(false);
    showToast('Your item is now listed in the marketplace.', { type: 'success' });
  };

  return (
    <div>
      <PageHeader
        title="Resource Sharing"
        description="Give items a second life by sharing, exchanging, or giving them away to fellow students."
        actions={
          <button type="button" onClick={() => setFormOpen(true)} className="btn-primary">
            <Plus size={16} /> List an Item
          </button>
        }
      />

      <ListingFilters search={search} onSearch={setSearch} category={category} onCategory={setCategory} />

      <div className="mt-6">
        {listings === null ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={listings.length === 0 ? Recycle : SearchX}
            title={listings.length === 0 ? 'No listings yet' : 'No matching items'}
            description={
              listings.length === 0
                ? 'Be the first to share something with the community.'
                : 'Try a different search term or category.'
            }
            action={
              listings.length === 0 ? (
                <button type="button" onClick={() => setFormOpen(true)} className="btn-primary">
                  <Plus size={16} /> List an Item
                </button>
              ) : undefined
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((l) => (
              <ListingCard key={l.id} listing={l} onClick={setSelected} />
            ))}
          </div>
        )}
      </div>

      <ListingDetailModal listing={selected} onClose={() => setSelected(null)} />
      <ListingFormModal open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleCreate} submitting={submitting} />
    </div>
  );
}
