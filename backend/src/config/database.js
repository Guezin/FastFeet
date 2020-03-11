require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.APP_DB_HOST,
  username: process.env.APP_DB_USER,
  password: process.env.APP_DB_PASS,
  database: process.env.APP_DB_NAME,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
