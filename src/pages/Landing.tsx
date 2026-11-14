import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

/* ==================================================================
 * Operon — vertical software studio for vacation ownership.
 *
 * Positioning: we build the operational stack a vacation sales floor
 * runs on, proven on a live operation. The owned SaaS portfolio is
 * evidence of delivery speed, not the headline.
 * ================================================================== */

const GOLD = '#c9a96e';

/* The operator journey. Each stage maps to software already shipped. */
type Stage = {
  n: string;
  stage: string;
  tool: string;
  blurb: string;
  href: string;
  external: boolean;
};

const STACK: Stage[] = [
  {
    n: '01',
    stage: 'Recruit',
    tool: 'Operon Recruit',
    blurb: 'Kanban candidate pipeline, interview calendar and hiring analytics built for high-turnover sales floors.',
    href: 'https://vidarecruitment.vercel.app',
    external: true,
  },
  {
    n: '02',
    stage: 'Assess',
    tool: 'APEX Index',
    blurb: 'Behavioural assessment scored against vacation sales, not generic B2B. Hire / do-not-hire with a performer profile.',
    href: 'https://apex-index.com',
    external: true,
  },
  {
    n: '03',
    stage: 'Train',
    tool: 'Operon Sales Academy',
    blurb: 'Thirty days of structured modules, lesson viewer and progress tracking, with the ARDA compliance library alongside.',
    href: 'https://vida-rep-academy-9d6cda93.vercel.app',
    external: true,
  },
  {
    n: '04',
    stage: 'Sell',
    tool: 'TravelWise Console',
    blurb: 'Presentation booking and wholesale inventory — the front of the funnel your reps actually work in.',
    href: '/travelwise',
    external: false,
  },
  {
    n: '05',
    stage: 'Check in',
    tool: 'Operon Check-In',
    blurb: 'Member verification and QR check-in with promotor attribution, so tours are credited to the right source.',
    href: 'https://secure-checkin-confirm.vercel.app',
    external: true,
  },
  {
    n: '06',
    stage: 'Service',
    tool: 'Operon Guest Care',
    blurb: 'Guest portal and issue tracking that catches problems before they reach a review site.',
    href: 'https://guest-whisper-care.vercel.app',
    external: true,
  },
  {
    n: '07',
    stage: 'Pay',
    tool: 'Commission Calculator',
    blurb: 'Commission charts, payroll runs and company breakdowns — the part that ends arguments on Monday morning.',
    href: 'https://antares-travel-club-sales-commission-calc.vercel.app',
    external: true,
  },
  {
    n: '08',
    stage: 'Report',
    tool: 'Lead to Cash Track',
    blurb: 'Volume, OPC performance, goals and payroll in one backend, so the floor and the books finally agree.',
    href: 'https://lead-to-cash-track.vercel.app',
    external: true,
  },
];

/* Owned SaaS — proof of delivery across verticals. */
type Product = {
  name: string;
  domain?: string;
  sector: string;
  blurb: string;
  href: string;
  external: boolean;
};

const PRODUCTS: Product[] = [
  {
    name: 'My Logbook',
    domain: 'my-logbook.io',
    sector: 'Marine & RV',
    blurb: 'Digital logbook for boats, motorcycles and RVs. Maintenance reminders, fuel and engine hours, offline-capable.',
    href: 'https://my-logbook.io',
    external: true,
  },
  {
    name: 'Cart Tracker',
    domain: 'carttracker.io',
    sector: 'Fleet',
    blurb: 'Live GPS tracking for golf carts and utility vehicles, with geofencing, shift scheduling and multi-property support.',
    href: 'https://carttracker.io',
    external: true,
  },
  {
    name: 'APEX Index',
    domain: 'apex-index.com',
    sector: 'Hiring',
    blurb: 'Behavioural assessment for vacation sales hiring. Also stage 02 of the operator stack.',
    href: 'https://apex-index.com',
    external: true,
  },
  {
    name: 'BoxiT',
    domain: 'boxitstorage.io',
    sector: 'Storage',
    blurb: 'Storage, simplified.',
    href: 'https://boxitstorage.io',
    external: true,
  },
  {
    name: 'Solace Wellness',
    domain: 'solace-wellness.io',
    sector: 'Health',
    blurb: 'AI wellness coaching with guided check-ins and a 24/7 companion, built private by design.',
    href: 'https://solace-wellness.io',
    external: true,
  },
  {
    name: 'OperonTrader',
    sector: 'Fintech',
    blurb: 'Automated MT5 execution on forex, gold and crypto with ATR-based risk sizing and session filtering.',
    href: '/OperonTrader.mq5',
    external: false,
  },
];

