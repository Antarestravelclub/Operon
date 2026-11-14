import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

/* ------------------------------------------------------------------ *
 * APP REGISTRY — single source of truth.
 * Every count, filter and card on this page is derived from here, so
 * adding a site means adding one entry and nothing else gets stale.
 *   kind 'platform' = products Operon owns and sells to the public
 *   kind 'tool'     = platforms that run a vacation-sales business
 * ------------------------------------------------------------------ */
type AppKind = 'platform' | 'tool';

type AppEntry = {
  id: string;
  name: string;
  kind: AppKind;
  icon: string;
  color: string;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  external: boolean;
  domain?: string;
};

const APPS: AppEntry[] = [
  // ---------------------------- PLATFORMS ----------------------------
  {
    id: 'logbook',
    name: 'My Logbook',
    kind: 'platform',
    icon: '📓',
    color: '#0ea5e9',
    tagline: 'The #1 digital logbook for boats, motorcycles & RVs — track everything, save thousands.',
    features: [
      "Captain's Plan — $24.99 setup + $7.99/mo",
      'Fleet Plan — $49.99 setup + $9.99/mo',
      'Smart maintenance reminders',
      'Fuel & engine-hours tracking',
      'Analytics dashboard',
      'PWA — works offline on the water',
    ],
    cta: 'Visit My Logbook',
    href: 'https://my-logbook.io',
    external: true,
    domain: 'my-logbook.io',
  },
  {
    id: 'carttracker',
    name: 'Cart Tracker',
    kind: 'platform',
    icon: '🛺',
    color: '#a78bfa',
    tagline: 'Real-time GPS fleet tracking for golf carts and utility vehicles.',
    features: [
      'Live GPS mapping & tracking',
      'Driver assignment & management',
      'Maintenance in/out service tracking',
      'Geofencing & alerts',
      'Shift scheduling & auto-assign',
      'Multi-property support',
      'Starter $29/mo · Pro $79/mo · Enterprise $199/mo',
    ],
    cta: 'Open Tracker',
    href: 'https://carttracker.io',
    external: true,
    domain: 'carttracker.io',
  },
  {
    id: 'solace',
    name: 'Solace Wellness',
    kind: 'platform',
    icon: '🌿',
    color: '#6b9b6b',
    tagline: 'AI wellness coaching — your always-available emotional support.',
    features: ['24/7 AI companion', 'Guided check-ins', 'Private by design'],
    cta: 'Visit Solace',
    href: 'https://solace-wellness.io',
    external: true,
    domain: 'solace-wellness.io',
  },
  {
    id: 'apex',
    name: 'APEX Index',
    kind: 'platform',
    icon: '🎯',
    color: '#3b82f6',
    tagline: 'Hire the best closers. Behavioral science built for vacation sales.',
    features: ['Behavioral assessment', 'Apex Performer Profile', 'Hire / do-not-hire recommendation'],
    cta: 'Visit APEX Index',
    href: 'https://apex-index.com',
    external: true,
    domain: 'apex-index.com',
  },
  {
    id: 'boxit',
    name: 'BoxiT',
    kind: 'platform',
    icon: '📦',
    color: '#f59e0b',
    tagline: 'Storage, simplified.',
    features: [],
    cta: 'Visit BoxiT',
    href: 'https://boxitstorage.io',
    external: true,
    domain: 'boxitstorage.io',
  },
  {
    id: 'travelwise',
    name: 'TravelWise Vacation Club',
    kind: 'platform',
    icon: '✈️',
    color: '#0d9488',
    tagline: 'Wholesale travel prices — save up to 70% on luxury vacations.',
    features: ['Free online presentation', 'Wholesale pricing', '1.2M+ properties', 'No blackout dates'],
    cta: 'Book Presentation',
    href: '/travelwise',
    external: false,
  },
  {
    id: 'operontrader',
    name: 'OperonTrader',
    kind: 'platform',
    icon: '📈',
    color: '#eab308',
    tagline: 'Automated MT5 trading on forex, gold & crypto.',
    features: ['ATR-based stops & trailing', 'Session filtering', 'Risk-sized positions'],
    cta: 'Download EA',
    href: '/OperonTrader.mq5',
    external: false,
  },

  // ------------------------------ TOOLS ------------------------------
  {
    id: 'ai-assistants',
    name: 'AI Assistants',
    kind: 'tool',
    icon: '🤖',
    color: '#7c3aed',
    tagline: 'Your AI salesforce — always on, always learning, never tired.',
    features: ['Sales follow-up AI', 'Rep onboarding AI', 'Customer support AI', 'Custom AI builds'],
    cta: 'See Plans & Pricing',
    href: '/ai-assistants.html',
    external: false,
  },
  {
    id: 'api',
    name: 'API & Infrastructure',
    kind: 'tool',
    icon: '⚙️',
    color: '#8b5cf6',
    tagline: 'BYOK architecture — zero vendor lock-in, 84–90% gross margin, fully portable.',
    features: [
      'OpenRouter — unified model gateway',
      'Stripe — payments & subscriptions',
      'Supabase — Postgres, RLS, auth, edge functions',
      'Mapbox — live GPS & marine mapping',
      'ElevenLabs — voice TTS & narration',
      'Twilio — voice lines, SMS, crisis detection',
      'Vercel — zero-config edge hosting',
    ],
    cta: 'View Tech Stack',
    href: '/docs',
    external: false,
  },
  {
    id: 'lead-to-cash',
    name: 'Lead to Cash Track',
    kind: 'tool',
    icon: '💰',
    color: '#14b8a6',
    tagline: 'Full backend financial management — leads, payroll, goals and stats.',
    features: ['Sales volume dashboard', 'OPC performance tracking', 'Payroll & commission reports', 'Sales goals & analytics'],
    cta: 'View Platform',
    href: 'https://lead-to-cash-track.vercel.app',
    external: true,
  },
  {
    id: 'recruit',
    name: 'Operon Recruit',
    kind: 'tool',
    icon: '🧑‍💼',
    color: '#f97316',
    tagline: 'Kanban-style candidate pipeline for hiring vacation sales teams.',
    features: ['Candidate tracking', 'Hiring workflow', 'Interview calendar', 'Analytics dashboard'],
    cta: 'View Platform',
    href: 'https://vidarecruitment.vercel.app',
    external: true,
  },
  {
    id: 'academy',
    name: 'Operon Sales Academy',
    kind: 'tool',
    icon: '🎓',
    color: '#10b981',
    tagline: '30-day structured sales training for new and existing reps.',
    features: ['Day-by-day training modules', 'Lesson viewer', 'Progress tracking', 'Training editor'],
    cta: 'View Platform',
    href: 'https://vida-rep-academy-9d6cda93.vercel.app',
    external: true,
  },
  {
    id: 'loyalty',
    name: 'Operon Loyalty',
    kind: 'tool',
    icon: '🎟️',
    color: '#c9a96e',
    tagline: 'Digital loyalty card programs for modern businesses.',
    features: ['Digital stamp cards', 'Points & rewards', 'Merchant dashboard', 'QR code scanning'],
    cta: 'View Platform',
    href: 'https://laralucaloyalty.vercel.app',
    external: true,
  },
  {
    id: 'checkin',
    name: 'Operon Check-In',
    kind: 'tool',
    icon: '✅',
    color: '#6366f1',
    tagline: 'Member verification and check-in with QR codes.',
    features: ['Member verification', 'QR code scanning', 'Admin dashboard', 'Promotor tracking'],
    cta: 'View Platform',
    href: 'https://secure-checkin-confirm.vercel.app',
    external: true,
  },
  {
    id: 'guestcare',
    name: 'Operon Guest Care',
    kind: 'tool',
    icon: '🛎️',
    color: '#ec4899',
    tagline: 'Guest experience and issue tracking for resorts and hospitality.',
    features: ['Guest portal', 'Issue tracking', 'Analytics dashboard', 'Staff management'],
    cta: 'View Platform',
    href: 'https://guest-whisper-care.vercel.app',
    external: true,
  },
  {
    id: 'commissions',
    name: 'Commission Calculator',
    kind: 'tool',
    icon: '🧮',
    color: '#84cc16',
    tagline: 'Sales commission tracking, payroll management and reporting.',
    features: ['Commission charts', 'Payroll manager', 'Company breakdown', 'Admin dashboard'],
    cta: 'View Platform',
    href: 'https://antares-travel-club-sales-commission-calc.vercel.app',
    external: true,
  },
  {
    id: 'arda',
    name: 'ARDA Materials',
    kind: 'tool',
    icon: '📚',
    color: '#94a3b8',
    tagline: 'Training and compliance material library for vacation ownership teams.',
    features: ['Pitchman training manual', 'Compliance references', 'Downloadable assets'],
    cta: 'Open Library',
    href: 'https://arda-materials.vercel.app',
    external: true,
  },
];

