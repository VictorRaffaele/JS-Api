const { query } = require('../../config/database');
const { validateData, emailExists } = require('./email_validations');

async function updateEmail(req, res) {
    const funcTag = '[updateEmail]';
    try {
        const { email_id, email } = req.body;

        const valid = validateData('update', email, email_id)
        if (valid) {
            throw valid;
        }

        const exists = await emailExists(email_id);
        if (exists) {
            throw exists;
        }

        console.log(`${funcTag} Updating email data in emails table`);
        textQuery = `
            UPDATE emails
            SET email = $1, updated_at = NOW()
            WHERE email_id = $2
            RETURNING email_id;
        `;
        const emailData = await query(textQuery, [email, email_id]);
        console.log(`${funcTag} Email updated`);
        res.status(200).json({ data: emailData.rows[0], message: 'Email updated', error: null });
    } catch (error) {
        console.error(`${funcTag} Email update failed: ${error.message}`);
        res.status(400).json({ data: null, message: 'An error has occurred', error: error.message });
    }
}

module.exports = { updateEmail };