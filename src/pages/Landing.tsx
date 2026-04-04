
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { TrendingUp, MessageCircle, ClipboardList } from 'lucide-react';

function TestimonialCard({ name, role, stars, quote }: { name: string, role: string, stars: number, quote: string }) {
  const initials = name.split(' ').map((n: string) => n[0]).join('');
  
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center mr-4">
          <span className="text-white font-semibold text-sm">{initials}</span>
        </div>
        <div className="text-left">
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-gray-500 text-sm">{role}</div>
        </div>
      </div>
      <div className="flex text-yellow-400 mb-4">
        {[...Array(stars)].map((_, i) => (
          <span key={i} className="text-sm">★</span>
        ))}
      </div>
      <p className="text-gray-600 italic">"{quote}"</p>
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
    <div className="bg-gray-50 rounded-2xl p-8">
      <div className="space-y-8">
        <div>
          <label className="block text-left text-gray-700 font-medium mb-2">
            How many leads per week? <span className="text-violet-600">{leads}</span>
          </label>
          <input
            type="range"
            min="10"
            max="200"
            value={leads}
            onChange={(e) => setLeads(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
          />
        </div>
        
        <div>
          <label className="block text-left text-gray-700 font-medium mb-2">
            How many support emails per day? <span className="text-violet-600">{emails}</span>
          </label>
          <input
            type="range"
            min="5"
            max="100"
            value={emails}
            onChange={(e) => setEmails(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-violet-600">{hoursSaved} hrs</div>
            <div className="text-gray-500 text-sm">Hours saved per week</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-violet-600">${revenueRecovered.toLocaleString()}</div>
            <div className="text-gray-500 text-sm">Estimated revenue recovered</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-violet-600">{roi}%</div>
            <div className="text-gray-500 text-sm">Your ROI</div>
          </div>
        </div>
        
        <Link to="/signup" className="inline-block bg-violet-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-violet-700 transition shadow-lg shadow-violet-200 mt-4">
          Start saving time today →
        </Link>
      </div>
    </div>
  );
}



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


const AIIcon = () => (
  <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#7c3aed" opacity="0.2"/>
    <circle cx="24" cy="18" r="7" fill="#7c3aed" opacity="0.8"/>
    <circle cx="24" cy="18" r="7" stroke="#a78bfa" strokeWidth="1.5" fill="none"/>
    <circle cx="21" cy="16" r="1.5" fill="white"/>
    <circle cx="27" cy="16" r="1.5" fill="white"/>
    <path d="M20 20 Q24 23 28 20" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M14 32 Q14 27 24 27 Q34 27 34 32" fill="#7c3aed" opacity="0.4" stroke="#a78bfa" strokeWidth="1.5"/>
    <circle cx="16" cy="22" r="2" fill="#14b8a6"/>
    <circle cx="32" cy="22" r="2" fill="#14b8a6"/>
    <line x1="16" y1="22" x2="21" y2="18" stroke="#14b8a6" strokeWidth="1" opacity="0.5"/>
    <line x1="32" y1="22" x2="27" y2="18" stroke="#14b8a6" strokeWidth="1" opacity="0.5"/>
  </svg>
);
const Landing = () => {
  // const navigate = useNavigate(); // unused after mailto redirect



  // Products we SELL — Our Starting Lineup
  const lineupCategories = [
    {
      icon: <AIIcon />,
      title: 'AI Assistants',
      color: '#7c3aed',
      tagline: 'Your AI workforce — always on, always learning, never tired.',
      products: ['Sales Follow-Up AI', 'Rep Onboarding AI', 'Customer Support AI', 'Custom AI Builds'],
      cta: 'See Plans & Pricing',
      ctaLink: '/ai-assistants.html',
      external: false,
    },
    {
      icon: <SalesIcon />,
      title: 'APEX Index',
      color: '#3b82f6',
      tagline: 'Hire the best closers. Powered by behavioral science built for vacation sales.',
      products: ['Behavioral Assessment', 'Apex Performer Profile', 'Hire / Do Not Hire Recommendation'],
      cta: 'Visit APEX Index',
      ctaLink: 'https://apex-index.com',
      external: true,
    },
    {
      icon: <TradingIcon />,
      title: 'Lead to Cash Track',
      color: '#14b8a6',
      tagline: 'Full backend financial management — leads, payroll, goals, and stats.',
      products: ['Sales Volume Dashboard', 'OPC Performance Tracking', 'Payroll & Commission Reports', 'Sales Goals & Analytics'],
      cta: 'View Platform',
      ctaLink: 'https://lead-to-cash-track.vercel.app',
      external: true,
    },
    {
      icon: <MarketplaceIcon />,
      title: 'Operon Recruit',
      color: '#f97316',
      tagline: 'Kanban-style candidate pipeline for hiring vacation sales teams.',
      products: ['Candidate Tracking', 'Hiring Workflow', 'Interview Calendar', 'Analytics Dashboard'],
      cta: 'View Platform',
      ctaLink: 'https://operon-recruit.vercel.app',
      external: true,
    },
    {
      icon: <SalesIcon />,
      title: 'Operon Sales Academy',
      color: '#10b981',
      tagline: '30-day structured sales training platform for new and existing reps.',
      products: ['Day-by-Day Training Modules', 'Lesson Viewer', 'Progress Tracking', 'Training Editor'],
      cta: 'View Platform',
      ctaLink: 'https://vida-rep-academy-9d6cda93.vercel.app',
      external: true,
    },
    {
      icon: <LoyaltyIcon />,
      title: 'Operon Loyalty',
      color: '#c9a96e',
      tagline: 'Digital loyalty card programs for modern businesses.',
      products: ['Digital Stamp Cards', 'Points & Rewards', 'Merchant Dashboard', 'QR Code Scanning'],
      cta: 'View Platform',
      ctaLink: 'https://laralucaloyalty.vercel.app',
      external: true,
    },
    {
      icon: <MarketplaceIcon />,
      title: 'Operon Check-In',
      color: '#6366f1',
      tagline: 'Member verification and check-in platform with QR codes.',
      products: ['Member Verification', 'QR Code Scanning', 'Admin Dashboard', 'Promotor Tracking'],
      cta: 'View Platform',
      ctaLink: 'https://secure-checkin-confirm.vercel.app',
      external: true,
    },
    {
      icon: <MarketplaceIcon />,
      title: 'Operon Guest Care',
      color: '#ec4899',
      tagline: 'Guest experience and issue tracking for resorts and hospitality.',
      products: ['Guest Portal', 'Issue Tracking', 'Analytics Dashboard', 'Staff Management'],
      cta: 'View Platform',
      ctaLink: 'https://guest-whisper-care.vercel.app',
      external: true,
    },
    {
      icon: <TradingIcon />,
      title: 'Commission Calculator',
      color: '#84cc16',
      tagline: 'Sales commission tracking, payroll management and reporting.',
      products: ['Commission Charts', 'Payroll Manager', 'Company Breakdown', 'Admin Dashboard'],
      cta: 'View Platform',
      ctaLink: 'https://antares-travel-club-sales-commission-calc.vercel.app',
      external: true,
    },
    {
      icon: <TravelIcon />,
      title: 'Operon Vacation Finder',
      color: '#f59e0b',
      tagline: 'Vacation finance calculator and future planning tool.',
      products: ['Finance Calculator', 'Vacation Planning', 'Cost Analysis', 'Future Projections'],
      cta: 'View Platform',
      ctaLink: 'https://vacation-future-finder.vercel.app',
      external: true,
    },
  ];

  // Platforms we OWN — Built & Powered by Operon
  const builtByCategories = [
    {
      icon: <HealthIcon />,
      title: 'Solace Wellness',
      color: '#6b9b6b',
      tagline: 'AI wellness coaching — your always-available emotional support',
      products: ['AI Wellness Coach', '15-Min Free Trial', 'Charity Model'],
      cta: 'Visit Solace',
      ctaLink: 'https://solace-wellness.io',
      external: true,
    },

    {
      icon: <TravelIcon />,
      title: 'Operon Travel Hub',
      color: '#0d9488',
      tagline: 'Wholesale travel marketplace and content management',
      products: ['Travel Marketplace', 'Content Manager', 'Media Manager'],
      cta: 'View Platform',
      ctaLink: 'https://wholesale-wanderlust-hub.vercel.app',
      external: true,
    },
    {
      icon: <TravelIcon />,
      title: 'Operon Vacation Finder',
      color: '#f59e0b',
      tagline: 'Vacation finance calculator and future planning tool',
      products: ['Finance Calculator', 'Vacation Planning', 'Cost Analysis'],
      cta: 'View Platform',
      ctaLink: 'https://vacation-future-finder.vercel.app',
      external: true,
    },


    {
      icon: <TradingIcon />,
      title: 'OperonTrader',
      color: '#eab308',
      tagline: 'Automated MT5 trading on forex, gold & crypto',
      products: ['EURUSD', 'GOLD', 'BTCUSD — MT5 Expert Advisor'],
      cta: 'Download EA',
      ctaLink: '/OperonTrader.mq5',
      external: false,
    },
  ];

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#ffffff', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(124,58,237,0.2)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <img src="/operon-badge.png" alt="Operon" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Operon</span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="#ecosystem" style={{ color: '#9ca3af', fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap' }}>Ecosystem</a>
          <a href="#platform" style={{ color: '#9ca3af', fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap' }}>Platform</a>
          <a href="https://myoperon.io/admin.html" style={{ color: '#a78bfa', fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 600 }}>🔐 Admin</a>
        </div>
        <button
          onClick={() => window.location.href = 'mailto:info@myoperon.io?subject=Get Started with Operon'}
          style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}
        >
          Get Started →
        </button>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 40px 80px', background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.3) 0%, rgba(10,10,15,1) 60%)' }}>
        <img src="/operon-badge.png" alt="Operon" style={{ width: 380, height: 380, marginBottom: 32, borderRadius: '50%', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 0 80px rgba(124,58,237,0.9))' }} />

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
            <h2 style={{ fontSize: 42, fontWeight: 800, color: '#0a0a0f', marginBottom: 12 }}>Our Starting Lineup</h2>
            <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 520, margin: '0 auto' }}>
              Six products. One complete sales ecosystem.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {lineupCategories.map((cat) => (
              <div key={cat.title} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', borderTop: `4px solid ${cat.color}`, transition: 'transform 0.2s', display: 'flex', flexDirection: 'column' as const }}>
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

      {/* BUILT & POWERED BY OPERON */}
      <section style={{ background: '#0a0a0f', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 20, padding: '6px 16px', marginBottom: 16, fontSize: 12, color: '#a78bfa', letterSpacing: 2, textTransform: 'uppercase' as const }}>
              Our Own Platforms
            </div>
            <h2 style={{ fontSize: 42, fontWeight: 800, color: '#ffffff', marginBottom: 12 }}>Built & Powered by Operon</h2>
            <p style={{ fontSize: 18, color: '#9ca3af', maxWidth: 520, margin: '0 auto' }}>
              Platforms we built, own, and run ourselves.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {builtByCategories.map((cat) => (
              <div key={cat.title} style={{ background: '#111118', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(124,58,237,0.15)', borderTop: `4px solid ${cat.color}`, display: 'flex', flexDirection: 'column' as const }}>
                <div style={{ padding: '28px 28px 0' }}>
                  <div style={{ marginBottom: 16 }}>{cat.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>{cat.title}</h3>
                  <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 16, lineHeight: 1.6 }}>{cat.tagline}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
                    {cat.products.map(p => (
                      <li key={p} style={{ fontSize: 13, color: '#d1d5db', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: cat.color, display: 'inline-block', flexShrink: 0 }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: 'auto', padding: '0 28px 28px' }}>
                  {cat.ctaLink ? (
                    <a href={cat.ctaLink} target={cat.external ? '_blank' : '_self'} rel="noopener noreferrer"
                      style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', background: 'transparent', color: cat.color, border: `1px solid ${cat.color}` }}>
                      {cat.cta}
                    </a>
                  ) : (
                    <span style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: '#1f1f2e', color: '#4b5563' }}>
                      {cat.cta}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OPERON PLATFORM ─── */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Meet your new team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sales Assistant */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sales Assistant</h3>
              <p className="text-gray-600 mb-6">
                Follows up with leads, sends personalized emails, books appointments
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Lead Follow-up</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Email Outreach</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Appointment Booking</span>
              </div>
              <Link to="/hire" className="text-violet-600 font-medium hover:text-violet-700 transition">
                Hire Sales Assistant →
              </Link>
            </div>

            {/* Support Agent */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Support Agent</h3>
              <p className="text-gray-600 mb-6">
                Replies to customer emails, handles FAQs, escalates complex issues
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Email Support</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">FAQ Handling</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Ticket Management</span>
              </div>
              <Link to="/hire" className="text-violet-600 font-medium hover:text-violet-700 transition">
                Hire Support Agent →
              </Link>
            </div>

            {/* Admin Assistant */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <ClipboardList className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Admin Assistant</h3>
              <p className="text-gray-600 mb-6">
                Organizes your inbox, generates reports, manages repetitive tasks
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Inbox Management</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Reports</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Task Automation</span>
              </div>
              <Link to="/hire" className="text-violet-600 font-medium hover:text-violet-700 transition">
                Hire Admin Assistant →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Loved by business owners
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
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

      {/* ROI Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See how much time Operon saves you
          </h2>
          <p className="text-gray-600 mb-12">Adjust the sliders to see your potential ROI</p>
          
          <ROICalculator />
        </div>
      </section>

      {/* Follow-Up Automation Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">New Feature</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Never Lose a Sale After the Close</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Most sales fall apart not at the pitch — but in the silence after signing. Operon automates every touchpoint so your clients feel remembered, valued, and excited.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Features */}
            <div className="space-y-6">
              {[
                { icon: "📧", title: "Welcome Email in 1 Hour", desc: "Sent automatically from your rep's own email address — warm, personal, and on-brand." },
                { icon: "📞", title: "Voice Clone Calls", desc: "Your rep's cloned voice (powered by ElevenLabs) calls every client on Day 1. They think it's a real call." },
                { icon: "🤖", title: "AI FAQ Autoresponder", desc: "Clients text questions 24/7. AI answers instantly. Reps only get notified for escalations." },
                { icon: "📬", title: "7-Day Email Sequence", desc: "Automated nurture emails from the rep's address — booking tips, benefits reminders, check-ins." },
                { icon: "🎁", title: "Referral Ask on Day 45", desc: "Happy clients get a personalized referral request at exactly the right moment." },
              ].map((f) => (
                <div key={f.title} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{f.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Stats + CTA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rep does 3 things.</h3>
              <h3 className="text-xl font-bold text-violet-600 mb-6">AI does the rest.</h3>
              <div className="space-y-4 mb-8">
                {[
                  { step: "1", text: "Fill intake form after sale", time: "3 min" },
                  { step: "2", text: "Photo the contract", time: "30 sec" },
                  { step: "3", text: "Record voice sample once", time: "5 min (forever)" },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{s.step}</div>
                    <span className="text-gray-700 text-sm flex-1">{s.text}</span>
                    <span className="text-violet-600 text-xs font-semibold">{s.time}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                <div className="bg-violet-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-violet-600">7</div>
                  <div className="text-xs text-gray-500">Touchpoints</div>
                </div>
                <div className="bg-violet-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-violet-600">45</div>
                  <div className="text-xs text-gray-500">Days covered</div>
                </div>
                <div className="bg-violet-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-violet-600">$65</div>
                  <div className="text-xs text-gray-500">Per rep/mo</div>
                </div>
              </div>
              <a href="/signup" className="block w-full text-center bg-violet-600 text-white py-4 rounded-xl font-semibold hover:bg-violet-700 transition">Get Started Free →</a>
              <p className="text-center text-xs text-gray-400 mt-3">No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <img src="/operon-badge.png" alt="Operon" style={{ height: 36, width: 36, borderRadius: '50%', objectFit: 'contain' }} />
                <span className="text-white font-semibold">Operon</span>
              </div>
              <p className="text-sm text-violet-400">Your AI Workforce Platform</p>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-white transition">Product</a>
              <a href="#" className="hover:text-white transition">Pricing</a>
              <Link to="/docs" className="hover:text-white transition">Docs</Link>
              <a href="#" className="hover:text-white transition">About</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            © 2026 Operon. All rights reserved.
          </div>
        </div>
      </footer>
    </div>

  );
};

export default Landing;
