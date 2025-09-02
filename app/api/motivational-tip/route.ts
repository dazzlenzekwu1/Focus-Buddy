import { NextRequest, NextResponse } from 'next/server'
import { getMotivationalTip } from '@/lib/huggingface'

export async function GET(request: NextRequest) {
  try {
    const tip = await getMotivationalTip()
    
    return NextResponse.json({
      success: true,
      data: tip,
    })
  } catch (error) {
    console.error('Error fetching motivational tip:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch motivational tip',
        fallback: {
          text: "Remember: progress, not perfection. Every minute of focus counts.",
          source: 'fallback',
          timestamp: Date.now(),
        }
      },
      { status: 500 }
    )
  }
}
