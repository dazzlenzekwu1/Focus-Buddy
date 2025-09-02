'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Crown, Star, Zap } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { 
  SUBSCRIPTION_PLANS, 
  initializePaystack, 
  generateReference, 
  formatPrice,
  hasPremiumAccess,
  getCurrentSubscription,
  saveSubscription
} from '@/lib/paystack'
import Celebration from '@/components/Celebration'

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium')
  const [isLoading, setIsLoading] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [currentSubscription, setCurrentSubscription] = useState<any>(null)
  const [userEmail, setUserEmail] = useState('user@example.com')

  useEffect(() => {
    // Get current subscription status
    const subscription = getCurrentSubscription()
    setCurrentSubscription(subscription)
    
    // Set user email (in real app, this would come from user profile)
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('focus_buddy_user_email')
      if (storedEmail) {
        setUserEmail(storedEmail)
      }
    }
  }, [])

  const handleSubscribe = async (planId: string) => {
    if (planId === 'basic') {
      // Basic plan is free
      return
    }

    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId)
    if (!plan) return

    setIsLoading(true)

    try {
      const reference = generateReference()
      
      // Initialize Paystack payment
      initializePaystack({
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_demo',
        email: userEmail,
        amount: plan.price,
        currency: 'NGN',
        reference,
        callback: async (response: any) => {
          console.log('Payment successful:', response)
          
          // Save subscription locally (in real app, this would be in database)
          saveSubscription(planId, reference)
          setCurrentSubscription({
            planId,
            reference,
            status: 'active',
            createdAt: Date.now(),
            expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000),
          })
          
          // Show celebration
          setShowCelebration(true)
          setIsLoading(false)
        },
        onClose: () => {
          console.log('Payment cancelled')
          setIsLoading(false)
        },
      })
    } catch (error) {
      console.error('Payment error:', error)
      setIsLoading(false)
    }
  }

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'basic':
        return <Zap className="w-8 h-8 text-blue-500" />
      case 'premium':
        return <Star className="w-8 h-8 text-yellow-500" />
      case 'pro':
        return <Crown className="w-8 h-8 text-purple-500" />
      default:
        return <Zap className="w-8 h-8 text-blue-500" />
    }
  }

  const isCurrentPlan = (planId: string) => {
    return currentSubscription?.planId === planId
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Choose Your Focus Plan
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unlock premium features to supercharge your focus and productivity. 
              All plans include our core ADHD-friendly features.
            </p>
          </div>

          {/* Current Subscription Status */}
          {currentSubscription && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-primary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Current Subscription: {currentSubscription.planId.charAt(0).toUpperCase() + currentSubscription.planId.slice(1)}
                    </h3>
                    <p className="text-gray-600">
                      Expires: {new Date(currentSubscription.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Subscription Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {SUBSCRIPTION_PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
                } ${isCurrentPlan(plan.id) ? 'ring-2 ring-green-500' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan(plan.id) && (
                  <div className="absolute -top-4 right-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Current Plan
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {getPlanIcon(plan.id)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-primary-600 mb-1">
                    {plan.price === 0 ? 'Free' : formatPrice(plan.price)}
                  </div>
                  {plan.price > 0 && (
                    <p className="text-gray-500 text-sm">per month</p>
                  )}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isLoading || isCurrentPlan(plan.id)}
                  className={`w-full py-3 px-6 rounded-full font-bold transition-all duration-300 ${
                    isCurrentPlan(plan.id)
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : plan.price === 0
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-primary-500 text-white hover:bg-primary-600 transform hover:scale-105'
                  }`}
                >
                  {isLoading ? (
                    'Processing...'
                  ) : isCurrentPlan(plan.id) ? (
                    'Current Plan'
                  ) : plan.price === 0 ? (
                    'Get Started'
                  ) : (
                    `Subscribe for ${formatPrice(plan.price)}`
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Feature Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Basic</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Premium</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">Focus Timer</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">Task Management</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">AI Motivational Tips</td>
                    <td className="text-center py-3 px-4">Basic</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">Coloring Pages</td>
                    <td className="text-center py-3 px-4">5/month</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">Analytics</td>
                    <td className="text-center py-3 px-4">-</td>
                    <td className="text-center py-3 px-4">Basic</td>
                    <td className="text-center py-3 px-4">Advanced</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">Priority Support</td>
                    <td className="text-center py-3 px-4">-</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700">Team Features</td>
                    <td className="text-center py-3 px-4">-</td>
                    <td className="text-center py-3 px-4">-</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  How do I cancel my subscription?
                </h4>
                <p className="text-gray-600">
                  You can cancel your subscription at any time from your account settings. 
                  Your access will continue until the end of your current billing period.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Is there a free trial?
                </h4>
                <p className="text-gray-600">
                  Yes! All premium features are available for free during your first 7 days. 
                  No credit card required to start your trial.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-gray-600">
                  We accept all major Nigerian payment methods including bank transfers, 
                  debit cards, and mobile money through our secure Paystack integration.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Celebration Modal */}
      <Celebration
        isVisible={showCelebration}
        onClose={() => setShowCelebration(false)}
        type="milestone"
        message="Welcome to Premium! You now have access to all advanced features."
      />
    </div>
  )
}
