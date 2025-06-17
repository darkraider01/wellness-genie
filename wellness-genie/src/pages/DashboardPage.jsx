import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Heart, 
  TrendingUp, 
  ShoppingCart, 
  Target, 
  Zap,
  Calendar,
  Award,
  Bell,
  Sparkles,
  Activity,
  Moon,
  Droplets,
  Apple
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useWellness } from '../context/WellnessContext'

const DashboardPage = () => {
  const { user, wellnessProfile, progress, addNotification } = useWellness()
  const [greeting, setGreeting] = useState('')
  const [todayStats, setTodayStats] = useState({
    water: 6,
    steps: 8420,
    sleep: 7.5,
    calories: 1850
  })

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    // Simulate daily notifications
    const notifications = [
      { id: 1, message: "Time for your afternoon vitamin D!", type: "supplement" },
      { id: 2, message: "Great job on your water intake today! 💧", type: "achievement" },
      { id: 3, message: "Your sleep quality improved by 15% this week", type: "insight" }
    ]

    notifications.forEach((notif, index) => {
      setTimeout(() => addNotification(notif), index * 2000)
    })
  }, [])

  const weeklyData = [
    { day: 'Mon', energy: 75, mood: 80, sleep: 85 },
    { day: 'Tue', energy: 82, mood: 85, sleep: 78 },
    { day: 'Wed', energy: 78, mood: 75, sleep: 90 },
    { day: 'Thu', energy: 85, mood: 88, sleep: 82 },
    { day: 'Fri', energy: 90, mood: 92, sleep: 85 },
    { day: 'Sat', energy: 88, mood: 90, sleep: 88 },
    { day: 'Sun', energy: 85, mood: 87, sleep: 90 }
  ]

  const goalProgress = [
    { name: 'Completed', value: 75, color: '#10b981' },
    { name: 'Remaining', value: 25, color: '#374151' }
  ]

  const quickActions = [
    { icon: Apple, label: 'Log Meal', color: 'from-green-500 to-emerald-500' },
    { icon: Activity, label: 'Track Workout', color: 'from-blue-500 to-cyan-500' },
    { icon: Droplets, label: 'Add Water', color: 'from-cyan-500 to-blue-500' },
    { icon: Moon, label: 'Sleep Log', color: 'from-purple-500 to-indigo-500' }
  ]

  const achievements = [
    { icon: '🔥', title: '7-Day Streak', desc: 'Consistent daily goals' },
    { icon: '💪', title: 'Strength Builder', desc: 'Completed 10 workouts' },
    { icon: '🧘', title: 'Zen Master', desc: 'Meditated 5 days in a row' },
    { icon: '💧', title: 'Hydration Hero', desc: 'Met water goals for a week' }
  ]

  return (
    <div className="min-h-screen p-6 pb-24 md:pb-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {greeting}, {user?.name || 'Wellness Warrior'}! 👋
          </h1>
          <p className="text-xl text-white/70">
            Your wellness journey is looking amazing today
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="wellness-card text-center">
            <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{todayStats.water}/8</div>
            <div className="text-white/60 text-sm">Glasses of water</div>
          </div>
          <div className="wellness-card text-center">
            <Activity className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{todayStats.steps.toLocaleString()}</div>
            <div className="text-white/60 text-sm">Steps today</div>
          </div>
          <div className="wellness-card text-center">
            <Moon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{todayStats.sleep}h</div>
            <div className="text-white/60 text-sm">Sleep last night</div>
          </div>
          <div className="wellness-card text-center">
            <Apple className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{todayStats.calories}</div>
            <div className="text-white/60 text-sm">Calories consumed</div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="wellness-card"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">AI Wellness Insights</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-white">Energy Optimization</span>
                  </div>
                  <p className="text-white/80">Your energy levels peak at 10 AM and 3 PM. Schedule important tasks during these windows for maximum productivity.</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold text-white">Recovery Recommendation</span>
                  </div>
                  <p className="text-white/80">Based on your sleep pattern, consider adding magnesium to your evening routine for better recovery.</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="font-semibold text-white">Personalized Tip</span>
                  </div>
                  <p className="text-white/80">Your stress levels are lowest on weekends. Try incorporating weekend relaxation techniques into weekdays.</p>
                </div>
              </div>
            </motion.div>

            {/* Weekly Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="wellness-card"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Weekly Wellness Trends</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={3} />
                    <Line type="monotone" dataKey="mood" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="sleep" stroke="#8b5cf6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white/70">Energy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-white/70">Mood</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-white/70">Sleep</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="wellness-card"
            >
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-lg bg-gradient-to-r ${action.color} text-white font-medium text-sm flex flex-col items-center space-y-2`}
                  >
                    <action.icon className="w-6 h-6" />
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Goal Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="wellness-card"
            >
              <h2 className="text-xl font-bold text-white mb-4">Today's Goals</h2>
              <div className="h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={goalProgress}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      dataKey="value"
                    >
                      {goalProgress.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">75%</div>
                <div className="text-white/60">Goals Completed</div>
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="wellness-card"
            >
              <h2 className="text-xl font-bold text-white mb-4">Recent Achievements</h2>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <div className="font-semibold text-white text-sm">{achievement.title}</div>
                      <div className="text-white/60 text-xs">{achievement.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Shopping Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="wellness-card"
            >
              <div className="flex items-center space-x-3 mb-4">
                <ShoppingCart className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold text-white">Smart Shopping</h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Vitamin D3</span>
                    <span className="text-green-400 text-sm">Auto-ordered</span>
                  </div>
                  <div className="text-white/60 text-sm">Arriving tomorrow</div>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Organic Spinach</span>
                    <span className="text-blue-400 text-sm">Suggested</span>
                  </div>
                  <div className="text-white/60 text-sm">Low iron detected</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium"
                >
                  View All Recommendations
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage