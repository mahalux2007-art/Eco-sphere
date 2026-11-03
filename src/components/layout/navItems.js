import {
  LayoutDashboard,
  ClipboardList,
  Recycle,
  Users,
  BarChart3,
  UserCircle,
  ShieldCheck,
} from 'lucide-react';

export const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/reports', label: 'Environmental Reports', icon: ClipboardList },
  { to: '/marketplace', label: 'Share Resources', icon: Recycle },
  { to: '/initiatives', label: 'Community Initiatives', icon: Users },
  { to: '/analytics', label: 'Sustainability Analytics', icon: BarChart3 },
  { to: '/profile', label: 'My Profile', icon: UserCircle },
];

export const ADMIN_NAV_ITEM = { to: '/admin', label: 'Admin Dashboard', icon: ShieldCheck };
