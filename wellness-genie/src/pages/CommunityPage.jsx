import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Trophy, 
  Star,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  ThumbsUp,
  MessageSquare,
  UserPlus,
  Zap,
  Target,
  Award
} from 'lucide-react'

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('feed')
  const [selectedChallenge, setSelectedChallenge] = useState(null)

  const tabs = [
    { id: 'feed', label: 'Community Feed', icon: MessageCircle },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'leaderboard', label: 'Leaderboard', icon: Star },
    { id: 'groups', label: 'Groups', icon: Users }
  ]

  const posts = [
    {
      id: 1,
      user: {
        name: 'Sarah Chen',
        avatar: '👩‍💻',
        level: 'Wellness Warrior',
        university: 'Stanford University'
      },
      content: 'Just completed my 30-day meditation challenge! 🧘‍♀️ The AI recommendations really helped me find the perfect time slots. Feeling more focused than ever!',
      image: '🧘‍♀️',
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: '2 hours ago',
      tags: ['meditation', 'mindfulness', 'challenge']
    },
    {
      id: 2,
      user: {
        name: 'Marcus Johnson',
        avatar: '👨‍⚕️',
        level: 'Fitness Enthusiast',
        university: 'Harvard Medical'
      },
      content: 'My AI shopping agent just ordered the perfect post-workout supplements based on my training data. Love how it learns my preferences! 💪',
      image: '💊',
      likes: 18,
      comments: 5,
      shares: 7,
      timestamp: '4 hours ago',
      tags: ['supplements', 'AI', 'fitness']
    },
    {
      id: 3,
      user: {
        name: 'Emma Rodriguez',
        avatar: '👩‍🔬',
        level: 'Nutrition Expert',
        university: 'MIT'
      },
      content: 'Sharing my weekly meal prep inspired by WellnessGenie\'s recommendations. The macro balance is perfect for my goals! 🥗',
      image: '🥗',
      likes: 31,
      comments: 12,
      shares: 15,
      timestamp: '6 hours ago',
      tags: ['nutrition', 'meal-prep', 'healthy-eating']
    }
  ]

  const challenges = [
    {
      id: 1,
      title: '7-Day Hydration Challenge',
      description: 'Drink 8 glasses of water daily for a week',
      participants: 1247,
      duration: '7 days',
      reward: '💧 Hydration Hero Badge',
      difficulty: 'Beginner',
      startDate: '2024-06-15',
      category: 'wellness',
      progress: 65
    },
    {
      id: 2,
      title: 'Morning Meditation Marathon',
      description: '10 minutes of meditation every morning for 21 days',
      participants: 892,
      duration: '21 days',
      reward: '🧘 Zen Master Badge',
      difficulty: 'Intermediate',
      startDate: '2024-06-10',
      category: 'mindfulness',
      progress: 45
    },
    {
      id: 3,
      title: 'Plant-Based Power Week',
      description: 'Eat only plant-based meals for 7 days',
      participants: 634,
      duration: '7 days',
      reward: '🌱 Green Warrior Badge',
      difficulty: 'Advanced',
      startDate: '2024-06-20',
      category: 'nutrition',
      progress: 0
    },
    {
      id: 4,
      title: 'Step Count Showdown',
      description: 'Walk 10,000 steps daily for 14 days',
      participants: 2156,
      duration: '14 days',
      reward: '👟 Step Master Badge',
      difficulty: 'Intermediate',
      startDate: '2024-06-12',
      category: 'fitness',
      progress: 78
    }
  ]

  const leaderboard = [
    {
      rank: 1,
      user: {
        name: 'Alex Thompson',
        avatar: '👨‍💼',
        university: 'UC Berkeley'
      },
      score: 2847,
      streak: 45,
      badges: 12
    },
    {
      rank: 2,
      user: {
        name: 'Priya Patel',
        avatar: '👩‍🎓',
        university: 'Stanford'
      },
      score: 2634,
      streak: 38,
      badges: 10
    },
    {
      rank: 3,
      user: {
        name: 'Jordan Kim',
        avatar: '👨‍🎓',
        university: 'MIT'
      },
      score: 2521,
      streak: 42,
      badges: 11
    },
    {
      rank: 4,
      user: {
        name: 'Maya Singh',
        avatar: '👩‍💻',
        university: 'Harvard'
      },
      score: 2398,
      streak: 35,
      badges: 9
    },
    {
      rank: 5,
      user: {
        name: 'You',
        avatar: '🌟',
        university: 'Your University'
      },
      score: 2156,
      streak: 28,
      badges: 8
    }
  ]

  const groups = [
    {
      id: 1,
      name: 'Stanford Wellness Warriors',
      members: 234,
      description: 'Stanford students supporting each other\'s wellness journeys',
      category: 'University',
      image: '🏫',
      isJoined: true
    },
    {
      id: 2,
      name: 'Pre-Med Fitness Club',
      members: 156,
      description: 'Future doctors staying fit and healthy',
      category: 'Academic',
      image: '⚕️',
      isJoined: false
    },
    {
      id: 3,
      name: 'Plant-Based Students',
      members: 89,
      description: 'Sharing vegan recipes and nutrition tips',
      category: 'Nutrition',
      image: '🌱',
      isJoined: true
    },
    {
      id: 4,
      name: 'Mindful Engineers',
      members: 312,
      description: 'Tech students practicing mindfulness and stress management',
      category: 'Mindfulness',
      image: '🧘‍♂️',
      isJoined: false
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20'
      case 'Advanced': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const renderFeed = () => (
    <div className="space-y-6">
      {/* Create Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="wellness-card"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-2xl">
            🌟
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Share your wellness journey..."
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Posts */}
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="wellness-card"
        >
          {/* Post Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-3xl">{post.user.avatar}</div>
            <div className="flex-1">
              <h3 className="font-bold text-white">{post.user.name}</h3>
              <p className="text-white/60 text-sm">{post.user.level} • {post.user.university}</p>
            </div>
            <div className="text-white/60 text-sm">{post.timestamp}</div>
          </div>

          {/* Post Content */}
          <p className="text-white/80 mb-4">{post.content}</p>

          {/* Post Image */}
          <div className="text-6xl text-center mb-4 p-8 bg-white/5 rounded-lg">
            {post.image}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-white/70 hover:text-red-400 transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{post.comments}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-white/70 hover:text-green-400 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>{post.shares}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderChallenges = () => (
    <div className="space-y-6">
      {/* Challenge Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-2"
      >
        {['All', 'Fitness', 'Nutrition', 'Wellness', 'Mindfulness'].map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-white/10 text-white/70 rounded-lg hover:bg-white/20 transition-colors"
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Challenges Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="wellness-card cursor-pointer"
            onClick={() => setSelectedChallenge(challenge)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </div>
              <div className="text-white/60 text-sm">{challenge.duration}</div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
            <p className="text-white/70 mb-4">{challenge.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Progress</span>
                <span className="text-white">{challenge.progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${challenge.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-white/60" />
                <span className="text-white/60 text-sm">{challenge.participants} participants</span>
              </div>
              <div className="text-2xl">{challenge.reward.split(' ')[0]}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderLeaderboard = () => (
    <div className="space-y-6">
      {/* Leaderboard Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="wellness-card text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Weekly Leaderboard</h2>
        <p className="text-white/70">Compete with students worldwide and climb the ranks!</p>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="wellness-card"
      >
        <div className="flex items-end justify-center space-x-8 mb-8">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="w-20 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-t-lg flex items-center justify-center mb-2">
              <span className="text-3xl">{leaderboard[1].user.avatar}</span>
            </div>
            <div className="text-white font-bold">{leaderboard[1].user.name}</div>
            <div className="text-white/60 text-sm">{leaderboard[1].score} pts</div>
            <div className="text-2xl mt-2">🥈</div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="w-24 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-t-lg flex items-center justify-center mb-2">
              <span className="text-4xl">{leaderboard[0].user.avatar}</span>
            </div>
            <div className="text-white font-bold">{leaderboard[0].user.name}</div>
            <div className="text-white/60 text-sm">{leaderboard[0].score} pts</div>
            <div className="text-3xl mt-2">🏆</div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="w-20 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-t-lg flex items-center justify-center mb-2">
              <span className="text-3xl">{leaderboard[2].user.avatar}</span>
            </div>
            <div className="text-white font-bold">{leaderboard[2].user.name}</div>
            <div className="text-white/60 text-sm">{leaderboard[2].score} pts</div>
            <div className="text-2xl mt-2">🥉</div>
          </div>
        </div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="wellness-card"
      >
        <div className="space-y-4">
          {leaderboard.map((entry, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 rounded-lg ${
                entry.user.name === 'You' 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30' 
                  : 'bg-white/5'
              }`}
            >
              <div className="text-2xl font-bold text-white w-8">#{entry.rank}</div>
              <div className="text-3xl">{entry.user.avatar}</div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{entry.user.name}</h3>
                <p className="text-white/60 text-sm">{entry.user.university}</p>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{entry.score} pts</div>
                <div className="text-white/60 text-sm">{entry.streak} day streak</div>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-white">{entry.badges}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const renderGroups = () => (
    <div className="space-y-6">
      {/* Search Groups */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="wellness-card"
      >
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search groups..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Group</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Groups Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {groups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="wellness-card"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">{group.image}</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{group.name}</h3>
                <p className="text-white/60 text-sm">{group.category}</p>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">{group.members}</div>
                <div className="text-white/60 text-sm">members</div>
              </div>
            </div>

            <p className="text-white/70 mb-4">{group.description}</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                group.isJoined
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'btn-primary'
              }`}
            >
              {group.isJoined ? (
                <div className="flex items-center justify-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Joined</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <UserPlus className="w-5 h-5" />
                  <span>Join Group</span>
                </div>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'feed': return renderFeed()
      case 'challenges': return renderChallenges()
      case 'leaderboard': return renderLeaderboard()
      case 'groups': return renderGroups()
      default: return renderFeed()
    }
  }

  return (
    <div className="min-h-screen p-6 pb-24 md:pb-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Wellness Community
          </h1>
          <p className="text-xl text-white/70">
            Connect, compete, and grow with fellow wellness enthusiasts
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
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

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

export default CommunityPage