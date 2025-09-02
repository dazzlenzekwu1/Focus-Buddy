'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, RefreshCw, Crown, Lock } from 'lucide-react'
import { hasPremiumAccess } from '@/lib/paystack'
import Link from 'next/link'

const motivationalTips = [
  "Break big tasks into smaller, manageable pieces. You've got this!",
  "Remember: progress, not perfection. Every minute of focus counts.",
  "Your brain is like a muscle - the more you exercise focus, the stronger it gets.",
  "Take it one moment at a time. You don't have to focus for hours, just right now.",
  "ADHD brains are creative powerhouses. Use that energy to your advantage!",
  "It's okay to take breaks. Your brain needs rest to process and recharge.",
  "You're not lazy, you're differently wired. Work with your brain, not against it.",
  "Small wins add up to big achievements. Celebrate every focused minute!",
  "Your attention is a superpower. Channel it wisely and watch the magic happen.",
  "Remember why you started. Your goals are worth the effort.",
  "Focus is a skill that gets better with practice. You're doing great!",
  "Every distraction overcome is a victory. Keep going!",
  "Your unique brain wiring is your strength, not your weakness.",
  "Progress happens in small steps. Trust the process.",
  "You're building focus muscles one session at a time.",
]

// Premium AI-generated tips (these would come from Hugging Face API)
const premiumTips = [
  "Your ADHD brain is like a Ferrari engine with bicycle brakes. Learn to use that power wisely!",
  "When your mind wanders, it's not a bug—it's a feature. Channel that creativity into your work.",
  "The best focus strategy? Work with your brain's natural rhythm, not against it.",
  "Your hyperfocus is a superpower. Use it strategically on tasks that matter most.",
  "Remember: ADHD brains process information differently, not incorrectly. You're not broken, you're brilliant.",
  "Your ability to think outside the box is your competitive advantage. Embrace it!",
  "When overwhelmed, ask yourself: 'What's the smallest step I can take right now?'",
  "Your brain is like a search engine with 100 tabs open. Learn to bookmark what's important.",
  "The key to ADHD productivity? Make it fun, make it urgent, or make it social.",
  "Your mind is like a garden—some plants grow quickly, others need time. Be patient with yourself.",
]

export default function MotivationalTip() {
  const [currentTip, setCurrentTip] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPremium, setIsPremium] = useState(false)
  const [tipSource, setTipSource] = useState<'basic' | 'premium'>('basic')
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    setIsPremium(hasPremiumAccess())
  }, [])

  useEffect(() => {
    setTipSource(isPremium ? 'premium' : 'basic')
  }, [isPremium])

  const nextTip = () => {
    setIsVisible(false)
    setTimeout(() => {
      const tips = tipSource === 'premium' ? premiumTips : motivationalTips
      setCurrentTip((prev) => (prev + 1) % tips.length)
      setIsVisible(true)
    }, 300)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTip()
    }, 15000) // Change tip every 15 seconds

    return () => clearInterval(interval)
  }, [tipSource])

  const tips = tipSource === 'premium' ? premiumTips : motivationalTips

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-gradient-to-r from-pastel-blue to-pastel-purple text-gray-800"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="relative">
            <Lightbulb className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
            {isPremium && (
              <Crown className="absolute -top-2 -right-2 w-4 h-4 text-yellow-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-bold">Motivational Tip</h3>
              {hasMounted && isPremium ? (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  Premium AI
                </span>
              ) : (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                  Basic
                </span>
              )}
            </div>
            
            <motion.p
              key={currentTip}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ duration: 0.3 }}
              className="text-gray-700 leading-relaxed mb-3"
            >
              {tips[currentTip]}
            </motion.p>

            {hasMounted && !isPremium && (
              <div className="bg-white/50 rounded-lg p-3 border border-yellow-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Lock className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    Unlock Premium AI Tips
                  </span>
                </div>
                <p className="text-xs text-yellow-700 mb-2">
                  Get personalized, AI-generated motivational tips designed specifically for ADHD minds.
                </p>
                <Link 
                  href="/subscription" 
                  className="inline-flex items-center space-x-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
                >
                  <Crown className="w-3 h-3" />
                  <span>Upgrade Now</span>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={nextTip}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors flex-shrink-0"
          title="Next tip"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  )
}
