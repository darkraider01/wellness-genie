import React, { createContext, useContext, useReducer, useEffect } from 'react'

const WellnessContext = createContext()

const initialState = {
  user: null,
  wellnessProfile: null,
  currentPlan: null,
  progress: {
    dailyGoals: [],
    weeklyStats: {},
    achievements: []
  },
  shoppingCart: [],
  notifications: [],
  preferences: {
    theme: 'dark',
    notifications: true,
    voiceEnabled: false
  }
}

function wellnessReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_WELLNESS_PROFILE':
      return { ...state, wellnessProfile: action.payload }
    case 'SET_CURRENT_PLAN':
      return { ...state, currentPlan: action.payload }
    case 'UPDATE_PROGRESS':
      return { 
        ...state, 
        progress: { ...state.progress, ...action.payload }
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload]
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(item => item.id !== action.payload)
      }
    case 'CLEAR_CART':
      return { ...state, shoppingCart: [] }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      }
    default:
      return state
  }
}

export function WellnessProvider({ children }) {
  const [state, dispatch] = useReducer(wellnessReducer, initialState)

  useEffect(() => {
    // Load data from localStorage on mount
    const savedState = localStorage.getItem('wellnessState')
    if (savedState) {
      const parsedState = JSON.parse(savedState)
      Object.keys(parsedState).forEach(key => {
        if (key === 'user') {
          dispatch({ type: 'SET_USER', payload: parsedState[key] })
        } else if (key === 'wellnessProfile') {
          dispatch({ type: 'SET_WELLNESS_PROFILE', payload: parsedState[key] })
        } else if (key === 'currentPlan') {
          dispatch({ type: 'SET_CURRENT_PLAN', payload: parsedState[key] })
        }
      })
    }
  }, [])

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem('wellnessState', JSON.stringify(state))
  }, [state])

  const value = {
    ...state,
    dispatch,
    // Helper functions
    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
    setWellnessProfile: (profile) => dispatch({ type: 'SET_WELLNESS_PROFILE', payload: profile }),
    setCurrentPlan: (plan) => dispatch({ type: 'SET_CURRENT_PLAN', payload: plan }),
    updateProgress: (progress) => dispatch({ type: 'UPDATE_PROGRESS', payload: progress }),
    addToCart: (item) => dispatch({ type: 'ADD_TO_CART', payload: item }),
    removeFromCart: (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    addNotification: (notification) => dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
    removeNotification: (id) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),
    updatePreferences: (prefs) => dispatch({ type: 'UPDATE_PREFERENCES', payload: prefs })
  }

  return (
    <WellnessContext.Provider value={value}>
      {children}
    </WellnessContext.Provider>
  )
}

export function useWellness() {
  const context = useContext(WellnessContext)
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider')
  }
  return context
}