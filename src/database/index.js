const mysql = require('mysql');
const databaseConfig = require('../config/database');

const pool = mysql.createPool(databaseConfig);

module.exports = pool;
