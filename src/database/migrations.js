const mysql = require('mysql');
const databaseConfig = require('../config/database');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
});

module.exports = connection;
