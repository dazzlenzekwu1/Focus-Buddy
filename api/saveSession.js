// Import the Supabase client library and the UUID library
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch'; // For making API calls

// Environment variables for your Supabase project and Hugging Face API
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const hfApiToken = process.env.HUGGINGFACE_API_KEY; // Your Hugging Face API token
const hfModel = 'distilgpt2'; // e.g., 'distilgpt2'

// Create a Supabase client instance
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// This is the main function that will be executed
export default async function handler(req, res) {
    // Only allow POST requests to this endpoint
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Extract data from the request body
    const { userId, minutes } = req.body;

    // Validate the input data
    if (!userId || !minutes) {
        return res.status(400).json({ error: 'Missing required session data.' });
    }

    let tipText = 'You focused for a full session!'; // Default tip

    try {
        // Generate a new tip using the Hugging Face Inference API
        const hfResponse = await fetch(`https://api-inference.huggingface.co/models/${hfModel}`, {
            headers: { Authorization: `Bearer ${hfApiToken}` },
            method: 'POST',
            body: JSON.stringify({
                inputs: "Write a short, encouraging tip for someone who just finished a focus session:",
                parameters: {
                    max_length: 50,
                    min_length: 10,
                    do_sample: true
                }
            })
        });

        const hfResult = await hfResponse.json();
        if (hfResult && hfResult[0] && hfResult[0].generated_text) {
            tipText = hfResult[0].generated_text;
        }

        // Create a new unique ID for the session
        const sessionId = uuidv4();

        // Insert the new session data into the 'sessions' table
        const { data, error } = await supabase
            .from('sessions')
            .insert([
                {
                    id: sessionId,
                    user_id: userId,
                    minutes: minutes,
                    tip_text: tipText,
                    created_at: new Date().toISOString()
                }
            ]);

        // Handle any errors during insertion
        if (error) {
            console.error('Supabase insert error:', error.message);
            return res.status(500).json({ error: 'Failed to save session data.' });
        }

        // Send a success response
        res.status(200).json({
            message: 'Session data saved successfully.',
            sessionId: sessionId,
            tip_text: tipText // Return the generated tip to the frontend
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
}
