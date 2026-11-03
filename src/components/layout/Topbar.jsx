import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, ChevronDown, LogOut, User, ShieldCheck, GraduationCap } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../hooks/AuthContext';

const NOTIFICATIONS = [
  { id: 1, text: 'Your report "Leaking faucet in Bellweather Hall" moved to In Progress.', time: '2h ago' },
  { id: 2, text: 'Riverside Trail Clean-Up starts in 4 days — you\'re registered.', time: '1d ago' },
  { id: 3, text: 'Marcus Webb is interested in your Scientific Calculator listing.', time: '2d ago' },
];

export default function Topbar({ onOpenSidebar, pageTitle }) {
  const { user, role, switchRole } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-forest-100 bg-canvas/90 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="rounded-lg p-2 text-ink lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu size={22} />
      </button>

      <h2 className="hidden shrink-0 text-sm font-semibold text-ink lg:block">{pageTitle}</h2>

      <div className="relative ml-auto flex-1 max-w-sm hidden sm:block">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search EcoSphere..."
          aria-label="Search EcoSphere"
          className="input pl-9 py-2 bg-white"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:ml-0">
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen((o) => !o)}
            aria-label="Notifications"
            aria-expanded={notifOpen}
            className="relative rounded-lg p-2.5 text-muted hover:bg-forest-50 hover:text-forest-700"
          >
            <Bell size={19} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-forest-500 ring-2 ring-canvas" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 animate-fade-in rounded-2xl border border-forest-100 bg-white p-2 shadow-card-hover">
              <div className="px-2 py-1.5 text-sm font-semibold text-ink">Notifications</div>
              <ul className="max-h-72 overflow-y-auto">
                {NOTIFICATIONS.map((n) => (
                  <li key={n.id} className="rounded-xl px-2 py-2.5 hover:bg-forest-50">
                    <p className="text-sm text-ink">{n.text}</p>
                    <p className="mt-0.5 text-xs text-muted">{n.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((o) => !o)}
            aria-label="Profile menu"
            aria-expanded={profileOpen}
            className="flex items-center gap-1.5 rounded-xl p-1 pr-2 hover:bg-forest-50"
          >
            <Avatar name={user?.name} size="sm" />
            <ChevronDown size={14} className="text-muted" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-60 animate-fade-in rounded-2xl border border-forest-100 bg-white p-2 shadow-card-hover">
              <div className="px-2 py-2">
                <p className="truncate text-sm font-semibold text-ink">{user?.name}</p>
                <p className="truncate text-xs text-muted">{user?.email}</p>
              </div>
              <div className="my-1 border-t border-forest-100" />
              <Link
                to="/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm text-ink hover:bg-forest-50"
              >
                <User size={16} /> My Profile
              </Link>
              <div className="my-1 border-t border-forest-100" />
              <p className="px-2 pb-1 text-xs font-medium text-muted">Demo role switch</p>
              <button
                type="button"
                onClick={() => {
                  switchRole('student');
                  setProfileOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm hover:bg-forest-50 ${role === 'student' ? 'text-forest-700 font-medium' : 'text-ink'}`}
              >
                <GraduationCap size={16} /> Student view
              </button>
              <button
                type="button"
                onClick={() => {
                  switchRole('moderator');
                  setProfileOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm hover:bg-forest-50 ${role === 'moderator' ? 'text-forest-700 font-medium' : 'text-ink'}`}
              >
                <ShieldCheck size={16} /> Moderator view
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
