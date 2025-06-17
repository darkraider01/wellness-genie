import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Sparkles, Target, Heart, Brain, Zap, Shield } from 'lucide-react'

const OnboardingPage = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    goals: [],
    healthConditions: [],
    dietaryPreferences: [],
    activityLevel: '',
    sleepHours: '',
    stressLevel: '',
    budget: ''
  })

  const steps = [
    {
      title: "Welcome to WellnessGenie! ✨",
      subtitle: "Let's create your personalized wellness DNA",
      component: WelcomeStep
    },
    {
      title: "Tell us about yourself",
      subtitle: "Basic information to personalize your experience",
      component: BasicInfoStep
    },
    {
      title: "What are your wellness goals?",
      subtitle: "Select all that apply to you",
      component: GoalsStep
    },
    {
      title: "Health & Lifestyle",
      subtitle: "Help us understand your current situation",
      component: HealthStep
    },
    {
      title: "Dietary Preferences",
      subtitle: "Let's customize your nutrition plan",
      component: DietStep
    },
    {
      title: "Your Wellness DNA is Ready! 🧬",
      subtitle: "AI is generating your personalized plan",
      component: CompletionStep
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      const userData = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        wellnessDNA: generateWellnessDNA(formData)
      }
      onComplete(userData)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateWellnessDNA = (data) => {
    return {
      metabolismType: data.age < 30 ? 'Fast' : data.age < 50 ? 'Moderate' : 'Slow',
      energyPattern: data.sleepHours >= 8 ? 'Morning Lark' : 'Night Owl',
      stressResponse: data.stressLevel === 'high' ? 'Sensitive' : 'Resilient',
      nutritionProfile: data.dietaryPreferences.includes('vegetarian') ? 'Plant-Based' : 'Omnivore',
      fitnessType: data.activityLevel === 'high' ? 'Athlete' : data.activityLevel === 'moderate' ? 'Active' : 'Beginner'
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/70 text-sm">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-white/70 text-sm">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{steps[currentStep].title}</h2>
            <p className="text-white/70">{steps[currentStep].subtitle}</p>
          </div>

          <CurrentStepComponent 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
          />

          {/* Navigation */}
          {currentStep < steps.length - 1 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 0
                    ? 'bg-white/10 text-white/50 cursor-not-allowed'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <ChevronLeft size={20} />
                <span>Back</span>
              </button>

              <button
                onClick={nextStep}
                className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all"
              >
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

// Step Components
function WelcomeStep({ onNext }) {
  return (
    <div className="text-center space-y-6">
      <div className="text-6xl mb-6">🧬</div>
      <p className="text-white/80 text-lg leading-relaxed">
        WellnessGenie uses advanced AI to create your unique Wellness DNA - a personalized blueprint 
        that adapts to your lifestyle, goals, and preferences.
      </p>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-white/10 p-4 rounded-lg">
          <Brain className="text-cyan-400 mx-auto mb-2" size={32} />
          <h4 className="text-white font-semibold">AI-Powered</h4>
          <p className="text-white/70 text-sm">Smart recommendations</p>
        </div>
        <div className="bg-white/10 p-4 rounded-lg">
          <Target className="text-purple-400 mx-auto mb-2" size={32} />
          <h4 className="text-white font-semibold">Goal-Oriented</h4>
          <p className="text-white/70 text-sm">Personalized plans</p>
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-purple-600 transition-all mt-8"
      >
        Let's Begin! ✨
      </button>
    </div>
  )
}

function BasicInfoStep({ formData, updateFormData }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-medium mb-2">What's your name?</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          placeholder="Enter your name"
          className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-medium mb-2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateFormData('age', e.target.value)}
            placeholder="25"
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
          />
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => updateFormData('gender', e.target.value)}
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function GoalsStep({ formData, updateFormData }) {
  const goals = [
    { id: 'weight-loss', label: 'Weight Loss', icon: '🎯', color: 'from-red-500 to-pink-500' },
    { id: 'muscle-gain', label: 'Build Muscle', icon: '💪', color: 'from-orange-500 to-red-500' },
    { id: 'energy', label: 'More Energy', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
    { id: 'sleep', label: 'Better Sleep', icon: '😴', color: 'from-blue-500 to-purple-500' },
    { id: 'stress', label: 'Reduce Stress', icon: '🧘', color: 'from-green-500 to-blue-500' },
    { id: 'skin', label: 'Glowing Skin', icon: '✨', color: 'from-pink-500 to-purple-500' }
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
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              (formData.goals || []).includes(goal.id)
                ? `bg-gradient-to-r ${goal.color} border-white/50`
                : 'bg-white/10 border-white/30 hover:border-white/50'
            }`}
          >
            <div className="text-2xl mb-2">{goal.icon}</div>
            <div className="text-white font-medium">{goal.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function HealthStep({ formData, updateFormData }) {
  const activityLevels = [
    { value: 'low', label: 'Sedentary', desc: 'Little to no exercise' },
    { value: 'moderate', label: 'Moderate', desc: '3-4 times per week' },
    { value: 'high', label: 'Very Active', desc: '5+ times per week' }
  ]

  const stressLevels = [
    { value: 'low', label: 'Low', emoji: '😌' },
    { value: 'moderate', label: 'Moderate', emoji: '😐' },
    { value: 'high', label: 'High', emoji: '😰' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-medium mb-3">Activity Level</label>
        <div className="space-y-2">
          {activityLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => updateFormData('activityLevel', level.value)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                formData.activityLevel === level.value
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-white/50'
                  : 'bg-white/10 border-white/30 hover:border-white/50'
              }`}
            >
              <div className="text-white font-medium">{level.label}</div>
              <div className="text-white/70 text-sm">{level.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-medium mb-2">Sleep Hours</label>
          <input
            type="number"
            value={formData.sleepHours}
            onChange={(e) => updateFormData('sleepHours', e.target.value)}
            placeholder="8"
            min="4"
            max="12"
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
          />
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Stress Level</label>
          <div className="flex space-x-2">
            {stressLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => updateFormData('stressLevel', level.value)}
                className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                  formData.stressLevel === level.value
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-white/50'
                    : 'bg-white/10 border-white/30'
                }`}
              >
                <div className="text-lg">{level.emoji}</div>
                <div className="text-white text-xs">{level.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DietStep({ formData, updateFormData }) {
  const dietaryPreferences = [
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'keto', label: 'Keto', icon: '🥑' },
    { id: 'paleo', label: 'Paleo', icon: '🥩' },
    { id: 'mediterranean', label: 'Mediterranean', icon: '🫒' },
    { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾' }
  ]

  const budgetRanges = [
    { value: 'low', label: '$50-100/month', desc: 'Budget-friendly' },
    { value: 'medium', label: '$100-200/month', desc: 'Moderate spending' },
    { value: 'high', label: '$200+/month', desc: 'Premium options' }
  ]

  const toggleDietPref = (prefId) => {
    const currentPrefs = formData.dietaryPreferences || []
    if (currentPrefs.includes(prefId)) {
      updateFormData('dietaryPreferences', currentPrefs.filter(p => p !== prefId))
    } else {
      updateFormData('dietaryPreferences', [...currentPrefs, prefId])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-medium mb-3">Dietary Preferences</label>
        <div className="grid grid-cols-3 gap-3">
          {dietaryPreferences.map((pref) => (
            <button
              key={pref.id}
              onClick={() => toggleDietPref(pref.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                (formData.dietaryPreferences || []).includes(pref.id)
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 border-white/50'
                  : 'bg-white/10 border-white/30 hover:border-white/50'
              }`}
            >
              <div className="text-xl mb-1">{pref.icon}</div>
              <div className="text-white text-sm">{pref.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white font-medium mb-3">Monthly Wellness Budget</label>
        <div className="space-y-2">
          {budgetRanges.map((budget) => (
            <button
              key={budget.value}
              onClick={() => updateFormData('budget', budget.value)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                formData.budget === budget.value
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 border-white/50'
                  : 'bg-white/10 border-white/30 hover:border-white/50'
              }`}
            >
              <div className="text-white font-medium">{budget.label}</div>
              <div className="text-white/70 text-sm">{budget.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function CompletionStep({ formData, onNext }) {
  const [isGenerating, setIsGenerating] = useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (isGenerating) {
    return (
      <div className="text-center space-y-6">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl"
          >
            🧬
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full"
          />
        </div>
        <h3 className="text-2xl font-bold text-white">Analyzing Your Wellness DNA...</h3>
        <div className="space-y-2">
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="text-white/70"
          >
            🧠 Processing your goals and preferences...
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.5 }}
            className="text-white/70"
          >
            🎯 Creating personalized recommendations...
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 2.5 }}
            className="text-white/70"
          >
            ✨ Generating your wellness plan...
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center space-y-6">
      <div className="text-6xl mb-6">🎉</div>
      <h3 className="text-2xl font-bold text-white">Your Wellness DNA is Ready!</h3>
      <p className="text-white/80">
        Welcome to your personalized wellness journey, {formData.name}! 
        Your AI-powered plan is waiting for you.
      </p>
      
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="text-white font-semibold mb-4">Your Wellness DNA Profile:</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-left">
            <span className="text-white/70">Metabolism:</span>
            <span className="text-cyan-400 ml-2">Fast Burner</span>
          </div>
          <div className="text-left">
            <span className="text-white/70">Energy Pattern:</span>
            <span className="text-purple-400 ml-2">Morning Lark</span>
          </div>
          <div className="text-left">
            <span className="text-white/70">Fitness Type:</span>
            <span className="text-green-400 ml-2">Active Builder</span>
          </div>
          <div className="text-left">
            <span className="text-white/70">Nutrition Style:</span>
            <span className="text-yellow-400 ml-2">Balanced Eater</span>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
      >
        Enter Your Wellness Dashboard ✨
      </button>
    </div>
  )
}

export default OnboardingPage