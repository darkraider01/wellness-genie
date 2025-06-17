import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award, 
  Zap,
  Heart,
  Brain,
  Activity,
  Moon,
  Droplets,
  Apple,
  Dumbbell,
  ChevronLeft,
  ChevronRight,
  Star,
  Trophy,
  Fire
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { useWellness } from '../context/WellnessContext'

const ProgressPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [selectedMetric, setSelectedMetric] = useState('all')

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: '3 Months' },
    { id: 'year', label: 'This Year' }
  ]

  const metrics = [
    { id: 'all', label: 'All Metrics', icon: TrendingUp },
    { id: 'energy', label: 'Energy', icon: Zap },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'sleep', label: 'Sleep', icon: Moon },
    { id: 'wellness', label: 'Wellness', icon: Heart }
  ]

  // Mock data
  const weeklyData = [
    { day: 'Mon', energy: 75, fitness: 80, nutrition: 85, sleep: 70, wellness: 78, mood: 82 },
    { day: 'Tue', energy: 82, fitness: 85, nutrition: 78, sleep: 85, wellness: 80, mood: 85 },
    { day: 'Wed', energy: 78, fitness: 75, nutrition: 90, sleep: 80, wellness: 85, mood: 78 },
    { day: 'Thu', energy: 85, fitness: 88, nutrition: 82, sleep: 75, wellness: 82, mood: 88 },
    { day: 'Fri', energy: 90, fitness: 92, nutrition: 85, sleep: 88, wellness: 90, mood: 92 },
    { day: 'Sat', energy: 88, fitness: 90, nutrition: 88, sleep: 90, wellness: 88, mood: 90 },
    { day: 'Sun', energy: 85, fitness: 87, nutrition: 90, sleep: 92, wellness: 87, mood: 87 }
  ]

  const monthlyProgress = [
    { week: 'Week 1', score: 72 },
    { week: 'Week 2', score: 78 },
    { week: 'Week 3', score: 85 },
    { week: 'Week 4', score: 88 }
  ]

  const goalProgress = [
    { name: 'Weight Loss', target: 10, current: 7, unit: 'lbs', color: '#10b981' },
    { name: 'Muscle Gain', target: 5, current: 3, unit: 'lbs', color: '#3b82f6' },
    { name: 'Sleep Quality', target: 8, current: 7.5, unit: 'hrs', color: '#8b5cf6' },
    { name: 'Water Intake', target: 8, current: 6.5, unit: 'glasses', color: '#06b6d4' }
  ]

  const achievements = [
    { 
      id: 1, 
      title: '7-Day Streak', 
      description: 'Completed daily goals for a week', 
      icon: '🔥', 
      date: '2024-06-10',
      rarity: 'common'
    },
    { 
      id: 2, 
      title: 'Hydration Hero', 
      description: 'Met water intake goals for 10 days', 
      icon: '💧', 
      date: '2024-06-08',
      rarity: 'rare'
    },
    { 
      id: 3, 
      title: 'Strength Builder', 
      description: 'Completed 20 strength workouts', 
      icon: '💪', 
      date: '2024-06-05',
      rarity: 'epic'
    },
    { 
      id: 4, 
      title: 'Zen Master', 
      description: 'Meditated for 30 consecutive days', 
      icon: '🧘', 
      date: '2024-06-01',
      rarity: 'legendary'
    }
  ]

  const radarData = [
    { subject: 'Energy', A: 85, fullMark: 100 },
    { subject: 'Fitness', A: 88, fullMark: 100 },
    { subject: 'Nutrition', A: 82, fullMark: 100 },
    { subject: 'Sleep', A: 78, fullMark: 100 },
    { subject: 'Wellness', A: 85, fullMark: 100 },
    { subject: 'Mood', A: 90, fullMark: 100 }
  ]

  const habits = [
    { name: 'Morning Meditation', streak: 15, target: 30, completed: true },
    { name: 'Daily Exercise', streak: 12, target: 21, completed: true },
    { name: 'Healthy Breakfast', streak: 8, target: 14, completed: false },
    { name: 'Evening Journal', streak: 5, target: 7, completed: true },
    { name: '8 Glasses Water', streak: 20, target: 30, completed: true }
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-gray-500 to-gray-600'
      case 'rare': return 'from-blue-500 to-blue-600'
      case 'epic': return 'from-purple-500 to-purple-600'
      case 'legendary': return 'from-yellow-500 to-orange-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="min-h-screen p-6 pb-24 md:pb-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Progress
          </h1>
          <p className="text-xl text-white/70">
            Track your wellness journey with detailed insights and achievements
          </p>
        </motion.div>

        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="flex bg-white/10 rounded-lg p-1">
            {periods.map((period) => (
              <motion.button
                key={period.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {period.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="wellness-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">85%</div>
            <div className="text-white/60 text-sm">Overall Score</div>
          </div>
          <div className="wellness-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">12/15</div>
            <div className="text-white/60 text-sm">Goals Met</div>
          </div>
          <div className="wellness-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Fire className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">15</div>
            <div className="text-white/60 text-sm">Day Streak</div>
          </div>
          <div className="wellness-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">4</div>
            <div className="text-white/60 text-sm">New Badges</div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="wellness-card"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Weekly Progress Trends</h2>
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
                    <Line type="monotone" dataKey="fitness" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="nutrition" stroke="#f59e0b" strokeWidth={3} />
                    <Line type="monotone" dataKey="sleep" stroke="#8b5cf6" strokeWidth={3} />
                    <Line type="monotone" dataKey="wellness" stroke="#ec4899" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {[
                  { key: 'energy', color: '#10b981', label: 'Energy' },
                  { key: 'fitness', color: '#3b82f6', label: 'Fitness' },
                  { key: 'nutrition', color: '#f59e0b', label: 'Nutrition' },
                  { key: 'sleep', color: '#8b5cf6', label: 'Sleep' },
                  { key: 'wellness', color: '#ec4899', label: 'Wellness' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-white/70 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Wellness Radar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="wellness-card"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Wellness Balance</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={{ fill: 'rgba(255,255,255,0.7)' }}
                    />
                    <Radar
                      name="Current"
                      dataKey="A"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Goal Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="wellness-card"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Goal Progress</h2>
              <div className="space-y-6">
                {goalProgress.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{goal.name}</span>
                      <span className="text-white/70">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: goal.color }}
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-sm" style={{ color: goal.color }}>
                        {Math.round((goal.current / goal.target) * 100)}% complete
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Achievements & Habits */}
          <div className="space-y-8">
            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="wellness-card"
            >
              <h2 className="text-xl font-bold text-white mb-6">Recent Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg bg-gradient-to-r ${getRarityColor(achievement.rarity)} cursor-pointer`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{achievement.title}</h3>
                        <p className="text-white/80 text-sm">{achievement.description}</p>
                        <p className="text-white/60 text-xs mt-1">{achievement.date}</p>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-bold text-white capitalize ${
                          achievement.rarity === 'legendary' ? 'bg-yellow-500/30' :
                          achievement.rarity === 'epic' ? 'bg-purple-500/30' :
                          achievement.rarity === 'rare' ? 'bg-blue-500/30' : 'bg-gray-500/30'
                        }`}>
                          {achievement.rarity}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Habit Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="wellness-card"
            >
              <h2 className="text-xl font-bold text-white mb-6">Habit Streaks</h2>
              <div className="space-y-4">
                {habits.map((habit, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          habit.completed ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                        <span className="text-white font-medium">{habit.name}</span>
                      </div>
                      <span className="text-white/70 text-sm">
                        {habit.streak}/{habit.target} days
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(habit.streak / habit.target) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full rounded-full ${
                          habit.completed ? 'bg-green-400' : 'bg-blue-400'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="wellness-card"
            >
              <h2 className="text-xl font-bold text-white mb-6">This Week's Highlights</h2>
              <div className="space-y-4">
                <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold text-sm">Best Performance</span>
                  </div>
                  <p className="text-white/80 text-sm">Friday was your strongest day with 92% overall score!</p>
                </div>
                
                <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center space-x-2 mb-1">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-semibold text-sm">Goal Achievement</span>
                  </div>
                  <p className="text-white/80 text-sm">You exceeded your fitness goals by 15% this week!</p>
                </div>
                
                <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <div className="flex items-center space-x-2 mb-1">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 font-semibold text-sm">AI Insight</span>
                  </div>
                  <p className="text-white/80 text-sm">Your sleep quality correlates strongly with next-day energy levels.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressPage