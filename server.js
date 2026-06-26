const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Load environment variables from .env file if it exists
if (fs.existsSync(path.join(__dirname, '.env'))) {
    const envConfig = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
    envConfig.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const parts = trimmed.split('=');
            if (parts.length > 1) {
                const key = parts[0].trim();
                const val = parts.slice(1).join('=').trim();
                process.env[key] = val;
            }
        }
    });
}

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static HTML/CSS/JS files from the current directory
app.use(express.static(__dirname));

// Route our /api/subscribe to the existing Vercel serverless function
app.post('/api/subscribe', async (req, res) => {
    try {
        const handler = require('./api/subscribe');
        await handler(req, res);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route our /api/send-email to the existing Vercel serverless function
app.post('/api/send-email', async (req, res) => {
    try {
        const handler = require('./api/send-email');
        await handler(req, res);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`\n✅ Local Kings Court Dev Server is running at: http://localhost:${port}`);
    console.log("-> Open this URL in your web browser to test the forms and Newsletter!");
});
