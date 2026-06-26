const fs = require('fs');
const path = require('path');

const eventsFilePath = path.join(__dirname, '..', 'events.json');

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            // Read events from file
            if (fs.existsSync(eventsFilePath)) {
                const data = fs.readFileSync(eventsFilePath, 'utf8');
                return res.status(200).json(JSON.parse(data));
            } else {
                return res.status(200).json([]);
            }
        } else if (req.method === 'POST') {
            // Write events to file (expected body: { events: [...] } or a single event action, but let's just accept the full array for simplicity of saving state)
            const { events } = req.body;
            
            if (!Array.isArray(events)) {
                return res.status(400).json({ message: 'Invalid data format, expected an array of events.' });
            }

            fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2), 'utf8');
            return res.status(200).json({ message: 'Events saved successfully.' });
        } else {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Events API Error:', error);
        return res.status(500).json({ message: 'Failed to process request', error: String(error) });
    }
}
