import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Target, 
  TrendingUp, 
  ShoppingCart, 
  Calendar, 
  Zap, 
  Heart, 
  Brain,
  Droplets,
  Moon,
  Apple,
  Activity,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [todayStats, setTodayStats] = useState({
    water: 6,
    steps: 8420,
    sleep: 7.5,
    calories: 1850,
    mood: 8
  })

  useEffect(() => {
    const savedUser = localStorage.getItem('wellnessUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const quickActions = [
    {
      title: 'View Wellness Plan',
      description: 'Your personalized AI recommendations',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      action: () => navigate('/wellness-plan')
    },
    {
      title: 'Smart Shopping',
      description: 'AI-curated supplements & foods',
      icon: ShoppingCart,
      color: 'from-green-500 to-emerald-500',
      action: () => navigate('/shopping')
    },
    {
      title: 'Progress Tracking',
      description: '3D visualization of your journey',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      action: () => navigate('/progress')
    },
    {
      title: 'Community Challenges',
      description: 'Join wellness challenges',
      icon: Award,
      color: 'from-orange-500 to-red-500',
      action: () => navigate('/community')
    }
  ]

  const todayMetrics = [
    { label: 'Water Intake', value: `${todayStats.water}/8`, unit: 'glasses', icon: Droplets, color: 'text-blue-400' },
    { label: 'Steps', value: todayStats.steps.toLocaleString(), unit: 'steps', icon: Activity, color: 'text-green-400' },
    { label: 'Sleep', value: todayStats.sleep, unit: 'hours', icon: Moon, color: 'text-purple-400' },
    { label: 'Calories', value: todayStats.calories, unit: 'kcal', icon: Apple, color: 'text-orange-400' }
  ]

  const aiInsights = [
    {
      type: 'recommendation',
      title: 'Hydration Boost Needed',
      message: 'You\'re 2 glasses behind your daily water goal. Try adding lemon for extra vitamin C!',
      action: 'Log Water',
      priority: 'medium'
    },
    {
      type: 'achievement',
      title: 'Sleep Streak: 5 Days! 🎉',
      message: 'You\'ve maintained 7+ hours of sleep for 5 consecutive days. Your recovery is improving!',
      action: 'View Progress',
      priority: 'high'
    },
    {
      type: 'suggestion',
      title: 'Optimal Workout Time',
      message: 'Based on your energy patterns, 2-4 PM is your peak performance window today.',
      action: 'Schedule Workout',
      priority: 'low'
    }
  ]

  const wellnessDNA = user?.wellnessDNA || {
    metabolismType: 'Fast',
    energyPattern: 'Morning Lark',
    stressResponse: 'Resilient',
    nutritionProfile: 'Balanced',
    fitnessType: 'Active'
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name || 'Wellness Warrior'}! ✨
          </h1>
          <p className="text-xl text-white/70">
            Your AI wellness companion has personalized insights ready for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calendar className="mr-3 text-cyan-400" size={28} />
                Today's Overview
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {todayMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 rounded-lg p-4 text-center"
                  >
                    <metric.icon className={`mx-auto mb-2 ${metric.color}`} size={24} />
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                    <div className="text-white/70 text-sm">{metric.unit}</div>
                    <div className="text-white/50 text-xs mt-1">{metric.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Mood Tracker */}
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">Today's Mood</span>
                  <Heart className="text-pink-400" size={20} />
                </div>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => setTodayStats(prev => ({ ...prev, mood: num }))}
                      className={`w-8 h-8 rounded-full transition-all ${
                        num <= todayStats.mood
                          ? 'bg-gradient-to-r from-pink-500 to-red-500'
                          : 'bg-white/20'
                      }`}
                    >
                      <span className="text-white text-xs">{num}</span>
                    </button>
                  ))}
                </div>
                <p className="text-white/70 text-sm mt-2">
                  Current mood: {todayStats.mood}/10 - {todayStats.mood >= 8 ? 'Excellent!' : todayStats.mood >= 6 ? 'Good' : 'Could be better'}
                </p>
              </div>
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Brain className="mr-3 text-purple-400" size={28} />
                AI Insights & Recommendations
              </h2>
              
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`p-4 rounded-lg border-l-4 ${
                      insight.priority === 'high' 
                        ? 'bg-green-500/20 border-green-400' 
                        : insight.priority === 'medium'
                        ? 'bg-yellow-500/20 border-yellow-400'
                        : 'bg-blue-500/20 border-blue-400'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{insight.title}</h4>
                        <p className="text-white/80 text-sm mb-3">{insight.message}</p>
                        <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors">
                          {insight.action} →
                        </button>
                      </div>
                      <Sparkles className="text-yellow-400 ml-4" size={20} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={action.action}
                    className={`p-6 rounded-lg bg-gradient-to-r ${action.color} hover:scale-105 transition-all duration-300 text-left group`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <action.icon className="text-white mb-3" size={32} />
                        <h3 className="text-white font-bold text-lg mb-2">{action.title}</h3>
                        <p className="text-white/80 text-sm">{action.description}</p>
                      </div>
                      <ChevronRight className="text-white group-hover:translate-x-1 transition-transform" size={24} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Wellness DNA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">🧬</span>
                Your Wellness DNA
              </h3>
              
              <div className="space-y-3">
                {Object.entries(wellnessDNA).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <span className="text-white/70 text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-cyan-400 font-medium text-sm">{value}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => navigate('/wellness-plan')}
                className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all"
              >
                View Full Analysis
              </button>
            </motion.div>

            {/* Weekly Goals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Weekly Goals</h3>
              
              <div className="space-y-4">
                {[
                  { goal: 'Drink 8 glasses of water daily', progress: 85, color: 'blue' },
                  { goal: 'Exercise 4 times this week', progress: 75, color: 'green' },
                  { goal: 'Sleep 7+ hours nightly', progress: 90, color: 'purple' },
                  { goal: 'Meditate 10 minutes daily', progress: 60, color: 'pink' }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">{item.goal}</span>
                      <span className="text-white font-medium">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 1 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          item.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                          item.color === 'green' ? 'from-green-500 to-emerald-500' :
                          item.color === 'purple' ? 'from-purple-500 to-pink-500' :
                          'from-pink-500 to-red-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Energy Level */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Zap className="mr-2 text-yellow-400" size={24} />
                Energy Level
              </h3>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">85%</div>
                <div className="text-white/70 mb-4">High Energy</div>
                
                <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                  />
                </div>
                
                <p className="text-white/70 text-sm">
                  Perfect time for a workout or tackling challenging tasks!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage