const { createPublicSchema } = require('./create_public_schema');
const { createEmailsTable } = require('./create_emails_table');
const { createUsersTable } = require('./create_users_table');

async function migrationsRun() {
    const funcTag = "[migrationsRun]";
    console.log(`${funcTag} Running migrations`);

    await createPublicSchema();
    await createEmailsTable();
    await createUsersTable();
}

module.exports = { migrationsRun };