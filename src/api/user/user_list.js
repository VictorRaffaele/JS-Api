const { query } = require('../../config/database');

async function userList(req, res) {
    const funcTag = '[userList]';
    try {
        console.log(`${funcTag} Starting user list process`);
        const textQuery = `
            SELECT u.user_id, u.username, e.email
            FROM users u
            JOIN emails e ON u.email = e.email_id;
        `;
        const userData = await query(textQuery);
        console.log(`${funcTag} User list retrieved successfully`);
        res.status(200).json({ data: userData.rows, message: 'User list retrieved', error: null });
    } catch (error) {
        console.error(`${funcTag} User list retrieval failed: ${error.message}`);
        res.status(400).json({ data: null, message: 'An error has occurred', error: error.message });
    }
}

async function getEmailIdbyUserId(req, res) {
    const funcTag = '[getEmailIdbyUser]';
    try {
        console.log(`${funcTag} Getting email ID`);
        const { user_id } = req.params;
        const emailId = await query(`SELECT email FROM users WHERE user_id = $1`, [user_id]);
        if (emailId.rows.length === 0) {
            return res.status(404).json({ data: null, message: 'Email not found', error: null });
        }
        console.log(`${funcTag} Email ID retrieved successfully`);
        res.status(200).json({ data: emailId.rows[0], message: 'Email ID retrieved', error: null });
    } catch (error) {
        console.error(`${funcTag} Error getting email ID: ${error.message}`);
        res.status(400).json({ data: null, message: 'An error has occurred', error: error.message });
    }   
}

module.exports = { userList, getEmailIdbyUserId };