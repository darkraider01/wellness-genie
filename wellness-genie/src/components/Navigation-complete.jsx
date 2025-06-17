import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Home, 
  Target, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Menu, 
  X, 
  Sparkles,
  User,
  Settings,
  LogOut
} from 'lucide-react'

const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/wellness-plan', label: 'Wellness Plan', icon: Target },
    { path: '/shopping', label: 'Smart Shopping', icon: ShoppingCart },
    { path: '/progress', label: 'Progress', icon: TrendingUp },
    { path: '/community', label: 'Community', icon: Users }
  ]

  const handleLogout = () => {
    localStorage.removeItem('wellnessUser')
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              <div className="text-2xl">🧬</div>
              <span className="text-xl font-bold text-white">WellnessGenie</span>
              <Sparkles className="text-cyan-400" size={20} />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-white font-medium">Profile</span>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-lg border border-white/20 py-2"
                    >
                      <button className="w-full text-left px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 flex items-center space-x-2">
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">🧬</div>
                  <span className="text-xl font-bold text-white">WellnessGenie</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white p-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <div className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      navigate(item.path)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-4 rounded-lg font-medium transition-all ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon size={24} />
                    <span className="text-lg">{item.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Mobile User Actions */}
              <div className="p-4 border-t border-white/20 space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg">
                  <Settings size={20} />
                  <span>Settings</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation