import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    
    if (code) {
      // Save the code to localStorage
      localStorage.setItem('google_auth_code', code)
      
      // Save mock user to localStorage
      localStorage.setItem('operon_user', JSON.stringify({
        email: 'piffmex1@gmail.com',
        name: 'Mark',
        gmailConnected: true
      }))
      
      // Also set auth flag
      localStorage.setItem('operon_auth', 'true')
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } else {
      // No code in URL, redirect to login
      navigate('/login')
    }
  }, [searchParams, navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-6">
            <svg className="animate-spin h-12 w-12 text-violet-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connecting your Gmail account...</h2>
          <p className="text-gray-500">Please wait while we complete the authentication process...</p>
        </div>
      </div>
    </div>
  )
}