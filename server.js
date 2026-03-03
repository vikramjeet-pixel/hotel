const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static HTML/CSS/JS files from the current directory
app.use(express.static(__dirname));

// Route our /api/subscribe to the existing Vercel servless function
app.post('/api/subscribe', async (req, res) => {
    try {
        const handler = require('./api/subscribe');
        await handler(req, res);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fallback removed to avoid path-to-regexp issues, static handles everything.

app.listen(port, () => {
    console.log(`\n✅ Local Kings Court Dev Server is running at: http://localhost:${port}`);
    console.log("-> Open this URL in your web browser to test the Newsletter!");
});
