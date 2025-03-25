const { query } = require('../config/database');

async function existTable(tableName) {
    const funcTag = "[existTable]";
    try{
      console.log(`${funcTag} Checking if table exists`);

      const queryText = `
          SELECT EXISTS (
              SELECT FROM information_schema.tables 
              WHERE table_name = $1
          );`;
      const params = [tableName];

      return query(queryText, params);
    } catch (err) {
      console.log(`${funcTag} Error checking if table exists: ` + err);
      throw err;
    }
}

async function existColumn(tableName, columnName) {
    const funcTag = "[existColumn]";
    try{
      console.log(`${funcTag} Checking if column exists`);

      const queryText = `
          SELECT EXISTS (
              FROM information_schema.columns
              WHERE table_name = $1 AND column_name = $2
          );`;
      const params = [tableName, columnName];

      return query(queryText, params);
    } catch (err) {
      console.log(`${funcTag} Error checking if column exists: ` + err);
    }
}

module.exports = {
    existTable,
    existColumn,
};