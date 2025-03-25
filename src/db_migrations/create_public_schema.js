const { query } = require('../config/database');

function createPublicSchema() {
    const funcTag = "[createPublicSchema]";
    try{
        console.log(`${funcTag} Creating public schema`);

        const queryText = `CREATE SCHEMA IF NOT EXISTS public;`;
        return query(queryText);
    } catch (err) {
        console.log(`${funcTag} Error creating public schema: ` + err);
    }
}

module.exports = { createPublicSchema };