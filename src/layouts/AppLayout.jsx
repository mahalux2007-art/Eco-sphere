import { useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { X } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import { NAV_ITEMS, ADMIN_NAV_ITEM } from '../components/layout/navItems';
import { useAuth } from '../hooks/AuthContext';

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  const allItems = [...NAV_ITEMS, ADMIN_NAV_ITEM];
  const pageTitle = allItems.find((i) => location.pathname.startsWith(i.to))?.label || 'EcoSphere';

  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <div className="min-h-screen bg-canvas">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-forest-100 lg:bg-white">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40 animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="relative flex h-full w-72 max-w-[85vw] animate-slide-up flex-col bg-white shadow-card-hover">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="absolute right-3 top-4 rounded-lg p-1.5 text-muted hover:bg-forest-50"
            >
              <X size={18} />
            </button>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <Topbar onOpenSidebar={() => setMobileOpen(true)} pageTitle={pageTitle} />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
