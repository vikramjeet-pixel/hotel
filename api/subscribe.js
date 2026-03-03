const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Missing required email field' });
        }

        const date = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
        const newRow = { Email: email, DateSubscribed: date };

        // When running locally, it writes to the hotel directory.
        // In Vercel serverless environment, the root is read-only, so fallback to /tmp.
        let filePath = path.join(process.cwd(), 'newsletter_emails.xlsx');
        let workbook;

        try {
            // Test if directory is writable (helps determine if we're on Vercel)
            fs.accessSync(process.cwd(), fs.constants.W_OK);
        } catch (err) {
            // On read-only filesystem (Vercel), switch to /tmp directory
            filePath = path.join('/tmp', 'newsletter_emails.xlsx');
        }

        if (fs.existsSync(filePath)) {
            workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Read existing data, append new row
            const data = xlsx.utils.sheet_to_json(sheet);
            data.push(newRow);

            // Update sheet
            const newSheet = xlsx.utils.json_to_sheet(data);
            workbook.Sheets[sheetName] = newSheet;
        } else {
            // Create a new workbook and sheet
            workbook = xlsx.utils.book_new();
            const newSheet = xlsx.utils.json_to_sheet([newRow]);
            xlsx.utils.book_append_sheet(workbook, newSheet, 'Subscribers');
        }

        // Write the file to the system
        xlsx.writeFile(workbook, filePath);

        return res.status(200).json({
            message: 'Successfully saved to Excel sheet!',
            savedLocally: true,
            path: filePath
        });

    } catch (error) {
        console.error('Newsletter Excel Error:', error);
        return res.status(500).json({ message: 'Failed to save to Excel sheet', error: String(error) });
    }
}
