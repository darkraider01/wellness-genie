import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft, User, Target, Activity, Heart } from 'lucide-react'

const OnboardingPage = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    goals: [],
    activityLevel: '',
    healthConditions: [],
    dietaryPreferences: []
  })

  const steps = [
    {
      title: "Let's Get to Know You",
      icon: User,
      fields: [
        { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Enter your name' },
        { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age' },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other', 'Prefer not to say'] }
      ]
    },
    {
      title: "What Are Your Wellness Goals?",
      icon: Target,
      type: 'multiselect',
      field: 'goals',
      options: [
        { id: 'weight-loss', label: 'Weight Loss', emoji: '⚖️' },
        { id: 'muscle-gain', label: 'Muscle Gain', emoji: '💪' },
        { id: 'energy', label: 'More Energy', emoji: '⚡' },
        { id: 'sleep', label: 'Better Sleep', emoji: '😴' },
        { id: 'skin', label: 'Glowing Skin', emoji: '✨' },
        { id: 'stress', label: 'Stress Management', emoji: '🧘' }
      ]
    },
    {
      title: "How Active Are You?",
      icon: Activity,
      type: 'select',
      field: 'activityLevel',
      options: [
        { id: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
        { id: 'light', label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
        { id: 'moderate', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
        { id: 'very', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
        { id: 'extra', label: 'Extra Active', description: 'Very hard exercise, physical job' }
      ]
    },
    {
      title: "Any Health Considerations?",
      icon: Heart,
      type: 'multiselect',
      field: 'healthConditions',
      options: [
        { id: 'none', label: 'None', emoji: '✅' },
        { id: 'diabetes', label: 'Diabetes', emoji: '🩺' },
        { id: 'hypertension', label: 'High Blood Pressure', emoji: '❤️' },
        { id: 'allergies', label: 'Food Allergies', emoji: '🚫' },
        { id: 'digestive', label: 'Digestive Issues', emoji: '🫃' },
        { id: 'other', label: 'Other', emoji: '📋' }
      ]
    }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMultiSelect = (field, optionId) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(optionId)
        ? prev[field].filter(id => id !== optionId)
        : [...prev[field], optionId]
    }))
  }

  const handleNext = () => {
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

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateWellnessDNA = (data) => {
    // Simple AI-like wellness DNA generation
    const dnaTraits = []
    
    if (data.goals.includes('weight-loss')) dnaTraits.push('Fat Burner')
    if (data.goals.includes('muscle-gain')) dnaTraits.push('Muscle Builder')
    if (data.goals.includes('energy')) dnaTraits.push('Energy Booster')
    if (data.activityLevel === 'very' || data.activityLevel === 'extra') dnaTraits.push('Athletic')
    if (data.goals.includes('stress')) dnaTraits.push('Zen Master')
    
    return dnaTraits.length > 0 ? dnaTraits : ['Wellness Seeker']
  }

  const currentStepData = steps[currentStep]
  const IconComponent = currentStepData.icon

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/70">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-white/70">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-4">
              <IconComponent size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{currentStepData.title}</h2>
          </div>

          {/* Form Fields */}
          {currentStepData.fields && (
            <div className="space-y-6">
              {currentStepData.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-white font-medium mb-2">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.name]}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option} className="text-black">{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name]}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Multi-select Options */}
          {currentStepData.type === 'multiselect' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentStepData.options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleMultiSelect(currentStepData.field, option.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    formData[currentStepData.field].includes(option.id)
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500'
                      : 'bg-white/10 border-white/30 hover:border-white/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    {option.emoji && <span className="text-2xl">{option.emoji}</span>}
                    <div>
                      <div className="text-white font-medium">{option.label}</div>
                      {option.description && (
                        <div className="text-white/70 text-sm">{option.description}</div>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Single Select Options */}
          {currentStepData.type === 'select' && (
            <div className="space-y-3">
              {currentStepData.options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleInputChange(currentStepData.field, option.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    formData[currentStepData.field] === option.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500'
                      : 'bg-white/10 border-white/30 hover:border-white/50'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="text-white font-medium">{option.label}</div>
                  <div className="text-white/70 text-sm">{option.description}</div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 0
                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all"
          >
            <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default OnboardingPage