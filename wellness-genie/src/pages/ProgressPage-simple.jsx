import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Trophy, Target, TrendingUp, Calendar, Award, Star } from 'lucide-react'

const ProgressPage = () => {
  const [selectedMetric, setSelectedMetric] = useState('weight')

  const progressData = {
    weight: [
      { date: '2024-01-01', value: 70 },
      { date: '2024-01-15', value: 69.5 },
      { date: '2024-02-01', value: 69 },
      { date: '2024-02-15', value: 68.5 },
      { date: '2024-03-01', value: 68 }
    ],
    energy: [
      { date: '2024-01-01', value: 6 },
      { date: '2024-01-15', value: 7 },
      { date: '2024-02-01', value: 7.5 },
      { date: '2024-02-15', value: 8 },
      { date: '2024-03-01', value: 8.5 }
    ],
    sleep: [
      { date: '2024-01-01', value: 6.5 },
      { date: '2024-01-15', value: 7 },
      { date: '2024-02-01', value: 7.5 },
      { date: '2024-02-15', value: 7.8 },
      { date: '2024-03-01', value: 8 }
    ]
  }

  const achievements = [
    { id: 1, title: 'First Week Complete', description: 'Completed your first week of wellness journey', icon: Trophy, earned: true },
    { id: 2, title: 'Hydration Hero', description: 'Drank 8 glasses of water daily for 7 days', icon: Target, earned: true },
    { id: 3, title: 'Sleep Champion', description: 'Maintained 8+ hours of sleep for 5 consecutive days', icon: Star, earned: false },
    { id: 4, title: 'Nutrition Ninja', description: 'Followed meal plan for 14 days straight', icon: Award, earned: false }
  ]

  const metrics = [
    { key: 'weight', label: 'Weight (kg)', color: '#8b5cf6' },
    { key: 'energy', label: 'Energy Level (1-10)', color: '#06d6a0' },
    { key: 'sleep', label: 'Sleep Hours', color: '#f72585' }
  ]

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Your Progress Journey</h1>
          <p className="text-xl text-white/70">Track your transformation and celebrate achievements</p>
        </motion.div>

        {/* Progress Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Progress Metrics</h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {metrics.map((metric) => (
                <button
                  key={metric.key}
                  onClick={() => setSelectedMetric(metric.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedMetric === metric.key
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-white/20 text-white/70 hover:bg-white/30'
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData[selectedMetric]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: 'white'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={metrics.find(m => m.key === selectedMetric)?.color} 
                    strokeWidth={3}
                    dot={{ fill: metrics.find(m => m.key === selectedMetric)?.color, strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Weekly Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="text-green-400" size={24} />
                  <span className="text-white">Weight Loss</span>
                </div>
                <span className="text-green-400 font-bold">-2kg</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Target className="text-blue-400" size={24} />
                  <span className="text-white">Goals Achieved</span>
                </div>
                <span className="text-blue-400 font-bold">8/10</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-purple-400" size={24} />
                  <span className="text-white">Streak Days</span>
                </div>
                <span className="text-purple-400 font-bold">15</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg">
              <h4 className="text-white font-semibold mb-2">This Week's Highlight</h4>
              <p className="text-white/80 text-sm">
                Amazing progress! You've consistently followed your meal plan and increased your energy levels by 40%.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Achievements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50'
                      : 'bg-white/5 border-white/20'
                  }`}
                >
                  <div className="text-center">
                    <IconComponent 
                      size={32} 
                      className={`mx-auto mb-2 ${
                        achievement.earned ? 'text-yellow-400' : 'text-white/50'
                      }`} 
                    />
                    <h4 className={`font-semibold mb-1 ${
                      achievement.earned ? 'text-white' : 'text-white/50'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-xs ${
                      achievement.earned ? 'text-white/80' : 'text-white/40'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProgressPage