import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Paystack webhook handler for payment verification
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-paystack-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha512', process.env.PAYSTACK_WEBHOOK_SECRET || '')
      .update(body)
      .digest('hex')

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const event = JSON.parse(body)

    // Handle different webhook events
    switch (event.event) {
      case 'charge.success':
        // Payment was successful
        const transaction = event.data
        
        // Here you would:
        // 1. Verify the transaction with Paystack API
        // 2. Update user subscription in your database
        // 3. Send confirmation email
        // 4. Log the successful payment
        
        console.log('Payment successful:', {
          reference: transaction.reference,
          amount: transaction.amount,
          email: transaction.customer.email,
          status: transaction.status
        })

        // For demo purposes, we'll just return success
        // In production, implement the above steps
        return NextResponse.json({ 
          success: true, 
          message: 'Payment processed successfully' 
        })

      case 'transfer.success':
        // Transfer was successful (if you use Paystack transfers)
        console.log('Transfer successful:', event.data)
        return NextResponse.json({ 
          success: true, 
          message: 'Transfer processed successfully' 
        })

      case 'charge.failed':
        // Payment failed
        console.log('Payment failed:', event.data)
        return NextResponse.json({ 
          success: true, 
          message: 'Payment failure logged' 
        })

      default:
        // Log unhandled events
        console.log('Unhandled webhook event:', event.event)
        return NextResponse.json({ 
          success: true, 
          message: 'Event received' 
        })
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Handle GET requests (for webhook verification)
export async function GET() {
  return NextResponse.json({ 
    message: 'Paystack webhook endpoint is active' 
  })
}
