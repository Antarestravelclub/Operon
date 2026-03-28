import { Link, useNavigate } from 'react-router-dom'
import { Shield, ArrowLeft, TrendingUp, Users, CreditCard, Ticket, Edit, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Admin() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [showError, setShowError] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [editingUser, setEditingUser] = useState<any>(null)
  const [newPlan, setNewPlan] = useState('')

  const correctPin = '1234'
  const superAdminEmail = 'piffmex1@gmail.com'

  const promoCodes = [
    { code: 'OPERON20', description: '20% off first month', status: 'Active' },
    { code: 'WELCOME50', description: '50% off first month', status: 'Active' },
    { code: 'AISTAFF', description: '1 month free', status: 'Active' }
  ]

  const plans = [
    { name: 'Starter', price: 29 },
    { name: 'Growth', price: 99 },
    { name: 'Pro', price: 299 }
  ]

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = localStorage.getItem('operon_users')
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit
      setPin(newPin)
      
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          setIsAuthenticated(true)
        } else {
          setShowError(true)
          setTimeout(() => {
            setShowError(false)
            setPin('')
          }, 1000)
        }
      }
    }
  }

  const handlePinDelete = () => {
    setPin(pin.slice(0, -1))
  }

  const getStats = () => {
    const totalSignups = users.length
    const activeSubscribers = users.filter(u => u.plan && u.plan !== 'Free').length
    const monthlyRevenue = activeSubscribers * 99
    const totalTasks = users.reduce((acc, u) => acc + (u.tasksSimulated || 0), 0)

    return { totalSignups, activeSubscribers, monthlyRevenue, totalTasks }
  }

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setNewPlan(user.plan || '')
  }

  const handleSaveUser = () => {
    if (editingUser) {
      const updatedUsers = users.map(u =>
        u.email === editingUser.email ? { ...u, plan: newPlan } : u
      )
      setUsers(updatedUsers)
      localStorage.setItem('operon_users', JSON.stringify(updatedUsers))
      setEditingUser(null)
    }
  }

  const stats = getStats()

  // PIN Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 text-violet-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-violet-600">Operon Admin</h1>
          <p className="text-gray-600 mt-2">Enter PIN to access admin panel</p>
        </div>
        
        <div className={`mb-6 text-center ${showError ? 'animate-shake' : ''}`}>
          <div className="flex space-x-3 mb-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center text-xl font-medium bg-white"
              >
                {pin[i] || ''}
              </div>
            ))}
          </div>
          {showError && (
            <p className="text-red-500 font-medium">Incorrect PIN</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit) => (
            <button
              key={digit}
              onClick={() => handlePinInput(digit)}
              className="w-16 h-16 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center text-2xl font-medium hover:bg-gray-100 transition shadow-sm"
            >
              {digit}
            </button>
          ))}
          <button
            onClick={handlePinDelete}
            className="w-16 h-16 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition shadow-sm"
          >
            ←
          </button>
        </div>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
        `}</style>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition flex items-center">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Home
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-violet-600" />
                <span className="text-xl font-bold text-violet-600">Operon Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
          {[
            { id: 'overview', label: '📊 Overview', icon: TrendingUp },
            { id: 'users', label: '👥 Users', icon: Users },
            { id: 'billing', label: '💰 Billing', icon: CreditCard },
            { id: 'promo', label: '🎟️ Promo Codes', icon: Ticket }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? 'bg-white text-violet-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600 mb-2">Total Signups</p>
                <p className="text-3xl font-bold text-violet-600">{stats.totalSignups}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600 mb-2">Active Subscribers</p>
                <p className="text-3xl font-bold text-violet-600">{stats.activeSubscribers}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600 mb-2">Monthly Revenue</p>
                <p className="text-3xl font-bold text-violet-600">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600 mb-2">Total Tasks Simulated</p>
                <p className="text-3xl font-bold text-violet-600">{stats.totalTasks.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth (Mock)</h3>
              <div className="h-48 flex items-end space-x-2">
                {[40, 65, 45, 80, 60, 90, 75, 100, 85, 95, 70, 99].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-violet-400 rounded-t hover:bg-violet-500 transition"
                    style={{ height: `${height}%` }}
                    title={`Month ${i + 1}: ${height * 10}`}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Jan</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signup Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{user.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.plan || 'Free'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.signupDate || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-violet-600 hover:text-violet-700 flex items-center space-x-1"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div key={plan.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-2xl font-bold text-violet-600 mb-4">${plan.price}/mo</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Revenue</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${users.filter(u => u.plan === plan.name).length * plan.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
              <div className="h-48 flex items-end space-x-4">
                {plans.map((plan) => {
                  const count = users.filter(u => u.plan === plan.name).length
                  const revenue = count * plan.price
                  const maxHeight = Math.max(...plans.map(p => users.filter(u => u.plan === p.name).length * p.price))
                  const height = maxHeight > 0 ? (revenue / maxHeight) * 100 : 0
                  
                  return (
                    <div key={plan.name} className="flex-1 flex flex-col items-center">
                      <div className="w-16 bg-violet-400 rounded-t hover:bg-violet-500 transition" style={{ height: `${Math.max(height, 10)}%` }}></div>
                      <p className="text-sm text-gray-600 mt-2">{plan.name}</p>
                      <p className="text-sm font-medium text-gray-900">${revenue}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Total MRR</h3>
                <p className="text-3xl font-bold text-violet-600">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'promo' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {promoCodes.map((code, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{code.code}</code>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{code.description}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center space-x-1 text-green-600">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span>{code.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit User Plan</h3>
            <p className="text-gray-600 mb-4">{editingUser.name || editingUser.email}</p>
            <select
              value={newPlan}
              onChange={(e) => setNewPlan(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="Free">Free</option>
              <option value="Starter">Starter - $29/mo</option>
              <option value="Growth">Growth - $99/mo</option>
              <option value="Pro">Pro - $299/mo</option>
            </select>
            <div className="flex space-x-3">
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}