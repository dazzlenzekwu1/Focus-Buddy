'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import Navigation from '@/components/Navigation'
import FocusTimer from '@/components/FocusTimer'
import MotivationalTip from '@/components/MotivationalTip'
import ProgressCircle from '@/components/ProgressCircle'

export default function TimerPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(25 * 60) // 25 minutes
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus')
  const [completedSessions, setCompletedSessions] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  const focusTime = 25 * 60
  const breakTime = 5 * 60

  const startTimer = useCallback(() => {
    setIsRunning(true)
    setIsPaused(false)
  }, [])

  const pauseTimer = useCallback(() => {
    setIsPaused(true)
  }, [])

  const resumeTimer = useCallback(() => {
    setIsPaused(false)
  }, [])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setIsPaused(false)
    setTimeRemaining(focusTime)
    setSessionType('focus')
  }, [focusTime])

  const completeSession = useCallback(() => {
    if (sessionType === 'focus') {
      setCompletedSessions(prev => prev + 1)
      setSessionType('break')
      setTimeRemaining(breakTime)
      setIsRunning(false)
      setIsPaused(false)
    } else {
      setSessionType('focus')
      setTimeRemaining(focusTime)
      setIsRunning(false)
      setIsPaused(false)
    }
  }, [sessionType, focusTime, breakTime])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            completeSession()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, isPaused, timeRemaining, completeSession])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = sessionType === 'focus' 
    ? ((focusTime - timeRemaining) / focusTime) * 100
    : ((breakTime - timeRemaining) / breakTime) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-adhd-cream via-adhd-sage to-adhd-lavender pt-24">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {sessionType === 'focus' ? 'Focus Time' : 'Break Time'}
            </h1>
            <p className="text-lg text-gray-600">
              {sessionType === 'focus' 
                ? 'Stay focused on your task' 
                : 'Take a well-deserved break'
              }
            </p>
          </div>

          {/* Timer Display */}
          <div className="card text-center mb-8">
            <div className="relative mb-8">
              <ProgressCircle 
                progress={progress} 
                size={300}
                strokeWidth={8}
                color={sessionType === 'focus' ? '#0ea5e9' : '#10b981'}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-gray-800 mb-2">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-lg text-gray-600">
                  {sessionType === 'focus' ? 'Focus Session' : 'Break Time'}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4 mb-6">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Start</span>
                </button>
              ) : isPaused ? (
                <button
                  onClick={resumeTimer}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Resume</span>
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </button>
              )}
              
              <button
                onClick={resetTimer}
                className="btn-secondary flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Session Counter */}
            <div className="text-center">
              <p className="text-gray-600">
                Completed Focus Sessions: <span className="font-bold text-primary-600">{completedSessions}</span>
              </p>
            </div>
          </div>

          {/* Motivational Tip */}
          <div className="mb-8">
            <MotivationalTip />
          </div>

          {/* Coloring Page Preview */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-center">Your Progress</h3>
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src="/assets/blob-desk-light.jpg" 
                alt="Coloring Page Progress" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-gray-600 mt-4">
              Complete focus sessions to unlock more of your coloring page!
            </p>
          </div>

          {/* Sound Controls */}
          <div className="fixed bottom-4 right-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-gray-600" />
              ) : (
                <Volume2 className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
