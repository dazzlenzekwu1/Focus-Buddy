export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Check environment variables
    const envCheck = {
        hasSupabaseUrl: !!process.env.SUPABASE_URL,
        hasSupabaseAnonKey: !!process.env.SUPABASE_ANON_KEY,
        hasHuggingFaceApiKey: !!process.env.HUGGINGFACE_API_KEY,
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url
    };

    res.status(200).json({
        message: 'API is working!',
        environment: envCheck,
        headers: req.headers,
        query: req.query,
        body: req.body
    });
}
