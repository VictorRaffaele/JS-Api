const { query } = require('../../config/database');
const { validateData, nameExists } = require('./user_validations');
const crypto = require('crypto');

async function userCreate (req, res) {
    const funcTag = '[userCreate]';
    try {
        console.log(`${funcTag} Starting user insert process`);
        const { username, email, password } = req.body;

        const invalid = await validateData('create', username, password);
        if (invalid) {
            throw invalid;
        }

        const exists = await nameExists(username);
        if (exists) {
            throw exists;
        }

        const resp = await fetch(
            'http://localhost:3000/api/emails/create', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email }),
        });
        const responseData = await resp.json();

        if (!resp.ok) {
            console.error(`${funcTag} Email creation failed: ${responseData.error}`);
            throw new Error(responseData.error);
        }

        console.log(`${funcTag} Inserting user data in users table`);
        const userQuery = `
            INSERT INTO users (user_id, username, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const user = await query(userQuery, [crypto.randomUUID(), username, responseData.data.email_id, password]);
        console.log(`${funcTag} User created successfully`);
        res.status(201).json( { data: user.rows[0], message: 'User created', error: null } );
    } catch (error) {
        console.error(`${funcTag} User creation failed: ${error.message}`);
        res.status(400).json({ data: null, message: 'An error has occurred', error: error.message });
    }
}

module.exports = { userCreate };