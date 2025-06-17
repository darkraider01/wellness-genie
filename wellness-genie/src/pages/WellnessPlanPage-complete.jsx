import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
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
  Circle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Bot,
  RefreshCw
} from 'lucide-react'

const WellnessPlanPage = () => {
  const [user, setUser] = useState(null)
  const [selectedDay, setSelectedDay] = useState(0)
  const [expandedSections, setExpandedSections] = useState({})
  const [completedTasks, setCompletedTasks] = useState({})

  useEffect(() => {
    const savedUser = localStorage.getItem('wellnessUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const wellnessPlan = {
    overview: {
      duration: '4 weeks',
      focus: 'Holistic Wellness Transformation',
      aiConfidence: 94,
      expectedResults: [
        'Increased energy levels by 40%',
        'Improved sleep quality',
        'Better stress management',
        'Enhanced mental clarity'
      ]
    },
    dailyPlan: [
      {
        day: 'Monday',
        theme: 'Energy Kickstart',
        nutrition: {
          breakfast: {
            meal: 'Green Power Smoothie Bowl',
            ingredients: ['Spinach', 'Banana', 'Chia seeds', 'Almond milk', 'Berries'],
            calories: 320,
            benefits: ['High antioxidants', 'Sustained energy', 'Brain boost'],
            prepTime: '10 min'
          },
          lunch: {
            meal: 'Quinoa Buddha Bowl',
            ingredients: ['Quinoa', 'Roasted vegetables', 'Chickpeas', 'Tahini dressing'],
            calories: 450,
            benefits: ['Complete protein', 'Fiber rich', 'Anti-inflammatory'],
            prepTime: '25 min'
          },
          dinner: {
            meal: 'Grilled Salmon with Sweet Potato',
            ingredients: ['Wild salmon', 'Sweet potato', 'Asparagus', 'Olive oil'],
            calories: 520,
            benefits: ['Omega-3 fatty acids', 'Complex carbs', 'Muscle recovery'],
            prepTime: '30 min'
          },
          snacks: ['Almonds & apple', 'Greek yogurt with berries'],
          hydration: '8 glasses water + 1 green tea'
        },
        exercise: {
          type: 'Full Body Strength',
          duration: '45 min',
          intensity: 'Moderate',
          exercises: [
            { name: 'Squats', sets: 3, reps: 12, rest: '60s' },
            { name: 'Push-ups', sets: 3, reps: 10, rest: '60s' },
            { name: 'Deadlifts', sets: 3, reps: 10, rest: '90s' },
            { name: 'Plank', sets: 3, duration: '30s', rest: '45s' }
          ],
          warmup: '5 min dynamic stretching',
          cooldown: '10 min yoga flow'
        },
        wellness: {
          meditation: { duration: '10 min', type: 'Mindfulness', time: '7:00 AM' },
          sleep: { target: '8 hours', bedtime: '10:30 PM', wakeup: '6:30 AM' },
          supplements: [
            { name: 'Omega-3', dosage: '1000mg', time: 'With breakfast' },
            { name: 'Vitamin D3', dosage: '2000 IU', time: 'With lunch' },
            { name: 'Magnesium', dosage: '400mg', time: 'Before bed' }
          ]
        },
        aiInsights: [
          'Your energy peaks at 10 AM - perfect time for challenging tasks',
          'Post-workout protein window: consume protein within 30 minutes',
          'Evening meditation will improve your sleep quality by 23%'
        ]
      },
      // Add more days with similar structure...
      {
        day: 'Tuesday',
        theme: 'Recovery & Flexibility',
        nutrition: {
          breakfast: {
            meal: 'Overnight Oats with Protein',
            ingredients: ['Oats', 'Protein powder', 'Chia seeds', 'Almond butter', 'Banana'],
            calories: 380,
            benefits: ['Slow-release energy', 'Muscle recovery', 'Fiber rich'],
            prepTime: '5 min (prep night before)'
          },
          lunch: {
            meal: 'Mediterranean Wrap',
            ingredients: ['Whole wheat tortilla', 'Hummus', 'Grilled chicken', 'Vegetables'],
            calories: 420,
            benefits: ['Lean protein', 'Healthy fats', 'Complex carbs'],
            prepTime: '15 min'
          },
          dinner: {
            meal: 'Lentil Curry with Brown Rice',
            ingredients: ['Red lentils', 'Coconut milk', 'Spices', 'Brown rice', 'Spinach'],
            calories: 480,
            benefits: ['Plant protein', 'Anti-inflammatory', 'Digestive health'],
            prepTime: '35 min'
          },
          snacks: ['Trail mix', 'Herbal tea with honey'],
          hydration: '8 glasses water + 1 herbal tea'
        },
        exercise: {
          type: 'Yoga & Stretching',
          duration: '30 min',
          intensity: 'Low',
          exercises: [
            { name: 'Sun Salutation', sets: 3, duration: '5 min each' },
            { name: 'Hip Flexor Stretch', duration: '2 min each side' },
            { name: 'Spinal Twist', duration: '1 min each side' },
            { name: 'Savasana', duration: '5 min' }
          ],
          focus: 'Flexibility and recovery'
        },
        wellness: {
          meditation: { duration: '15 min', type: 'Body Scan', time: '8:00 PM' },
          sleep: { target: '8 hours', bedtime: '10:30 PM', wakeup: '6:30 AM' },
          supplements: [
            { name: 'Turmeric', dosage: '500mg', time: 'With dinner' },
            { name: 'Probiotics', dosage: '1 capsule', time: 'With breakfast' }
          ]
        },
        aiInsights: [
          'Recovery day is crucial for muscle adaptation and growth',
          'Turmeric will help reduce exercise-induced inflammation',
          'Evening body scan meditation enhances sleep quality'
        ]
      }
    ]
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }))
  }

  const currentDayPlan = wellnessPlan.dailyPlan[selectedDay] || wellnessPlan.dailyPlan[0]

  const generateNewPlan = () => {
    alert('AI is generating a new personalized plan based on your recent progress!')
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Your AI Wellness Plan 🎯</h1>
              <p className="text-xl text-white/70">Personalized daily roadmap to your goals</p>
            </div>
            <button
              onClick={generateNewPlan}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <RefreshCw size={20} />
              <span>Regenerate Plan</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Plan Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Plan Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Bot className="mr-2 text-purple-400" size={24} />
                Plan Overview
              </h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">{wellnessPlan.overview.aiConfidence}%</div>
                  <div className="text-white/70 text-sm">AI Confidence</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Duration:</span>
                    <span className="text-white">{wellnessPlan.overview.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Focus:</span>
                    <span className="text-white text-sm">{wellnessPlan.overview.focus}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Expected Results:</h4>
                  <ul className="space-y-1">
                    {wellnessPlan.overview.expectedResults.map((result, index) => (
                      <li key={index} className="text-white/70 text-sm flex items-start">
                        <CheckCircle className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={12} />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Day Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <h3 className="text-white font-bold mb-4">Select Day</h3>
              <div className="space-y-2">
                {weekDays.map((day, index) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedDay === index
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <div className="font-medium">{day}</div>
                    <div className="text-xs opacity-70">
                      {index < wellnessPlan.dailyPlan.length ? wellnessPlan.dailyPlan[index].theme : 'Coming soon'}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content - Daily Plan */}
          <div className="lg:col-span-3 space-y-8">
            {/* Day Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-cyan-400/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">{currentDayPlan.day}</h2>
                  <p className="text-cyan-400 text-lg">{currentDayPlan.theme}</p>
                </div>
                <div className="text-right">
                  <div className="text-white/70 text-sm">Today's Focus</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Sparkles className="text-yellow-400" size={20} />
                    <span className="text-white font-medium">AI Optimized</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Nutrition Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <button
                onClick={() => toggleSection('nutrition')}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Apple className="mr-3 text-green-400" size={28} />
                  Nutrition Plan
                </h3>
                {expandedSections.nutrition ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
              </button>

              <AnimatePresence>
                {expandedSections.nutrition && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6"
                  >
                    {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                      const meal = currentDayPlan.nutrition[mealType]
                      return (
                        <div key={mealType} className="bg-white/10 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-white font-bold capitalize">{mealType}</h4>
                            <div className="flex items-center space-x-4">
                              <span className="text-cyan-400 text-sm">{meal.calories} cal</span>
                              <span className="text-purple-400 text-sm">{meal.prepTime}</span>
                            </div>
                          </div>
                          
                          <h5 className="text-white font-medium mb-2">{meal.meal}</h5>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h6 className="text-white/70 text-sm mb-2">Ingredients:</h6>
                              <ul className="space-y-1">
                                {meal.ingredients.map((ingredient, index) => (
                                  <li key={index} className="text-white/80 text-sm flex items-center">
                                    <Circle className="text-green-400 mr-2" size={8} />
                                    {ingredient}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h6 className="text-white/70 text-sm mb-2">Benefits:</h6>
                              <div className="flex flex-wrap gap-1">
                                {meal.benefits.map((benefit, index) => (
                                  <span
                                    key={index}
                                    className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full"
                                  >
                                    {benefit}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <h5 className="text-white font-medium mb-2">Snacks</h5>
                        <ul className="space-y-1">
                          {currentDayPlan.nutrition.snacks.map((snack, index) => (
                            <li key={index} className="text-white/80 text-sm">{snack}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-4">
                        <h5 className="text-white font-medium mb-2">Hydration</h5>
                        <p className="text-white/80 text-sm">{currentDayPlan.nutrition.hydration}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Exercise Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <button
                onClick={() => toggleSection('exercise')}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Dumbbell className="mr-3 text-orange-400" size={28} />
                  Exercise Plan
                </h3>
                {expandedSections.exercise ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
              </button>

              <AnimatePresence>
                {expandedSections.exercise && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <Clock className="text-orange-400 mx-auto mb-1" size={20} />
                        <div className="text-white font-medium">{currentDayPlan.exercise.duration}</div>
                        <div className="text-white/70 text-xs">Duration</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <Zap className="text-yellow-400 mx-auto mb-1" size={20} />
                        <div className="text-white font-medium">{currentDayPlan.exercise.intensity}</div>
                        <div className="text-white/70 text-xs">Intensity</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <Target className="text-purple-400 mx-auto mb-1" size={20} />
                        <div className="text-white font-medium">{currentDayPlan.exercise.type}</div>
                        <div className="text-white/70 text-xs">Type</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {currentDayPlan.exercise.exercises.map((exercise, index) => (
                        <div key={index} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                          <div>
                            <h5 className="text-white font-medium">{exercise.name}</h5>
                            <p className="text-white/70 text-sm">
                              {exercise.sets && `${exercise.sets} sets × `}
                              {exercise.reps && `${exercise.reps} reps`}
                              {exercise.duration && exercise.duration}
                              {exercise.rest && ` • Rest: ${exercise.rest}`}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleTask(`exercise-${index}`)}
                            className={`p-2 rounded-full transition-all ${
                              completedTasks[`exercise-${index}`]
                                ? 'bg-green-500 text-white'
                                : 'bg-white/20 text-white/70 hover:bg-white/30'
                            }`}
                          >
                            <CheckCircle size={20} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {currentDayPlan.exercise.warmup && (
                      <div className="bg-blue-500/20 rounded-lg p-4">
                        <h5 className="text-blue-300 font-medium mb-1">Warm-up</h5>
                        <p className="text-white/80 text-sm">{currentDayPlan.exercise.warmup}</p>
                      </div>
                    )}

                    {currentDayPlan.exercise.cooldown && (
                      <div className="bg-purple-500/20 rounded-lg p-4">
                        <h5 className="text-purple-300 font-medium mb-1">Cool-down</h5>
                        <p className="text-white/80 text-sm">{currentDayPlan.exercise.cooldown}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Wellness Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <button
                onClick={() => toggleSection('wellness')}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Heart className="mr-3 text-pink-400" size={28} />
                  Wellness & Recovery
                </h3>
                {expandedSections.wellness ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
              </button>

              <AnimatePresence>
                {expandedSections.wellness && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6"
                  >
                    {/* Meditation */}
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-white font-medium flex items-center">
                          <Brain className="mr-2 text-purple-400" size={20} />
                          Meditation
                        </h5>
                        <span className="text-purple-400 text-sm">{currentDayPlan.wellness.meditation.time}</span>
                      </div>
                      <p className="text-white/80 text-sm">
                        {currentDayPlan.wellness.meditation.duration} • {currentDayPlan.wellness.meditation.type}
                      </p>
                    </div>

                    {/* Sleep */}
                    <div className="bg-white/10 rounded-lg p-4">
                      <h5 className="text-white font-medium flex items-center mb-3">
                        <Moon className="mr-2 text-blue-400" size={20} />
                        Sleep Schedule
                      </h5>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-white font-medium">{currentDayPlan.wellness.sleep.target}</div>
                          <div className="text-white/70 text-xs">Target</div>
                        </div>
                        <div>
                          <div className="text-white font-medium">{currentDayPlan.wellness.sleep.bedtime}</div>
                          <div className="text-white/70 text-xs">Bedtime</div>
                        </div>
                        <div>
                          <div className="text-white font-medium">{currentDayPlan.wellness.sleep.wakeup}</div>
                          <div className="text-white/70 text-xs">Wake up</div>
                        </div>
                      </div>
                    </div>

                    {/* Supplements */}
                    <div className="bg-white/10 rounded-lg p-4">
                      <h5 className="text-white font-medium mb-3">Supplements</h5>
                      <div className="space-y-2">
                        {currentDayPlan.wellness.supplements.map((supplement, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <span className="text-white font-medium">{supplement.name}</span>
                              <span className="text-white/70 text-sm ml-2">{supplement.dosage}</span>
                            </div>
                            <span className="text-cyan-400 text-sm">{supplement.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30"
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Bot className="mr-3 text-purple-400" size={28} />
                AI Insights for Today
              </h3>
              
              <div className="space-y-3">
                {currentDayPlan.aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-white/10 rounded-lg p-4 flex items-start space-x-3"
                  >
                    <Sparkles className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                    <p className="text-white/80 text-sm">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WellnessPlanPage