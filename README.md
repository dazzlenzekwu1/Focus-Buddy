# Focus Buddy - ADHD-Friendly Focus Timer App

A modern, responsive web application designed specifically for ADHD needs, featuring a focus timer, task management, and visual rewards system.

## 🎯 Project Overview

Focus Buddy helps users with ADHD maintain focus through:
- **Pomodoro-style focus timer** (25/5 minute cycles)
- **Simple task management** with drag-and-drop reordering
- **Visual progress tracking** with coloring page rewards
- **Motivational micro-tips** powered by AI
- **Celebration feedback** with confetti animations
- **Premium subscription** with Paystack integration (Nigeria-friendly)

## ✨ Features

### 🕐 Focus Timer
- 25-minute focus sessions with 5-minute breaks
- Visual circular progress indicator
- Start, pause, resume, and reset functionality
- Automatic session switching

### 📝 Task Management
- Add, complete, and delete tasks
- Priority levels (low, medium, high)
- Drag-and-drop reordering
- Filter by status (all, active, completed)

### 🎨 Fridge Gallery
- Cartoon fridge design with magnet effects
- Display completed coloring pages
- Upload custom pages
- Favorite and organize collections

### 🎉 Celebration System
- Confetti animations for completed sessions
- Motivational tips from Hugging Face AI
- Progress tracking and achievements

### 💎 Premium Features
- AI-powered motivational tips
- Customizable timer durations
- Unlimited coloring pages
- Progress analytics
- Priority support
- No advertisements

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Supabase (auth, database, real-time)
- **AI Integration**: Hugging Face API for motivational tips
- **Payments**: Paystack integration (Nigeria-friendly)
- **Testing**: Jest + React Testing Library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Hugging Face API key (optional)
- Paystack account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Focus-Buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your API keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   HUGGING_FACE_API_KEY=your_hugging_face_api_key
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
   PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
   PAYSTACK_WEBHOOK_SECRET=your_paystack_webhook_secret
   ```

4. **Set up Supabase database**
   
   Create the following tables in your Supabase project:

   ```sql
   -- Focus Sessions
   CREATE TABLE focus_sessions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     duration INTEGER NOT NULL,
     completed BOOLEAN DEFAULT false,
     session_type TEXT CHECK (session_type IN ('focus', 'break')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Tasks
   CREATE TABLE tasks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     text TEXT NOT NULL,
     completed BOOLEAN DEFAULT false,
     priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Coloring Pages
   CREATE TABLE coloring_pages (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     title TEXT NOT NULL,
     image_url TEXT NOT NULL,
     difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
     is_favorite BOOLEAN DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     completed_at TIMESTAMP WITH TIME ZONE
   );

   -- User Subscriptions
   CREATE TABLE user_subscriptions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     plan_id TEXT NOT NULL,
     status TEXT CHECK (status IN ('active', 'cancelled', 'expired')),
     reference TEXT UNIQUE,
     amount INTEGER NOT NULL,
     currency TEXT DEFAULT 'NGN',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     expires_at TIMESTAMP WITH TIME ZONE NOT NULL
   );
   ```

5. **Set up Paystack**
   
   - Create a Paystack account at [paystack.com](https://paystack.com)
   - Get your public and secret keys from the dashboard
   - Set up webhook endpoints for payment verification
   - Test with Paystack's test mode first

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💳 Payment Integration

### Paystack Setup
Focus Buddy uses Paystack for payment processing, which is ideal for Nigerian users:

- **Supported Payment Methods**: Bank transfers, debit cards, mobile money
- **Currency**: Nigerian Naira (NGN)
- **Security**: PCI DSS compliant, secure webhook verification
- **Integration**: Inline checkout for seamless user experience

### Subscription Plans
- **Basic**: Free with core features
- **Premium**: ₦1,500/month with AI tips and unlimited features
- **Pro**: ₦3,000/month with team collaboration and advanced analytics

### Payment Flow
1. User selects subscription plan
2. Paystack inline checkout opens
3. User completes payment
4. Webhook verifies payment with Paystack
5. User account upgraded to premium
6. Celebration modal shows success

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## 📱 Responsive Design

The app is built with a mobile-first approach using:
- Tailwind CSS responsive utilities
- Flexbox and CSS Grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔒 Security Features

- Environment variable protection
- Supabase Row Level Security (RLS)
- Input validation and sanitization
- Error handling for API failures
- Secure authentication flow
- Paystack webhook verification

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones (#0ea5e9)
- **Pastels**: Soft, ADHD-friendly colors
- **Background**: Cream, sage, and lavender gradients
- **Accessibility**: High contrast ratios

### Typography
- **Headings**: Summer Sun (custom font)
- **Body**: Manjari (Google Fonts)
- **Icons**: Lucide React

### Animations
- Framer Motion for smooth transitions
- Blob animations for character elements
- Confetti celebrations
- Hover effects and micro-interactions

## 🏆 Hackathon Criteria Alignment

### Code Quality (20%)
- ✅ Clean, modular React components
- ✅ TypeScript for type safety
- ✅ Consistent code formatting
- ✅ Comprehensive error handling

### Algorithm Efficiency (20%)
- ✅ Optimized timer logic with useCallback
- ✅ Efficient state management
- ✅ Lazy loading and caching
- ✅ Minimal re-renders

### Stack Utilization (14%)
- ✅ Supabase for auth and database
- ✅ Hugging Face API integration
- ✅ Paystack payment system
- ✅ Next.js App Router

### Security & Fault Tolerance (12%)
- ✅ Environment variable protection
- ✅ API error handling
- ✅ Input validation
- ✅ Secure authentication
- ✅ Payment verification

### Performance (16%)
- ✅ Responsive design
- ✅ Optimized images and fonts
- ✅ Lazy loading components
- ✅ Efficient animations

### Development Process (10%)
- ✅ Clear folder structure
- ✅ Component reusability
- ✅ Consistent naming conventions
- ✅ Modular architecture

### Documentation & Testing (8%)
- ✅ Comprehensive README
- ✅ Jest test setup
- ✅ Component documentation
- ✅ Setup instructions

## 📁 Project Structure

```
Focus-Buddy/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── timer/             # Focus timer page
│   ├── tasks/             # Task management page
│   ├── gallery/           # Fridge gallery page
│   ├── subscription/      # Premium subscription page
│   └── api/               # API routes
├── components/             # Reusable components
│   ├── Navigation.tsx     # Navigation component
│   ├── ProgressCircle.tsx # Timer progress indicator
│   ├── MotivationalTip.tsx # AI-powered tips
│   ├── Celebration.tsx    # Confetti celebrations
│   └── ...                # Other components
├── lib/                   # Utility libraries
│   ├── supabase.ts        # Database client
│   ├── huggingface.ts     # AI API integration
│   └── paystack.ts        # Payment integration
├── database/              # Database setup files
├── assets/                # Static assets
├── public/                # Public files
└── package.json           # Dependencies
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- ADHD community for feedback and insights
- Supabase for the excellent backend platform
- Hugging Face for AI capabilities
- Paystack for Nigerian payment solutions
- Tailwind CSS for the design system

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Check the documentation
- Review the setup guide

---

**Built with ❤️ for the ADHD community in Nigeria and beyond** 
