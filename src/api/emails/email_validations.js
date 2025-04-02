const { query } = require('../../config/database');
const { regexEmail } = require('../api_utils');

function validateData(validationType, email, email_id) {
    const funcTag = '[validateData]';
    try {
        console.log(`${funcTag} Validating data`);

        switch (validationType) {
          case 'create':
              const invalid = validadeEmail(email)
              if (invalid) {
                  throw invalid;
              }
              break;
          case 'update':
              const invalidEmail = validadeEmail(email)
              if (invalidEmail) {
                  throw invalidEmail;
              }
              const invalidUpdatelId = validadeEmailId(email_id)
              if (invalidUpdatelId) {
                  throw invalidUpdatelId;
              }
              break;
          case 'delete':
              const invalidDeleteId = validadeEmailId(email_id)
              if (invalidDeleteId) {
                  throw invalidDeleteId;
              }
              break;
          default:
              throw new Error('Invalid validation type');
        }
        console.log(`${funcTag} All data is valid`);
        return null;
    } catch (error) {
        console.error(`${funcTag} Error validating data: ${error.message}`);
        return error;
    }
}

function validadeEmail(email) {
    const funcTag = '[validadeEmail]';
    try {
        console.log(`${funcTag} Validating email`);
        if (!email) {
          console.log(`${funcTag} No email received`);
          throw new Error('Email is required');
        }
        if (!regexEmail(email)) {
            console.log(`${funcTag} Email has invalid format`);
            throw new Error('Email is invalid');
        }
        console.log(`${funcTag} Email is present and is valid`);
        return null;
    } catch (error) {
        console.error(`${funcTag} Error validating email: ${error.message}`);
        return error;
    }
  
}

function validadeEmailId(email_id) {
    const funcTag = '[validadeEmailId]';
    try {
        console.log(`${funcTag} Validating email_id`);
        if (!email_id) {
          console.log(`${funcTag} No email_id received`);
          throw new Error('Email ID is required');
        }
        console.log(`${funcTag} Email_id is valid`);
        return null;
    } catch (error) {
        console.error(`${funcTag} Error validating email_id: ${error.message}`);
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
        console.log(`${funcTag} Email does not exist`);
        return null;
    } catch (error) {
        console.error(`${funcTag} Error checking if email exist: ${error.message}`);
        return error;
    }
}

module.exports = { validateData, emailExists, validadeEmail };