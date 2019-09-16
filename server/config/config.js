const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'mk_cms',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false
  },
  deployedEnv: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'mk_cms',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'mk_cms',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'mk_cms',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false
  }
};
