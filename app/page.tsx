'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-adhd-cream via-adhd-sage to-adhd-lavender">
      {/* Navigation */}
      <nav className="p-4 bg-white/80 backdrop-blur-sm w-full flex justify-between items-center z-10">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-800">Focus Buddy</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="px-4 py-2 text-xl font-medium text-gray-700 transition-colors duration-300 rounded-lg hover:text-black">
            Home
          </Link>
          <Link href="/timer" className="px-4 py-2 text-xl font-medium text-gray-700 transition-colors duration-300 rounded-lg hover:text-black">
            Timer
          </Link>
          <Link href="/tasks" className="px-4 py-2 text-xl font-medium text-gray-700 transition-colors duration-300 rounded-lg hover:text-black">
            Tasks
          </Link>
          <Link href="/gallery" className="px-4 py-2 text-xl font-medium text-gray-700 transition-colors duration-300 rounded-lg hover:text-black">
            Fridge
          </Link>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-48 h-48 sm:w-64 sm:h-64 mb-8 mx-auto overflow-hidden rounded-full"
        >
          <Image 
            src="/assets/pastel-blob-magnet.png" 
            alt="Blob Character" 
            width={256}
            height={256}
            className="w-full h-full object-cover transform scale-125 blob-animation"
          />
        </motion.div>
        
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-6xl font-bold mb-4 text-gray-800 text-shadow"
        >
          Start your focus session.
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto"
        >
          Focus for 25 minutes to unlock a new part of your coloring page. 
          Designed specifically for ADHD minds.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link 
            href="/timer" 
            className="btn-primary text-lg px-10 py-4 inline-block"
          >
            Start Focus Session
          </Link>
        </motion.div>
        
        {/* Feature highlights */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-pastel-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Focus Timer</h3>
            <p className="text-gray-600">25/5 Pomodoro technique for optimal focus</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 11H1l8-8v8z"></path>
                <path d="M23 13h-8v8l8-8z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Task Management</h3>
            <p className="text-gray-600">Simple, distraction-free task organization</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-pastel-pink rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Visual Rewards</h3>
            <p className="text-gray-600">Coloring pages and achievements to celebrate progress</p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
