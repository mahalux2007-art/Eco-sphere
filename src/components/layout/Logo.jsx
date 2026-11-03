import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo({ to = '/', className = '' }) {
  return (
    <Link to={to} className={`flex items-center gap-2 font-extrabold text-ink ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-700 text-white">
        <Leaf size={18} strokeWidth={2.5} />
      </span>
      <span className="text-[1.05rem] tracking-tight">EcoSphere</span>
    </Link>
  );
}
