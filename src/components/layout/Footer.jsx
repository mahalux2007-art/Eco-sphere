import { Link } from 'react-router-dom';
import { Leaf, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-forest-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-extrabold text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-700 text-white">
              <Leaf size={18} strokeWidth={2.5} />
            </span>
            <span className="text-[1.05rem]">EcoSphere</span>
          </div>
          <p className="mt-3 text-sm text-muted">Your Campus. Your Community. Your Impact.</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Platform</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link to="/reports" className="hover:text-forest-700">Environmental Reports</Link></li>
            <li><Link to="/marketplace" className="hover:text-forest-700">Resource Sharing</Link></li>
            <li><Link to="/initiatives" className="hover:text-forest-700">Community Initiatives</Link></li>
            <li><Link to="/analytics" className="hover:text-forest-700">Sustainability Analytics</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Account</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link to="/login" className="hover:text-forest-700">Log in</Link></li>
            <li><Link to="/register" className="hover:text-forest-700">Create an account</Link></li>
            <li><Link to="/dashboard" className="hover:text-forest-700">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">About this project</h4>
          <p className="mt-3 text-sm text-muted">
            EcoSphere is a college Full Stack Development project demo. Statistics shown throughout are
            sample data for demonstration purposes.
          </p>
          <div className="mt-3 flex gap-3 text-muted">
            <a href="#" className="hover:text-forest-700" aria-label="Project repository">
              <Globe size={18} />
            </a>
            <a href="#" className="hover:text-forest-700" aria-label="Contact">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-forest-100 px-4 py-5 text-center text-xs text-muted sm:px-6 lg:px-8">
        © {new Date().getFullYear()} EcoSphere. A student sustainability platform demo — not an official university service.
      </div>
    </footer>
  );
}
