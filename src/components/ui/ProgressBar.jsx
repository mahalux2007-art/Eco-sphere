export default function ProgressBar({ value, max = 100, className = '', barClassName = 'bg-forest-500' }) {
  const pct = Math.min(100, Math.round((value / Math.max(max, 1)) * 100));
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-forest-50 ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className={`h-full rounded-full transition-all duration-500 ${barClassName}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
