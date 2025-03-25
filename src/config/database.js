const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
});

async function queryPostgres(query, params) {
    const funcTag = "[queryPostgres]";
    console.log(`${funcTag} Connecting to database`);    
    const client = await pool.connect();

    try {
        console.log(`${funcTag} Starting transaction`);
        await client.query('BEGIN');

        console.log(`${funcTag} Running query`);
        const resp = await client.query(query, params);

        console.log(`${funcTag} Committing transaction`);
        await client.query('COMMIT');

        return resp;
    } catch (err) {
        console.log(`${funcTag} Error running query: ` + err);
        console.log(`${funcTag} Rolling back transaction`);
        await client.query('ROLLBACK');

        throw err;
    } finally {
        client.release();
    }
}

module.exports = {
    query: (query, params) => queryPostgres(query, params),
    pool,
};