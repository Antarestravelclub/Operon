import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Zap, TrendingUp, MessageCircle, ChevronLeft, Settings, Mail } from 'lucide-react'

export default function EmployeeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(true)
  const [tone, setTone] = useState('Professional')
  const [frequency, setFrequency] = useState('Medium')

  // Mock employee data
  const employees = {
    1: {
      name: 'Alex',
      type: 'Sales Assistant',
      icon: TrendingUp,
      iconColor: 'text-violet-600',
      bgColor: 'bg-violet-100'
    },
    2: {
      name: 'Sam',
      type: 'Customer Support',
      icon: MessageCircle,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  }

  const employee = id && employees[id as '1' | '2'] ? employees[id as '1' | '2']! : employees[1]!

  const activities = [
    { id: 1, text: 'Sent follow-up email to john@example.com', time: '2 min ago' },
    { id: 2, text: 'Booked appointment with Sarah Chen', time: '15 min ago' },
    { id: 3, text: 'Sent 5 outreach emails', time: '30 min ago' },
    { id: 4, text: 'Updated CRM with new leads', time: '1 hour ago' },
    { id: 5, text: 'Followed up with 3 prospects', time: '2 hours ago' },
    { id: 6, text: 'Scheduled demo calls', time: '3 hours ago' },
    { id: 7, text: 'Sent personalized email campaign', time: '4 hours ago' },
    { id: 8, text: 'Updated lead status in spreadsheet', time: '5 hours ago' },
    { id: 9, text: 'Reached out to cold leads', time: '6 hours ago' },
    { id: 10, text: 'Completed follow-up workflow', time: '7 hours ago' },
  ]

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this employee? This action cannot be undone.')) {
      navigate('/dashboard')
    }
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
              <Link to="/hire" className="text-gray-600 hover:text-gray-900 transition">Hire</Link>
              <Link to="/billing" className="text-gray-600 hover:text-gray-900 transition">Billing</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 transition mb-6">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Dashboard
        </Link>

        {/* Employee Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 ${employee.bgColor} rounded-xl flex items-center justify-center`}>
                <employee.icon className={`h-7 w-7 ${employee.iconColor}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
                <p className="text-gray-600">{employee.type}</p>
              </div>
            </div>
            
            {/* Status Toggle */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {isActive ? 'Active' : 'Paused'}
              </span>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none ${
                  isActive ? 'bg-violet-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                    isActive ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {isActive && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <p className="text-green-800">Operon is handling this task</p>
            </div>
          )}
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <p className="text-gray-700">{activity.text}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </h2>
          
          <div className="space-y-6">
            {/* Tone Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tone
              </label>
              <div className="flex space-x-3">
                {['Friendly', 'Professional', 'Direct'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-5 py-2 rounded-lg font-medium text-sm transition ${
                      tone === t
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Task Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Task Frequency: {frequency}
              </label>
              <div className="flex space-x-2">
                {['Low', 'Medium', 'High'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`flex-1 py-2 rounded-lg font-medium text-sm transition ${
                      frequency === f
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Connected */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address Connected
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{`employee${id}@operon.ai`}</span>
                  </div>
                </div>
                <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 p-6 border border-red-200 bg-red-50 rounded-2xl">
          <h3 className="text-red-800 font-medium mb-2">Remove Employee</h3>
          <p className="text-red-600 text-sm mb-4">
            This will permanently remove {employee.name} from your account. All activity history will be lost.
          </p>
          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
          >
            Remove Employee
          </button>
        </div>
      </main>
    </div>
  )
}