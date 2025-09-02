const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY

// Fallback motivational tips if API is not available
const fallbackTips = [
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

export interface MotivationalTip {
  text: string
  source: 'api' | 'fallback'
  timestamp: number
}

export const getMotivationalTip = async (): Promise<MotivationalTip> => {
  // If no API key, return fallback tip
  if (!HUGGING_FACE_API_KEY) {
    const randomTip = fallbackTips[Math.floor(Math.random() * fallbackTips.length)]
    return {
      text: randomTip,
      source: 'fallback',
      timestamp: Date.now(),
    }
  }

  try {
    // Try to get a tip from Hugging Face API
    const response = await fetch(
      'https://api-inference.huggingface.co/models/gpt2',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: "Write a short, encouraging message for someone with ADHD who is trying to focus:",
          parameters: {
            max_length: 100,
            temperature: 0.8,
            do_sample: true,
          }
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    
    // Extract the generated text and clean it up
    let tipText = data[0]?.generated_text || ''
    
    // Clean up the generated text
    tipText = tipText
      .replace(/Write a short, encouraging message for someone with ADHD who is trying to focus:/, '')
      .trim()
      .split('\n')[0] // Take only the first line
      .replace(/[^\w\s.,!?-]/g, '') // Remove special characters
      .trim()

    // If the generated text is too short or doesn't make sense, use fallback
    if (tipText.length < 20 || tipText.length > 200) {
      const randomTip = fallbackTips[Math.floor(Math.random() * fallbackTips.length)]
      return {
        text: randomTip,
        source: 'fallback',
        timestamp: Date.now(),
      }
    }

    return {
      text: tipText,
      source: 'api',
      timestamp: Date.now(),
    }
  } catch (error) {
    console.warn('Failed to fetch motivational tip from API:', error)
    
    // Return fallback tip on error
    const randomTip = fallbackTips[Math.floor(Math.random() * fallbackTips.length)]
    return {
      text: randomTip,
      source: 'fallback',
      timestamp: Date.now(),
    }
  }
}

export const getMultipleTips = async (count: number = 5): Promise<MotivationalTip[]> => {
  const tips: MotivationalTip[] = []
  
  for (let i = 0; i < count; i++) {
    const tip = await getMotivationalTip()
    tips.push(tip)
    
    // Add small delay between API calls to be respectful
    if (i < count - 1) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  
  return tips
}

// Cache tips to avoid excessive API calls
const tipCache = new Map<string, MotivationalTip>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const getCachedTip = async (): Promise<MotivationalTip> => {
  const now = Date.now()
  
  // Check if we have a valid cached tip
  for (const [key, tip] of tipCache.entries()) {
    if (now - tip.timestamp < CACHE_DURATION) {
      return tip
    }
    // Remove expired tip
    tipCache.delete(key)
  }
  
  // Get new tip and cache it
  const newTip = await getMotivationalTip()
  tipCache.set(newTip.text, newTip)
  
  return newTip
}
