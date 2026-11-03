import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileWarning,
  Recycle,
  Sparkles,
  BarChart3,
  ClipboardList,
  Users2,
  TrendingUp,
  Info,
} from 'lucide-react';
import HeroIllustration from '../components/landing/HeroIllustration';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const STATS = [
  { label: 'Students participating', value: '2,400+' },
  { label: 'Issues resolved', value: '860+' },
  { label: 'Items reused or shared', value: '1,150+' },
];

const FEATURES = [
  {
    icon: FileWarning,
    title: 'Environmental Reporting',
    description: 'Flag leaks, waste issues, or energy use on campus in minutes, with photo support and status tracking.',
  },
  {
    icon: Recycle,
    title: 'Resource Sharing',
    description: 'Give textbooks, electronics, and furniture a second life through a student-to-student marketplace.',
  },
  {
    icon: Sparkles,
    title: 'Demo AI Assistance',
    description: 'A lightweight local assistant suggests report categories to speed up submissions — no external AI calls.',
  },
  {
    icon: BarChart3,
    title: 'Sustainability Tracking',
    description: 'Follow campus-wide trends across reports, resource reuse, and community participation over time.',
  },
];

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Spot something, report it',
    description: 'See a leak, overflowing bin, or wasted energy? Log it with a location, category, and photo.',
  },
  {
    icon: Users2,
    title: 'Join the community',
    description: 'Share items you no longer need, join clean-ups, and follow what your campus is working on.',
  },
  {
    icon: TrendingUp,
    title: 'Track collective impact',
    description: 'Watch reports get resolved and see how your actions add up with your peers over the semester.',
  },
];

export default function Landing() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Badge bg="bg-forest-100" text="text-forest-700" className="mb-5">
              <Sparkles size={13} /> Built by students, for students
            </Badge>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Small Actions. <span className="text-forest-600">Greener Campuses.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted sm:text-lg">
              EcoSphere connects student-led sustainability efforts in one place — report environmental
              issues, share reusable resources, join green initiatives, and see your campus's collective
              impact grow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/dashboard" className="btn-primary px-6 py-3 text-sm">
                Explore Community <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="btn-secondary px-6 py-3 text-sm">
                Join EcoSphere
              </Link>
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
              <Info size={13} /> This is a student project demo — all data shown is for demonstration only.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="explore" className="border-y border-forest-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-forest-700 sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted">
            Sample statistics for demonstration purposes — not verified real-world environmental data.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">Everything your campus needs in one place</h2>
          <p className="mt-3 text-muted">
            EcoSphere brings reporting, sharing, and organizing together so sustainability efforts don't
            get lost across group chats and spreadsheets.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Card key={f.title} hover className="p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                <f.icon size={20} />
              </div>
              <h3 className="text-sm font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">How it works</h2>
            <p className="mt-3 text-muted">Three simple steps to start making a visible difference on campus.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-700 text-white">
                  <step.icon size={24} />
                </div>
                <div className="mx-auto -mt-3 mb-3 flex h-6 w-6 items-center justify-center rounded-full bg-forest-500 text-xs font-bold text-white ring-4 ring-white relative left-5">
                  {i + 1}
                </div>
                <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community impact */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="overflow-hidden">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge bg="bg-mint" text="text-forest-700" className="mb-4">
                Community Impact
              </Badge>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">
                Every report, swap, and clean-up adds up
              </h2>
              <p className="mt-3 text-muted">
                EcoSphere turns individual actions into a visible, shared record of what your campus
                community is doing — from a fixed leak to a trail clean-up with dozens of volunteers.
              </p>
              <Link to="/register" className="btn-primary mt-6 px-5 py-2.5 text-sm">
                Join the community <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-forest-50 p-5">
                <p className="text-2xl font-bold text-forest-700">63</p>
                <p className="mt-1 text-xs text-muted">Reports this month (sample)</p>
              </div>
              <div className="rounded-2xl bg-forest-50 p-5">
                <p className="text-2xl font-bold text-forest-700">6</p>
                <p className="mt-1 text-xs text-muted">Active initiatives (sample)</p>
              </div>
              <div className="rounded-2xl bg-forest-50 p-5">
                <p className="text-2xl font-bold text-forest-700">1,150+</p>
                <p className="mt-1 text-xs text-muted">Items reused (sample)</p>
              </div>
              <div className="rounded-2xl bg-forest-50 p-5">
                <p className="text-2xl font-bold text-forest-700">92%</p>
                <p className="mt-1 text-xs text-muted">Reports acknowledged (sample)</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
