import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { TextField, TextArea, SelectField } from '../components/ui/FormField';
import ImageUpload from '../components/ui/ImageUpload';
import DemoClassifierPanel from '../components/reports/DemoClassifierPanel';
import { REPORT_CATEGORIES } from '../data/constants';
import { suggestCategory } from '../utils/demoClassifier';
import { createReport } from '../services/reportsService';
import { useAuth } from '../hooks/AuthContext';
import { useToast } from '../hooks/ToastContext';

const initialForm = { title: '', category: '', location: '', description: '', imageUrl: null };

export default function ReportNew() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appliedSuggestion, setAppliedSuggestion] = useState(false);

  const suggestion = useMemo(() => {
    if (!form.title && !form.description) return null;
    return suggestCategory(form.title, form.description);
  }, [form.title, form.description]);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (field === 'category') setAppliedSuggestion(false);
  };

  const applySuggestion = () => {
    setForm((f) => ({ ...f, category: suggestion.category }));
    setAppliedSuggestion(true);
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Give your report a short title.';
    if (!form.category) next.category = 'Select a category.';
    if (!form.location.trim()) next.location = 'Add a campus location.';
    if (!form.description.trim() || form.description.trim().length < 15)
      next.description = 'Describe the issue in at least 15 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await createReport({ ...form, reporterName: user?.name });
    setSubmitting(false);
    setSuccess(true);
    showToast('Report submitted — thanks for helping your campus!', { type: 'success' });
  };

  if (success) {
    return (
      <div className="mx-auto max-w-lg py-10 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-700">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="text-xl font-bold text-ink">Report submitted</h1>
        <p className="mt-2 text-sm text-muted">
          Thanks, {user?.name?.split(' ')[0]}! Your report "{form.title}" has been added with status{' '}
          <strong>Submitted</strong> and is now visible in the reports list.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/reports" className="btn-primary">
            View all reports
          </Link>
          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setErrors({});
              setAppliedSuggestion(false);
              setSuccess(false);
            }}
            className="btn-secondary"
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/reports" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-forest-700">
        <ArrowLeft size={15} /> Back to reports
      </Link>
      <PageHeader title="Report an Issue" description="Flag an environmental issue so it can be reviewed and resolved." />

      <Card className="p-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <TextField
            id="title"
            label="Issue title"
            placeholder="e.g. Leaking faucet in Bellweather Hall"
            value={form.title}
            onChange={update('title')}
            error={errors.title}
            required
          />

          <DemoClassifierPanel suggestion={suggestion} onApply={applySuggestion} applied={appliedSuggestion} />

          <SelectField
            id="category"
            label="Category"
            value={form.category}
            onChange={update('category')}
            error={errors.category}
            required
            options={[{ value: '', label: 'Select a category' }, ...REPORT_CATEGORIES]}
          />

          <TextField
            id="location"
            label="Campus location"
            placeholder="e.g. Hartwell Science Center, Room 114"
            value={form.location}
            onChange={update('location')}
            error={errors.location}
            required
          />

          <TextArea
            id="description"
            label="Description"
            placeholder="Describe what you observed, how long it's been happening, and anything else helpful..."
            value={form.description}
            onChange={update('description')}
            error={errors.description}
            required
          />

          <ImageUpload
            value={form.imageUrl}
            onChange={(imageUrl) => setForm((f) => ({ ...f, imageUrl }))}
            hint="Photos help moderators assess the issue faster."
          />

          <div className="flex justify-end gap-3 border-t border-forest-100 pt-5">
            <Link to="/reports" className="btn-secondary">
              Cancel
            </Link>
            <Button type="submit" loading={submitting}>
              Submit report
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
