import { useEffect, useState } from 'react';
import { Award, Star, Pencil, Save, X, Users2, MapPin } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { TextField, TextArea } from '../components/ui/FormField';
import { CardSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import { timeAgo, formatDate } from '../utils/date';
import { useAuth } from '../hooks/AuthContext';
import { useToast } from '../hooks/ToastContext';
import { getProfile, updateProfile } from '../services/profileService';
import { getInitiatives } from '../services/initiativesService';
import { SEED_ACTIVITY_FEED } from '../data/seedData';

export default function Profile() {
  const { user, session } = useAuth();
  const { showToast } = useToast();
  const [profile, setProfile] = useState(null);
  const [joined, setJoined] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', bio: '', major: '', year: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile().then((p) => {
      setProfile(p);
      setForm({ name: p.name, bio: p.bio, major: p.major, year: p.year });
    });
    getInitiatives().then((all) => setJoined(all.filter((i) => i.joined)));
  }, []);

  const myActivity = SEED_ACTIVITY_FEED.filter((a) => a.actor === user?.name).slice(0, 5);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const updated = await updateProfile(form);
    setProfile(updated);
    setSaving(false);
    setEditing(false);
    showToast('Profile updated.', { type: 'success' });
  };

  if (!profile) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="My Profile" description="Manage your EcoSphere demo profile and see your campus impact." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            {editing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar name={form.name} size="lg" />
                  <p className="text-xs text-muted">Avatar is generated from your initials in this demo.</p>
                </div>
                <TextField id="name" label="Full name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
                <div className="grid grid-cols-2 gap-4">
                  <TextField id="major" label="Major" value={form.major} onChange={(e) => setForm((f) => ({ ...f, major: e.target.value }))} />
                  <TextField id="year" label="Year" value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} />
                </div>
                <TextArea id="bio" label="Bio" rows={3} value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="secondary" icon={X} onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" icon={Save} loading={saving}>
                    Save changes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <Avatar name={profile.name} size="lg" />
                  <div>
                    <h2 className="text-lg font-bold text-ink">{profile.name}</h2>
                    <p className="text-sm text-muted">
                      {profile.major} · {profile.year}
                    </p>
                    <p className="mt-1 text-xs text-muted">{session?.user?.email}</p>
                    <p className="mt-3 max-w-md text-sm text-ink">{profile.bio}</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" icon={Pencil} onClick={() => setEditing(true)}>
                  Edit profile
                </Button>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Award size={16} className="text-forest-600" />
              <h3 className="text-sm font-semibold text-ink">Achievements</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {profile.achievements.map((a) => (
                <div
                  key={a.id}
                  className={`flex items-start gap-3 rounded-xl border p-3 ${
                    a.earned ? 'border-forest-200 bg-forest-50/60' : 'border-forest-100 bg-white opacity-60'
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${a.earned ? 'bg-forest-600 text-white' : 'bg-forest-100 text-forest-400'}`}>
                    <Award size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{a.label}</p>
                    <p className="text-xs text-muted">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-ink">Recent activity</h3>
            {myActivity.length === 0 ? (
              <p className="text-sm text-muted">Your activity will show up here as you use EcoSphere.</p>
            ) : (
              <ul className="space-y-3">
                {myActivity.map((a) => (
                  <li key={a.id} className="flex items-start justify-between gap-3 text-sm">
                    <span className="text-ink">{a.detail}</span>
                    <span className="shrink-0 text-xs text-muted">{timeAgo(a.date)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center gap-2 text-forest-700">
              <Star size={18} />
              <span className="text-2xl font-bold">{profile.ecoPoints}</span>
            </div>
            <p className="mt-1 text-xs text-muted">Total eco points earned</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-sm font-bold text-ink">{profile.reportsSubmitted}</p>
                <p className="text-[0.65rem] text-muted">Reports</p>
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{profile.issuesResolved}</p>
                <p className="text-[0.65rem] text-muted">Resolved</p>
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{profile.resourcesReused}</p>
                <p className="text-[0.65rem] text-muted">Reused</p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Users2 size={16} className="text-forest-600" />
              <h3 className="text-sm font-semibold text-ink">Joined initiatives</h3>
            </div>
            {joined === null ? (
              <CardSkeleton />
            ) : joined.length === 0 ? (
              <EmptyState icon={Users2} title="None yet" description="Join an initiative to see it here." />
            ) : (
              <ul className="space-y-3">
                {joined.map((i) => (
                  <li key={i.id} className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-ink">{i.title}</p>
                      <p className="flex items-center gap-1 text-xs text-muted">
                        <MapPin size={11} /> {formatDate(i.date)}
                      </p>
                    </div>
                    <Badge bg="bg-forest-50" text="text-forest-700">
                      {i.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
