const { existTable } = require('./migrations_utils');
const { query } = require('../config/database');

async function createEmailsTable() {
  const funcTag = "[createEmailsTable]";
  console.log(`${funcTag} Creating emails table`);

  await existTable('emails')
      .then((res) => {
          if (!res.rows[0].exists) {
              const queryText = `
                  CREATE TABLE IF NOT EXISTS emails (
                      email_id UUID PRIMARY KEY,
                      email VARCHAR(50) UNIQUE NOT NULL,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP
                  )
              `;

              query(queryText)
                  .then(() => console.log(`${funcTag} Emails table created successfully`))
                  .then(() => { createEmailsIndex });
          } else {
                console.log(`${funcTag} Emails table already exists`);
          }
      })
      .catch((err) => console.log(`${funcTag} Error creating emails table: ` + err));
}

function createEmailsIndex() {
    const funcTag = "[createEmailsIndex]";
    try{
        console.log(`${funcTag} Creating index on emails table`);

        const queryText = `CREATE INDEX emails_user_id_idx ON emails(user_id)`;
        query(queryText).then(() => console.log(`${funcTag} Index on user_id created successfully`));
    } catch (err) {
        console.log(`${funcTag} Error creating index on emails table: ` + err);
    }
}

module.exports = { createEmailsTable };