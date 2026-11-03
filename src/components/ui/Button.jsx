import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
};

export default function Button({
  children,
  variant = 'primary',
  size,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled,
  type = 'button',
  ...rest
}) {
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${VARIANTS[variant] || VARIANTS.primary} ${sizeClass} ${className}`}
      {...rest}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {!loading && Icon && iconPosition === 'left' && <Icon size={16} />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon size={16} />}
    </button>
  );
}
