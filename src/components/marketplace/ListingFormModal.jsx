import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { TextField, TextArea, SelectField } from '../ui/FormField';
import ImageUpload from '../ui/ImageUpload';
import { LISTING_CATEGORIES, LISTING_TYPES, LISTING_CONDITIONS } from '../../data/constants';

const initialForm = {
  title: '',
  category: '',
  condition: '',
  listingType: '',
  description: '',
  imageUrl: null,
};

export default function ListingFormModal({ open, onClose, onSubmit, submitting }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Give your item a title.';
    if (!form.category) next.category = 'Select a category.';
    if (!form.condition) next.condition = 'Select a condition.';
    if (!form.listingType) next.listingType = 'Select a listing type.';
    if (!form.description.trim() || form.description.trim().length < 10)
      next.description = 'Add a short description (10+ characters).';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
    setForm(initialForm);
    setErrors({});
  };

  const handleClose = () => {
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="List an item" size="lg">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <TextField
          id="listing-title"
          label="Item title"
          placeholder="e.g. Organic Chemistry Textbook (6th Ed.)"
          value={form.title}
          onChange={update('title')}
          error={errors.title}
          required
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SelectField
            id="listing-category"
            label="Category"
            value={form.category}
            onChange={update('category')}
            error={errors.category}
            required
            options={[{ value: '', label: 'Select' }, ...LISTING_CATEGORIES]}
          />
          <SelectField
            id="listing-condition"
            label="Condition"
            value={form.condition}
            onChange={update('condition')}
            error={errors.condition}
            required
            options={[{ value: '', label: 'Select' }, ...LISTING_CONDITIONS]}
          />
          <SelectField
            id="listing-type"
            label="Listing type"
            value={form.listingType}
            onChange={update('listingType')}
            error={errors.listingType}
            required
            options={[{ value: '', label: 'Select' }, ...LISTING_TYPES]}
          />
        </div>

        <TextArea
          id="listing-description"
          label="Description"
          placeholder="Condition details, why you're sharing it, pickup preferences..."
          value={form.description}
          onChange={update('description')}
          error={errors.description}
          required
        />

        <ImageUpload
          value={form.imageUrl}
          onChange={(imageUrl) => setForm((f) => ({ ...f, imageUrl }))}
          hint="A clear photo helps other students know what to expect."
        />

        <div className="flex justify-end gap-3 border-t border-forest-100 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            List item
          </Button>
        </div>
      </form>
    </Modal>
  );
}
