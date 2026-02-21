/* ============================================================
   SEND-EMAIL.JS — Kings Court Hotel
   Vercel Serverless Function
   Handles all form submissions via SMTP (Nodemailer)
   ============================================================ */

const nodemailer = require('nodemailer');

// ────────────────────────────────────────────────────────────
// SMTP CONFIGURATION (set these in Vercel Environment Variables)
//
// SMTP_HOST        — e.g. smtp.gmail.com, smtp.office365.com
// SMTP_PORT        — e.g. 587 (TLS) or 465 (SSL)
// SMTP_SECURE      — "true" for port 465, "false" for 587
// SMTP_USER        — SMTP login username / email
// SMTP_PASS        — SMTP login password / app password
// SMTP_FROM_NAME   — Display name, e.g. "Kings Court Hotel"
// SMTP_FROM_EMAIL  — Sender email shown in emails
// HOTEL_EMAIL      — Destination: info@kingscourthotel.co.uk
// ────────────────────────────────────────────────────────────

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

// ────────────────────────────────────────────────────────────
// SUBJECT LINES (per form type)
// ────────────────────────────────────────────────────────────
const SUBJECTS = {
    wedding: '💍 New Wedding Enquiry — Kings Court Hotel',
    stay: '🏨 New Stay / Booking Enquiry — Kings Court Hotel',
    events: '🎪 New Events Enquiry — Kings Court Hotel',
    contact: '✉️ New General Enquiry — Kings Court Hotel',
    dining: '🍽️ New Dining Reservation — Kings Court Hotel',
};

// ────────────────────────────────────────────────────────────
// SHARED STYLES
// ────────────────────────────────────────────────────────────
const emailStyles = `
    body { margin: 0; padding: 0; font-family: 'Georgia', 'Times New Roman', serif; background: #f5f1eb; }
    .wrapper { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #1a3c34 0%, #0f2b24 100%); color: #f5f1eb; padding: 40px 32px; text-align: center; }
    .header h1 { margin: 0 0 4px; font-size: 28px; font-weight: 400; letter-spacing: 2px; }
    .header .tagline { font-size: 12px; letter-spacing: 4px; text-transform: uppercase; color: #c2a45e; margin: 0; }
    .gold-line { width: 60px; height: 2px; background: #c2a45e; margin: 16px auto 0; }
    .body { padding: 32px; }
    .body h2 { font-size: 22px; color: #1a3c34; margin: 0 0 8px; font-weight: 400; }
    .body .subtitle { font-size: 14px; color: #888; margin: 0 0 24px; }
    .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .detail-table tr { border-bottom: 1px solid #f0ece4; }
    .detail-table td { padding: 12px 16px; font-size: 14px; vertical-align: top; }
    .detail-table .label { font-weight: 700; color: #1a3c34; width: 160px; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; font-family: Arial, Helvetica, sans-serif; }
    .detail-table .value { color: #333; line-height: 1.6; }
    .message-box { background: #faf8f4; border-left: 3px solid #c2a45e; padding: 16px 20px; margin: 0 0 24px; border-radius: 0 6px 6px 0; }
    .message-box p { margin: 0; font-size: 14px; color: #444; line-height: 1.8; font-style: italic; }
    .footer { background: #1a3c34; color: #c2a45e; padding: 24px 32px; text-align: center; font-size: 12px; }
    .footer a { color: #c2a45e; text-decoration: none; }
    .badge { display: inline-block; background: #c2a45e; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-family: Arial, sans-serif; letter-spacing: 1px; text-transform: uppercase; font-weight: 700; margin-bottom: 16px; }
`;

