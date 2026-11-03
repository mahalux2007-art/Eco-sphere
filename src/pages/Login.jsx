import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Leaf, Info, LogIn } from 'lucide-react';
import { TextField } from '../components/ui/FormField';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/AuthContext';
import { useToast } from '../hooks/ToastContext';

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 6) next.password = 'Password must be at least 6 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await login({ email: form.email });
    setSubmitting(false);
    showToast('Welcome back! You\'re signed in to the EcoSphere demo.', { type: 'success' });
    navigate(location.state?.from || '/dashboard', { replace: true });
  };

  const handleDemoMode = async () => {
    setSubmitting(true);
    await login({ email: 'demo.student@stateu.edu' });
    setSubmitting(false);
    showToast('Exploring EcoSphere in demo mode.', { type: 'info' });
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
          <h1 className="mt-5 text-2xl font-bold text-ink">Welcome back</h1>
          <p className="mt-1.5 text-sm text-muted">Log in to continue tracking your campus impact.</p>
        </div>

        <div className="card p-6 sm:p-7">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <TextField
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@stateu.edu"
              value={form.email}
              onChange={update('email')}
              error={errors.email}
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
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={update('password')}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
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
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" loading={submitting} icon={LogIn}>
              Log in
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-forest-100" />
            <span className="text-xs text-muted">or</span>
            <div className="h-px flex-1 bg-forest-100" />
          </div>

          <Button variant="secondary" className="w-full" onClick={handleDemoMode} loading={submitting}>
            Continue in demo mode
          </Button>

          <p className="mt-4 flex items-start gap-1.5 text-xs text-muted">
            <Info size={14} className="mt-0.5 shrink-0" />
            This is a frontend demo. No real account is created or verified — there is no backend
            authentication connected yet.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-forest-700 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
