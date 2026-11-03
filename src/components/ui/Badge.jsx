export default function Badge({ children, bg = 'bg-forest-50', text = 'text-forest-700', dot, className = '' }) {
  return (
    <span className={`badge ${bg} ${text} ${className}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />}
      {children}
    </span>
  );
}
