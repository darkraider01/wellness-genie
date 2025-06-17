import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Target, 
  Activity, 
  Heart, 
  Brain, 
  Utensils,
  Clock,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle
} from 'lucide-react'
import { useWellness } from '../context/WellnessContext'

const OnboardingPage = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    goals: [],
    healthConditions: [],
    dietaryPreferences: [],
    activityLevel: '',
    sleepHours: '',
    stressLevel: '',
    budget: '',
    preferences: {
      notifications: true,
      voiceEnabled: false,
      autoShopping: true
    }
  })

  const { setUser, setWellnessProfile } = useWellness()

  const steps = [
    {
      title: "Welcome! Let's get to know you",
      icon: User,
      component: BasicInfoStep
    },
    {
      title: "What are your wellness goals?",
      icon: Target,
      component: GoalsStep
    },
    {
      title: "Tell us about your lifestyle",
      icon: Activity,
      component: LifestyleStep
    },
    {
      title: "Health & dietary preferences",
      icon: Heart,
      component: HealthStep
    },
    {
      title: "AI preferences & budget",
      icon: Brain,
      component: PreferencesStep
    },
    {
      title: "Creating your Wellness DNA...",
      icon: Sparkles,
      component: ProcessingStep
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    // Create user profile
    const user = {
      id: Date.now(),
      name: formData.name,
      email: `${formData.name.toLowerCase().replace(' ', '.')}@student.edu`,
      createdAt: new Date().toISOString()
    }

    // Generate AI wellness profile
    const wellnessProfile = generateWellnessProfile(formData)

    // Save to context and localStorage
    setUser(user)
    setWellnessProfile(wellnessProfile)
    
    localStorage.setItem('wellnessUser', JSON.stringify(user))
    localStorage.setItem('wellnessProfile', JSON.stringify(wellnessProfile))

    // Complete onboarding
    setTimeout(() => {
      onComplete(user)
      window.location.href = '/dashboard'
    }, 3000)
  }

  const generateWellnessProfile = (data) => {
    // AI-powered profile generation (simulated)
    const profile = {
      id: Date.now(),
      wellnessDNA: {
        primaryGoal: data.goals[0] || 'general_wellness',
        metabolicType: calculateMetabolicType(data),
        stressProfile: data.stressLevel,
        sleepProfile: data.sleepHours,
        activityProfile: data.activityLevel
      },
      recommendations: {
        dailyCalories: calculateCalories(data),
        macroSplit: calculateMacros(data),
        supplementPlan: generateSupplements(data),
        exercisePlan: generateExercise(data),
        sleepOptimization: generateSleepPlan(data)
      },
      shoppingPreferences: {
        budget: data.budget,
        autoOrder: data.preferences.autoShopping,
        dietaryRestrictions: data.dietaryPreferences
      },
      createdAt: new Date().toISOString()
    }

    return profile
  }

  // Helper functions for AI calculations
  const calculateMetabolicType = (data) => {
    const types = ['fast', 'moderate', 'slow']
    return types[Math.floor(Math.random() * types.length)]
  }

  const calculateCalories = (data) => {
    const baseCalories = data.gender === 'male' ? 2200 : 1800
    const ageAdjustment = data.age > 30 ? -100 : 0
    const activityMultiplier = {
      'sedentary': 1.0,
      'light': 1.2,
      'moderate': 1.4,
      'active': 1.6,
      'very_active': 1.8
    }
    return Math.round((baseCalories + ageAdjustment) * (activityMultiplier[data.activityLevel] || 1.2))
  }

  const calculateMacros = (data) => {
    if (data.goals.includes('muscle_gain')) {
      return { protein: 30, carbs: 40, fats: 30 }
    } else if (data.goals.includes('weight_loss')) {
      return { protein: 35, carbs: 30, fats: 35 }
    }
    return { protein: 25, carbs: 45, fats: 30 }
  }

  const generateSupplements = (data) => {
    const supplements = []
    if (data.goals.includes('muscle_gain')) {
      supplements.push('Whey Protein', 'Creatine', 'Vitamin D')
    }
    if (data.goals.includes('energy')) {
      supplements.push('B-Complex', 'Iron', 'CoQ10')
    }
    if (data.stressLevel === 'high') {
      supplements.push('Magnesium', 'Ashwagandha', 'Omega-3')
    }
    return supplements
  }

  const generateExercise = (data) => {
    return {
      frequency: data.activityLevel === 'sedentary' ? 3 : 5,
      type: data.goals.includes('muscle_gain') ? 'strength' : 'mixed',
      duration: 45
    }
  }

  const generateSleepPlan = (data) => {
    return {
      targetHours: 8,
      bedtime: '10:30 PM',
      wakeTime: '6:30 AM',
      optimization: data.sleepHours < 7 ? 'priority' : 'maintenance'
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/70">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-white/70">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="wellness-card"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                {React.createElement(steps[currentStep].icon, { className: "w-8 h-8 text-white" })}
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {steps[currentStep].title}
              </h2>
            </div>

            <CurrentStepComponent 
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onComplete={handleComplete}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {currentStep < steps.length - 1 && (
          <div className="flex justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`btn-secondary flex items-center space-x-2 ${
                currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="btn-primary flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}

// Step Components
function BasicInfoStep({ formData, updateFormData }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateFormData('age', e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
            placeholder="Your age"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => updateFormData('gender', e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label className="block text-white mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => updateFormData('location', e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
            placeholder="City, Country"
          />
        </div>
      </div>
    </div>
  )
}

function GoalsStep({ formData, updateFormData }) {
  const goals = [
    { id: 'weight_loss', label: 'Weight Loss', icon: '🎯' },
    { id: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
    { id: 'energy', label: 'More Energy', icon: '⚡' },
    { id: 'skin_health', label: 'Glowing Skin', icon: '✨' },
    { id: 'mental_health', label: 'Mental Wellness', icon: '🧠' },
    { id: 'sleep', label: 'Better Sleep', icon: '😴' },
    { id: 'stress', label: 'Stress Management', icon: '🧘' },
    { id: 'general_wellness', label: 'General Wellness', icon: '🌟' }
  ]

  const toggleGoal = (goalId) => {
    const currentGoals = formData.goals || []
    if (currentGoals.includes(goalId)) {
      updateFormData('goals', currentGoals.filter(g => g !== goalId))
    } else {
      updateFormData('goals', [...currentGoals, goalId])
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-white/70 text-center">Select all that apply (you can choose multiple)</p>
      <div className="grid md:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <motion.button
            key={goal.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleGoal(goal.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
              formData.goals?.includes(goal.id)
                ? 'border-cyan-400 bg-cyan-400/20 text-white'
                : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{goal.icon}</span>
              <span className="font-medium">{goal.label}</span>
              {formData.goals?.includes(goal.id) && (
                <CheckCircle className="w-5 h-5 text-cyan-400 ml-auto" />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function LifestyleStep({ formData, updateFormData }) {
  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
    { id: 'light', label: 'Light', desc: 'Light exercise 1-3 days/week' },
    { id: 'moderate', label: 'Moderate', desc: 'Moderate exercise 3-5 days/week' },
    { id: 'active', label: 'Active', desc: 'Heavy exercise 6-7 days/week' },
    { id: 'very_active', label: 'Very Active', desc: 'Very heavy exercise, physical job' }
  ]

  const stressLevels = [
    { id: 'low', label: 'Low', desc: 'Generally relaxed' },
    { id: 'moderate', label: 'Moderate', desc: 'Some stress, manageable' },
    { id: 'high', label: 'High', desc: 'Often stressed or anxious' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-white mb-4 text-lg">Activity Level</label>
        <div className="space-y-3">
          {activityLevels.map((level) => (
            <motion.button
              key={level.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateFormData('activityLevel', level.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                formData.activityLevel === level.id
                  ? 'border-cyan-400 bg-cyan-400/20 text-white'
                  : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
              }`}
            >
              <div className="font-medium">{level.label}</div>
              <div className="text-sm opacity-70">{level.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Sleep Hours (per night)</label>
          <input
            type="number"
            value={formData.sleepHours}
            onChange={(e) => updateFormData('sleepHours', e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
            placeholder="7-9 hours"
            min="4"
            max="12"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Stress Level</label>
          <select
            value={formData.stressLevel}
            onChange={(e) => updateFormData('stressLevel', e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="">Select stress level</option>
            {stressLevels.map((level) => (
              <option key={level.id} value={level.id}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

function HealthStep({ formData, updateFormData }) {
  const dietaryPreferences = [
    'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Mediterranean', 
    'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'High-Protein', 'No Restrictions'
  ]

  const healthConditions = [
    'Diabetes', 'High Blood Pressure', 'Heart Disease', 'Thyroid Issues',
    'PCOS', 'Anxiety', 'Depression', 'Arthritis', 'None'
  ]

  const togglePreference = (pref, field) => {
    const current = formData[field] || []
    if (current.includes(pref)) {
      updateFormData(field, current.filter(p => p !== pref))
    } else {
      updateFormData(field, [...current, pref])
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-white mb-4 text-lg">Dietary Preferences</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {dietaryPreferences.map((pref) => (
            <motion.button
              key={pref}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => togglePreference(pref, 'dietaryPreferences')}
              className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm ${
                formData.dietaryPreferences?.includes(pref)
                  ? 'border-cyan-400 bg-cyan-400/20 text-white'
                  : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
              }`}
            >
              {pref}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white mb-4 text-lg">Health Conditions</label>
        <p className="text-white/60 text-sm mb-4">This helps us provide safer recommendations</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {healthConditions.map((condition) => (
            <motion.button
              key={condition}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => togglePreference(condition, 'healthConditions')}
              className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm ${
                formData.healthConditions?.includes(condition)
                  ? 'border-cyan-400 bg-cyan-400/20 text-white'
                  : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
              }`}
            >
              {condition}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

function PreferencesStep({ formData, updateFormData }) {
  const budgetRanges = [
    { id: 'low', label: '$50-100/month', desc: 'Basic supplements & essentials' },
    { id: 'medium', label: '$100-200/month', desc: 'Quality supplements & some groceries' },
    { id: 'high', label: '$200-400/month', desc: 'Premium products & full grocery support' },
    { id: 'unlimited', label: '$400+/month', desc: 'No budget constraints' }
  ]

  const updatePreference = (key, value) => {
    updateFormData('preferences', {
      ...formData.preferences,
      [key]: value
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-white mb-4 text-lg">Monthly Wellness Budget</label>
        <div className="space-y-3">
          {budgetRanges.map((budget) => (
            <motion.button
              key={budget.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateFormData('budget', budget.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                formData.budget === budget.id
                  ? 'border-cyan-400 bg-cyan-400/20 text-white'
                  : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
              }`}
            >
              <div className="font-medium">{budget.label}</div>
              <div className="text-sm opacity-70">{budget.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-white text-lg">AI Preferences</h3>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <div className="text-white font-medium">Smart Notifications</div>
              <div className="text-white/60 text-sm">Get personalized wellness reminders</div>
            </div>
            <input
              type="checkbox"
              checked={formData.preferences?.notifications || false}
              onChange={(e) => updatePreference('notifications', e.target.checked)}
              className="w-5 h-5 text-cyan-400"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <div className="text-white font-medium">Voice Interaction</div>
              <div className="text-white/60 text-sm">Talk to your wellness AI assistant</div>
            </div>
            <input
              type="checkbox"
              checked={formData.preferences?.voiceEnabled || false}
              onChange={(e) => updatePreference('voiceEnabled', e.target.checked)}
              className="w-5 h-5 text-cyan-400"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <div className="text-white font-medium">Autonomous Shopping</div>
              <div className="text-white/60 text-sm">Let AI automatically order recommended items</div>
            </div>
            <input
              type="checkbox"
              checked={formData.preferences?.autoShopping || false}
              onChange={(e) => updatePreference('autoShopping', e.target.checked)}
              className="w-5 h-5 text-cyan-400"
            />
          </label>
        </div>
      </div>
    </div>
  )
}

function ProcessingStep({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [currentTask, setCurrentTask] = useState('Analyzing your responses...')

  const tasks = [
    'Analyzing your responses...',
    'Generating your Wellness DNA...',
    'Creating personalized recommendations...',
    'Setting up your AI shopping agent...',
    'Preparing your dashboard...',
    'Welcome to WellnessGenie!'
  ]

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1
        if (newProgress <= 100) {
          const taskIndex = Math.floor((newProgress / 100) * tasks.length)
          setCurrentTask(tasks[Math.min(taskIndex, tasks.length - 1)])
        }
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 1000)
        }
        return newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center"
      >
        <Sparkles className="w-12 h-12 text-white" />
      </motion.div>

      <h3 className="text-2xl font-bold text-white mb-4">{currentTask}</h3>
      
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="text-white/60 mt-2">{progress}% complete</p>
      </div>

      <div className="space-y-2 text-white/70">
        <p>🧬 Creating your unique wellness profile</p>
        <p>🤖 Training your personal AI assistant</p>
        <p>🛒 Setting up smart shopping preferences</p>
        <p>📊 Preparing personalized insights</p>
      </div>
    </div>
  )
}

export default OnboardingPage