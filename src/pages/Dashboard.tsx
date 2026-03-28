import { Link } from 'react-router-dom'
import { Zap, TrendingUp, MessageCircle, Clock, Plus, Mail, CheckCircle, User } from 'lucide-react'

export default function Dashboard() {
  // Get user email from localStorage
  const userEmail = localStorage.getItem('operon_user') || 'user@example.com'
  
  const stats = [
    { label: 'Active AI Employees', value: '2', icon: TrendingUp, color: 'bg-violet-100 text-violet-600' },
    { label: 'Tasks Completed Today', value: '47', icon: CheckCircle, color: 'bg-blue-100 text-blue-600' },
    { label: 'Emails Sent This Week', value: '128', icon: Mail, color: 'bg-green-100 text-green-600' },
    { label: 'Hours Saved', value: '24', icon: Clock, color: 'bg-orange-100 text-orange-600' },
  ]

  const employees = [
    {
      id: 1,
      name: 'Alex',
      type: 'Sales Assistant',
      status: 'active',
      activity: 'Sent 12 follow-up emails today',
      lastActive: '2 min ago',
      icon: TrendingUp,
      iconColor: 'text-violet-600'
    },
    {
      id: 2,
      name: 'Sam',
      type: 'Customer Support',
      status: 'active',
      activity: 'Resolved 8 support tickets today',
      lastActive: '5 min ago',
      icon: MessageCircle,
      iconColor: 'text-blue-600'
    }
  ]

  const activities = [
    { id: 1, text: 'Alex sent follow-up email to james@example.com', time: '2 min ago', user: 'Alex' },
    { id: 2, text: 'Sam resolved ticket #1042', time: '5 min ago', user: 'Sam' },
    { id: 3, text: 'Alex booked appointment with Sarah Chen', time: '15 min ago', user: 'Alex' },
    { id: 4, text: 'Sam replied to FAQ about pricing', time: '23 min ago', user: 'Sam' },
    { id: 5, text: 'Alex sent 5 outreach emails', time: '1 hour ago', user: 'Alex' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-violet-600" />
              <span className="text-xl font-bold text-gray-900">Operon</span>
            </div>
            
            <h1 className="text-xl font-semibold text-gray-900">Your AI Workforce</h1>
            
            <div className="flex items-center space-x-6">
              <nav className="flex space-x-6">
                <Link to="/dashboard" className="text-violet-600 font-medium">Dashboard</Link>
                <Link to="/hire" className="text-gray-600 hover:text-gray-900 transition">Hire</Link>
                <Link to="/billing" className="text-gray-600 hover:text-gray-900 transition">Billing</Link>
              </nav>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-violet-600" />
                </div>
                <span className="text-sm text-gray-600">{userEmail}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Employees Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your AI Workforce</h2>
            <Link to="/hire" className="flex items-center space-x-2 text-violet-600 hover:text-violet-700 transition">
              <Plus className="h-5 w-5" />
              <span>Hire New Employee</span>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {employees.map((employee) => (
              <div key={employee.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <employee.icon className={`h-6 w-6 ${employee.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.type}</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 ${employee.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm">{employee.status === 'active' ? 'Active' : 'Paused'}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{employee.activity}</p>
                <p className="text-sm text-gray-500 mb-4">Last active: {employee.lastActive}</p>
                
                <div className="flex space-x-3">
                  <Link to={`/employee/${employee.id}`} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                    Manage
                  </Link>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                    Pause
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-violet-600 text-xs font-medium">{activity.user[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.text}</p>
                </div>
                <p className="text-sm text-gray-500 flex-shrink-0">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}