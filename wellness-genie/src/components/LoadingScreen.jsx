import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Brain, Zap } from 'lucide-react'

const LoadingScreen = () => {
  const icons = [
    { Icon: Sparkles, color: 'text-yellow-400', delay: 0 },
    { Icon: Heart, color: 'text-red-400', delay: 0.2 },
    { Icon: Brain, color: 'text-purple-400', delay: 0.4 },
    { Icon: Zap, color: 'text-blue-400', delay: 0.6 }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-transparent border-t-white/30 rounded-full"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl font-bold text-white mb-4"
        >
          WellnessGenie
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl text-white/80 mb-8"
        >
          Your AI-Powered Wellness Companion
        </motion.p>

        {/* Floating Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          {icons.map(({ Icon, color, delay }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: [0, -10, 0],
              }}
              transition={{ 
                opacity: { delay: delay + 1, duration: 0.5 },
                y: { 
                  delay: delay + 1.5, 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
              className={`p-3 glass rounded-full ${color}`}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
          ))}
        </div>

        {/* Loading Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="w-64 mx-auto"
        >
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="text-white/60 text-sm mt-4"
          >
            Initializing your wellness journey...
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingScreen