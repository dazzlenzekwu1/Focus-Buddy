'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      name: 'Tasks',
      href: '/tasks',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M12 9v6"/><path d="M9 12h6"/>
        </svg>
      ),
    },
    {
      name: 'Focus',
      href: '/focus',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
    {
      name: 'Gallery',
      href: '/gallery',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
        </svg>
      ),
    },
    {
      name: 'Premium',
      href: '/premium',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m10 11.5 5 5 5-5"/><path d="m22 15 5-5-5-5"/><path d="m2 15 5-5-5-5"/><path d="m14 2 5 5 5-5"/><path d="m14 11.5-5 5-5-5"/>
        </svg>
      ),
    },
  ]

  const isActive = (href: string) => pathname === href
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-[0_-4px_6px_-1px_rgb(0_0_0_/_0.1)] md:top-0 md:left-0 md:bottom-auto md:right-auto md:w-64 md:h-screen md:flex md:flex-col md:shadow-none md:border-r">
      {/* Mobile menu button */}
      <div className="flex justify-center md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-4 focus:outline-none"
        >
          <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Desktop and mobile menu content */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block md:flex-1`}>
        <div className="flex flex-col md:p-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-5 h-5">{item.icon}</div>
                <span className="text-lg font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
