import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  User, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Settings,
  Bell,
  Sparkles
} from 'lucide-react'
import { useWellness } from '../context/WellnessContext'

const Navigation = () => {
  const location = useLocation()
  const { notifications, shoppingCart } = useWellness()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/wellness-plan', icon: User, label: 'My Plan' },
    { path: '/shopping', icon: ShoppingCart, label: 'Shopping', badge: shoppingCart.length },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/community', icon: Users, label: 'Community' },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">WellnessGenie</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-8">
            {navItems.map(({ path, icon: Icon, label, badge }) => (
              <Link
                key={path}
                to={path}
                className="relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === path
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                  {badge > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-white/70 hover:text-white transition-colors"
            >
              <Bell className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <Settings className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-white/10">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 4).map(({ path, icon: Icon, label, badge }) => (
            <Link
              key={path}
              to={path}
              className="relative flex flex-col items-center py-2 px-3"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  location.pathname === path
                    ? 'bg-white/20 text-white'
                    : 'text-white/70'
                }`}
              >
                <Icon className="w-5 h-5" />
                {badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </motion.div>
              <span className="text-xs text-white/60 mt-1">{label}</span>
            </Link>
          ))}
          
          {/* More Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center py-2 px-3"
          >
            <div className="p-2 rounded-lg text-white/70">
              <Settings className="w-5 h-5" />
            </div>
            <span className="text-xs text-white/60 mt-1">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="absolute bottom-0 left-0 right-0 glass-dark rounded-t-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              {navItems.slice(4).map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Spacer for fixed navigation */}
      <div className="hidden md:block h-20" />
      <div className="md:hidden h-20" />
    </>
  )
}

export default Navigation