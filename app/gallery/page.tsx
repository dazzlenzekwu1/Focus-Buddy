'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Download, Star, Heart } from 'lucide-react'
import Navigation from '@/components/Navigation'

interface ColoringPage {
  id: string
  title: string
  imageUrl: string
  completedAt: string
  difficulty: 'easy' | 'medium' | 'hard'
  isFavorite: boolean
}

export default function GalleryPage() {
  const [coloringPages, setColoringPages] = useState<ColoringPage[]>([
    {
      id: '1',
      title: 'Desk Scene',
      imageUrl: '/assets/blob-desk-finished.jpg',
      completedAt: '2024-01-15',
      difficulty: 'medium',
      isFavorite: true,
    },
    {
      id: '2',
      title: 'Desk Outline',
      imageUrl: '/assets/blob-desk-outline.jpg',
      completedAt: '2024-01-10',
      difficulty: 'easy',
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Desk Light',
      imageUrl: '/assets/blob-desk-light.jpg',
      completedAt: '2024-01-05',
      difficulty: 'hard',
      isFavorite: true,
    },
  ])
  const [selectedPage, setSelectedPage] = useState<ColoringPage | null>(null)
  const [filter, setFilter] = useState<'all' | 'favorites' | 'recent'>('all')

  const toggleFavorite = (id: string) => {
    setColoringPages(prev => prev.map(page => 
      page.id === id ? { ...page, isFavorite: !page.isFavorite } : page
    ))
  }

  const filteredPages = coloringPages.filter(page => {
    if (filter === 'favorites') return page.isFavorite
    if (filter === 'recent') return new Date(page.completedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return true
  })

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  }

  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-adhd-cream via-adhd-sage to-adhd-lavender pt-24">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Fridge Gallery</h1>
            <p className="text-lg text-gray-600">
              Display your completed coloring pages like magnets on a fridge
            </p>
          </div>

          {/* Fridge Background */}
          <div className="relative mb-8">
            <div className="bg-gradient-to-b from-blue-200 to-blue-300 rounded-3xl p-8 shadow-2xl border-4 border-blue-400">
              {/* Fridge Handle */}
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-24 bg-gray-600 rounded-full shadow-lg"></div>
              
              {/* Fridge Door */}
              <div className="bg-gradient-to-b from-blue-100 to-blue-200 rounded-2xl p-6 min-h-[600px] relative">
                {/* Filter Tabs */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-md">
                    {(['all', 'favorites', 'recent'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          filter === tab
                            ? 'bg-primary-500 text-white'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coloring Pages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredPages.map((page, index) => (
                      <motion.div
                        key={page.id}
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedPage(page)}
                      >
                        {/* Magnet Effect */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full shadow-lg z-10"></div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full shadow-lg z-10"></div>
                        
                        {/* Page Card */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-rotate-1">
                          <div className="relative">
                            <img
                              src={page.imageUrl}
                              alt={page.title}
                              className="w-full h-48 object-cover"
                            />
                            
                            {/* Difficulty Badge */}
                            <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[page.difficulty]}`}>
                              {difficultyLabels[page.difficulty]}
                            </div>
                            
                            {/* Favorite Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(page.id)
                              }}
                              className="absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                            >
                              <Heart 
                                className={`w-4 h-4 ${page.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                              />
                            </button>
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-bold text-gray-800 mb-2">{page.title}</h3>
                            <p className="text-sm text-gray-600">
                              Completed: {new Date(page.completedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredPages.length === 0 && (
                  <div className="text-center py-16 text-gray-500">
                    <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">No coloring pages found.</p>
                    <p className="text-sm">Complete focus sessions to unlock new pages!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="card text-center">
            <h3 className="text-xl font-bold mb-4">Add Your Own Coloring Page</h3>
            <p className="text-gray-600 mb-6">
              Upload your completed coloring pages to add them to your fridge gallery
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn-primary flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload Page</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Template</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal for viewing pages */}
      <AnimatePresence>
        {selectedPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">{selectedPage.title}</h3>
                <img
                  src={selectedPage.imageUrl}
                  alt={selectedPage.title}
                  className="w-full rounded-lg shadow-lg mb-4"
                />
                <div className="flex justify-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[selectedPage.difficulty]}`}>
                    {difficultyLabels[selectedPage.difficulty]}
                  </span>
                  <span className="text-gray-600">
                    Completed: {new Date(selectedPage.completedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