const KIND_LABEL: Record<AppKind, string> = {
  platform: 'Our Platforms',
  tool: 'Business Tools',
};

/* ---------------------------- components ---------------------------- */

function AppCard({ app }: { app: AppEntry }) {
  const [hover, setHover] = useState(false);
  const shown = app.features.slice(0, 5);
  const rest = app.features.length - shown.length;

  const body = (
    <>
      <div className="flex items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl"
          style={{ background: `${app.color}1f`, border: `1px solid ${app.color}40` }}
          aria-hidden="true"
        >
          {app.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold text-white">{app.name}</h3>
          {app.domain && (
            <span className="font-mono text-xs" style={{ color: app.color }}>
              {app.domain}
            </span>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-gray-400">{app.tagline}</p>

      {shown.length > 0 && (
        <ul className="mt-5 space-y-2">
          {shown.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[13px] leading-snug text-gray-300">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: app.color }}
              />
              <span className="min-w-0">{f}</span>
            </li>
          ))}
          {rest > 0 && (
            <li className="pl-4 text-[13px] text-gray-500">+{rest} more</li>
          )}
        </ul>
      )}

      <div className="mt-auto pt-6">
        <div
          className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
          style={{
            background: hover ? app.color : `${app.color}1a`,
            color: hover ? '#0a0a0f' : app.color,
          }}
        >
          <span>{app.cta}</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </>
  );

  const shell =
    'group flex h-full flex-col rounded-3xl border p-6 text-left no-underline transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]';

  const style = {
    background: 'linear-gradient(180deg, #14141c 0%, #0f0f16 100%)',
    borderColor: hover ? `${app.color}66` : 'rgba(255,255,255,0.08)',
    transform: hover ? 'translateY(-4px)' : 'none',
    boxShadow: hover ? `0 18px 40px -12px ${app.color}59` : '0 1px 2px rgba(0,0,0,0.4)',
    ['--tw-ring-color' as string]: app.color,
  } as React.CSSProperties;

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setHover(true),
    onBlur: () => setHover(false),
  };

  if (app.external) {
    return (
      <a href={app.href} target="_blank" rel="noopener noreferrer" className={shell} style={style} {...handlers}>
        {body}
      </a>
    );
  }
  if (app.href.startsWith('/') && !app.href.includes('.')) {
    return (
      <Link to={app.href} className={shell} style={style} {...handlers}>
        {body}
      </Link>
    );
  }
  return (
    <a href={app.href} className={shell} style={style} {...handlers}>
      {body}
    </a>
  );
}

