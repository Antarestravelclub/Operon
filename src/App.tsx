import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import AuthCallback from './pages/AuthCallback'
import Dashboard from './pages/Dashboard'
import HireEmployee from './pages/HireEmployee'
import EmployeeDetail from './pages/EmployeeDetail'
import Billing from './pages/Billing'
import Admin from './pages/Admin'
import Docs from './pages/Docs'
import RepOnboarding from './pages/RepOnboarding'
import SaleIntake from './pages/SaleIntake'
import RepDashboard from './pages/RepDashboard'

function App() {
  // Simple auth check using localStorage
  const isAuthenticated = () => {
    return localStorage.getItem('operon_auth') === 'true'
  }

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/hire" 
          element={
            <ProtectedRoute>
              <HireEmployee />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee/:id" 
          element={
            <ProtectedRoute>
              <EmployeeDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/billing" 
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/rep/onboarding" 
          element={
            <ProtectedRoute>
              <RepOnboarding />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/rep/intake" 
          element={
            <ProtectedRoute>
              <SaleIntake />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/rep/dashboard" 
          element={
            <ProtectedRoute>
              <RepDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App