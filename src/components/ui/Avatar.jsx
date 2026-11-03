const PALETTE = ['bg-forest-600', 'bg-sky-600', 'bg-amber-600', 'bg-violet-600', 'bg-rose-500'];

function hashString(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
  return Math.abs(hash);
}

export default function Avatar({ name = '', size = 'md', className = '' }) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join('') || '?';
  const colorClass = PALETTE[hashString(name) % PALETTE.length];
  const sizeClass = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-lg' }[size] || 'h-10 w-10 text-sm';

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${colorClass} ${sizeClass} ${className}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
