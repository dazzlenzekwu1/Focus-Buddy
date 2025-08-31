// Import necessary libraries
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Environment variables for your Supabase project
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Create a Supabase client instance
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userId, sessionId, imageData } = req.body;

    if (!userId || !sessionId || !imageData) {
        return res.status(400).json({ error: 'Missing required data.' });
    }

    const imageBuffer = Buffer.from(imageData, 'base64');
    const fileName = `rewards/${userId}/${uuidv4()}.png`;

    try {
        // Upload the image to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('rewards') // 'rewards' is the name of your bucket
            .upload(fileName, imageBuffer, {
                contentType: 'image/png',
                upsert: true
            });

        if (uploadError) {
            console.error('Supabase upload error:', uploadError.message);
            return res.status(500).json({ error: 'Failed to upload image.' });
        }

        // Get the public URL of the uploaded image
        const { publicURL, error: publicURLError } = supabase.storage
            .from('rewards')
            .getPublicUrl(fileName);

        if (publicURLError) {
            console.error('Supabase public URL error:', publicURLError.message);
            return res.status(500).json({ error: 'Failed to get public URL.' });
        }

        // Insert a new reward record into the 'rewards' table
        const { data: rewardData, error: rewardError } = await supabase
            .from('rewards')
            .insert([
                {
                    user_id: userId,
                    session_id: sessionId,
                    asset_path: publicURL,
                    created_at: new Date().toISOString()
                }
            ]);

        if (rewardError) {
            console.error('Supabase insert error:', rewardError.message);
            return res.status(500).json({ error: 'Failed to save reward data.' });
        }

        res.status(200).json({
            message: 'Reward saved successfully.',
            asset_path: publicURL
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
}
