import { Link } from 'react-router-dom'
import { TrendingUp, MessageCircle, ClipboardList, Check, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'

// Stripe Price IDs
const PRICE_IDS = {
  starter: 'price_1TG2Xe78GJC5elzIdznAvtC3',
  growth: 'price_1TG2Xf78GJC5elzI3GbCRbNt',
  pro: 'price_1TG2Xg78GJC5elzIiWGrCMuP'
}

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

function TractionCounter({ targetValue, prefix = '', suffix = '', label }: { targetValue: number, prefix?: string, suffix?: string, label: string }) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCurrentValue(Math.floor(startValue + (targetValue - startValue) * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-violet-600">
        {prefix}{currentValue.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-500 text-sm mt-1">{label}</div>
    </div>
  );
}

export default function Landing() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (priceId: string) => {
    setLoading(priceId)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, email: undefined }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/operon-logo.jpg" alt="Operon" className="h-12 md:h-20 w-auto" />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/#features" className="text-gray-600 hover:text-gray-900 transition">Features</Link>
              <Link to="/#pricing" className="text-gray-600 hover:text-gray-900 transition">Pricing</Link>
              <Link to="/docs" className="text-gray-600 hover:text-gray-900 transition">Docs</Link>
              <Link to="/#about" className="text-gray-600 hover:text-gray-900 transition">About</Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 transition px-3 py-2">Log In</Link>
              <Link to="/admin" className="text-gray-400 hover:text-gray-600 transition p-2" title="Admin Panel">
                <Shield className="h-5 w-5" />
              </Link>
              <Link to="/signup" className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition">
                Get Started
              </Link>
            </div>
            <div className="flex md:hidden items-center space-x-3">
              <Link to="/login" className="text-gray-600 text-sm">Log In</Link>
              <Link to="/signup" className="bg-violet-600 text-white px-3 py-1.5 rounded-lg text-sm">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-200 rounded-full filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2" />
        {/* Watermark */}
        <div className="absolute top-16 left-0 right-0 flex justify-center pointer-events-none select-none">
          <img src="/operon-logo.jpg" alt="" className="w-[500px] h-[500px] object-contain" style={{ opacity: 0.15, mixBlendMode: 'multiply' }} />
        </div>

        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Hire your first AI employee in under 2 minutes.
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Operon handles your sales, support, and admin work automatically. 
              No technical setup. No hiring headaches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/hire" className="bg-violet-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-violet-700 transition shadow-lg shadow-violet-200">
                Hire Your First AI Employee →
              </Link>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-50 transition">
                See How It Works
              </button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-4">
              <span className="text-gray-600">Trusted by 500+ small businesses</span>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traction Counters Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TractionCounter targetValue={2400} suffix="+" label="Tasks Automated Today" />
            <TractionCounter targetValue={847} label="Businesses Using Operon" />
            <TractionCounter targetValue={23} suffix=" hrs" label="Saved Per Week (avg)" />
            <TractionCounter targetValue={12400} prefix="$" label="Revenue Generated (avg/mo)" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Up and running in 3 steps
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Choose an AI employee', desc: 'Select from our roster of AI employees designed for sales, support, and admin tasks.' },
              { step: '02', title: 'Click "Hire"', desc: 'Takes 30 seconds to set up. No technical configuration required.' },
              { step: '03', title: 'Start working immediately', desc: 'Your AI employee gets to work right away, learning from your business.' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-violet-600 font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">Trusted by businesses like yours</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { icon: '🏠', name: 'Real Estate' },
              { icon: '🦷', name: 'Healthcare' },
              { icon: '🛍️', name: 'E-Commerce' },
              { icon: '🍕', name: 'Restaurants' },
              { icon: '💼', name: 'Consulting' },
              { icon: '🏋️', name: 'Fitness Studios' }
            ].map((item, i) => (
              <div key={i} className="px-6 py-3 bg-gray-100 rounded-full text-gray-700 font-medium">
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </div>
            ))}
          </div>
          <p className="text-gray-600">From solopreneurs to 50-person teams — Operon works for any business.</p>
        </div>
      </section>

      {/* AI Employees Section */}
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Simple, transparent pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  1 AI Employee
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  500 tasks/month
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Email support
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Basic analytics
                </li>
              </ul>
              <button onClick={() => handleSubscribe(PRICE_IDS.starter)} disabled={loading === PRICE_IDS.starter} className="block w-full text-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
                {loading === PRICE_IDS.starter ? 'Processing...' : 'Start Free Trial'}
              </button>
            </div>

            {/* Growth */}
            <div className="border-2 border-violet-600 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$99</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  3 AI Employees
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  2,000 tasks/month
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Priority support
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  CRM integrations
                </li>
              </ul>
              <button onClick={() => handleSubscribe(PRICE_IDS.growth)} disabled={loading === PRICE_IDS.growth} className="block w-full text-center bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                {loading === PRICE_IDS.growth ? 'Processing...' : 'Start Free Trial'}
              </button>
            </div>

            {/* Pro */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$299</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Unlimited AI Employees
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Unlimited tasks
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Dedicated support
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Custom integrations
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  White-label option
                </li>
              </ul>
              <button onClick={() => handleSubscribe(PRICE_IDS.pro)} disabled={loading === PRICE_IDS.pro} className="block w-full text-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
                {loading === PRICE_IDS.pro ? 'Processing...' : 'Start Free Trial'}
              </button>
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
                <img src="/operon-logo.jpg" alt="Operon" className="h-8 w-auto brightness-0 invert" />
              </div>
              <p className="text-sm">Your AI workforce, always working.</p>
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
  )
}