const { query } = require('../../config/database');
const { validateData } = require('./email_validations');

async function deleteEmail(req, res) {
    const funcTag = '[deleteEmail]';
    try {
        console.log(`${funcTag} Starting email deletion process`);

        const { email_id } = req.body;
        const valid = validateData('delete', null, email_id)
        if (valid) {
            throw valid;
        }

        console.log(`${funcTag} Deleting email data in emails table`);
        textQuery = `
            DELETE FROM emails
            WHERE email_id = $1
            RETURNING email_id;
        `;
        const emailData = await query(textQuery, [email_id]);
        console.log(`${funcTag} Email deleted successfully`);
        res.status(200).json({ data: emailData.rows[0], message: 'Email deleted', error: null });
    } catch (error) {
        console.error(`${funcTag} Email deletion failed: ${error.message}`);
        res.status(400).json({ data: null, message: 'An error has occurred', error: error.message });
    }
}
module.exports = { deleteEmail };