function TestimonialCard({ name, role, stars, quote }: { name: string; role: string; stars: number; quote: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('');
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md">
      <div className="mb-6 flex items-center">
        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600">
          <span className="text-sm font-semibold text-white">{initials}</span>
        </div>
        <div className="text-left">
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
      <div className="mb-4 flex text-yellow-400" aria-label={`${stars} out of 5 stars`}>
        {[...Array(stars)].map((_, i) => (
          <span key={i} className="text-sm">★</span>
        ))}
      </div>
      <p className="italic text-gray-600">"{quote}"</p>
    </div>
  );
}

function ROICalculator() {
  const [leads, setLeads] = useState(50);
  const [emails, setEmails] = useState(20);

  const hoursSavedValue = leads * 0.3 + emails * 0.1;
  const hoursSaved = hoursSavedValue.toFixed(1);
  const revenueRecovered = Math.round(hoursSavedValue * 150);
  const roi = Math.round(((revenueRecovered - 99) / 99) * 100);

  return (
    <div className="rounded-3xl bg-gray-50 p-8">
      <div className="space-y-8">
        <div>
          <label htmlFor="roi-leads" className="mb-2 block text-left font-medium text-gray-700">
            How many leads per week? <span className="text-violet-600">{leads}</span>
          </label>
          <input
            id="roi-leads"
            type="range"
            min="10"
            max="200"
            value={leads}
            onChange={(e) => setLeads(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-violet-600"
          />
        </div>
        <div>
          <label htmlFor="roi-emails" className="mb-2 block text-left font-medium text-gray-700">
            How many support emails per day? <span className="text-violet-600">{emails}</span>
          </label>
          <input
            id="roi-emails"
            type="range"
            min="5"
            max="100"
            value={emails}
            onChange={(e) => setEmails(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-violet-600"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
          {[
            { v: `${hoursSaved} hrs`, l: 'Hours saved per week' },
            { v: `$${revenueRecovered.toLocaleString()}`, l: 'Estimated revenue recovered' },
            { v: `${roi}%`, l: 'Your ROI' },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-violet-600">{s.v}</div>
              <div className="text-sm text-gray-500">{s.l}</div>
            </div>
          ))}
        </div>
        <Link
          to="/signup"
          className="mt-4 inline-block rounded-xl bg-violet-600 px-8 py-4 text-lg font-medium text-white no-underline shadow-lg shadow-violet-200 transition hover:bg-violet-700"
        >
          Start saving time today →
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------- page ------------------------------- */

const Landing = () => {
  const [filter, setFilter] = useState<'all' | AppKind>('all');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const counts = useMemo(
    () => ({
      all: APPS.length,
      platform: APPS.filter((a) => a.kind === 'platform').length,
      tool: APPS.filter((a) => a.kind === 'tool').length,
    }),
    [],
  );

  const visible = useMemo(
    () => (filter === 'all' ? APPS : APPS.filter((a) => a.kind === filter)),
    [filter],
  );

  const liveDomains = useMemo(() => APPS.filter((a) => a.domain).length, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] font-sans antialiased">
      {/* ---------------------------- NAV ---------------------------- */}
      <nav
        className="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200"
        style={{
          background: scrolled ? 'rgba(10,10,15,0.92)' : 'rgba(10,10,15,0.55)',
          backdropFilter: 'blur(14px)',
          borderColor: scrolled ? 'rgba(124,58,237,0.28)' : 'transparent',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 no-underline">
            <img src="/operon-badge.png" alt="" className="h-9 w-9 rounded-full object-cover" />
            <span className="text-lg font-bold text-white">Operon</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <a href="#apps" className="text-sm text-gray-400 no-underline transition hover:text-white">Apps</a>
            <a href="#roi" className="text-sm text-gray-400 no-underline transition hover:text-white">ROI</a>
            <Link to="/docs" className="text-sm text-gray-400 no-underline transition hover:text-white">Docs</Link>
            <a
              href="https://myoperon.io/admin.html"
              className="text-sm font-semibold text-violet-400 no-underline transition hover:text-violet-300"
            >
              Admin
            </a>
          </div>

          <a
            href="mailto:info@myoperon.io?subject=Get%20Started%20with%20Operon"
            className="shrink-0 whitespace-nowrap rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-violet-700"
          >
            Get Started →
          </a>
        </div>
      </nav>

      {/* --------------------------- HERO --------------------------- */}
      <header className="relative overflow-hidden px-6 pb-20 pt-32 sm:pt-40">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(124,58,237,0.32), transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)' }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <img
            src="/operon-badge.png"
            alt="Operon"
            className="mx-auto mb-10 h-40 w-40 object-contain sm:h-56 sm:w-56"
            style={{ filter: 'drop-shadow(0 0 70px rgba(124,58,237,0.75))' }}
          />

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-violet-300">
            {counts.all} products · one platform
          </div>

          <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            Your AI Salesforce
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(120deg, #a78bfa, #14b8a6)' }}
            >
              Platform
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
            {counts.platform} products we own and run. {counts.tool} tools that run the business behind them.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#apps"
              className="rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white no-underline shadow-lg shadow-violet-900/40 transition hover:bg-violet-700"
            >
              Explore all {counts.all} apps →
            </a>
            <a
              href="mailto:info@myoperon.io?subject=Operon%20Demo"
              className="rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white no-underline transition hover:border-white/40 hover:bg-white/5"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </header>

      {/* -------------------------- STAT BAR -------------------------- */}
      <div className="border-y border-violet-500/15 bg-[#120a20]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
          {[
            { num: String(counts.all), label: 'Apps & sites' },
            { num: String(liveDomains), label: 'Live domains' },
            { num: '24/7', label: 'AI powered' },
            { num: '100%', label: 'BYOK — yours' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-violet-300">{s.num}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.12em] text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------- APP SHOWCASE ------------------------- */}
      <section id="apps" className="scroll-mt-20 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-violet-300">
              The ecosystem
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Everything we build
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-400">
              Every app and site under the Operon umbrella — the products we sell, and the
              platforms that run them.
            </p>
          </div>

          {/* filter */}
          <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter apps">
            {([
              ['all', `All ${counts.all}`],
              ['platform', `${KIND_LABEL.platform} ${counts.platform}`],
              ['tool', `${KIND_LABEL.tool} ${counts.tool}`],
            ] as const).map(([key, label]) => {
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(key)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                    active
                      ? 'border-violet-500 bg-violet-600 text-white'
                      : 'border-white/12 bg-white/[0.03] text-gray-400 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- ROI ---------------------------- */}
      <section id="roi" className="scroll-mt-20 bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            See how much time Operon saves you
          </h2>
          <p className="mb-12 mt-4 text-gray-600">Adjust the sliders to see your potential ROI</p>
          <ROICalculator />
        </div>
      </section>

      {/* ------------------------ TESTIMONIALS ------------------------ */}
      <section className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Loved by business owners
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <TestimonialCard
              name="Sarah M."
              role="Real Estate Agent, Austin TX"
              stars={5}
              quote="I hired the Sales Assistant and it followed up with 47 leads while I was showing houses. Closed 3 deals I would have missed."
            />
            <TestimonialCard
              name="James T."
              role="Restaurant Owner, Chicago"
              stars={5}
              quote="The Support Agent answers customer questions 24/7. My stress levels dropped immediately. Worth every penny."
            />
            <TestimonialCard
              name="Maria K."
              role="E-Commerce Store, Miami"
              stars={5}
              quote="Operon's Admin Assistant organizes my inbox and generates weekly reports. I save at least 20 hours a week."
            />
          </div>
        </div>
      </section>

      {/* --------------------- FOLLOW-UP AUTOMATION --------------------- */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-700">
              Flagship feature
            </span>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Never Lose a Sale After the Close
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              Most sales fall apart not at the pitch — but in the silence after signing. Operon
              automates every touchpoint so your clients feel remembered, valued and excited.
            </p>
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              {[
                { icon: '📧', title: 'Welcome Email in 1 Hour', desc: "Sent automatically from your rep's own email address — warm, personal and on-brand." },
                { icon: '📞', title: 'Voice Clone Calls', desc: "Your rep's cloned voice calls every client on Day 1. They think it's a real call." },
                { icon: '🤖', title: 'AI FAQ Autoresponder', desc: 'Clients text questions 24/7. AI answers instantly. Reps only get notified for escalations.' },
                { icon: '📬', title: '7-Day Email Sequence', desc: "Automated nurture emails from the rep's address — booking tips, benefits reminders, check-ins." },
                { icon: '🎁', title: 'Referral Ask on Day 45', desc: 'Happy clients get a personalised referral request at exactly the right moment.' },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="mb-2 text-xl font-bold text-gray-900">Rep does 3 things.</h3>
              <h3 className="mb-6 text-xl font-bold text-violet-600">AI does the rest.</h3>
              <div className="mb-8 space-y-4">
                {[
                  { step: '1', text: 'Fill intake form after sale', time: '3 min' },
                  { step: '2', text: 'Photo the contract', time: '30 sec' },
                  { step: '3', text: 'Record voice sample once', time: '5 min (forever)' },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-4 rounded-2xl bg-gray-50 p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                      {s.step}
                    </div>
                    <span className="flex-1 text-sm text-gray-700">{s.text}</span>
                    <span className="text-xs font-semibold text-violet-600">{s.time}</span>
                  </div>
                ))}
              </div>
              <div className="mb-8 grid grid-cols-3 gap-4 text-center">
                {[
                  { v: '7', l: 'Touchpoints' },
                  { v: '45', l: 'Days covered' },
                  { v: '$65', l: 'Per rep/mo' },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl bg-violet-50 p-3">
                    <div className="text-2xl font-bold text-violet-600">{s.v}</div>
                    <div className="text-xs text-gray-500">{s.l}</div>
                  </div>
                ))}
              </div>
              <Link
                to="/signup"
                className="block w-full rounded-xl bg-violet-600 py-4 text-center font-semibold text-white no-underline transition hover:bg-violet-700"
              >
                Get Started Free →
              </Link>
              <p className="mt-3 text-center text-xs text-gray-400">No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- FOOTER --------------------------- */}
      <footer className="border-t border-white/10 bg-[#0a0a0f] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <img src="/operon-badge.png" alt="" className="h-9 w-9 rounded-full object-contain" />
                <span className="font-bold text-white">Operon</span>
              </div>
              <p className="text-sm text-violet-400">Your AI Salesforce Platform</p>
              <a
                href="mailto:info@myoperon.io"
                className="mt-4 inline-block text-sm text-gray-500 no-underline transition hover:text-white"
              >
                info@myoperon.io
              </a>
            </div>

            <div>
              <h4 className="mb-4 text-xs uppercase tracking-[0.14em] text-gray-500">Platforms</h4>
              <ul className="space-y-2.5">
                {APPS.filter((a) => a.kind === 'platform').map((a) => (
                  <li key={a.id}>
                    <a
                      href={a.href}
                      {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-gray-400 no-underline transition hover:text-white"
                    >
                      {a.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs uppercase tracking-[0.14em] text-gray-500">Company</h4>
              <ul className="space-y-2.5">
                <li><a href="#apps" className="text-sm text-gray-400 no-underline transition hover:text-white">All apps</a></li>
                <li><Link to="/docs" className="text-sm text-gray-400 no-underline transition hover:text-white">Docs</Link></li>
                <li><a href="/ai-assistants.html" className="text-sm text-gray-400 no-underline transition hover:text-white">Pricing</a></li>
                <li><a href="/brand-book.html" className="text-sm text-gray-400 no-underline transition hover:text-white">Brand book</a></li>
                <li><a href="/resources.html" className="text-sm text-gray-400 no-underline transition hover:text-white">Resources</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Operon. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
