import { Link } from 'react-router-dom';
import { Leaf, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-forest-100 text-forest-700">
        <Leaf size={26} />
      </div>
      <h1 className="text-3xl font-extrabold text-ink">404</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        This page has wandered off the trail. Let's get you back to familiar ground.
      </p>
      <Link to="/" className="btn-primary mt-6">
        <Home size={16} /> Back to EcoSphere
      </Link>
    </div>
  );
}
