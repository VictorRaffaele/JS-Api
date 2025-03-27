const crypto = require('crypto');
const { query } = require('../../config/database');
const { validateData, emailExists } = require('./email_validations');

async function createEmail(req, res) {
    const funcTag = '[createEmail]';
    try {
        const { email } = req.body;

        const valid = validateData('create', email, null)
        if (valid) {
            throw valid;
        }

        const exists = await emailExists(email);
        if (exists) {
            throw exists;
        }
        
        console.log(`${funcTag} Inserting email data in emails table`);
        textQuery = `
            INSERT INTO emails (email_id, email)
            VALUES ($1, $2)
            RETURNING email_id;
        `;
        const emailData = await query(textQuery, [crypto.randomUUID(), email]);
        console.log(`${funcTag} Email created`);
        res.status(201).json({ data: emailData.rows[0], message: 'Email created', error: null });
    } catch (error) {
        console.error(`${funcTag} Email creation failed: ${error.message}`);
        res.status(400).json({ data: null, message: 'An error has occurred', error: error.message });
    }
}

module.exports = { createEmail };