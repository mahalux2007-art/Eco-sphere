import { NavLink } from 'react-router-dom';
import { LogOut, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { NAV_ITEMS, ADMIN_NAV_ITEM } from './navItems';
import { useAuth } from '../../hooks/AuthContext';

export default function Sidebar({ onNavigate }) {
  const { isModerator, logout, user } = useAuth();

  const items = isModerator ? [...NAV_ITEMS, ADMIN_NAV_ITEM] : NAV_ITEMS;

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5">
        <Logo to="/dashboard" />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-forest-700 text-white shadow-sm'
                      : 'text-muted hover:bg-forest-50 hover:text-forest-700'
                  }`
                }
              >
                <Icon size={18} />
                <span className="truncate">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {isModerator && (
        <div className="mx-3 mb-2 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
          <ShieldCheck size={14} />
          Moderator demo mode
        </div>
      )}

      <div className="border-t border-forest-100 p-3">
        <div className="mb-2 px-2 text-xs text-muted">Signed in as</div>
        <div className="mb-2 flex items-center gap-2 px-2">
          <div className="truncate text-sm font-semibold text-ink">{user?.name}</div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Log out (demo)
        </button>
      </div>
    </div>
  );
}