// ────────────────────────────────────────────────────────────
// HTML EMAIL TEMPLATE — Hotel notification
// ────────────────────────────────────────────────────────────
function buildHotelEmail(type, data) {
    const typeLabels = {
        wedding: 'Wedding Enquiry',
        stay: 'Stay / Booking Enquiry',
        events: 'Event Enquiry',
        contact: 'General Enquiry',
        dining: 'Dining Reservation',
    };

    const badgeColors = {
        wedding: '#b8860b',
        stay: '#2e7d32',
        events: '#1565c0',
        contact: '#6d4c41',
        dining: '#8e24aa',
    };

    const typeLabel = typeLabels[type] || 'General Enquiry';
    const badgeColor = badgeColors[type] || '#c2a45e';

    // Build detail rows dynamically
    let detailRows = '';
    const fieldLabels = {
        fullName: 'Full Name',
        partnerName: "Partner's Name",
        email: 'Email Address',
        phone: 'Phone Number',
        subject: 'Subject',
        weddingDate: 'Wedding Date',
        guestCount: 'Guest Count',
        weddingPackage: 'Package Interest',
        referralSource: 'How They Found Us',
        checkIn: 'Check-In Date',
        checkOut: 'Check-Out Date',
        roomType: 'Room Type',
        guests: 'Guests',
        specialRequests: 'Special Requests',
        eventType: 'Event Type',
        delegates: 'No. of Delegates',
        eventDate: 'Preferred Date',
        duration: 'Duration',
        eventPackage: 'Package Interest',
        company: 'Company / Organisation',
        facilitiesRequired: 'Facilities Required',
    };

    // Determine which fields to display
    const skipFields = ['message', 'formType', 'consent'];
    for (const [key, value] of Object.entries(data)) {
        if (skipFields.includes(key) || !value || value === '') continue;
        const label = fieldLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
        detailRows += `
            <tr>
                <td class="label">${label}</td>
                <td class="value">${escapeHtml(String(value))}</td>
            </tr>`;
    }

    const messageHtml = data.message ? `
        <div class="message-box">
            <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
        </div>
    ` : '';

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><style>${emailStyles}</style></head>
    <body>
        <div class="wrapper">
            <div class="header">
                <h1>Kings Court</h1>
                <p class="tagline">Hotel &amp; Estate · Est. 1642</p>
                <div class="gold-line"></div>
            </div>
            <div class="body">
                <span class="badge" style="background:${badgeColor}">${typeLabel}</span>
                <h2>New ${typeLabel} Received</h2>
                <p class="subtitle">Submitted on ${new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} at ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                <table class="detail-table">
                    ${detailRows}
                </table>
                ${messageHtml}
            </div>
            <div class="footer">
                <p>Kings Court Hotel &amp; Estate · Welford-on-Avon · Warwickshire CV37 8EX</p>
                <p><a href="tel:+441789123456">+44 (0)1789 123 456</a> · <a href="mailto:info@kingscourthotel.co.uk">info@kingscourthotel.co.uk</a></p>
            </div>
        </div>
    </body>
    </html>`;
}

// ────────────────────────────────────────────────────────────
// HTML EMAIL TEMPLATE — User auto-confirmation
// ────────────────────────────────────────────────────────────
function buildConfirmationEmail(type, data) {
    const greetings = {
        wedding: `Dear ${escapeHtml(data.fullName || 'Guest')},\n\nThank you so much for your wedding enquiry. We're truly delighted that you're considering Kings Court Hotel & Estate for your special day.`,
        stay: `Dear ${escapeHtml(data.fullName || 'Guest')},\n\nThank you for your booking enquiry. We look forward to welcoming you to Kings Court Hotel & Estate.`,
        events: `Dear ${escapeHtml(data.fullName || 'Guest')},\n\nThank you for your event enquiry. Kings Court Hotel & Estate is delighted to help you plan your perfect event.`,
        contact: `Dear ${escapeHtml(data.fullName || 'Guest')},\n\nThank you for getting in touch with Kings Court Hotel & Estate. We've received your message and appreciate you contacting us.`,
        dining: `Dear ${escapeHtml(data.fullName || 'Guest')},\n\nThank you for your dining reservation request at Kings Court Hotel & Estate. We're looking forward to welcoming you.`,
    };

    const promises = {
        wedding: 'One of our dedicated wedding coordinators will be in touch within 24 hours to begin crafting your perfect day.',
        stay: 'Our reservations team will confirm availability and get back to you within 2 hours.',
        events: 'Our events team will prepare a bespoke proposal and respond within 24 hours.',
        contact: 'A member of our team will respond to your enquiry within 24 hours.',
        dining: 'Our dining reservations team will confirm your table within 2 hours. Please check your email for confirmation.',
    };

    const greeting = (greetings[type] || greetings.contact).replace(/\n/g, '<br>');
    const promise = promises[type] || promises.contact;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><style>${emailStyles}</style></head>
    <body>
        <div class="wrapper">
            <div class="header">
                <h1>Kings Court</h1>
                <p class="tagline">Hotel &amp; Estate · Est. 1642</p>
                <div class="gold-line"></div>
            </div>
            <div class="body">
                <h2>Thank You for Your Enquiry</h2>
                <p style="font-size:14px;color:#555;line-height:1.8;margin-bottom:24px;">
                    ${greeting}
                </p>
                <div class="message-box">
                    <p style="font-style:normal;font-weight:600;color:#1a3c34;">What happens next?</p>
                    <p style="font-style:normal;margin-top:8px;">${promise}</p>
                </div>
                <p style="font-size:14px;color:#555;line-height:1.8;margin-top:24px;">
                    In the meantime, if you have any questions please don't hesitate to call us on 
                    <a href="tel:+441789123456" style="color:#c2a45e;text-decoration:none;font-weight:600;">+44 (0)1789 123 456</a> 
                    or reply directly to this email.
                </p>
                <p style="font-size:14px;color:#555;line-height:1.8;margin-top:16px;">
                    With warm regards,<br>
                    <strong style="color:#1a3c34;">The Kings Court Team</strong>
                </p>
            </div>
            <div class="footer">
                <p>Kings Court Hotel &amp; Estate · Welford-on-Avon · Warwickshire CV37 8EX</p>
                <p><a href="tel:+441789123456">+44 (0)1789 123 456</a> · <a href="https://www.kingscourthotel.co.uk">www.kingscourthotel.co.uk</a></p>
                <p style="margin-top:12px;font-size:11px;color:rgba(194,164,94,0.6);">This is an automated confirmation. Please do not reply to this email address.</p>
            </div>
        </div>
    </body>
    </html>`;
}

// ────────────────────────────────────────────────────────────
// CONFIRMATION SUBJECT LINES
// ────────────────────────────────────────────────────────────
const CONFIRMATION_SUBJECTS = {
    wedding: 'Your Wedding Enquiry — Kings Court Hotel & Estate',
    stay: 'Your Booking Enquiry — Kings Court Hotel & Estate',
    events: 'Your Event Enquiry — Kings Court Hotel & Estate',
    contact: 'Your Enquiry — Kings Court Hotel & Estate',
    dining: 'Your Dining Reservation — Kings Court Hotel & Estate',
};

// ────────────────────────────────────────────────────────────
// VALIDATION
// ────────────────────────────────────────────────────────────
function validateRequest(data) {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,}$/;

    if (!data.fullName || data.fullName.trim().length < 2) {
        errors.push('Full Name is required (at least 2 characters).');
    }
    if (!data.email || !emailRegex.test(data.email.trim())) {
        errors.push('A valid email address is required.');
    }
    if (!data.phone || !phoneRegex.test(data.phone.trim())) {
        errors.push('A valid phone number is required.');
    }
    if (!data.message || data.message.trim().length < 5) {
        errors.push('Message is required (at least 5 characters).');
    }
    if (!data.formType || !['wedding', 'stay', 'events', 'contact', 'dining'].includes(data.formType)) {
        errors.push('Invalid form type.');
    }

    return errors;
}

// ────────────────────────────────────────────────────────────
// UTILITY
// ────────────────────────────────────────────────────────────
function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ────────────────────────────────────────────────────────────
// HANDLER
// ────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const data = req.body;

        // Validate
        const errors = validateRequest(data);
        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        const formType = data.formType;
        const hotelEmail = process.env.HOTEL_EMAIL || 'info@kingscourthotel.co.uk';
        const fromName = process.env.SMTP_FROM_NAME || 'Kings Court Hotel';
        const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;

        const transporter = createTransporter();

        // 1) Send enquiry email to hotel
        await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: hotelEmail,
            replyTo: data.email,
            subject: SUBJECTS[formType] || SUBJECTS.contact,
            html: buildHotelEmail(formType, data),
        });

        // 2) Send auto-confirmation to the user
        await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: data.email,
            subject: CONFIRMATION_SUBJECTS[formType] || CONFIRMATION_SUBJECTS.contact,
            html: buildConfirmationEmail(formType, data),
        });

        return res.status(200).json({
            success: true,
            message: 'Your enquiry has been sent successfully. A confirmation email has been sent to your inbox.',
        });

    } catch (error) {
        console.error('Email send error:', error);
        return res.status(500).json({
            success: false,
            error: 'There was a problem sending your enquiry. Please try again or contact us directly.',
        });
    }
};
