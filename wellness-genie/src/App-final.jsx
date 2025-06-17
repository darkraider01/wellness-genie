import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import OnboardingPage from './pages/OnboardingPage-complete'
import DashboardPage from './pages/DashboardPage-complete'
import WellnessPlanPage from './pages/WellnessPlanPage-complete'
import ShoppingPage from './pages/ShoppingPage-complete'
import ProgressPage from './pages/ProgressPage-simple'
import CommunityPage from './pages/CommunityPage-complete'
import Navigation from './components/Navigation-complete'
import LoadingScreen from './components/LoadingScreen'
import { WellnessProvider } from './context/WellnessContext-simple'

function AppContent() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem('wellnessUser')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('wellnessUser')
      }
    }
  }, [])

  const handleGetStarted = () => {
    navigate('/onboarding')
  }

  const handleOnboardingComplete = (userData) => {
    setUser(userData)
    localStorage.setItem('wellnessUser', JSON.stringify(userData))
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {user && <Navigation />}
      <Routes>
        <Route 
          path="/" 
          element={
            user ? (
              <DashboardPage />
            ) : (
              <LandingPage onGetStarted={handleGetStarted} />
            )
          } 
        />
        <Route 
          path="/onboarding" 
          element={<OnboardingPage onComplete={handleOnboardingComplete} />} 
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/wellness-plan" element={<WellnessPlanPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <WellnessProvider>
      <Router>
        <AppContent />
      </Router>
    </WellnessProvider>
  )
}

export default App