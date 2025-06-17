import React, { createContext, useContext, useState } from 'react'

const WellnessContext = createContext()

export const useWellness = () => {
  const context = useContext(WellnessContext)
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider')
  }
  return context
}

export const WellnessProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [wellnessPlan, setWellnessPlan] = useState(null)
  const [shoppingCart, setShoppingCart] = useState([])

  const value = {
    user,
    setUser,
    wellnessPlan,
    setWellnessPlan,
    shoppingCart,
    setShoppingCart,
    addToCart: (item) => setShoppingCart(prev => [...prev, item]),
    removeFromCart: (id) => setShoppingCart(prev => prev.filter(item => item.id !== id))
  }

  return (
    <WellnessContext.Provider value={value}>
      {children}
    </WellnessContext.Provider>
  )
}