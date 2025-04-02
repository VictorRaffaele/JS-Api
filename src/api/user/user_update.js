const { query } = require('../../config/database');
const { validateData } = require('./user_validations');

async function userUpdate(req, res) {
  const funcTag = '[userUpdate]';
  try {
      console.log(`${funcTag} Starting user update process`);
      
      const { user_id, username, password, email } = req.body;
      const invalidData = await validateData('update', username, password, email, user_id);
      if (invalidData) {
          throw invalidData;
      }

      const oldEmailId = await getEmailId(user_id);
      if (oldEmailId instanceof Error) {
          throw oldEmailId;
      }

      const newEmailId = await createNewEmail(email);
      if (newEmailId instanceof Error) {
          throw newEmailId;
      }

      console.log(`${funcTag} Updating user data in users table`);
      const { params, setClause } = updateUserParams(username, password, newEmailId);
      const setClauseString = setClause.join(', ');
      const textQuery = `
          UPDATE users
          SET ${setClauseString}, updated_at = NOW()
          WHERE user_id = '${user_id}'
          RETURNING user_id;`;
      const update = await query(textQuery, params);

      if (oldEmailId) {
          const removed = await removeOldEmail(oldEmailId);
          if (removed instanceof Error) {
              console.error(`${funcTag} Error removing old email: ${removed.message}`);
          }
      }

      console.log(`${funcTag} User updated successfully`);
      res.status(200).json({ data: update.rows[0], message: 'User updated', error: null });
  } catch (error) {
      console.error(`${funcTag} Error during user update: ${error.message}`);
      return res.status(400).json({ data: null, message: 'An error has occurred', error: error.message });
  }
}

async function createNewEmail(email) {
    const funcTag = '[createNewEmail]';
    try {
        console.log(`${funcTag} Creating new email`);
        const resp = await fetch(
          `http://localhost:3000/api/emails/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        });
        if (!resp.ok) {
            console.error(`${funcTag} Error creating new email: ${resp.statusText}`);
            throw new Error(resp.statusText);
        }
        const responseData = await resp.json();
        console.log(`${funcTag} New email created successfully`);
        return responseData.data.email_id;
    } catch (error) {
        console.error(`${funcTag} Error creating new email: ${error.message}`);
        return error;
    }
}

function updateUserParams(username, password, email) {
  const funcTag = '[updateUserParams]';
  try {
      console.log(`${funcTag} Updating user parameters`);
      let params = [];
      let setClause = [];
      if (username) {
          params.push(username);
          setClause.push(`username = $${params.length}`);
      }
      if (password) {
          params.push(password);
          setClause.push(`password = $${params.length}`);
      }
      if (email) {
          params.push(email);
          setClause.push(`email = $${params.length}`);
      }
      return { params, setClause };
  } catch (error) {
      console.error(`${funcTag} Error updating user parameters: ${error.message}`);
      return error;
  }
}

async function getEmailId(user_id) {
  const funcTag = '[getEmailId]';
  try {
      console.log(`${funcTag} Getting email ID by name`);
      const resp = await fetch(
        `http://localhost:3000/api/users/email_id/${user_id}`, {
        method: "GET"
      });
      if (!resp.ok) {
          console.error(`${funcTag} Error getting email ID: ${resp.statusText}`);
          throw new Error(resp.statusText);
      }
      const emailID = await resp.json()
      console.log(`${funcTag} Email ID retrieved successfully`);
      return emailID.data.email;
  } catch (error) {
      console.error(`${funcTag} Error getting email ID: ${error.message}`);
      return error;
  }
}

async function removeOldEmail(email_id) {
    const funcTag = '[removeOldEmail]';
    try {
        console.log(`${funcTag} Removing old email`);
        const resp = await fetch(
          `http://localhost:3000/api/emails/delete`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email_id }),
        });
        if (!resp.ok) {
            throw new Error('Failed to remove old email');
        }
        console.log(`${funcTag} Old email removed successfully`);
        return null;
    } catch (error) {
        console.error(`${funcTag} Error removing old email: ${error.message}`);
        return error;
    }
}

module.exports = { userUpdate };