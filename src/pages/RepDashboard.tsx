import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Plus, TrendingUp, Phone, Mail, Clock, User, Shield, ChevronLeft } from 'lucide-react'

export default function RepDashboard() {
  const [sales, setSales] = useState<any[]>([])
  const [currentRep, setCurrentRep] = useState<any>(null)
  const [adminView, setAdminView] = useState(false)
  const [reps, setReps] = useState<any[]>([])
  const [selectedSale, setSelectedSale] = useState<any>(null)
  const [notes, setNotes] = useState<string>('')
  const userEmail = localStorage.getItem('operon_user') || ''
  const isSuperAdmin = userEmail === 'piffmex1@gmail.com' || userEmail === 'mark@fimartech.com'

  useEffect(() => {
    // Load sales from localStorage
    const savedSales = JSON.parse(localStorage.getItem('operon_sales') || '[]')
    const savedReps = JSON.parse(localStorage.getItem('operon_reps') || '[]')
    const savedCurrentRep = JSON.parse(localStorage.getItem('operon_current_rep') || '{}')

    setSales(savedSales)
    setReps(savedReps)
    setCurrentRep(savedCurrentRep)
  }, [])

  // Filter sales based on view mode
  const displayedSales = adminView && isSuperAdmin 
    ? sales 
    : sales.filter(s => s.repId === currentRep?.id)

  // Calculate stats
  const totalSales = displayedSales.length
  const activeFollowUps = displayedSales.filter(s => !s.status?.followUpComplete).length
  const callsSent = displayedSales.filter(s => s.status?.voiceCall === 'sent' || s.status?.voiceCall === 'scheduled').length
  const emailsSent = displayedSales.filter(s => s.status?.welcomeEmail === 'sent').length

  const getStatusBadge = (status: any) => {
    if (!status) return null

    if (status.followUpComplete) {
      return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Follow-Up Complete ✅</span>
    }

    if (status.welcomeEmail === 'pending') {
      return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Welcome Email Pending 📬</span>
    }

    if (status.welcomeEmail === 'sent' && status.voiceCall === 'pending') {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Voice Call Scheduled 📞</span>
    }

    if (status.voiceCall === 'scheduled' && status.day3Email === 'pending') {
      return <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Day 3 Email Pending 📬</span>
    }

    return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">In Progress</span>
  }

  const getNextAction = (status: any) => {
    if (!status) return 'Processing...'

    if (status.followUpComplete) return 'All done!'
    if (status.welcomeEmail === 'pending') return 'Email in ~1 hour'
    if (status.welcomeEmail === 'sent' && status.voiceCall === 'pending') return 'Call scheduled for tomorrow'
    if (status.voiceCall === 'scheduled') return 'Day 3 email coming up'
    return 'In progress'
  }

  const openSaleModal = (sale: any) => {
    setSelectedSale(sale)
    // Load existing notes from localStorage
    const saleNotes = JSON.parse(localStorage.getItem('operon_sale_notes') || '{}')
    setNotes(saleNotes[sale.id] || '')
  }

  const closeSaleModal = () => {
    setSelectedSale(null)
    setNotes('')
  }

  const saveSaleNotes = () => {
    if (!selectedSale) return
    const saleNotes = JSON.parse(localStorage.getItem('operon_sale_notes') || '{}')
    saleNotes[selectedSale.id] = notes
    localStorage.setItem('operon_sale_notes', JSON.stringify(saleNotes))
    alert('Notes saved successfully!')
  }

  const getFollowUpSteps = (status: any) => {
    if (!status) return []
    
    return [
      { name: 'Welcome Email', icon: '📧', completed: status.welcomeEmail === 'sent', pending: status.welcomeEmail === 'pending' },
      { name: 'Voice Call', icon: '📞', completed: status.voiceCall === 'sent' || status.voiceCall === 'scheduled', pending: status.voiceCall === 'pending' },
      { name: 'Day 3 Email', icon: '📬', completed: status.day3Email === 'sent', pending: status.day3Email === 'pending' },
      { name: 'Day 7 Email', icon: '📬', completed: status.day7Email === 'sent', pending: status.day7Email === 'pending' },
      { name: 'Day 30 Check-In', icon: '📞', completed: status.day30CheckIn === 'sent', pending: status.day30CheckIn === 'pending' },
      { name: 'Day 45 Referral', icon: '🎁', completed: status.day45Referral === 'sent', pending: status.day45Referral === 'pending' }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-1 text-violet-600 hover:text-violet-700">
                <ChevronLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Back</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-violet-600" />
                <span className="text-xl font-bold text-gray-900">Operon</span>
              </div>
            </div>
            
            <h1 className="text-xl font-semibold text-gray-900">Rep Dashboard</h1>
            
            <div className="flex items-center space-x-6">
              <nav className="flex space-x-6">
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition">Home</Link>
                <Link to="/rep/onboarding" className="text-gray-600 hover:text-gray-900 transition">Onboarding</Link>
              </nav>
              {isSuperAdmin && (
                <button
                  onClick={() => setAdminView(!adminView)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    adminView ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span>{adminView ? 'Admin View' : 'Rep View'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          {isSuperAdmin && adminView ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900">Admin View: All Sales</h1>
              <p className="text-gray-600">Viewing sales from all reps</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {currentRep?.fullName || 'Rep'}!
              </h1>
              <p className="text-gray-600">Here's your sales and follow-up status</p>
            </>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-violet-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Sales</p>
                <p className="text-xl font-bold text-gray-900">{totalSales}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Active Follow-Ups</p>
                <p className="text-xl font-bold text-gray-900">{activeFollowUps}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Calls Sent</p>
                <p className="text-xl font-bold text-gray-900">{callsSent}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Mail className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Emails Sent</p>
                <p className="text-xl font-bold text-gray-900">{emailsSent}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Log New Sale Button */}
        <div className="mb-8">
          <Link
            to="/rep/intake"
            className="flex items-center justify-center space-x-2 bg-violet-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-violet-700 transition w-full md:w-auto"
          >
            <Plus className="h-5 w-5" />
            <span>Log New Sale</span>
          </Link>
        </div>

        {/* Sales List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Sales</h2>
          </div>
          
          {displayedSales.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No sales logged yet.</p>
              <Link to="/rep/intake" className="text-violet-600 font-medium hover:text-violet-700 mt-2 inline-block">
                Log your first sale →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {displayedSales.map((sale) => (
                <div 
                  key={sale.id} 
                  className="px-6 py-4 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => openSaleModal(sale)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-violet-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {sale.clientFirstName} {sale.clientLastName}
                          </p>
                          <p className="text-sm text-gray-500">{sale.packagePurchased}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 ml-13">
                        {getStatusBadge(sale.status)}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm text-gray-600">
                        ${Number(sale.salePrice).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(sale.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 ml-13">
                    <p className="text-xs text-gray-500">
                      Next: {getNextAction(sale.status)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rep Summary (for admin view) */}
        {isSuperAdmin && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Rep Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {reps.map((rep) => {
                const repSales = sales.filter(s => s.repId === rep.id)
                return (
                  <div key={rep.id} className="bg-gray-50 rounded-xl p-4">
                    <p className="font-medium text-gray-900">{rep.fullName}</p>
                    <p className="text-sm text-gray-600">{repSales.length} sales</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>

      {/* Sale Detail Modal */}
      {selectedSale && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeSaleModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div></div>
              <button 
                onClick={closeSaleModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                ✕
              </button>
            </div>
            
            {/* Client Info */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedSale.clientFirstName} {selectedSale.clientLastName}
                </h3>
                <p className="text-gray-600">
                  📦 {selectedSale.packagePurchased} — ${Number(selectedSale.salePrice).toLocaleString()}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <span>📧</span>
                  <span>{selectedSale.clientEmail}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📞</span>
                  <span>{selectedSale.clientPhone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🏖️</span>
                  <span>{selectedSale.resortLocation}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  <span>Sold: {new Date(selectedSale.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">FOLLOW-UP STATUS</h4>
                <div className="space-y-2">
                  {getFollowUpSteps(selectedSale.status).map((step, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span>{step.icon}</span>
                      <span className="text-gray-600">{step.name}</span>
                      {step.completed && <span className="text-green-600">— Completed</span>}
                      {step.pending && <span className="text-yellow-600">— Pending</span>}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">NOTES</h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition text-sm resize-none"
                  placeholder="Add notes about this client..."
                ></textarea>
                <button
                  onClick={saveSaleNotes}
                  className="mt-3 bg-violet-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-violet-700 transition"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
