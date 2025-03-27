const { query } = require('../../config/database');

async function listEmail(req, res) {
    const funcTag = '[readEmail]';
    try {
        console.log(`${funcTag} Reading email data from emails table`);

        const emailData = await query(`SELECT * FROM emails;`);
        console.log(`${funcTag} Email data read`);
        res.status(200).json({ data: emailData.rows, message: 'Email data read', error: null });
    } catch (error) {
        console.error(`${funcTag} Email data read failed: ${error.message}`);
        res.status(400).json({ data: null, message: 'An error has occurred', error: error.message });
    }
}

module.exports = { listEmail };