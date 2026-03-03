const nodemailer = require('nodemailer');

function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Missing required email field' });
        }

        // Pull hotel email from Vercel config
        const hotelEmail = process.env.HOTEL_EMAIL || 'info@kingscourthotel.co.uk';
        const fromName = process.env.SMTP_FROM_NAME || 'Kings Court Hotel Website';
        const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;

        // Ensure Nodemailer credentials exist
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            const transporter = createTransporter();

            await transporter.sendMail({
                from: `"${fromName}" <${fromEmail}>`,
                to: hotelEmail,
                replyTo: email,
                subject: '📬 New Newsletter Subscriber — Kings Court Hotel',
                html: `
                <div style="font-family: Arial, sans-serif; background: #f5f1eb; padding: 20px;">
                    <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                        <div style="background: #1a3c34; padding: 20px; text-align: center; color: #c2a45e;">
                            <h2 style="margin: 0;">New Newsletter Subscriber!</h2>
                        </div>
                        <div style="padding: 30px;">
                            <p style="font-size: 16px; color: #555;">You have a new subscriber to the Kings Court Hotel newsletter.</p>
                            <div style="background: #f9f9f9; border-left: 4px solid #c2a45e; padding: 15px; margin-top: 20px;">
                                <p style="margin: 0; font-size: 16px;"><strong>Email Address:</strong></p>
                                <p style="margin: 5px 0 0 0; font-size: 18px; color: #1a3c34;"><a href="mailto:${email}" style="color: #1a3c34; font-weight: bold;">${email}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                `,
            });
            console.log("Successfully emailed new subscriber to hotel admin.");
        } else {
            console.log("Warning: No SMTP configured. Skipping email send, simulating success.");
        }

        return res.status(200).json({
            message: 'Successfully subscribed!',
        });

    } catch (error) {
        console.error('Newsletter Subscribe Error:', error);
        return res.status(500).json({ message: 'Failed to process subscription', error: String(error) });
    }
}
