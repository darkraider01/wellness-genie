import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Star, 
  Filter, 
  Search, 
  Zap, 
  Heart, 
  Brain,
  Shield,
  Sparkles,
  Check,
  X,
  Bot
} from 'lucide-react'

const ShoppingPage = () => {
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCart, setShowCart] = useState(false)
  const [aiAgent, setAiAgent] = useState({ active: false, recommendations: [] })

  const categories = [
    { id: 'all', label: 'All Products', icon: '🛍️' },
    { id: 'supplements', label: 'Supplements', icon: '💊' },
    { id: 'superfoods', label: 'Superfoods', icon: '🥬' },
    { id: 'protein', label: 'Protein', icon: '🥩' },
    { id: 'vitamins', label: 'Vitamins', icon: '🍊' },
    { id: 'wellness', label: 'Wellness', icon: '🧘' }
  ]

  const products = [
    {
      id: 1,
      name: 'Premium Omega-3 Fish Oil',
      category: 'supplements',
      price: 29.99,
      rating: 4.8,
      reviews: 1247,
      image: '🐟',
      benefits: ['Heart Health', 'Brain Function', 'Anti-inflammatory'],
      aiRecommended: true,
      description: 'High-quality fish oil with EPA and DHA for optimal health',
      dosage: '2 capsules daily',
      aiReason: 'Perfect for your heart health goals and brain optimization'
    },
    {
      id: 2,
      name: 'Organic Spirulina Powder',
      category: 'superfoods',
      price: 24.99,
      rating: 4.6,
      reviews: 892,
      image: '🌿',
      benefits: ['Energy Boost', 'Detox', 'Protein Rich'],
      aiRecommended: true,
      description: 'Pure spirulina powder packed with nutrients and antioxidants',
      dosage: '1 tsp daily in smoothies',
      aiReason: 'Matches your energy goals and plant-based preferences'
    },
    {
      id: 3,
      name: 'Whey Protein Isolate',
      category: 'protein',
      price: 49.99,
      rating: 4.9,
      reviews: 2156,
      image: '💪',
      benefits: ['Muscle Building', 'Recovery', 'Weight Management'],
      aiRecommended: false,
      description: 'Fast-absorbing whey protein for muscle growth and recovery',
      dosage: '1 scoop post-workout',
      aiReason: null
    },
    {
      id: 4,
      name: 'Vitamin D3 + K2',
      category: 'vitamins',
      price: 19.99,
      rating: 4.7,
      reviews: 1543,
      image: '☀️',
      benefits: ['Bone Health', 'Immune Support', 'Mood'],
      aiRecommended: true,
      description: 'Synergistic combination for optimal calcium absorption',
      dosage: '1 capsule daily with food',
      aiReason: 'Essential for your sleep quality and mood optimization'
    },
    {
      id: 5,
      name: 'Adaptogenic Stress Relief',
      category: 'wellness',
      price: 34.99,
      rating: 4.5,
      reviews: 678,
      image: '🧘',
      benefits: ['Stress Relief', 'Mental Clarity', 'Energy Balance'],
      aiRecommended: true,
      description: 'Blend of ashwagandha, rhodiola, and holy basil',
      dosage: '2 capsules morning',
      aiReason: 'Ideal for managing your moderate stress levels'
    },
    {
      id: 6,
      name: 'Collagen Peptides',
      category: 'supplements',
      price: 39.99,
      rating: 4.8,
      reviews: 1876,
      image: '✨',
      benefits: ['Skin Health', 'Joint Support', 'Hair & Nails'],
      aiRecommended: false,
      description: 'Hydrolyzed collagen for beauty and joint health',
      dosage: '1 scoop daily in beverages',
      aiReason: null
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const activateAIAgent = () => {
    setAiAgent({ active: true, recommendations: [] })
    
    // Simulate AI agent processing
    setTimeout(() => {
      const aiRecommendations = products
        .filter(p => p.aiRecommended)
        .slice(0, 3)
        .map(p => ({
          ...p,
          aiConfidence: Math.floor(Math.random() * 20) + 80,
          estimatedBenefit: ['High', 'Medium', 'Very High'][Math.floor(Math.random() * 3)]
        }))
      
      setAiAgent(prev => ({ ...prev, recommendations: aiRecommendations }))
    }, 2000)
  }

  const autoOrder = () => {
    const aiRecommended = aiAgent.recommendations.slice(0, 2)
    aiRecommended.forEach(product => addToCart(product))
    alert('AI Agent has added recommended products to your cart!')
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
              <h1 className="text-4xl font-bold text-white mb-2">Smart Wellness Shopping 🛍️</h1>
              <p className="text-xl text-white/70">AI-curated products for your wellness journey</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={activateAIAgent}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  aiAgent.active 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Bot size={20} />
                <span>{aiAgent.active ? 'AI Agent Active' : 'Activate AI Agent'}</span>
              </button>
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <h3 className="text-white font-bold mb-4 flex items-center">
                <Filter className="mr-2" size={20} />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* AI Agent Panel */}
            {aiAgent.active && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30"
              >
                <h3 className="text-white font-bold mb-4 flex items-center">
                  <Bot className="mr-2 text-purple-400" size={20} />
                  AI Shopping Agent
                </h3>
                
                {aiAgent.recommendations.length === 0 ? (
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="text-3xl mb-2"
                    >
                      🤖
                    </motion.div>
                    <p className="text-white/70 text-sm">Analyzing your wellness profile...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-white/80 text-sm mb-4">
                      Based on your wellness DNA, I recommend:
                    </p>
                    {aiAgent.recommendations.map((product) => (
                      <div key={product.id} className="bg-white/10 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium text-sm">{product.name}</span>
                          <span className="text-green-400 text-xs">{product.aiConfidence}% match</span>
                        </div>
                        <p className="text-white/70 text-xs">{product.aiReason}</p>
                      </div>
                    ))}
                    <button
                      onClick={autoOrder}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all"
                    >
                      Auto-Add to Cart
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all ${
                    product.aiRecommended ? 'ring-2 ring-purple-400/50' : ''
                  }`}
                >
                  {product.aiRecommended && (
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Sparkles size={12} className="mr-1" />
                        AI Recommended
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`${
                              i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                            }`}
                          />
                        ))}
                        <span className="text-white/70 text-xs ml-1">({product.reviews})</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{product.image}</div>
                    <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-white/70 text-sm mb-3">{product.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {product.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="bg-white/20 text-white/80 text-xs px-2 py-1 rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-white">${product.price}</span>
                        <p className="text-white/70 text-xs">{product.dosage}</p>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all flex items-center space-x-2"
                      >
                        <Plus size={16} />
                        <span>Add</span>
                      </button>
                    </div>

                    {product.aiRecommended && product.aiReason && (
                      <div className="bg-purple-500/20 p-3 rounded-lg">
                        <p className="text-purple-200 text-xs">
                          <Bot size={12} className="inline mr-1" />
                          {product.aiReason}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Shopping Cart Sidebar */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-96 bg-black/90 backdrop-blur-lg z-50 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center text-white/70 mt-12">
                  <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/30"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/30"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-white/20 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-white">Total:</span>
                      <span className="text-2xl font-bold text-cyan-400">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-purple-600 transition-all">
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ShoppingPage