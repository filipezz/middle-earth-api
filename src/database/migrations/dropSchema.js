const connection = require('../migrations');

async function dropSchema() {
  await connection.query('DROP SCHEMA `middle_bnb`');

  await connection.end();
}

dropSchema();
