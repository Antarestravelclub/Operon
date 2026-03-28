import { Link } from 'react-router-dom'
import { Zap, TrendingUp, MessageCircle, ClipboardList, Zap as LightningBolt, Check } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <LightningBolt className="h-6 w-6 text-violet-600" />
                <span className="text-xl font-bold text-gray-900">Operon</span>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link to="/#features" className="text-gray-600 hover:text-gray-900 transition">Features</Link>
              <Link to="/#pricing" className="text-gray-600 hover:text-gray-900 transition">Pricing</Link>
              <Link to="/#about" className="text-gray-600 hover:text-gray-900 transition">About</Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 transition px-3 py-2">Log In</Link>
              <Link to="/signup" className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-200 rounded-full filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2" />
        
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
              <Link to="/signup" className="block w-full text-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
                Start Free Trial
              </Link>
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
              <Link to="/signup" className="block w-full text-center bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition">
                Start Free Trial
              </Link>
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
              <Link to="/signup" className="block w-full text-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
                Contact Sales
              </Link>
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
                <Zap className="h-5 w-5 text-violet-400" />
                <span className="text-xl font-bold text-white">Operon</span>
              </div>
              <p className="text-sm">Your AI workforce, always working.</p>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-white transition">Product</a>
              <a href="#" className="hover:text-white transition">Pricing</a>
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