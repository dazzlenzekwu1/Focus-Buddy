// Import the Supabase client library
import { createClient } from '@supabase/supabase-js';

// Environment variables for your Supabase project
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
    // Only allow GET requests to this endpoint
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Check if environment variables are set
    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Missing environment variables:', { 
            hasSupabaseUrl: !!supabaseUrl, 
            hasSupabaseAnonKey: !!supabaseAnonKey 
        });
        return res.status(500).json({ 
            error: 'Server configuration error. Please check environment variables.' 
        });
    }

    // Create a Supabase client instance
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get the userId from the URL query parameters
    const { userId } = req.query;

    // Validate the userId
    if (!userId) {
        return res.status(400).json({ error: 'Missing userId parameter.' });
    }

    try {
        // Query the 'rewards' table for all rewards belonging to the user
        const { data: rewards, error } = await supabase
            .from('rewards')
            .select('asset_path, created_at')
            .eq('user_id', userId);

        // Handle any errors during the query
        if (error) {
            console.error('Supabase query error:', error.message);
            return res.status(500).json({ error: 'Failed to retrieve rewards.' });
        }

        // Send a success response with the retrieved rewards
        res.status(200).json({ rewards: rewards || [] });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
}
