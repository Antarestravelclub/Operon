import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, ChevronLeft, ChevronRight, Mic, Play, Check, Mail, User } from 'lucide-react'

export default function RepOnboarding() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    companyEmail: '',
    phoneNumber: '',
    resortName: '',
    role: 'New Sales Rep' as 'New Sales Rep' | 'Members Rep' | 'Supervisor',
  })
  const [recording, setRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [emailTestSent, setEmailTestSent] = useState(false)
  const [mediaRecorderRef, setMediaRecorderRef] = useState<MediaRecorder | null>(null)
  const [voiceRecorded, setVoiceRecorded] = useState(() => localStorage.getItem('operon_rep_voice_done') === 'true')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const chunks: Blob[] = []
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach(track => track.stop())
        localStorage.setItem('operon_rep_voice_done', 'true')
        setVoiceRecorded(true)
      }
      mediaRecorder.start()
      setMediaRecorderRef(mediaRecorder)
      setRecording(true)
    } catch {
      alert('Could not access microphone. Please grant microphone permissions.')
    }
  }

  const stopRecording = () => {
    mediaRecorderRef?.stop()
    setRecording(false)
  }

  const playAudio = () => {
    if (audioUrl) new Audio(audioUrl).play()
  }

  const sendTestEmail = () => {
    setEmailTestSent(true)
    setTimeout(() => setEmailTestSent(false), 3000)
  }

  const saveProfile = () => {
    localStorage.setItem('operon_rep_profile', JSON.stringify(formData))
    setStep(4)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
        <Link to="/dashboard" className="flex items-center space-x-1 text-violet-600 hover:text-violet-700">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-violet-600" />
          <span className="font-bold text-gray-900">Operon</span>
          <span className="text-gray-400 mx-2">|</span>
          <span className="text-gray-600 text-sm">Rep Onboarding</span>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1,2,3,4].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
              {s < 4 && <div className={`flex-1 h-1 rounded ${step > s ? 'bg-violet-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 - Profile */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center"><User className="w-5 h-5 text-violet-600" /></div>
              <div><h2 className="font-bold text-gray-900">Your Profile</h2><p className="text-sm text-gray-500">Tell us about yourself</p></div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Carlos Rodriguez" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Email *</label>
                <input name="companyEmail" type="email" value={formData.companyEmail} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="carlos@vidavacations.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resort / Company</label>
                <input name="resortName" value={formData.resortName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Vida Vacations" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option>New Sales Rep</option>
                  <option>Members Rep</option>
                  <option>Supervisor</option>
                </select>
              </div>
            </div>
            <button onClick={() => formData.fullName && formData.companyEmail && setStep(2)} className="w-full mt-6 bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition flex items-center justify-center gap-2">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2 - Voice */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center"><Mic className="w-5 h-5 text-violet-600" /></div>
              <div><h2 className="font-bold text-gray-900">Voice Recording</h2><p className="text-sm text-gray-500">Clone your voice for automated calls</p></div>
            </div>
            <div className="bg-violet-50 rounded-xl p-4 mb-4 text-sm text-violet-800 leading-relaxed">
              <p className="font-semibold mb-2">📖 Read this script naturally:</p>
              <p className="italic">"Hi [client name], this is {formData.fullName} from {formData.resortName || 'your resort'}. I just wanted to personally reach out and welcome you to the family. We're so excited to have you as a member. Over the next few days you'll receive some helpful information about your membership. Please don't hesitate to reach out with any questions. I'm here for you. Talk soon!"</p>
            </div>
            
            {/* Voice Recording One Time Note */}
            <div className="mb-4">
              {voiceRecorded ? (
                <p className="text-green-600 text-sm flex items-center gap-1">
                  <Check className="w-4 h-4" /> Voice already recorded!
                </p>
              ) : (
                <p className="text-green-600 text-sm">
                  ⚡ You only need to record this ONCE. Your voice will be cloned and used automatically for ALL your clients — forever.
                </p>
              )}
            </div>
            <div className="flex gap-3 mb-4">
              {!recording ? (
                <button onClick={startRecording} className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2">
                  <Mic className="w-4 h-4" /> Start Recording
                </button>
              ) : (
                <button onClick={stopRecording} className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-semibold animate-pulse flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" /> Recording... Tap to Stop
                </button>
              )}
              {audioUrl && (
                <button onClick={playAudio} className="px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition flex items-center gap-2">
                  <Play className="w-4 h-4" />
                </button>
              )}
            </div>
            {audioBlob && <p className="text-sm text-green-600 mb-4 flex items-center gap-1"><Check className="w-4 h-4" /> Recording captured! Sounds good?</p>}
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-4 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => setStep(3)} className="flex-1 bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition">
                {audioBlob || voiceRecorded ? 'Sounds Good! →' : 'Skip for Now →'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Email */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center"><Mail className="w-5 h-5 text-violet-600" /></div>
              <div><h2 className="font-bold text-gray-900">Email Setup</h2><p className="text-sm text-gray-500">We'll send follow-ups from your address</p></div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-600 mb-1">Follow-up emails will be sent from:</p>
              <p className="font-semibold text-gray-900">{formData.companyEmail}</p>
            </div>
            <div className="space-y-3 mb-6">
              <button onClick={sendTestEmail} className={`w-full py-3 rounded-xl border font-medium text-sm transition flex items-center justify-center gap-2 ${emailTestSent ? 'bg-green-50 border-green-300 text-green-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                {emailTestSent ? <><Check className="w-4 h-4" /> Test email sent!</> : <><Mail className="w-4 h-4" /> Send Test Email</>}
              </button>
              <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
                💡 Full email integration will be configured by your IT team or admin.
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-4 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={saveProfile} className="flex-1 bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition">Complete Setup →</button>
            </div>
          </div>
        )}

        {/* Step 4 - Done */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You're all set! 🎉</h2>
            <p className="text-gray-500 mb-8">Your follow-up system is ready. Every sale you log will trigger an automatic 45-day sequence.</p>
            <Link to="/rep/intake" className="block w-full bg-violet-600 text-white py-4 rounded-xl font-semibold hover:bg-violet-700 transition mb-3">Log My First Sale →</Link>
            <Link to="/rep/dashboard" className="block w-full border border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition">View My Dashboard</Link>
          </div>
        )}
      </div>
    </div>
  )
}
