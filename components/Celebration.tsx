'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trophy, PartyPopper, Sparkles } from 'lucide-react'
import Confetti from 'react-confetti'

interface CelebrationProps {
  isVisible: boolean
  onClose: () => void
  type: 'focus-session' | 'task-completed' | 'milestone'
  message?: string
}

export default function Celebration({ isVisible, onClose, type, message }: CelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true)
      // Hide confetti after 5 seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      // Auto-close celebration after 8 seconds
      const closeTimer = setTimeout(onClose, 8000)
      
      return () => {
        clearTimeout(timer)
        clearTimeout(closeTimer)
      }
    }
  }, [isVisible, onClose])

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getCelebrationContent = () => {
    switch (type) {
      case 'focus-session':
        return {
          icon: Trophy,
          title: 'Focus Session Complete!',
          subtitle: 'Great job staying focused!',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
        }
      case 'task-completed':
        return {
          icon: Star,
          title: 'Task Completed!',
          subtitle: 'Another item checked off!',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
        }
      case 'milestone':
        return {
          icon: PartyPopper,
          title: 'Milestone Reached!',
          subtitle: 'You\'re making amazing progress!',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
        }
      default:
        return {
          icon: Sparkles,
          title: 'Congratulations!',
          subtitle: 'You did it!',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
        }
    }
  }

  const content = getCelebrationContent()
  const Icon = content.icon

  if (!isVisible) return null

  return (
    <>
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      {/* Celebration Modal */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Icons */}
              <div className="relative mb-6">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -left-4 text-2xl text-yellow-400"
                >
                  ✨
                </motion.div>
                
                <motion.div
                  animate={{ 
                    rotate: [0, -15, 15, 0],
                    y: [0, -15, 0]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute -top-2 -right-4 text-xl text-pink-400"
                >
                  🎉
                </motion.div>

                {/* Main Icon */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`w-24 h-24 ${content.bgColor} rounded-full flex items-center justify-center mx-auto`}
                >
                  <Icon className={`w-12 h-12 ${content.color}`} />
                </motion.div>
              </div>

              {/* Title and Message */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-gray-800 mb-2"
              >
                {content.title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 mb-4"
              >
                {content.subtitle}
              </motion.p>

              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-700 mb-6 p-3 bg-gray-50 rounded-lg"
                >
                  {message}
                </motion.p>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center space-x-4"
              >
                <button
                  onClick={onClose}
                  className="btn-primary"
                >
                  Continue
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
