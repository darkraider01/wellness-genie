import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Bot, 
  Search, 
  Filter, 
  Star, 
  Heart,
  Plus,
  Minus,
  Check,
  Clock,
  Truck,
  DollarSign,
  Zap,
  Brain,
  Package,
  AlertCircle,
  Sparkles
} from 'lucide-react'
import { useWellness } from '../context/WellnessContext'

const ShoppingPage = () => {
  const { shoppingCart, addToCart, removeFromCart, clearCart, wellnessProfile } = useWellness()
  const [activeTab, setActiveTab] = useState('recommendations')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [aiAgent, setAiAgent] = useState({
    isActive: true,
    currentTask: 'Analyzing your wellness needs...',
    recommendations: [],
    autoOrders: []
  })

  const tabs = [
    { id: 'recommendations', label: 'AI Recommendations', icon: Brain },
    { id: 'supplements', label: 'Supplements', icon: Package },
    { id: 'groceries', label: 'Groceries', icon: ShoppingCart },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: shoppingCart.length },
    { id: 'auto-orders', label: 'Auto Orders', icon: Bot }
  ]

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'supplements', label: 'Supplements' },
    { id: 'protein', label: 'Protein' },
    { id: 'vitamins', label: 'Vitamins' },
    { id: 'groceries', label: 'Groceries' },
    { id: 'snacks', label: 'Healthy Snacks' }
  ]

  // Mock product data
  const products = {
    recommendations: [
      {
        id: 1,
        name: 'Premium Whey Protein Isolate',
        brand: 'OptimalNutrition',
        price: 49.99,
        originalPrice: 59.99,
        rating: 4.8,
        reviews: 2847,
        image: '🥛',
        category: 'protein',
        aiReason: 'Perfect for your muscle-building goals. High bioavailability matches your fast metabolic type.',
        benefits: ['25g protein per serving', 'Fast absorption', 'Low lactose'],
        inStock: true,
        delivery: '2-day shipping',
        aiScore: 95
      },
      {
        id: 2,
        name: 'Vitamin D3 + K2 Complex',
        brand: 'SunVitality',
        price: 24.99,
        rating: 4.9,
        reviews: 1523,
        image: '☀️',
        category: 'vitamins',
        aiReason: 'Your location and lifestyle indicate potential vitamin D deficiency. K2 enhances absorption.',
        benefits: ['Bone health support', 'Immune system boost', 'Enhanced absorption'],
        inStock: true,
        delivery: 'Next day',
        aiScore: 92
      },
      {
        id: 3,
        name: 'Organic Magnesium Glycinate',
        brand: 'PureElements',
        price: 19.99,
        rating: 4.7,
        reviews: 987,
        image: '🧘',
        category: 'supplements',
        aiReason: 'Your stress profile suggests magnesium supplementation for better sleep and recovery.',
        benefits: ['Better sleep quality', 'Muscle recovery', 'Stress reduction'],
        inStock: true,
        delivery: '2-day shipping',
        aiScore: 88
      },
      {
        id: 4,
        name: 'Wild-Caught Salmon Fillets',
        brand: 'OceanFresh',
        price: 32.99,
        rating: 4.6,
        reviews: 654,
        image: '🐟',
        category: 'groceries',
        aiReason: 'High-quality omega-3s support your brain health and reduce inflammation from training.',
        benefits: ['Omega-3 fatty acids', 'High protein', 'Anti-inflammatory'],
        inStock: true,
        delivery: 'Same day (refrigerated)',
        aiScore: 90
      }
    ],
    supplements: [
      {
        id: 5,
        name: 'Creatine Monohydrate',
        brand: 'StrengthLab',
        price: 29.99,
        rating: 4.8,
        reviews: 3421,
        image: '💪',
        category: 'supplements',
        benefits: ['Increased strength', 'Better performance', 'Muscle growth'],
        inStock: true,
        delivery: '2-day shipping'
      },
      {
        id: 6,
        name: 'Omega-3 Fish Oil',
        brand: 'PureMarine',
        price: 34.99,
        rating: 4.7,
        reviews: 2156,
        image: '🐠',
        category: 'supplements',
        benefits: ['Heart health', 'Brain function', 'Joint support'],
        inStock: true,
        delivery: 'Next day'
      }
    ],
    groceries: [
      {
        id: 7,
        name: 'Organic Quinoa',
        brand: 'NatureHarvest',
        price: 8.99,
        rating: 4.5,
        reviews: 876,
        image: '🌾',
        category: 'groceries',
        benefits: ['Complete protein', 'High fiber', 'Gluten-free'],
        inStock: true,
        delivery: 'Same day'
      },
      {
        id: 8,
        name: 'Grass-Fed Greek Yogurt',
        brand: 'PasturePure',
        price: 6.99,
        rating: 4.6,
        reviews: 1234,
        image: '🥛',
        category: 'groceries',
        benefits: ['Probiotics', 'High protein', 'Calcium rich'],
        inStock: true,
        delivery: 'Same day (refrigerated)'
      }
    ]
  }

  const autoOrders = [
    {
      id: 1,
      name: 'Whey Protein Isolate',
      nextOrder: '2024-06-20',
      frequency: 'Monthly',
      price: 49.99,
      status: 'active',
      image: '🥛'
    },
    {
      id: 2,
      name: 'Vitamin D3 Complex',
      nextOrder: '2024-06-25',
      frequency: 'Bi-monthly',
      price: 24.99,
      status: 'active',
      image: '☀️'
    },
    {
      id: 3,
      name: 'Organic Spinach',
      nextOrder: '2024-06-16',
      frequency: 'Weekly',
      price: 4.99,
      status: 'paused',
      image: '🥬'
    }
  ]

  useEffect(() => {
    // Simulate AI agent working
    const tasks = [
      'Analyzing your wellness needs...',
      'Comparing product quality and prices...',
      'Checking ingredient compatibility...',
      'Optimizing delivery schedules...',
      'Ready to assist with your shopping!'
    ]

    let taskIndex = 0
    const interval = setInterval(() => {
      if (taskIndex < tasks.length - 1) {
        setAiAgent(prev => ({ ...prev, currentTask: tasks[taskIndex] }))
        taskIndex++
      } else {
        setAiAgent(prev => ({ ...prev, currentTask: tasks[taskIndex] }))
        clearInterval(interval)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const filteredProducts = (productList) => {
    return productList.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }

  const getTotalPrice = () => {
    return shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const ProductCard = ({ product, showAiReason = false }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="wellness-card group"
    >
      {/* AI Score Badge */}
      {product.aiScore && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
          <Brain className="w-3 h-3" />
          <span>{product.aiScore}%</span>
        </div>
      )}

      <div className="relative">
        <div className="text-6xl mb-4 text-center">{product.image}</div>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-white/60 text-sm">{product.brand}</p>
          </div>

          {/* AI Reason */}
          {showAiReason && product.aiReason && (
            <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 font-semibold text-sm">AI Insight</span>
              </div>
              <p className="text-white/80 text-sm">{product.aiReason}</p>
            </div>
          )}

          {/* Benefits */}
          <div className="flex flex-wrap gap-1">
            {product.benefits?.slice(0, 3).map((benefit, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/10 rounded-full text-white/70 text-xs"
              >
                {benefit}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white font-semibold">{product.rating}</span>
            </div>
            <span className="text-white/60 text-sm">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">${product.price}</span>
            {product.originalPrice && (
              <span className="text-white/60 line-through">${product.originalPrice}</span>
            )}
          </div>

          {/* Delivery */}
          <div className="flex items-center space-x-2 text-green-400">
            <Truck className="w-4 h-4" />
            <span className="text-sm">{product.delivery}</span>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart({ ...product, quantity: 1 })}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              <Heart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderRecommendations = () => (
    <div className="space-y-8">
      {/* AI Agent Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="wellness-card"
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">AI Shopping Agent</h3>
            <p className="text-white/70">{aiAgent.currentTask}</p>
          </div>
          <div className="text-right">
            <div className="text-green-400 font-semibold">Active</div>
            <div className="text-white/60 text-sm">Personalized for you</div>
          </div>
        </div>
      </motion.div>

      {/* Recommendations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProducts(products.recommendations).map((product) => (
            <ProductCard key={product.id} product={product} showAiReason={true} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )

  const renderSupplements = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {filteredProducts([...products.recommendations.filter(p => p.category === 'supplements' || p.category === 'protein' || p.category === 'vitamins'), ...products.supplements]).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </div>
  )

  const renderGroceries = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {filteredProducts([...products.recommendations.filter(p => p.category === 'groceries'), ...products.groceries]).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </div>
  )

  const renderCart = () => (
    <div className="space-y-6">
      {shoppingCart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="wellness-card text-center py-12"
        >
          <ShoppingCart className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
          <p className="text-white/60 mb-6">Add some AI-recommended products to get started!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('recommendations')}
            className="btn-primary"
          >
            Browse Recommendations
          </motion.button>
        </motion.div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4">
            {shoppingCart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="wellness-card"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <p className="text-white/60">{item.brand}</p>
                    <p className="text-white font-semibold">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 bg-white/10 rounded text-white hover:bg-white/20"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 bg-white/10 rounded text-white hover:bg-white/20"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-400 hover:bg-red-400/20 rounded"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cart Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="wellness-card"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-white">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 btn-primary"
                >
                  Checkout
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearCart}
                  className="btn-secondary"
                >
                  Clear Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )

  const renderAutoOrders = () => (
    <div className="space-y-6">
      {/* Auto Order Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="wellness-card"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Bot className="w-8 h-8 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Autonomous Shopping</h2>
        </div>
        <p className="text-white/70 mb-4">
          Let AI automatically order your essentials based on your consumption patterns and wellness goals.
        </p>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div>
            <div className="font-semibold text-white">Auto-ordering enabled</div>
            <div className="text-white/60 text-sm">AI will order items when you're running low</div>
          </div>
          <div className="w-12 h-6 bg-green-500 rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
          </div>
        </div>
      </motion.div>

      {/* Active Auto Orders */}
      <div className="space-y-4">
        {autoOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="wellness-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{order.image}</div>
                <div>
                  <h3 className="text-lg font-bold text-white">{order.name}</h3>
                  <p className="text-white/60">Every {order.frequency.toLowerCase()}</p>
                  <p className="text-white font-semibold">${order.price}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-white">Next: {order.nextOrder}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {order.status === 'active' ? 'Active' : 'Paused'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="wellness-card"
      >
        <h3 className="text-xl font-bold text-white mb-4">AI Suggestions for Auto-ordering</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white">Organic Eggs</h4>
                <p className="text-white/70 text-sm">Based on your protein needs and consumption pattern</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add to Auto-order
              </motion.button>
            </div>
          </div>
          <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white">Probiotics</h4>
                <p className="text-white/70 text-sm">Supports digestive health based on your wellness profile</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Add to Auto-order
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'recommendations': return renderRecommendations()
      case 'supplements': return renderSupplements()
      case 'groceries': return renderGroceries()
      case 'cart': return renderCart()
      case 'auto-orders': return renderAutoOrders()
      default: return renderRecommendations()
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
            Smart Shopping
          </h1>
          <p className="text-xl text-white/70">
            AI-powered recommendations tailored to your wellness journey
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
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all relative ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Search and Filters */}
        {(activeTab === 'recommendations' || activeTab === 'supplements' || activeTab === 'groceries') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="wellness-card mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id} className="bg-gray-800">
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

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

export default ShoppingPage