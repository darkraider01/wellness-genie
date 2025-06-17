import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Target, Activity, Heart, TrendingUp, Calendar, 
  Zap, Droplets, Moon, Apple, ShoppingCart, Users 
} from 'lucide-react'

const DashboardPage = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user data from localStorage
    const savedUser = localStorage.getItem('wellnessUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading your wellness dashboard...</div>
      </div>
    )
  }

  const todayStats = [
    { icon: Droplets, label: 'Water Intake', value: '6/8', unit: 'glasses', color: 'text-blue-400' },
    { icon: Moon, label: 'Sleep', value: '7.5', unit: 'hours', color: 'text-purple-400' },
    { icon: Activity, label: 'Steps', value: '8,432', unit: 'steps', color: 'text-green-400' },
    { icon: Zap, label: 'Energy Level', value: '8/10', unit: '', color: 'text-yellow-400' }
  ]

  const quickActions = [
    { icon: Apple, label: 'View Meal Plan', color: 'from-green-500 to-emerald-500', path: '/wellness-plan' },
    { icon: ShoppingCart, label: 'Smart Shopping', color: 'from-blue-500 to-cyan-500', path: '/shopping' },
    { icon: TrendingUp, label: 'Track Progress', color: 'from-purple-500 to-pink-500', path: '/progress' },
    { icon: Users, label: 'Community', color: 'from-orange-500 to-red-500', path: '/community' }
  ]

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-xl text-white/70">
            Your wellness journey continues. Here's how you're doing today.
          </p>
        </motion.div>

        {/* Wellness DNA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Your Wellness DNA</h3>
              <div className="flex flex-wrap gap-2">
                {user.wellnessDNA?.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-6xl">🧬</div>
          </div>
        </motion.div>

        {/* Today's Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {todayStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
              >
                <IconComponent size={32} className={`mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm">
                  {stat.label} {stat.unit}
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <motion.button
                  key={index}
                  onClick={() => window.location.href = action.path}
                  className={`bg-gradient-to-r ${action.color} p-6 rounded-2xl text-white text-center hover:scale-105 transition-transform`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={32} className="mx-auto mb-3" />
                  <div className="font-semibold">{action.label}</div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Today's Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Today's Goals</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-white">Drink 8 glasses of water</span>
              </div>
              <span className="text-green-400 font-bold">6/8</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-white">Take 10,000 steps</span>
              </div>
              <span className="text-blue-400 font-bold">8,432/10,000</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-white">Follow meal plan</span>
              </div>
              <span className="text-purple-400 font-bold">2/3 meals</span>
            </div>
          </div>
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 p-6 bg-gradient-to-r from-pink-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl"
        >
          <div className="text-2xl mb-2">✨</div>
          <blockquote className="text-white text-lg font-medium mb-2">
            "Your body can do it. It's your mind you have to convince."
          </blockquote>
          <cite className="text-white/70">- Keep going, {user.name}!</cite>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage