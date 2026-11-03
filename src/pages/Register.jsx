import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, Info, UserPlus } from 'lucide-react';
import { TextField } from '../components/ui/FormField';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/AuthContext';
import { useToast } from '../hooks/ToastContext';

export default function Register() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ fullName: '', studentEmail: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Full name is required.';
    if (!form.studentEmail.trim()) next.studentEmail = 'Student email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.studentEmail)) next.studentEmail = 'Enter a valid email address.';
    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 6) next.password = 'Password must be at least 6 characters.';
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await register({ fullName: form.fullName, studentEmail: form.studentEmail });
    setSubmitting(false);
    showToast(`Welcome to EcoSphere, ${form.fullName.split(' ')[0]}!`, { type: 'success' });
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 font-extrabold text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-700 text-white">
              <Leaf size={18} strokeWidth={2.5} />
            </span>
            <span className="text-lg">EcoSphere</span>
          </Link>
          <h1 className="mt-5 text-2xl font-bold text-ink">Create your account</h1>
          <p className="mt-1.5 text-sm text-muted">Join your campus's sustainability community.</p>
        </div>

        <div className="card p-6 sm:p-7">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <TextField
              id="fullName"
              label="Full name"
              autoComplete="name"
              placeholder="Jordan Avery"
              value={form.fullName}
              onChange={update('fullName')}
              error={errors.fullName}
              required
            />
            <TextField
              id="studentEmail"
              label="Student email"
              type="email"
              autoComplete="email"
              placeholder="you@stateu.edu"
              value={form.studentEmail}
              onChange={update('studentEmail')}
              error={errors.studentEmail}
              required
            />

            <div>
              <label htmlFor="password" className="label">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={update('password')}
                  aria-invalid={Boolean(errors.password)}
                  className={`input pr-11 ${errors.password ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.password}</p>}
            </div>

            <TextField
              id="confirmPassword"
              label="Confirm password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={update('confirmPassword')}
              error={errors.confirmPassword}
              required
            />

            <Button type="submit" className="w-full" loading={submitting} icon={UserPlus}>
              Create account
            </Button>
          </form>

          <p className="mt-4 flex items-start gap-1.5 text-xs text-muted">
            <Info size={14} className="mt-0.5 shrink-0" />
            This is a frontend demo. Registration stores a demo session in your browser only — no real
            account or backend is connected yet.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-forest-700 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
