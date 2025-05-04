module.exports = {
  development: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [],
    seederStorage: 'json',
    seederStoragePath: 'sequelizeData.json',
  },
  production: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [],
    seederStorage: 'json',
    seederStoragePath: 'sequelizeData.json',
  },
};
