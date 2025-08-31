# Focus Buddy

A focus timer app that rewards users with coloring page pieces for completing 25-minute focus sessions.

## Features

- 25-minute Pomodoro timer
- Anonymous user authentication with Firebase
- Session tracking and rewards
- Gallery of completed drawings
- Beautiful, responsive UI

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

You need to set up these services and get their credentials:

#### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Anonymous Authentication
4. Copy your Firebase config (already in the code)

#### Supabase Setup
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Get your project URL and anon key
4. Create these tables:

```sql
-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  minutes INTEGER NOT NULL,
  tip_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rewards table
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  asset_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

5. Create a storage bucket named `rewards` (make it public)

#### Hugging Face Setup
1. Go to [Hugging Face](https://huggingface.co/)
2. Create an account and get an API token

### 3. Deploy to Vercel

#### Option A: Via Vercel Dashboard
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Import your repository
4. Add environment variables:
   - `SUPABASE_URL` = your Supabase project URL
   - `SUPABASE_ANON_KEY` = your Supabase anon key
   - `HUGGINGFACE_API_KEY` = your Hugging Face token

#### Option B: Via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add HUGGINGFACE_API_KEY

# Deploy to production
vercel --prod
```

## Project Structure

- `frontend/` - Static HTML, CSS, and JavaScript files
- `api/` - Serverless functions for backend operations
- `assets/` - Images, audio files, and other static assets

## API Endpoints

- `POST /api/saveSession` - Save a completed focus session
- `POST /api/saveReward` - Save a completed drawing reward
- `GET /api/getRewards` - Retrieve user's rewards

## Technologies Used

- HTML5, CSS3, JavaScript
- Tailwind CSS for styling
- Firebase for authentication
- Supabase for database and storage
- Vercel for deployment

## Troubleshooting

### Common Issues

1. **Firebase Authentication Errors**
   - Make sure Anonymous Authentication is enabled in Firebase Console
   - Check that your Firebase config is correct

2. **Supabase Connection Errors**
   - Verify your environment variables are set correctly
   - Ensure your Supabase tables exist
   - Check that your storage bucket is public

3. **API Errors**
   - Check Vercel function logs for detailed error messages
   - Verify all environment variables are set

4. **Image Not Loading**
   - Ensure all asset files are in the `frontend/assets/` directory
   - Check file paths in HTML files

### Development

To run locally:
```bash
npm run dev
```

This will start the Vercel development server.

## License

MIT 
