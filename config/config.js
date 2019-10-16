require('dotenv').config();

module.exports = 
{
  "development": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASS || "password",
    "database": "SAS",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASS || "password",
    "database": "SAS",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASS || "password",
    "database": "SAS",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};
