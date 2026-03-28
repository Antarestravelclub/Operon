import { Link } from 'react-router-dom'
import { Zap, Check } from 'lucide-react'
import { useState } from 'react'

// Stripe Price IDs
const PRICE_IDS = {
  starter: 'price_1TG2Xe78GJC5elzIdznAvtC3',
  growth: 'price_1TG2Xf78GJC5elzI3GbCRbNt',
  pro: 'price_1TG2Xg78GJC5elzIiWGrCMuP'
}

export default function Billing() {
  const [loading, setLoading] = useState<string | null>(null)
  const currentPlan = 'growth'
  
  const plans = [
    {
      id: 'starter',
      priceId: PRICE_IDS.starter,
      name: 'Starter',
      price: '$29',
      features: ['1 AI Employee', '500 tasks/month', 'Email support', 'Basic analytics'],
      popular: false
    },
    {
      id: 'growth',
      priceId: PRICE_IDS.growth,
      name: 'Growth',
      price: '$99',
      features: ['3 AI Employees', '2,000 tasks/month', 'Priority support', 'Advanced analytics', 'CRM integrations'],
      popular: true
    },
    {
      id: 'pro',
      priceId: PRICE_IDS.pro,
      name: 'Pro',
      price: '$299',
      features: ['Unlimited AI Employees', 'Unlimited tasks', 'Dedicated support', 'Custom integrations', 'White-label option'],
      popular: false
    }
  ]

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

  const invoices = [
    { id: 'INV-001', date: 'Mar 1, 2026', amount: '$99.00', status: 'Paid' },
    { id: 'INV-002', date: 'Feb 1, 2026', amount: '$99.00', status: 'Paid' },
    { id: 'INV-003', date: 'Jan 1, 2026', amount: '$99.00', status: 'Paid' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-violet-600" />
              <span className="text-xl font-bold text-gray-900">Operon</span>
            </Link>
            <nav className="flex space-x-6">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition">Dashboard</Link>
              <Link to="/hire" className="text-gray-600 hover:text-gray-900 transition">Hire</Link>
              <Link to="/billing" className="text-violet-600 font-medium">Billing</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Billing & Plans</h1>

        {/* Current Plan */}
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6 mb-12">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-violet-600 font-medium">Current Plan</p>
              <p className="text-xl font-semibold text-gray-900">Growth Plan — $99/mo</p>
            </div>
            <div className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Active
            </div>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Change Plan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 ${
                  plan.popular 
                    ? 'border-2 border-violet-600 bg-violet-50' 
                    : 'border border-gray-200 bg-white'
                } ${currentPlan === plan.id ? 'ring-2 ring-violet-600' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600 text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {currentPlan === plan.id ? (
                  <div className="w-full text-center py-3 bg-violet-100 text-violet-700 rounded-lg font-medium">
                    Current Plan
                  </div>
                ) : (
                  <button 
                    onClick={() => handleSubscribe(plan.priceId)}
                    disabled={loading === plan.priceId}
                    className="w-full border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading === plan.priceId ? 'Processing...' : 'Upgrade'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Method</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">VISA</span>
              </div>
              <div>
                <p className="text-gray-900 font-medium">Visa ending in 4242</p>
                <p className="text-sm text-gray-600">Expires 12/2026</p>
              </div>
            </div>
            <button className="text-violet-600 text-sm font-medium hover:text-violet-700 transition">
              Update
            </button>
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Invoice History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Invoice</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-600">Download</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 last:border-0">
                    <td className="py-4 text-gray-900">{invoice.id}</td>
                    <td className="py-4 text-gray-600">{invoice.date}</td>
                    <td className="py-4 text-gray-900">{invoice.amount}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-violet-600 text-sm font-medium hover:text-violet-700 transition">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}