/* How we work — capability, with AI in its proper place. */
const CAPABILITIES = [
  {
    title: 'Built on a live floor',
    body: 'Every tool in the stack runs a real vacation sales operation before it is offered to anyone else. We are not guessing at the workflow.',
  },
  {
    title: 'You own the keys',
    body: 'BYOK architecture throughout — your model keys, your Stripe, your Supabase. No vendor lock-in and nothing held hostage.',
  },
  {
    title: 'AI where it pays',
    body: 'Voice-cloned follow-up calls, a 24/7 FAQ autoresponder, automated nurture sequences. Applied where it returns money, not sprinkled for a headline.',
  },
  {
    title: 'Shipped, not promised',
    body: 'Seventeen products live across six sectors. The portfolio below is the reference — look at it before you brief us.',
  },
];

/* ------------------------------ atoms ------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-5 text-[11px] font-medium uppercase"
      style={{ letterSpacing: '0.28em', color: GOLD }}
    >
      {children}
    </div>
  );
}

function Rule() {
  return (
    <div
      className="h-px w-full"
      style={{ background: `linear-gradient(90deg, ${GOLD}55, transparent)` }}
    />
  );
}

/** Fades children in once, when they first scroll into view. */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '-40px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(14px)',
        transition: `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(.2,.7,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Outbound({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  if (href.startsWith('/') && !href.includes('.')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/* ----------------------------- sections ----------------------------- */

function StageRow({ s }: { s: Stage }) {
  const [hover, setHover] = useState(false);
  return (
    <Outbound
      href={s.href}
      external={s.external}
      className="group block no-underline"
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="grid grid-cols-1 gap-x-10 gap-y-3 px-3 py-8 transition-colors duration-300 sm:grid-cols-[auto_1fr] md:grid-cols-[auto_minmax(170px,210px)_1fr_auto] md:items-baseline"
        style={{
          borderTop: '1px solid rgba(246,242,235,0.09)',
          background: hover ? 'rgba(201,169,110,0.04)' : 'transparent',
        }}
      >
        <span
          className="font-display text-sm"
          style={{ color: hover ? GOLD : 'rgba(201,169,110,0.45)', transition: 'color 300ms' }}
        >
          {s.n}
        </span>

        <h3 className="font-display text-2xl font-normal tracking-tight text-[#f6f2eb] md:text-[26px]">
          {s.stage}
        </h3>

        <p className="max-w-xl text-[15px] leading-relaxed text-[#9a938c]">
          {s.blurb}
        </p>

        <span
          className="flex items-center gap-2 whitespace-nowrap text-xs uppercase"
          style={{
            letterSpacing: '0.16em',
            color: hover ? GOLD : '#6f6962',
            transition: 'color 300ms',
          }}
        >
          {s.tool}
          <span
            aria-hidden="true"
            style={{
              transform: hover ? 'translateX(3px)' : 'none',
              transition: 'transform 300ms cubic-bezier(.2,.7,.3,1)',
            }}
          >
            →
          </span>
        </span>
      </div>
    </Outbound>
  );
}

function ProductCard({ p }: { p: Product }) {
  const [hover, setHover] = useState(false);
  return (
    <Outbound
      href={p.href}
      external={p.external}
      className="no-underline"
    >
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="flex h-full flex-col p-8 transition-transform duration-500"
        style={{
          background: hover
            ? 'linear-gradient(170deg, #1a1713 0%, #121011 100%)'
            : 'linear-gradient(170deg, #141216 0%, #0f0e10 100%)',
          border: `1px solid ${hover ? 'rgba(201,169,110,0.34)' : 'rgba(246,242,235,0.07)'}`,
          transform: hover ? 'translateY(-5px)' : 'none',
          transition: 'transform 500ms cubic-bezier(.2,.7,.3,1), border-color 400ms, background 400ms',
        }}
      >
        <span
          className="mb-6 text-[10px] uppercase"
          style={{ letterSpacing: '0.24em', color: GOLD }}
        >
          {p.sector}
        </span>

        <h3 className="font-display text-[28px] font-normal leading-tight text-[#f6f2eb]">
          {p.name}
        </h3>

        {p.domain && (
          <span className="mt-1.5 font-mono text-xs text-[#6f6962]">{p.domain}</span>
        )}

        <p className="mt-5 flex-1 text-[15px] leading-relaxed text-[#9a938c]">{p.blurb}</p>

        <div className="mt-8">
          <span
            className="inline-flex items-center gap-2 pb-1 text-xs uppercase"
            style={{
              letterSpacing: '0.16em',
              color: hover ? GOLD : '#8a837b',
              borderBottom: `1px solid ${hover ? GOLD : 'transparent'}`,
              transition: 'color 300ms, border-color 300ms',
            }}
          >
            Visit
            <span
              aria-hidden="true"
              style={{
                transform: hover ? 'translateX(3px)' : 'none',
                transition: 'transform 300ms cubic-bezier(.2,.7,.3,1)',
              }}
            >
              →
            </span>
          </span>
        </div>
      </article>
    </Outbound>
  );
}

/* ------------------------------- page ------------------------------- */

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0a0c] text-[#f6f2eb] antialiased">
      {/* ------------------------------ NAV ------------------------------ */}
      <nav
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(11,10,12,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(201,169,110,0.16)' : 'transparent'}`,
        }}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" className="flex shrink-0 items-center gap-3 no-underline">
            <img src="/operon-badge.png" alt="" className="h-8 w-8 rounded-full object-cover" />
            <span
              className="font-display text-xl font-normal text-[#f6f2eb]"
              style={{ letterSpacing: '0.01em' }}
            >
              Operon
            </span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {[
              ['The stack', '#stack'],
              ['Portfolio', '#portfolio'],
              ['Approach', '#approach'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-[11px] uppercase text-[#9a938c] no-underline transition-colors duration-300 hover:text-[#f6f2eb]"
                style={{ letterSpacing: '0.2em' }}
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="mailto:info@myoperon.io?subject=Operon%20enquiry"
            className="shrink-0 border px-6 py-2.5 text-[11px] uppercase no-underline transition-all duration-300"
            style={{
              letterSpacing: '0.2em',
              borderColor: 'rgba(201,169,110,0.4)',
              color: GOLD,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = GOLD;
              e.currentTarget.style.color = '#0b0a0c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = GOLD;
            }}
          >
            Start a project
          </a>
        </div>
      </nav>

      {/* ------------------------------ HERO ------------------------------ */}
      <header className="grain relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-36 lg:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 18% 0%, rgba(201,169,110,0.14), transparent 62%), radial-gradient(ellipse 60% 45% at 85% 100%, rgba(139,92,246,0.10), transparent 60%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-[1240px]">
          <Reveal>
            <Eyebrow>Vacation ownership · Hospitality</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1
              className="font-display max-w-[17ch] text-[clamp(2.6rem,7.2vw,5.6rem)] font-normal leading-[1.03] tracking-[-0.02em]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              We build the software that runs{' '}
              <em className="not-italic" style={{ color: GOLD }}>
                vacation sales floors
              </em>
              .
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-9 max-w-[54ch] text-[17px] leading-[1.75] text-[#9a938c] md:text-lg">
              Recruiting, assessment, training, check-in, guest care, commissions and
              compliance — eight stages of one operational stack. Built and proven on a live
              sales operation before it was offered to anyone else.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <a
                href="#stack"
                className="px-9 py-4 text-[11px] uppercase no-underline transition-all duration-300"
                style={{ letterSpacing: '0.2em', background: GOLD, color: '#0b0a0c' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#dcc08c'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; }}
              >
                See the stack
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2.5 text-[11px] uppercase text-[#9a938c] no-underline transition-colors duration-300 hover:text-[#f6f2eb]"
                style={{ letterSpacing: '0.2em' }}
              >
                Seventeen shipped products
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      {/* --------------------------- PROOF STRIP --------------------------- */}
      <section className="border-y border-[rgba(201,169,110,0.14)] bg-[#0e0d0f]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 px-6 lg:grid-cols-4 lg:px-10">
          {[
            ['17', 'Products shipped'],
            ['8', 'Stages covered'],
            ['6', 'Sectors'],
            ['100%', 'Keys stay yours'],
          ].map(([n, l], i) => (
            <div
              key={l}
              className="px-2 py-10"
              style={{
                borderLeft: i === 0 ? 'none' : '1px solid rgba(246,242,235,0.07)',
              }}
            >
              <div className="font-display text-[44px] font-light leading-none" style={{ color: GOLD }}>
                {n}
              </div>
              <div
                className="mt-3 text-[10px] uppercase text-[#6f6962]"
                style={{ letterSpacing: '0.2em' }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------- THE STACK ----------------------------- */}
      <section id="stack" className="scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>The operator stack</Eyebrow>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-normal leading-[1.1] tracking-[-0.02em]">
                Eight stages. One system.
              </h2>
              <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.75] text-[#9a938c]">
                A vacation sales floor runs on the same eight stages everywhere. Most operators
                stitch them together from six vendors who have never set foot on a floor. We
                built the whole run, end to end.
              </p>
            </div>
          </Reveal>

          <div className="mt-16" style={{ borderBottom: '1px solid rgba(246,242,235,0.09)' }}>
            {STACK.map((s, i) => (
              <Reveal key={s.n} delay={i * 45}>
                <StageRow s={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- APPROACH ----------------------------- */}
      <section id="approach" className="scroll-mt-24 bg-[#0e0d0f] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Approach</Eyebrow>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-normal leading-[1.1] tracking-[-0.02em]">
                How we work.
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div>
                  <Rule />
                  <h3 className="font-display mt-7 text-2xl font-normal text-[#f6f2eb]">
                    {c.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-[#9a938c]">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- PORTFOLIO ----------------------------- */}
      <section id="portfolio" className="scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Portfolio</Eyebrow>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-normal leading-[1.1] tracking-[-0.02em]">
                Also shipped.
              </h2>
              <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.75] text-[#9a938c]">
                Products we own and run outside the vacation stack. They are here as evidence of
                delivery — marine, fleet, health, storage and fintech, all live.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px bg-[rgba(246,242,235,0.07)] sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 55}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- CTA ------------------------------- */}
      <section className="grain relative overflow-hidden border-y border-[rgba(201,169,110,0.16)] px-6 py-32 lg:px-10 lg:py-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(201,169,110,0.11), transparent 68%)',
          }}
        />
        <div className="relative mx-auto max-w-[760px] text-center">
          <Reveal>
            <Eyebrow>Start a project</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-normal leading-[1.1] tracking-[-0.02em]">
              Tell us which stage is bleeding.
            </h2>
            <p className="mx-auto mt-7 max-w-[50ch] text-[17px] leading-[1.75] text-[#9a938c]">
              Most operators know exactly where the leak is — onboarding that takes six weeks,
              commissions nobody trusts, tours credited to the wrong promotor. Start there.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <a
                href="mailto:info@myoperon.io?subject=Operon%20enquiry"
                className="px-10 py-4 text-[11px] uppercase no-underline transition-all duration-300"
                style={{ letterSpacing: '0.2em', background: GOLD, color: '#0b0a0c' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#dcc08c'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; }}
              >
                info@myoperon.io
              </a>
              <Link
                to="/docs"
                className="border px-10 py-4 text-[11px] uppercase text-[#9a938c] no-underline transition-all duration-300 hover:text-[#f6f2eb]"
                style={{ letterSpacing: '0.2em', borderColor: 'rgba(246,242,235,0.18)' }}
              >
                Technical docs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ FOOTER ------------------------------ */}
      <footer className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <img src="/operon-badge.png" alt="" className="h-8 w-8 rounded-full object-cover" />
                <span className="font-display text-xl font-normal">Operon</span>
              </div>
              <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-[#6f6962]">
                Software for vacation ownership and hospitality operators.
              </p>
              <a
                href="mailto:info@myoperon.io"
                className="mt-6 inline-block text-sm text-[#9a938c] no-underline transition-colors hover:text-[#f6f2eb]"
              >
                info@myoperon.io
              </a>
            </div>

            <div>
              <h4 className="text-[10px] uppercase text-[#6f6962]" style={{ letterSpacing: '0.2em' }}>
                Products
              </h4>
              <ul className="mt-6 space-y-3">
                {PRODUCTS.map((p) => (
                  <li key={p.name}>
                    <Outbound
                      href={p.href}
                      external={p.external}
                      className="text-sm text-[#9a938c] no-underline transition-colors hover:text-[#f6f2eb]"
                    >
                      {p.name}
                    </Outbound>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase text-[#6f6962]" style={{ letterSpacing: '0.2em' }}>
                Company
              </h4>
              <ul className="mt-6 space-y-3">
                <li><a href="#stack" className="text-sm text-[#9a938c] no-underline transition-colors hover:text-[#f6f2eb]">The stack</a></li>
                <li><Link to="/docs" className="text-sm text-[#9a938c] no-underline transition-colors hover:text-[#f6f2eb]">Docs</Link></li>
                <li><a href="/ai-assistants.html" className="text-sm text-[#9a938c] no-underline transition-colors hover:text-[#f6f2eb]">AI assistants</a></li>
                <li><a href="/brand-book.html" className="text-sm text-[#9a938c] no-underline transition-colors hover:text-[#f6f2eb]">Brand book</a></li>
                <li><a href="/resources.html" className="text-sm text-[#9a938c] no-underline transition-colors hover:text-[#f6f2eb]">Resources</a></li>
                <li><a href="https://myoperon.io/admin.html" className="text-sm text-[#9a938c] no-underline transition-colors hover:text-[#f6f2eb]">Admin</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-[rgba(246,242,235,0.07)] pt-8 text-xs text-[#5c5750] sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Operon. All rights reserved.</span>
            <span>Built and run on a live sales operation.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
