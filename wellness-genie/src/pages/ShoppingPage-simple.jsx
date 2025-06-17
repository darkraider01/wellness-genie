import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus, Minus, Star, Truck, Shield, Zap } from 'lucide-react'

const ShoppingPage = () => {
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('supplements')

  const categories = [
    { id: 'supplements', label: 'Supplements', emoji: '💊' },
    { id: 'foods', label: 'Healthy Foods', emoji: '🥗' },
    { id: 'equipment', label: 'Fitness Gear', emoji: '🏋️' },
    { id: 'wellness', label: 'Wellness Items', emoji: '🧘' }
  ]

  const products = {
    supplements: [
      {
        id: 1,
        name: 'Omega-3 Fish Oil',
        price: 24.99,
        rating: 4.8,
        reviews: 1250,
        image: '🐟',
        description: 'High-quality fish oil for heart and brain health',
        benefits: ['Heart Health', 'Brain Function', 'Anti-inflammatory']
      },
      {
        id: 2,
        name: 'Vitamin D3',
        price: 18.99,
        rating: 4.9,
        reviews: 890,
        image: '☀️',
        description: 'Essential vitamin for bone health and immunity',
        benefits: ['Bone Health', 'Immune Support', 'Mood Support']
      },
      {
        id: 3,
        name: 'Protein Powder',
        price: 39.99,
        rating: 4.7,
        reviews: 2100,
        image: '💪',
        description: 'Premium whey protein for muscle building',
        benefits: ['Muscle Growth', 'Recovery', 'Weight Management']
      }
    ],
    foods: [
      {
        id: 4,
        name: 'Organic Quinoa',
        price: 12.99,
        rating: 4.6,
        reviews: 450,
        image: '🌾',
        description: 'Complete protein grain, gluten-free',
        benefits: ['Complete Protein', 'Fiber Rich', 'Gluten-Free']
      },
      {
        id: 5,
        name: 'Almond Butter',
        price: 16.99,
        rating: 4.8,
        reviews: 780,
        image: '🥜',
        description: 'Raw, organic almond butter',
        benefits: ['Healthy Fats', 'Protein', 'Vitamin E']
      }
    ],
    equipment: [
      {
        id: 6,
        name: 'Yoga Mat',
        price: 29.99,
        rating: 4.7,
        reviews: 1100,
        image: '🧘',
        description: 'Non-slip, eco-friendly yoga mat',
        benefits: ['Non-Slip', 'Eco-Friendly', 'Durable']
      }
    ],
    wellness: [
      {
        id: 7,
        name: 'Essential Oil Diffuser',
        price: 34.99,
        rating: 4.5,
        reviews: 650,
        image: '🌸',
        description: 'Ultrasonic aromatherapy diffuser',
        benefits: ['Aromatherapy', 'Stress Relief', 'Better Sleep']
      }
    ]
  }

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
    setCart(prev => {
      const existing = prev.find(item => item.id === productId)
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
      return prev.filter(item => item.id !== productId)
    })
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Smart Shopping 🛒</h1>
          <p className="text-xl text-white/70">
            AI-curated products tailored to your wellness goals
          </p>
        </motion.div>

        {/* AI Recommendation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="text-yellow-400" size={24} />
            <h3 className="text-xl font-bold text-white">AI Recommendations for You</h3>
          </div>
          <p className="text-white/80">
            Based on your wellness DNA (Fat Burner + Energy Booster), we've selected products 
            that support weight loss and energy enhancement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{category.emoji}</span>
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Cart Summary */}
              {cart.length > 0 && (
                <div className="mt-8 p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">Cart</h4>
                    <div className="flex items-center space-x-1">
                      <ShoppingCart size={16} className="text-cyan-400" />
                      <span className="text-cyan-400 font-bold">{getCartItemCount()}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white">${getCartTotal()}</div>
                  <button className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all">
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products[selectedCategory]?.map((product) => {
                const cartItem = cart.find(item => item.id === product.id)
                const quantity = cartItem ? cartItem.quantity : 0

                return (
                  <div
                    key={product.id}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all"
                  >
                    {/* Product Image */}
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">{product.image}</div>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="text-white font-medium">{product.rating}</span>
                        <span className="text-white/60 text-sm">({product.reviews})</span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <h4 className="text-lg font-bold text-white mb-2">{product.name}</h4>
                    <p className="text-white/70 text-sm mb-3">{product.description}</p>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/20 rounded-full text-xs text-white"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">${product.price}</div>
                      
                      {quantity === 0 ? (
                        <button
                          onClick={() => addToCart(product)}
                          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all"
                        >
                          <Plus size={16} />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white font-bold w-8 text-center">{quantity}</span>
                          <button
                            onClick={() => addToCart(product)}
                            className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl">
            <Truck className="text-green-400 mx-auto mb-3" size={32} />
            <h4 className="text-white font-semibold mb-2">Free Shipping</h4>
            <p className="text-white/70 text-sm">Free delivery on orders over $50</p>
          </div>
          
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl">
            <Shield className="text-blue-400 mx-auto mb-3" size={32} />
            <h4 className="text-white font-semibold mb-2">Quality Guaranteed</h4>
            <p className="text-white/70 text-sm">All products are lab-tested and certified</p>
          </div>
          
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl">
            <Zap className="text-yellow-400 mx-auto mb-3" size={32} />
            <h4 className="text-white font-semibold mb-2">AI-Powered</h4>
            <p className="text-white/70 text-sm">Personalized recommendations based on your goals</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ShoppingPage