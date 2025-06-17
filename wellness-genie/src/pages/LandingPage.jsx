import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Brain, 
  Heart, 
  ShoppingCart, 
  TrendingUp, 
  Users,
  Zap,
  Star,
  ArrowRight,
  Play
} from 'lucide-react'

const LandingPage = ({ onGetStarted }) => {
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Wellness DNA",
      description: "Get a personalized wellness profile based on your unique goals, lifestyle, and preferences",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Heart,
      title: "Smart Health Tracking",
      description: "Monitor your progress with intelligent insights and predictive health analytics",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: ShoppingCart,
      title: "Autonomous Shopping Agent",
      description: "AI automatically researches and orders supplements, groceries, and wellness products",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: TrendingUp,
      title: "Future Self Visualization",
      description: "See your potential health outcomes with 3D avatars and predictive modeling",
      color: "from-blue-500 to-cyan-500"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      text: "WellnessGenie transformed my health journey. The AI recommendations are spot-on!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Pre-Med Student",
      text: "The autonomous shopping feature saves me hours every week. It's like having a personal nutritionist.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Engineering Student",
      text: "The 3D progress visualization keeps me motivated. I can literally see my future self!",
      rating: 5
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
          >
            Wellness
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Genie
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-2xl md:text-3xl text-white/80 mb-8 max-w-4xl mx-auto"
          >
            Your AI-Powered Wellness Companion with Autonomous Shopping & Predictive Health Insights
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="btn-primary text-xl px-8 py-4 flex items-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-xl px-8 py-4 flex items-center space-x-2"
            >
              <Play className="w-6 h-6" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "10K+", label: "Students Helped" },
              { number: "95%", label: "Goal Achievement" },
              { number: "24/7", label: "AI Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Revolutionary Features
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the future of personalized wellness with cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="wellness-card text-center group cursor-pointer"
              >
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-white/70">
              Watch how WellnessGenie adapts to your unique wellness journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Feature Showcase */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    currentFeature === index 
                      ? 'glass border-2 border-white/30' 
                      : 'glass-dark hover:glass'
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Visual Demo */}
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="wellness-card h-96 flex items-center justify-center"
            >
              <div className="text-center">
                <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-r ${features[currentFeature].color} rounded-full flex items-center justify-center animate-pulse-glow`}>
                  {React.createElement(features[currentFeature].icon, { className: "w-12 h-12 text-white" })}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {features[currentFeature].title}
                </h3>
                <p className="text-white/70">
                  Interactive demo coming soon...
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Student Success Stories
            </h2>
            <p className="text-xl text-white/70">
              See how students are transforming their wellness journeys
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="wellness-card"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-white/60 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Wellness?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Join thousands of students who are already living healthier, happier lives with AI-powered wellness guidance.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="btn-primary text-2xl px-12 py-6 flex items-center space-x-3 mx-auto"
          >
            <Zap className="w-8 h-8" />
            <span>Start Your Free Journey</span>
            <ArrowRight className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}

export default LandingPage