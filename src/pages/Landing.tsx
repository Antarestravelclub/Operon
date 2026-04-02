import { useNavigate } from 'react-router-dom'

// Category colors
const CATEGORY_COLORS = {
  health: '#6b9b6b',
  sales: '#3b82f6',
  travel: '#0d9488',
  loyalty: '#c9a96e',
  marketplace: '#f97316',
  trading: '#eab308'
}

function StatsBar() {
  return (
    <div style={{ backgroundColor: '#1a0a2e' }} className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div style={{ color: '#a78bfa' }} className="text-3xl md:text-4xl font-bold">6+</div>
            <div style={{ color: '#888' }} className="text-sm mt-1">Products</div>
          </div>
          <div>
            <div style={{ color: '#a78bfa' }} className="text-3xl md:text-4xl font-bold">3</div>
            <div style={{ color: '#888' }} className="text-sm mt-1">Industries</div>
          </div>
          <div>
            <div style={{ color: '#a78bfa' }} className="text-3xl md:text-4xl font-bold">AI-Powered</div>
            <div style={{ color: '#888' }} className="text-sm mt-1">Technology</div>
          </div>
          <div>
            <div style={{ color: '#a78bfa' }} className="text-3xl md:text-4xl font-bold">24/7</div>
            <div style={{ color: '#888' }} className="text-sm mt-1">Active</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CategoryCard({ icon, title, products, tagline, color, ctaLink, comingSoon }: {
  icon: string
  title: string
  products: string[]
  tagline: string
  color: string
  ctaLink?: string
  comingSoon?: boolean
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Top colored border */}
      <div style={{ backgroundColor: color }} className="h-1" />
      
      <div className="p-6">
        {/* Icon */}
        <div className="text-4xl mb-4">{icon}</div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        
        {/* Product list */}
        <ul className="space-y-1 mb-4">
          {products.map((product, i) => (
            <li key={i} className="text-sm text-gray-600 flex items-center">
              <span style={{ color }} className="mr-2">•</span>
              {product}
            </li>
          ))}
        </ul>
        
        {/* Tagline */}
        <p className="text-gray-500 text-sm mb-4">{tagline}</p>
        
        {/* CTA or Coming Soon */}
        {comingSoon ? (
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
              Coming Soon
            </span>
          </div>
        ) : ctaLink ? (
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium transition"
            style={{ color }}
          >
            Visit →
          </a>
        ) : null}
      </div>
    </div>
  )
}

function FeaturedSolace() {
  return (
    <div style={{ backgroundColor: '#1a2e1a' }} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-block px-4 py-1 bg-green-900/50 text-green-300 text-sm font-medium rounded-full mb-4">
              Featured Product
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Solace Wellness</h2>
            <p className="text-green-200 text-lg mb-6">
              AI wellness coaching, 24/7. Personalized mental health support that's always available.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-green-100">
                <span className="text-green-400 mr-3">✓</span>
                AI-powered therapy sessions
              </div>
              <div className="flex items-center text-green-100">
                <span className="text-green-400 mr-3">✓</span>
                Mood tracking & insights
              </div>
              <div className="flex items-center text-green-100">
                <span className="text-green-400 mr-3">✓</span>
                24/7 availability
              </div>
            </div>
            <a
              href="https://solace-wellness.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Visit Solace Wellness →
            </a>
          </div>
          
          {/* Right: Price comparison */}
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-white text-lg mb-4 font-semibold">Pricing Comparison</h3>
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="text-green-400 text-4xl font-bold">$9.99</div>
                <div className="text-green-200 text-sm">Solace Wellness</div>
              </div>
              <div className="text-gray-400 text-2xl">vs</div>
              <div className="text-center">
                <div className="text-gray-300 text-4xl font-bold">$240-400</div>
                <div className="text-gray-400 text-sm">Traditional Therapy</div>
              </div>
            </div>
            <p className="text-green-200 text-center text-sm">
              Save up to 96% with AI-powered wellness support
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function OperonPlatform() {
  return (
    <div style={{ backgroundColor: '#0f0a1a' }} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Operon Platform</h2>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          Complete B2B solution for teams looking to scale their sales and operations
        </p>
        
        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 rounded-xl p-8 hover:bg-white/10 transition">
            <div className="w-12 h-12 bg-violet-600/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">👤</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Rep Onboarding</h3>
            <p className="text-gray-400 text-sm">Get new reps trained and productive faster</p>
          </div>
          <div className="bg-white/5 rounded-xl p-8 hover:bg-white/10 transition">
            <div className="w-12 h-12 bg-violet-600/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🤖</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Follow-Up Automation</h3>
            <p className="text-gray-400 text-sm">Never miss a touchpoint with clients</p>
          </div>
          <div className="bg-white/5 rounded-xl p-8 hover:bg-white/10 transition">
            <div className="w-12 h-12 bg-violet-600/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">📊</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Sales Analytics</h3>
            <p className="text-gray-400 text-sm">Real-time insights into your sales pipeline</p>
          </div>
        </div>
        
        {/* Pricing */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <div className="text-center">
            <div className="text-white text-2xl font-bold">$39<span className="text-gray-400 text-sm font-normal">/rep/mo</span></div>
          </div>
          <div className="text-gray-600">·</div>
          <div className="text-center">
            <div className="text-white text-2xl font-bold">$1,900<span className="text-gray-400 text-sm font-normal"> setup</span></div>
          </div>
          <div className="text-gray-600">·</div>
          <div className="text-center">
            <div className="text-white text-2xl font-bold">$4,500<span className="text-gray-400 text-sm font-normal"> bundle</span></div>
          </div>
        </div>
        
        <a
          href="/signup"
          className="inline-block bg-violet-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-violet-700 transition"
        >
          Get Started Today
        </a>
      </div>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section style={{ backgroundColor: '#0a0a0f' }} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Purple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Logo */}
          <img
            src="/operon-badge.png"
            alt="Operon"
            className="w-[100px] h-[100px] mx-auto mb-12 object-contain"
          />
          
          {/* H1 */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight">
            Your AI Workforce Platform
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12">
            One platform. Multiple solutions. Infinite possibilities.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/solutions')}
              className="bg-[#7c3aed] text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition text-lg"
            >
              Explore Our Solutions →
            </button>
            <button
              onClick={() => navigate('/demo')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition text-lg"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar />

      {/* Categories - Our Ecosystem */}
      <section style={{ backgroundColor: '#f8f8f8' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Ecosystem</h2>
            <p className="text-gray-500 text-lg">Everything you need, built under one roof</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CategoryCard
              icon="💚"
              title="Health & Wellness"
              products={['Solace Wellness → solace-wellness.io']}
              tagline="AI wellness coaching, 24/7"
              color={CATEGORY_COLORS.health}
              ctaLink="https://solace-wellness.io"
            />
            
            <CategoryCard
              icon="💼"
              title="Sales & Talent"
              products={['APEX Index', 'Vida Rep Academy']}
              tagline="Hire smarter, train faster"
              color={CATEGORY_COLORS.sales}
            />
            
            <CategoryCard
              icon="🏖️"
              title="Travel & Hospitality"
              products={['Antares Travel Club', 'ARDA Materials']}
              tagline="Resort sales tools"
              color={CATEGORY_COLORS.travel}
            />
            
            <CategoryCard
              icon="🎁"
              title="Loyalty & Rewards"
              products={['LaraLuca', 'Bubble Twins']}
              tagline="Digital loyalty programs"
              color={CATEGORY_COLORS.loyalty}
              comingSoon={true}
            />
            
            <CategoryCard
              icon="🛒"
              title="Marketplace"
              products={['Buy/Sell/Trade']}
              tagline="Community marketplace"
              color={CATEGORY_COLORS.marketplace}
              comingSoon={true}
            />
            
            <CategoryCard
              icon="📈"
              title="Trading & Finance"
              products={['OperonTrader MT5']}
              tagline="Automated forex trading"
              color={CATEGORY_COLORS.trading}
            />
          </div>
        </div>
      </section>

      {/* Featured Solace Section */}
      <FeaturedSolace />

      {/* Operon B2B Platform Section */}
      <OperonPlatform />

      {/* Footer */}
      <footer style={{ backgroundColor: '#0a0a0f' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Logo & Tagline */}
            <div className="md:col-span-2">
              <img
                src="/operon-badge.png"
                alt="Operon"
                className="w-12 h-12 mb-4"
              />
              <p className="text-gray-400 mb-4">
                Your AI Workforce Platform — One platform. Multiple solutions. Infinite possibilities.
              </p>
              <p className="text-gray-500 text-sm">
                © 2026 Operon. All rights reserved.
              </p>
            </div>
            
            {/* Links Grid */}
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://solace-wellness.io" target="_blank" rel="noopener" className="hover:text-white transition">Solace Wellness</a></li>
                <li className="text-gray-500">APEX Index</li>
                <li className="text-gray-500">Vida Rep Academy</li>
                <li className="text-gray-500">Antares Travel Club</li>
                <li className="text-gray-500">OperonTrader MT5</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Press</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
