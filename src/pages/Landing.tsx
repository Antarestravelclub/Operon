import { useNavigate } from 'react-router-dom';

// Inline SVG icon components
const HealthIcon = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#6b9b6b" opacity="0.2"/>
    <path d="M14 20c0-4.4 3.6-8 8-8 2.4 0 4.5 1 6 2.6C29.5 13 31.6 12 34 12c4.4 0 8 3.6 8 8 0 2.8-1.4 5.3-3.5 6.8L24 36l-14.5-9.2C7.4 25.3 6 22.8 6 20z" fill="#6b9b6b" stroke="#4a8a4a" strokeWidth="1.5"/>
    <polyline points="10,26 14,22 17,28 20,20 23,26 26,24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

const SalesIcon = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#3b82f6" opacity="0.2"/>
    <circle cx="24" cy="24" r="18" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
    <circle cx="24" cy="24" r="11" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
    <circle cx="24" cy="24" r="5" fill="#3b82f6"/>
    <line x1="36" y1="12" x2="26" y2="22" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M34 10l4 2-2 4" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TravelIcon = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#0d9488" opacity="0.2"/>
    <line x1="24" y1="38" x2="24" y2="18" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M24 20 Q18 12 10 14 Q16 18 20 22" fill="#14b8a6"/>
    <path d="M24 20 Q30 12 38 14 Q32 18 28 22" fill="#14b8a6"/>
    <path d="M24 25 Q20 17 14 19 Q19 22 22 26" fill="#0d9488" opacity="0.7"/>
    <line x1="8" y1="37" x2="40" y2="37" stroke="#0d9488" strokeWidth="2" opacity="0.5"/>
  </svg>
);

const LoyaltyIcon = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#c9a96e" opacity="0.2"/>
    <rect x="7" y="15" width="34" height="22" rx="4" fill="none" stroke="#c9a96e" strokeWidth="1.5"/>
    <rect x="7" y="15" width="34" height="22" rx="4" fill="#c9a96e" opacity="0.15"/>
    <line x1="7" y1="22" x2="41" y2="22" stroke="#c9a96e" strokeWidth="2"/>
    <rect x="11" y="26" width="8" height="5" rx="1" fill="#c9a96e" opacity="0.6"/>
    <path d="M30 28l1 2.5h2.5l-2 1.5 0.8 2.5L30 33l-2.3 1.5 0.8-2.5-2-1.5H29z" fill="#f59e0b"/>
  </svg>
);

const MarketplaceIcon = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#f97316" opacity="0.2"/>
    <path d="M14 18 Q24 10 34 18" stroke="#f97316" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M32 16l4 4-4 2" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M34 30 Q24 38 14 30" stroke="#f97316" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M16 32l-4-4 4-2" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="24" r="5" fill="#f97316" opacity="0.3" stroke="#f97316" strokeWidth="1.5"/>
    <text x="24" y="27" textAnchor="middle" fill="#f97316" fontSize="7" fontWeight="bold">$</text>
  </svg>
);

const TradingIcon = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#eab308" opacity="0.2"/>
    <rect x="9" y="27" width="5" height="9" rx="1" fill="#ef4444"/>
    <line x1="11.5" y1="23" x2="11.5" y2="27" stroke="#ef4444" strokeWidth="1.5"/>
    <line x1="11.5" y1="36" x2="11.5" y2="39" stroke="#ef4444" strokeWidth="1.5"/>
    <rect x="17" y="19" width="5" height="13" rx="1" fill="#22c55e"/>
    <line x1="19.5" y1="14" x2="19.5" y2="19" stroke="#22c55e" strokeWidth="1.5"/>
    <line x1="19.5" y1="32" x2="19.5" y2="37" stroke="#22c55e" strokeWidth="1.5"/>
    <rect x="25" y="22" width="5" height="11" rx="1" fill="#22c55e"/>
    <line x1="27.5" y1="17" x2="27.5" y2="22" stroke="#22c55e" strokeWidth="1.5"/>
    <path d="M35 18 Q37 12 39 10 Q39 15 37 17 Q38 17 39 15 Q37 19 35 18z" fill="#7c3aed"/>
  </svg>
);

