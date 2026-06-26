const { kv } = require('@vercel/kv');

const ADMIN_PASSWORD = "kingscourt2026"; // Hardcoded simple password

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        try {
            // Fetch events from Vercel KV
            const data = await kv.get('hotel_events');
            return res.status(200).json(data || []);
        } catch (error) {
            console.error('Error reading from KV:', error);
            return res.status(500).json({ error: 'Failed to read events' });
        }
    }

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const payload = JSON.parse(body);
                
                // Password protection
                if (payload.password !== ADMIN_PASSWORD) {
                    return res.status(401).json({ error: 'Unauthorized: Incorrect password' });
                }

                // Save events to Vercel KV
                await kv.set('hotel_events', payload.events);
                return res.status(200).json({ success: true });
            } catch (error) {
                console.error('Error writing to KV:', error);
                return res.status(500).json({ error: 'Failed to save events' });
            }
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
