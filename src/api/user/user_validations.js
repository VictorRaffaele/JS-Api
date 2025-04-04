const { regexName, regexPassword } = require('../api_utils');
const { validadeEmail } = require('../emails/email_validations');
const { query } = require('../../config/database');

async function validateData(validationType, username, password, email, user_id) {
    const funcTag = '[validateData]';
    try {
        console.log(`${funcTag} Validating data`);

        switch (validationType) {
            case 'create':
                const invalidName = validateName(username);
                if (invalidName) {  
                    throw invalidName;
                }
                const invalidPassword = validatePassword(password);
                if (invalidPassword) {
                    throw invalidPassword;
                }
                break;
            case 'update':
                if (username) {
                    const invalidName = validateName(username);
                    if (invalidName) {
                        throw invalidName;
                    }
                    const nameExistsCheck = await nameExists(username);
                    if (nameExistsCheck) {
                        throw nameExistsCheck;
                    }
                }
                if (password) {
                    const invalidPassword = validatePassword(password);
                    if (invalidPassword) {
                        throw invalidPassword;
                    }
                }
                if (email) {
                    const invalidEmail = validadeEmail(email);
                    if (invalidEmail) {
                        throw invalidEmail;
                    }
                }
                if (user_id) {
                    const invalidId = validadeNameId(user_id);
                    if (invalidId) {
                        throw invalidId;
                    }
                }
                break;
            case 'delete':
                if (user_id) {
                    const invalidId = validadeNameId(user_id);
                    if (invalidId) {
                        throw invalidId;
                    }
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

function validateName(username) {
    const funcTag = '[validateName]';
    try {
        console.log(`${funcTag} Validating username`);
        if (!username) {
            throw new Error('Username is required');
        }
        if (typeof username !== 'string' || username.length < 3) {
            throw new Error('Username must be a string with at least 3 characters');
        }
        if (!regexName(username)) {
            throw new Error('Username has invalid format');
        }
        console.log(`${funcTag} Username is valid`);
        return null;
    } catch (error) {
        console.error(`${funcTag} Error validating username: ${error.message}`);
        return error;
    }
}

function validatePassword(password) {
    const funcTag = '[validatePassword]';
    try {
        console.log(`${funcTag} Validating password`);
        if (!password) {
            throw new Error('Password is required');
        }
        if (typeof password !== 'string' || password.length < 6) {
            throw new Error('Password must be a string with at least 6 characters');
        }
        if (!regexPassword(password)) {
            throw new Error('Password has invalid format');
        }
        console.log(`${funcTag} Password is valid`);
        return null;
    } catch (error) {
        console.error(`${funcTag} Error validating password: ${error.message}`);
        return error;
    }
}

async function nameExists(name) {
    const funcTag = '[nameExists]';
    try {
        console.log(`${funcTag} Checking if name exists`);
        const user = await query('SELECT EXISTS (SELECT true FROM users WHERE username = $1);', [name]);
        if (user.rows[0].exists) {
            console.log(`${funcTag} Name already exists`);
            throw new Error('Name already exists');
        }
        console.log(`${funcTag} Name is available`);
        return null;
    } catch (error) {
        console.error(`${funcTag} Error checking name: ${error.message}`);
        return error;
    }
}

function validadeNameId(email_id) {
    const funcTag = '[validadeNameId]';
    try {
        console.log(`${funcTag} Validating name_id`);
        if (!email_id) {
          console.log(`${funcTag} No name_id received`);
          throw new Error('Name ID is required');
        }
        console.log(`${funcTag} Name_id is valid`);
        return null;
    } catch (error) {
        console.error(`${funcTag} Error validating name_id: ${error.message}`);
        return error;
    }
}

module.exports = { validateData, nameExists };