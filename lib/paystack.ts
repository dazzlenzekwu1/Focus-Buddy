// Paystack Integration for Nigeria
// This provides a simple way to integrate Paystack payments

export interface PaystackConfig {
  publicKey: string
  email: string
  amount: number // Amount in kobo (smallest currency unit)
  currency: string
  reference: string
  callback: (response: PaystackResponse) => void
  onClose: () => void
}

export interface PaystackResponse {
  reference: string
  trans: string
  status: string
  message: string
  transaction: string
  trxref: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number // Price in Naira
  features: string[]
  popular?: boolean
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    features: [
      '25-minute focus timer',
      'Basic task management',
      'Standard motivational tips',
      'Basic coloring pages'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1500, // ₦1,500
    features: [
      'All Basic features',
      'Customizable timer durations',
      'AI-powered motivational tips',
      'Unlimited coloring pages',
      'Progress analytics',
      'Priority support',
      'No ads'
    ],
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 3000, // ₦3,000
    features: [
      'All Premium features',
      'Team collaboration',
      'Advanced analytics',
      'Custom themes',
      'Export data',
      'API access',
      'White-label options'
    ]
  }
]

// Initialize Paystack payment
export const initializePaystack = (config: PaystackConfig) => {
  if (typeof window === 'undefined') return

  // Load Paystack script if not already loaded
  if (!window.PaystackPop) {
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    document.head.appendChild(script)
  }

  // Wait for script to load
  const checkPaystack = () => {
    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: config.publicKey,
        email: config.email,
        amount: config.amount * 100, // Convert to kobo
        currency: config.currency,
        ref: config.reference,
        callback: config.callback,
        onClose: config.onClose,
      })
      handler.openIframe()
    } else {
      setTimeout(checkPaystack, 100)
    }
  }

  checkPaystack()
}

// Generate unique reference for transactions
export const generateReference = (prefix: string = 'FB'): string => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9)
  return `${prefix}_${timestamp}_${random}`.toUpperCase()
}

// Format price in Nigerian Naira
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Mock subscription verification (in real app, this would verify with Paystack webhook)
export const verifySubscription = async (reference: string): Promise<boolean> => {
  try {
    // In production, this would make a request to your backend
    // which would then verify with Paystack's API
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reference }),
    })

    if (!response.ok) {
      throw new Error('Payment verification failed')
    }

    const result = await response.json()
    return result.success
  } catch (error) {
    console.error('Subscription verification error:', error)
    // For demo purposes, return true to simulate successful payment
    return true
  }
}

// Check if user has premium subscription
export const hasPremiumAccess = (): boolean => {
  if (typeof window === 'undefined') return false
  
  // Check localStorage for demo purposes
  // In production, this would check your database
  const subscription = localStorage.getItem('focus_buddy_subscription')
  if (!subscription) return false
  
  try {
    const subData = JSON.parse(subscription)
    const now = Date.now()
    
    // Check if subscription is still valid
    return subData.status === 'active' && subData.expiresAt > now
  } catch {
    return false
  }
}

// Save subscription data locally (for demo purposes)
export const saveSubscription = (planId: string, reference: string) => {
  if (typeof window === 'undefined') return
  
  const subscription = {
    planId,
    reference,
    status: 'active',
    createdAt: Date.now(),
    expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
  }
  
  localStorage.setItem('focus_buddy_subscription', JSON.stringify(subscription))
}

// Get current subscription info
export const getCurrentSubscription = () => {
  if (typeof window === 'undefined') return null
  
  try {
    const subscription = localStorage.getItem('focus_buddy_subscription')
    return subscription ? JSON.parse(subscription) : null
  } catch {
    return null
  }
}

// Declare global Paystack types
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: any) => {
        openIframe: () => void
      }
    }
  }
}
