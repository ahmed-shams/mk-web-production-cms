const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: 'mohamahm',
    database: 'mk_cms_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  },
  deployedEnv: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'mk_cms_test',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'mk_cms_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'mk_cms_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  }
};
