const crypto = require('crypto');
const { query } = require('../../config/database');
const { regexEmail } = require('../api_utils');

async function createEmail(req, res) {
    const funcTag = '[createEmail]';
    try {
        const { email } = req.body;

        const valid = validateData(email)
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

function validateData(email) {
    const funcTag = '[validateData]';
    try {
        console.log(`${funcTag} Validating email data`);

        if (!email) {
            console.log(`${funcTag} No email received`);
            throw new Error('Email is required');
        }
        if (!regexEmail(email)) {
            console.log(`${funcTag} Email has invalid format`);
            throw new Error('Email is invalid');
        }
        return null;
    } catch (error) {
        console.error(`${funcTag} Error validating data: ${error.message}`);
        return error;
    }
}

async function emailExists(email) {
  const funcTag = '[emailExists]';
  try {
      console.log(`${funcTag} Checking if email exists in emails table`);
      const user = await query(`SELECT EXISTS (SELECT true FROM emails WHERE email = $1);`, [email]);
      if (user.rows[0].exists) {
          console.log(`${funcTag} Email already exists`);
          throw new Error('Email already exists');
      }
      return null;
  } catch (error) {
      console.error(`${funcTag} Error checking if email exist: ${error.message}`);
      return error;
  }
}

module.exports = { createEmail };