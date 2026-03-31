import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Check, Upload, User, Mail, Phone, DollarSign, MapPin, FileText, ChevronLeft } from 'lucide-react'

export default function SaleIntake() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    clientFirstName: '',
    clientLastName: '',
    clientEmail: '',
    clientPhone: '',
    packagePurchased: '',
    salePrice: '',
    resortLocation: '',
    notes: ''
  })
  const [_contractPhoto, setContractPhoto] = useState<File | null>(null)
  const [contractPhotoPreview, setContractPhotoPreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setContractPhoto(file)
        setContractPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Get current rep from localStorage
    const currentRep = JSON.parse(localStorage.getItem('operon_current_rep') || '{}')
    
    // Create sale record
    const sale = {
      id: Date.now(),
      repId: currentRep.id,
      repName: currentRep.fullName || 'Unknown Rep',
      ...formData,
      contractPhoto: contractPhotoPreview,
      createdAt: new Date().toISOString(),
      status: {
        welcomeEmail: 'pending',
        voiceCall: 'pending',
        day3Email: 'pending',
        followUpComplete: false
      }
    }

    // Save to localStorage
    const sales = JSON.parse(localStorage.getItem('operon_sales') || '[]')
    sales.push(sale)
    localStorage.setItem('operon_sales', JSON.stringify(sales))

    // Update rep stats if they exist
    const reps = JSON.parse(localStorage.getItem('operon_reps') || '[]')
    const repIndex = reps.findIndex((r: any) => r.id === currentRep.id)
    if (repIndex !== -1) {
      reps[repIndex].totalSales = (reps[repIndex].totalSales || 0) + 1
      localStorage.setItem('operon_reps', JSON.stringify(reps))
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Follow-up sequence started!</h2>
          <p className="text-gray-600 mb-6">Your client will be contacted through our automated system.</p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-medium text-gray-900 mb-3">Timeline:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                <span className="text-gray-700">Email in 1 hour</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                <span className="text-gray-700">Voice call tomorrow</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                <span className="text-gray-700">7-day sequence begins</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/rep/dashboard')}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="flex-1 bg-violet-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-violet-700 transition"
            >
              Log Another Sale
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/rep/dashboard" className="flex items-center space-x-2 text-violet-600 hover:text-violet-700">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Log New Sale</h1>
            <Link to="/rep/dashboard" className="text-violet-600 text-sm font-medium">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sale Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Client Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="clientFirstName"
                      value={formData.clientFirstName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition text-sm"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="clientLastName"
                      value={formData.clientLastName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition text-sm"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Package & Price */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Package Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Package</label>
                  <select
                    name="packagePurchased"
                    value={formData.packagePurchased}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition text-sm"
                  >
                    <option value="">Select package</option>
                    <option value="Elite">Elite</option>
                    <option value="Premium">Premium</option>
                    <option value="Standard">Standard</option>
                    <option value="Upgrade">Upgrade</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Sale Price ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      name="salePrice"
                      value={formData.salePrice}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Resort Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  name="resortLocation"
                  value={formData.resortLocation}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition text-sm"
                >
                  <option value="">Select location</option>
                  <option value="Nuevo Vallarta">Nuevo Vallarta</option>
                  <option value="Riviera Maya">Riviera Maya</option>
                  <option value="Los Cabos">Los Cabos</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition text-sm resize-none"
                placeholder="Any additional notes..."
              ></textarea>
            </div>

            {/* Contract Photo */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Contract Photo</label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  {contractPhotoPreview ? (
                    <img src={contractPhotoPreview} alt="Contract" className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <label className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition cursor-pointer">
                  <Upload className="h-4 w-4 inline mr-2" />
                  Upload Contract
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-violet-700 transition flex items-center justify-center space-x-2"
            >
              <Check className="h-5 w-5" />
              <span>Submit Sale</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
