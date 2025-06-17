import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Target, 
  Calendar, 
  Clock, 
  Apple, 
  Dumbbell,
  Moon,
  Brain,
  Heart,
  Zap,
  CheckCircle,
  Plus,
  Edit3,
  Sparkles
} from 'lucide-react'
import { useWellness } from '../context/WellnessContext'

const WellnessPlanPage = () => {
  const { user, wellnessProfile, currentPlan } = useWellness()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDay, setSelectedDay] = useState('monday')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'wellness', label: 'Wellness', icon: Heart },
    { id: 'schedule', label: 'Schedule', icon: Calendar }
  ]

  const weekDays = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ]

  // Mock wellness plan data
  const plan = {
    overview: {
      goal: 'Build Muscle & Increase Energy',
      duration: '12 weeks',
      progress: 65,
      nextMilestone: 'Week 8 Assessment',
      wellnessDNA: {
        metabolicType: 'Fast',
        stressProfile: 'Moderate',
        sleepProfile: 'Good',
        activityProfile: 'Active'
      }
    },
    nutrition: {
      dailyCalories: 2400,
      macros: { protein: 30, carbs: 40, fats: 30 },
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          calories: 450,
          items: ['Oatmeal with berries', 'Greek yogurt', 'Almonds']
        },
        {
          name: 'Lunch',
          time: '12:30 PM',
          calories: 650,
          items: ['Grilled chicken salad', 'Quinoa', 'Avocado']
        },
        {
          name: 'Dinner',
          time: '7:00 PM',
          calories: 700,
          items: ['Salmon', 'Sweet potato', 'Broccoli']
        },
        {
          name: 'Snacks',
          time: 'Throughout day',
          calories: 300,
          items: ['Protein shake', 'Apple', 'Nuts']
        }
      ],
      supplements: [
        { name: 'Whey Protein', time: 'Post-workout', status: 'active' },
        { name: 'Vitamin D3', time: 'Morning', status: 'active' },
        { name: 'Omega-3', time: 'With dinner', status: 'active' },
        { name: 'Magnesium', time: 'Before bed', status: 'suggested' }
      ]
    },
    fitness: {
      weeklyGoal: '5 workouts',
      currentStreak: 12,
      workouts: [
        {
          day: 'monday',
          type: 'Upper Body Strength',
          duration: 45,
          exercises: ['Push-ups', 'Pull-ups', 'Bench Press', 'Rows'],
          completed: true
        },
        {
          day: 'tuesday',
          type: 'Cardio & Core',
          duration: 30,
          exercises: ['Running', 'Planks', 'Mountain Climbers'],
          completed: true
        },
        {
          day: 'wednesday',
          type: 'Lower Body Strength',
          duration: 45,
          exercises: ['Squats', 'Deadlifts', 'Lunges', 'Calf Raises'],
          completed: false
        },
        {
          day: 'thursday',
          type: 'Active Recovery',
          duration: 20,
          exercises: ['Yoga', 'Stretching', 'Walking'],
          completed: false
        },
        {
          day: 'friday',
          type: 'Full Body HIIT',
          duration: 35,
          exercises: ['Burpees', 'Jump Squats', 'Push-ups', 'Sprints'],
          completed: false
        }
      ]
    },
    wellness: {
      sleepGoal: '8 hours',
      stressManagement: [
        { activity: 'Morning Meditation', duration: 10, completed: true },
        { activity: 'Deep Breathing', duration: 5, completed: false },
        { activity: 'Evening Journal', duration: 15, completed: true }
      ],
      hydration: { goal: 8, current: 6 },
      mindfulness: {
        weeklyGoal: '7 sessions',
        current: 5,
        streak: 3
      }
    }
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Wellness DNA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="wellness-card"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Your Wellness DNA</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(plan.overview.wellnessDNA).map(([key, value]) => (
            <div key={key} className="p-4 bg-white/5 rounded-lg">
              <div className="text-white/60 text-sm capitalize mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-white font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Current Goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="wellness-card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Current Goal</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            <Edit3 className="w-5 h-5" />
          </motion.button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-white mb-2">{plan.overview.goal}</h3>
            <p className="text-white/70 mb-4">
              A comprehensive 12-week program designed to help you build lean muscle while boosting your daily energy levels through optimized nutrition and training.
            </p>
            <div className="flex items-center space-x-4 text-sm text-white/60">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{plan.overview.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>{plan.overview.nextMilestone}</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - plan.overview.progress / 100)}`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{plan.overview.progress}%</span>
              </div>
            </div>
            <div className="text-white/60 text-sm">Progress</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-4 gap-4"
      >
        <div className="wellness-card text-center">
          <Apple className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{plan.nutrition.dailyCalories}</div>
          <div className="text-white/60 text-sm">Daily Calories</div>
        </div>
        <div className="wellness-card text-center">
          <Dumbbell className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{plan.fitness.currentStreak}</div>
          <div className="text-white/60 text-sm">Day Streak</div>
        </div>
        <div className="wellness-card text-center">
          <Moon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{plan.wellness.sleepGoal}</div>
          <div className="text-white/60 text-sm">Sleep Goal</div>
        </div>
        <div className="wellness-card text-center">
          <Brain className="w-8 h-8 text-pink-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{plan.wellness.mindfulness.current}/7</div>
          <div className="text-white/60 text-sm">Mindfulness</div>
        </div>
      </motion.div>
    </div>
  )

  const renderNutrition = () => (
    <div className="space-y-8">
      {/* Macros Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="wellness-card"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Daily Nutrition Targets</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{plan.nutrition.dailyCalories}</div>
            <div className="text-white/60">Calories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{plan.nutrition.macros.protein}%</div>
            <div className="text-white/60">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{plan.nutrition.macros.carbs}%</div>
            <div className="text-white/60">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{plan.nutrition.macros.fats}%</div>
            <div className="text-white/60">Fats</div>
          </div>
        </div>
      </motion.div>

      {/* Meal Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="wellness-card"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Today's Meal Plan</h2>
        <div className="space-y-4">
          {plan.nutrition.meals.map((meal, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{meal.name}</h3>
                  <p className="text-white/60 text-sm">{meal.time}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{meal.calories}</div>
                  <div className="text-white/60 text-sm">calories</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {meal.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Supplements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="wellness-card"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Supplement Schedule</h2>
        <div className="space-y-3">
          {plan.nutrition.supplements.map((supplement, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <div className="font-semibold text-white">{supplement.name}</div>
                <div className="text-white/60 text-sm">{supplement.time}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                supplement.status === 'active' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {supplement.status === 'active' ? 'Active' : 'Suggested'}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const renderFitness = () => (
    <div className="space-y-8">
      {/* Fitness Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="wellness-card"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Fitness Overview</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{plan.fitness.weeklyGoal}</div>
            <div className="text-white/60">Weekly Goal</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{plan.fitness.currentStreak}</div>
            <div className="text-white/60">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">3/5</div>
            <div className="text-white/60">This Week</div>
          </div>
        </div>
      </motion.div>

      {/* Weekly Workout Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="wellness-card"
      >
        <h2 className="text-2xl font-bold text-white mb-6">This Week's Workouts</h2>
        <div className="space-y-4">
          {plan.fitness.workouts.map((workout, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              workout.completed 
                ? 'border-green-500/30 bg-green-500/10' 
                : 'border-white/20 bg-white/5'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white capitalize">{workout.day}</h3>
                  <p className="text-white/70">{workout.type}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-white/60">{workout.duration} min</span>
                  {workout.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-white/30 rounded-full"></div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {workout.exercises.map((exercise, exerciseIndex) => (
                  <span
                    key={exerciseIndex}
                    className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm"
                  >
                    {exercise}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const renderWellness = () => (
    <div className="space-y-8">
      {/* Wellness Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="wellness-card text-center">
          <Moon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <div className="text-2xl font-bold text-white mb-2">{plan.wellness.sleepGoal}</div>
          <div className="text-white/60">Sleep Goal</div>
        </div>
        <div className="wellness-card text-center">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <div className="text-2xl font-bold text-white mb-2">{plan.wellness.hydration.current}/{plan.wellness.hydration.goal}</div>
          <div className="text-white/60">Water Glasses</div>
        </div>
        <div className="wellness-card text-center">
          <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <div className="text-2xl font-bold text-white mb-2">{plan.wellness.mindfulness.current}/{plan.wellness.mindfulness.weeklyGoal}</div>
          <div className="text-white/60">Mindfulness Sessions</div>
        </div>
      </motion.div>

      {/* Stress Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="wellness-card"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Daily Wellness Activities</h2>
        <div className="space-y-4">
          {plan.wellness.stressManagement.map((activity, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              activity.completed 
                ? 'border-green-500/30 bg-green-500/10' 
                : 'border-white/20 bg-white/5'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{activity.activity}</h3>
                  <p className="text-white/60">{activity.duration} minutes</p>
                </div>
                {activity.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Start
                  </motion.button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const renderSchedule = () => (
    <div className="space-y-8">
      {/* Day Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="wellness-card"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Weekly Schedule</h2>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(day)}
              className={`p-3 rounded-lg text-center transition-all ${
                selectedDay === day
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <div className="text-sm font-medium capitalize">{day.slice(0, 3)}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Daily Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="wellness-card"
      >
        <h2 className="text-2xl font-bold text-white mb-6 capitalize">{selectedDay} Schedule</h2>
        <div className="space-y-4">
          {/* Sample schedule items */}
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Morning Meditation</h3>
                <p className="text-white/60">7:00 AM - 7:10 AM</p>
              </div>
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Breakfast</h3>
                <p className="text-white/60">7:30 AM - 8:00 AM</p>
              </div>
              <Apple className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Workout</h3>
                <p className="text-white/60">6:00 PM - 6:45 PM</p>
              </div>
              <Dumbbell className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Evening Wind Down</h3>
                <p className="text-white/60">9:30 PM - 10:00 PM</p>
              </div>
              <Moon className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview()
      case 'nutrition': return renderNutrition()
      case 'fitness': return renderFitness()
      case 'wellness': return renderWellness()
      case 'schedule': return renderSchedule()
      default: return renderOverview()
    }
  }

  return (
    <div className="min-h-screen p-6 pb-24 md:pb-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Wellness Plan
          </h1>
          <p className="text-xl text-white/70">
            Personalized by AI, designed for your success
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  )
}

export default WellnessPlanPage