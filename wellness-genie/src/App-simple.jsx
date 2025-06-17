import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          WellnessGenie
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Your AI-Powered Wellness Companion
        </p>
        <div className="text-8xl mb-8">✨</div>
        <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default App