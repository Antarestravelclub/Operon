import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, TrendingUp, MessageCircle, ClipboardList, Check } from 'lucide-react'

export default function HireEmployee() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<string>('')
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    tone: 'Friendly',
    employeeName: ''
  })
  const [isHiring, setIsHiring] = useState(false)
  const [hireSuccess, setHireSuccess] = useState(false)

  const employeeTypes = [
    {
      id: 'sales',
      name: 'Sales Assistant',
      description: 'Follows up with leads, sends personalized emails, books appointments',
      icon: TrendingUp,
      iconColor: 'text-violet-600',
      bgColor: 'bg-violet-100',
      placeholderName: 'Alex'
    },
    {
      id: 'support',
      name: 'Customer Support Agent',
      description: 'Replies to customer emails, handles FAQs, escalates complex issues',
      icon: MessageCircle,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      placeholderName: 'Sam'
    },
    {
      id: 'admin',
      name: 'Admin Assistant',
      description: 'Organizes your inbox, generates reports, manages repetitive tasks',
      icon: ClipboardList,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      placeholderName: 'Jordan'
    }
  ]

  const handleTypeSelect = (typeId: string, name: string) => {
    setSelectedType(typeId)
    setFormData(prev => ({ ...prev, employeeName: name }))
  }

  const handleHire = () => {
    setIsHiring(true)
    // Simulate hiring process
    setTimeout(() => {
      setHireSuccess(true)
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    }, 1000)
  }

  if (hireSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your AI employee is now working!</h2>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-violet-600" />
              <span className="text-xl font-bold text-gray-900">Operon</span>
            </Link>
            <nav className="flex space-x-6">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition">Dashboard</Link>
              <Link to="/hire" className="text-violet-600 font-medium">Hire</Link>
              <Link to="/billing" className="text-gray-600 hover:text-gray-900 transition">Billing</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-violet-600' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Choose Employee Type */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Choose your AI employee</h2>
            <p className="text-gray-600 text-center mb-12">Select the type of employee you'd like to hire</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {employeeTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id, type.placeholderName)}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition ${
                    selectedType === type.id 
                      ? 'border-violet-600 bg-violet-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 ${type.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <type.icon className={`h-6 w-6 ${type.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                  {selectedType === type.id && (
                    <div className="flex items-center text-violet-600 text-sm">
                      <Check className="h-4 w-4 mr-1" />
                      Selected
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedType && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setStep(2)}
                  className="bg-violet-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-violet-700 transition"
                >
                  Continue →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Configure */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Configure your employee</h2>
            <p className="text-gray-600 text-center mb-12">Set up your AI employee's details</p>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                  placeholder="Acme Corporation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tone
                </label>
                <div className="flex space-x-3">
                  {['Friendly', 'Professional', 'Direct'].map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setFormData({ ...formData, tone })}
                      className={`px-6 py-3 rounded-lg font-medium transition ${
                        formData.tone === tone
                          ? 'bg-violet-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name
                </label>
                <input
                  type="text"
                  value={formData.employeeName}
                  onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-violet-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-violet-700 transition"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Hire */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Ready to hire!</h2>
            <p className="text-gray-600 text-center mb-12">Review your employee details below</p>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {employeeTypes.find(t => t.id === selectedType)?.name}
                  </h3>
                  <p className="text-gray-600">{formData.employeeName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Tone: {formData.tone}</p>
                  <p className="text-sm text-gray-600">Business: {formData.businessName || 'Not set'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Business Name</p>
                  <p className="text-gray-900">{formData.businessName || '—'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="text-gray-900">{formData.email || '—'}</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleHire}
                disabled={isHiring}
                className="bg-violet-600 text-white px-12 py-4 rounded-xl text-lg font-medium hover:bg-violet-700 transition shadow-lg shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isHiring ? 'Hiring...' : `Hire ${formData.employeeName} Now →`}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}