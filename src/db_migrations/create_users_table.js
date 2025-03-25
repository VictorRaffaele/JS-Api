const { existTable } = require('./migrations_utils');
const { query } = require('../config/database');

async function createUsersTable() {
    const funcTag = "[createUsersTable]";
    console.log(`${funcTag} Creating users table`);

    await existTable('users')
        .then((res) => {
            if (!res.rows[0].exists) {
                const queryText = `
                    CREATE TABLE IF NOT EXISTS users (
                        user_id UUID PRIMARY KEY,
                        username VARCHAR(50) UNIQUE NOT NULL,
                        email UUID REFERENCES emails(email_id),
                        password VARCHAR(255) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP
                    )`;

                query(queryText)
                    .then(() => console.log(`${funcTag} Users table created successfully`))
                    .then(() => { createUsersIndex() });
            } else {
                console.log(`${funcTag} Users table already exists`);
            }
        })
        .catch((err) => console.log(`${funcTag} Error creating users table: ` + err));
}

async function createUsersIndex() {
    const funcTag = "[createUsersIndex]";
    try {
        console.log(`${funcTag} Creating index on users table`);

        await query('CREATE INDEX users_id_idx ON users(user_id);')
            .then(() => console.log(`${funcTag} Index on user_id created successfully`));

        await query('CREATE INDEX users_username_idx ON users(username);')
            .then(() => console.log(`${funcTag} Index on username created successfully`));
    } catch (err) {
        console.log(`${funcTag} Error creating index on users table: ` + err);
    }
}

module.exports = { createUsersTable };