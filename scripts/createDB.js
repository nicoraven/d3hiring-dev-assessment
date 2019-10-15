require('dotenv').config();

const mysql = require('mysql2/promise');

const dbName = process.env.DB_SCHEMAS || 'SAS';

mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || '3306',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || null,
}).then((connection) => {
  connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
    console.info('Database created or successfully checked');
    process.exit(0);
  });
});
