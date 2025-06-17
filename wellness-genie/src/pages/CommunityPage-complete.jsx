import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Trophy, 
  Target, 
  Calendar, 
  MessageCircle, 
  Heart, 
  Share2, 
  Plus,
  Crown,
  Zap,
  Award,
  TrendingUp,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  Flame
} from 'lucide-react'

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('challenges')
  const [joinedChallenges, setJoinedChallenges] = useState([])

  const tabs = [
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'feed', label: 'Community Feed', icon: MessageCircle }
  ]

  const challenges = [
    {
      id: 1,
      title: '30-Day Hydration Challenge',
      description: 'Drink 8 glasses of water daily for 30 days',
      participants: 1247,
      duration: '30 days',
      difficulty: 'Beginner',
      reward: '500 WellnessCoins',
      category: 'Hydration',
      startDate: '2024-03-01',
      endDate: '2024-03-30',
      progress: 67,
      icon: '💧',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Morning Meditation Streak',
      description: 'Meditate for 10 minutes every morning',
      participants: 892,
      duration: '21 days',
      difficulty: 'Intermediate',
      reward: '750 WellnessCoins',
      category: 'Mindfulness',
      startDate: '2024-03-05',
      endDate: '2024-03-25',
      progress: 45,
      icon: '🧘',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: '10K Steps Daily',
      description: 'Walk 10,000 steps every day for 2 weeks',
      participants: 2156,
      duration: '14 days',
      difficulty: 'Intermediate',
      reward: '600 WellnessCoins',
      category: 'Fitness',
      startDate: '2024-03-10',
      endDate: '2024-03-23',
      progress: 0,
      icon: '👟',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Plant-Based Week',
      description: 'Eat only plant-based meals for 7 days',
      participants: 543,
      duration: '7 days',
      difficulty: 'Advanced',
      reward: '400 WellnessCoins',
      category: 'Nutrition',
      startDate: '2024-03-15',
      endDate: '2024-03-21',
      progress: 0,
      icon: '🌱',
      color: 'from-green-600 to-lime-500'
    }
  ]

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 12450, streak: 45, avatar: '👩‍💼', badge: 'Wellness Guru' },
    { rank: 2, name: 'Mike Rodriguez', points: 11890, streak: 38, avatar: '👨‍🏫', badge: 'Fitness Master' },
    { rank: 3, name: 'Emma Thompson', points: 11234, streak: 42, avatar: '👩‍🎨', badge: 'Mindful Warrior' },
    { rank: 4, name: 'David Kim', points: 10876, streak: 35, avatar: '👨‍💻', badge: 'Nutrition Expert' },
    { rank: 5, name: 'Lisa Wang', points: 10543, streak: 40, avatar: '👩‍🔬', badge: 'Sleep Champion' },
    { rank: 6, name: 'Alex Johnson', points: 9876, streak: 28, avatar: '👨‍🎨', badge: 'Hydration Hero' },
    { rank: 7, name: 'Maria Garcia', points: 9654, streak: 33, avatar: '👩‍⚕️', badge: 'Stress Buster' },
    { rank: 8, name: 'You', points: 8945, streak: 25, avatar: '🧬', badge: 'Rising Star' }
  ]

  const groups = [
    {
      id: 1,
      name: 'Early Birds Club',
      description: 'For those who love morning workouts',
      members: 234,
      category: 'Fitness',
      icon: '🌅',
      isJoined: true
    },
    {
      id: 2,
      name: 'Plant-Based Warriors',
      description: 'Sharing plant-based recipes and tips',
      members: 567,
      category: 'Nutrition',
      icon: '🥬',
      isJoined: false
    },
    {
      id: 3,
      name: 'Meditation Masters',
      description: 'Daily meditation practice and mindfulness',
      members: 432,
      category: 'Mindfulness',
      icon: '🧘‍♀️',
      isJoined: true
    },
    {
      id: 4,
      name: 'Sleep Optimizers',
      description: 'Tips for better sleep and recovery',
      members: 298,
      category: 'Recovery',
      icon: '😴',
      isJoined: false
    }
  ]

  const feedPosts = [
    {
      id: 1,
      user: { name: 'Sarah Chen', avatar: '👩‍💼', badge: 'Wellness Guru' },
      content: 'Just completed my 45th day of morning meditation! The mental clarity is incredible. Who else is on a meditation streak? 🧘‍♀️✨',
      timestamp: '2 hours ago',
      likes: 23,
      comments: 8,
      image: null,
      achievement: '45-Day Meditation Streak'
    },
    {
      id: 2,
      user: { name: 'Mike Rodriguez', avatar: '👨‍🏫', badge: 'Fitness Master' },
      content: 'Hit a new PR today! 💪 The consistency from the 10K steps challenge really paid off. Small steps lead to big gains!',
      timestamp: '4 hours ago',
      likes: 31,
      comments: 12,
      image: '🏃‍♂️',
      achievement: null
    },
    {
      id: 3,
      user: { name: 'Emma Thompson', avatar: '👩‍🎨', badge: 'Mindful Warrior' },
      content: 'Sharing my favorite green smoothie recipe! Spinach, banana, chia seeds, and almond milk. Perfect post-workout fuel 🥤💚',
      timestamp: '6 hours ago',
      likes: 18,
      comments: 15,
      image: '🥤',
      achievement: null
    }
  ]

  const joinChallenge = (challengeId) => {
    if (!joinedChallenges.includes(challengeId)) {
      setJoinedChallenges([...joinedChallenges, challengeId])
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400'
      case 'Intermediate': return 'text-yellow-400'
      case 'Advanced': return 'text-red-400'
      default: return 'text-white'
    }
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
          <h1 className="text-4xl font-bold text-white mb-2">Wellness Community 🌟</h1>
          <p className="text-xl text-white/70">Connect, compete, and grow together</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-white/10 backdrop-blur-lg rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{challenge.icon}</div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{challenge.title}</h3>
                          <p className="text-white/70 text-sm">{challenge.description}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)} bg-white/20`}>
                        {challenge.difficulty}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="text-cyan-400" size={16} />
                          <span className="text-white/70">{challenge.participants.toLocaleString()} joined</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="text-purple-400" size={16} />
                          <span className="text-white/70">{challenge.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="text-yellow-400" size={16} />
                          <span className="text-white/70">{challenge.reward}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="text-green-400" size={16} />
                          <span className="text-white/70">{challenge.category}</span>
                        </div>
                      </div>

                      {joinedChallenges.includes(challenge.id) && challenge.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-white/70">Progress</span>
                            <span className="text-cyan-400 font-medium">{challenge.progress}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${challenge.progress}%` }}
                              className={`h-2 rounded-full bg-gradient-to-r ${challenge.color}`}
                            />
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => joinChallenge(challenge.id)}
                        disabled={joinedChallenges.includes(challenge.id)}
                        className={`w-full py-3 rounded-lg font-medium transition-all ${
                          joinedChallenges.includes(challenge.id)
                            ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                            : `bg-gradient-to-r ${challenge.color} text-white hover:scale-105`
                        }`}
                      >
                        {joinedChallenges.includes(challenge.id) ? 'Joined ✓' : 'Join Challenge'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Crown className="mr-3 text-yellow-400" size={28} />
                Weekly Leaderboard
              </h2>

              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                      user.name === 'You' 
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30' 
                        : 'bg-white/10 hover:bg-white/15'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        user.rank === 1 ? 'bg-yellow-500 text-black' :
                        user.rank === 2 ? 'bg-gray-400 text-black' :
                        user.rank === 3 ? 'bg-orange-500 text-black' :
                        'bg-white/20 text-white'
                      }`}>
                        {user.rank <= 3 ? (
                          user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'
                        ) : (
                          user.rank
                        )}
                      </div>
                      
                      <div className="text-2xl">{user.avatar}</div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${user.name === 'You' ? 'text-cyan-400' : 'text-white'}`}>
                            {user.name}
                          </span>
                          <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                            {user.badge}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <span>{user.points.toLocaleString()} points</span>
                          <span className="flex items-center space-x-1">
                            <Flame className="text-orange-400" size={12} />
                            <span>{user.streak} day streak</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="text-white/50" size={20} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'groups' && (
            <motion.div
              key="groups"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {groups.map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{group.icon}</div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{group.name}</h3>
                        <p className="text-white/70 text-sm">{group.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-white/70">{group.members} members</span>
                      <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                        {group.category}
                      </span>
                    </div>

                    <button
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        group.isJoined
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600'
                      }`}
                    >
                      {group.isJoined ? 'Joined' : 'Join Group'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {feedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{post.user.avatar}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-white font-bold">{post.user.name}</span>
                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                          {post.user.badge}
                        </span>
                        <span className="text-white/50 text-sm">{post.timestamp}</span>
                      </div>

                      {post.achievement && (
                        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-lg p-3 mb-3">
                          <div className="flex items-center space-x-2">
                            <Trophy className="text-yellow-400" size={16} />
                            <span className="text-yellow-400 font-medium text-sm">Achievement Unlocked!</span>
                          </div>
                          <p className="text-white/80 text-sm mt-1">{post.achievement}</p>
                        </div>
                      )}

                      <p className="text-white/80 mb-4">{post.content}</p>

                      {post.image && (
                        <div className="text-4xl mb-4">{post.image}</div>
                      )}

                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-white/70 hover:text-pink-400 transition-colors">
                          <Heart size={18} />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors">
                          <MessageCircle size={18} />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-white/70 hover:text-green-400 transition-colors">
                          <Share2 size={18} />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CommunityPage