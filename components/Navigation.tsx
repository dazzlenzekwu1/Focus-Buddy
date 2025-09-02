'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Clock, CheckSquare, Image as ImageIcon, Crown } from 'lucide-react'
import { hasPremiumAccess } from '@/lib/paystack'

export default function Navigation() {
  const pathname = usePathname()
  const [isPremium, setIsPremium] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    setIsPremium(hasPremiumAccess())
  }, [])

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/timer', label: 'Timer', icon: Clock },
    { href: '/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/gallery', label: 'Fridge', icon: ImageIcon },
    { href: '/subscription', label: 'Premium', icon: Crown, premium: true },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-b-2xl z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive ? 'active' : ''} ${hasMounted && item.premium && isPremium ? 'text-yellow-600' : ''}`}
            >
              <div className="relative">
                <Icon className="w-6 h-6 mb-1" />
                {hasMounted && item.premium && isPremium && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