const Landing = () => {
  const navigate = useNavigate();

  const categories = [
    {
      icon: <HealthIcon />,
      title: 'Health & Wellness',
      color: '#6b9b6b',
      tagline: 'AI-powered emotional support, available 24/7',
      products: ['Solace Wellness — AI Wellness Coaching'],
      cta: 'Visit Solace',
      ctaLink: 'https://solace-wellness.io',
      external: true,
    },
    {
      icon: <SalesIcon />,
      title: 'Sales & Talent',
      color: '#3b82f6',
      tagline: 'Hire smarter. Train faster. Close more.',
      products: ['APEX Index — Talent Assessment', 'Vida Rep Academy — Rep Training'],
      cta: 'View Products',
      ctaLink: '/pricing',
      external: false,
    },
    {
      icon: <TravelIcon />,
      title: 'Travel & Hospitality',
      color: '#0d9488',
      tagline: 'Premium resort sales tools & travel experiences',
      products: ['Antares Travel Club', 'ARDA Sales Materials'],
      cta: 'Explore',
      ctaLink: 'https://arda-materials.vercel.app',
      external: true,
    },
    {
      icon: <LoyaltyIcon />,
      title: 'Loyalty & Rewards',
      color: '#c9a96e',
      tagline: 'Digital loyalty card programs for modern businesses',
      products: ['LaraLuca Loyalty', 'Bubble Twins Loyalty'],
      cta: 'Coming Soon',
      ctaLink: null,
      external: false,
    },
    {
      icon: <MarketplaceIcon />,
      title: 'Marketplace',
      color: '#f97316',
      tagline: 'Community platform for buying, selling & trading',
      products: ['Buy / Sell / Trade Platform'],
      cta: 'Coming Soon',
      ctaLink: null,
      external: false,
    },
    {
      icon: <TradingIcon />,
      title: 'Trading & Finance',
      color: '#eab308',
      tagline: 'Automated trading on forex, gold & crypto',
      products: ['OperonTrader MT5 — EURUSD, GOLD, BTC'],
      cta: 'Download EA',
      ctaLink: '/download.html',
      external: false,
    },
  ];

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#0a0a0f', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(124,58,237,0.2)', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/operon-badge.png" alt="Operon" style={{ width: 36, height: 36 }} />
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Operon</span>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          <a href="#ecosystem" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>Ecosystem</a>
          <a href="#platform" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>Platform</a>
          <a href="#pricing" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>Pricing</a>
        </div>
        <button
          onClick={() => navigate('/rep/onboarding')}
          style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          Get Started →
        </button>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 40px 80px', background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.3) 0%, rgba(10,10,15,1) 60%)' }}>
        <img src="/operon-badge.png" alt="Operon" style={{ width: 100, height: 100, marginBottom: 32, filter: 'drop-shadow(0 0 30px rgba(124,58,237,0.6))' }} />
        <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: 20, padding: '6px 16px', marginBottom: 24, fontSize: 12, color: '#a78bfa', letterSpacing: 2, textTransform: 'uppercase' as const }}>
          AI Workforce Platform
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: 20, maxWidth: 800 }}>
          Your AI Workforce<br />
          <span style={{ background: 'linear-gradient(135deg, #7c3aed, #14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Platform</span>
        </h1>
        <p style={{ fontSize: 20, color: '#9ca3af', marginBottom: 40, maxWidth: 560 }}>
          One platform. Multiple solutions. Infinite possibilities.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
          <a href="#ecosystem" style={{ background: '#7c3aed', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Explore Our Ecosystem →
          </a>
          <button
            onClick={() => window.location.href = 'mailto:mark@myoperon.io'}
            style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
          >
            Book a Demo
          </button>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ background: '#1a0a2e', padding: '30px 40px', display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap' as const, borderTop: '1px solid rgba(124,58,237,0.3)', borderBottom: '1px solid rgba(124,58,237,0.3)' }}>
        {[
          { num: '6+', label: 'Products' },
          { num: '3', label: 'Industries' },
          { num: 'AI', label: 'Powered' },
          { num: '24/7', label: 'Active' },
          { num: '100%', label: 'Yours' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#a78bfa' }}>{s.num}</div>
            <div style={{ fontSize: 12, color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ECOSYSTEM */}
      <section id="ecosystem" style={{ background: '#f9fafb', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 20, padding: '6px 16px', marginBottom: 16, fontSize: 12, color: '#7c3aed', letterSpacing: 2, textTransform: 'uppercase' as const }}>
              Our Ecosystem
            </div>
            <h2 style={{ fontSize: 42, fontWeight: 800, color: '#0a0a0f', marginBottom: 12 }}>Everything under one roof</h2>
            <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 520, margin: '0 auto' }}>
              Six categories. Dozens of solutions. One platform to power them all.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {categories.map((cat) => (
              <div key={cat.title} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderTop: `4px solid ${cat.color}`, transition: 'transform 0.2s', display: 'flex', flexDirection: 'column' as const }}>
                <div style={{ padding: '28px 28px 0' }}>
                  <div style={{ marginBottom: 16 }}>{cat.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0f', marginBottom: 6 }}>{cat.title}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16, lineHeight: 1.6 }}>{cat.tagline}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
                    {cat.products.map(p => (
                      <li key={p} style={{ fontSize: 13, color: '#4b5563', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: cat.color, display: 'inline-block', flexShrink: 0 }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ padding: '0 28px 28px', marginTop: 'auto' }}>
                  {cat.ctaLink ? (
                    cat.external ? (
                      <a href={cat.ctaLink} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'block', textAlign: 'center', background: cat.color, color: '#fff', padding: '12px', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                        {cat.cta} →
                      </a>
                    ) : (
                      <a href={cat.ctaLink}
                        style={{ display: 'block', textAlign: 'center', background: cat.color, color: '#fff', padding: '12px', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                        {cat.cta} →
                      </a>
                    )
                  ) : (
                    <div style={{ textAlign: 'center', background: '#f3f4f6', color: '#9ca3af', padding: '12px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
                      {cat.cta}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SOLACE */}
      <section style={{ background: '#0f1f0f', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(107,155,107,0.2)', border: '1px solid #6b9b6b', borderRadius: 20, padding: '6px 16px', marginBottom: 20, fontSize: 12, color: '#6b9b6b', letterSpacing: 2, textTransform: 'uppercase' as const }}>
              Featured Product
            </div>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Solace Wellness</h2>
            <p style={{ fontSize: 18, color: '#c8dcc8', marginBottom: 24, lineHeight: 1.7, fontStyle: 'italic' }}>
              "Price shouldn't be the reason not to have someone listen and help."
            </p>
            <p style={{ fontSize: 15, color: '#8aaa8a', marginBottom: 32 }}>
              AI-powered wellness coaching with ElevenLabs voice AI. 24 topics. 3 languages. Available 24/7.
            </p>
            <a href="https://solace-wellness.io" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: '#6b9b6b', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 16, textDecoration: 'none' }}>
              Try Free for 15 Minutes →
            </a>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 40, border: '1px solid rgba(107,155,107,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 14, color: '#8aaa8a', marginBottom: 8 }}>BetterHelp</div>
                  <div style={{ fontSize: 48, fontWeight: 800, color: '#6b7280' }}>$400</div>
                  <div style={{ fontSize: 13, color: '#4b5563' }}>per month</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, fontWeight: 800, color: '#c9a96e' }}>VS</div>
                <div>
                  <div style={{ fontSize: 14, color: '#6b9b6b', marginBottom: 8 }}>Solace</div>
                  <div style={{ fontSize: 48, fontWeight: 800, color: '#c9a96e' }}>$9.99</div>
                  <div style={{ fontSize: 13, color: '#8aaa8a' }}>per month</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>We Care 💚</div>
            </div>
          </div>
        </div>
      </section>

      {/* OPERON PLATFORM */}
      <section id="platform" style={{ background: '#0f0a1a', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: 20, padding: '6px 16px', marginBottom: 20, fontSize: 12, color: '#a78bfa', letterSpacing: 2, textTransform: 'uppercase' as const }}>
            The Platform
          </div>
          <h2 style={{ fontSize: 42, fontWeight: 800, color: '#fff', marginBottom: 16 }}>The Operon Platform</h2>
          <p style={{ fontSize: 18, color: '#9ca3af', marginBottom: 50, maxWidth: 500, margin: '0 auto 50px' }}>
            AI-powered tools that work together to grow your sales team.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 50 }}>
            {[
              { icon: '🚀', title: 'Rep Onboarding', desc: '4-step automated onboarding. Profile, voice, email setup — done in minutes.' },
              { icon: '🔁', title: 'Follow-Up Automation', desc: 'Never lose a sale after the close. AI-powered follow-up sequences.' },
              { icon: '📊', title: 'Sales Analytics', desc: 'Track every deal, rep performance, and revenue in real time.' },
            ].map(f => (
              <div key={f.title} style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 16, padding: 28, textAlign: 'left' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div id="pricing" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 16, padding: 40, display: 'inline-block' }}>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' as const, justifyContent: 'center', marginBottom: 24 }}>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: 32, fontWeight: 800, color: '#a78bfa' }}>$39</div><div style={{ fontSize: 13, color: '#6b7280' }}>per rep / month</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: 32, fontWeight: 800, color: '#a78bfa' }}>$1,900</div><div style={{ fontSize: 13, color: '#6b7280' }}>setup fee</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: 32, fontWeight: 800, color: '#c9a96e' }}>$4,500</div><div style={{ fontSize: 13, color: '#6b7280' }}>full bundle (all-in)</div></div>
            </div>
            <button onClick={() => navigate('/rep/onboarding')} style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
              Get Started Today →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0a0a0f', borderTop: '1px solid rgba(124,58,237,0.2)', padding: '50px 40px 30px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <img src="/operon-badge.png" alt="Operon" style={{ width: 36, height: 36 }} />
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Operon</span>
              </div>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, maxWidth: 260 }}>
                Your AI Workforce Platform. One ecosystem. Infinite possibilities.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#a78bfa', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: 16 }}>Products</div>
              {['Solace Wellness', 'APEX Index', 'Vida Rep Academy', 'OperonTrader'].map(p => (
                <div key={p} style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>{p}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#a78bfa', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: 16 }}>Platform</div>
              {['Rep Onboarding', 'Follow-Up System', 'Sales Intake', 'Analytics'].map(p => (
                <div key={p} style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>{p}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#a78bfa', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: 16 }}>Contact</div>
              <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>mark@myoperon.io</div>
              <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>myoperon.io</div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(124,58,237,0.15)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 12 }}>
            <div style={{ fontSize: 13, color: '#4b5563' }}>© 2026 Operon. All rights reserved.</div>
            <div style={{ fontSize: 13, color: '#7c3aed', fontWeight: 600 }}>Your AI Workforce Platform</div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
