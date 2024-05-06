const Sequelize = require("sequelize");
const DB_NAME = process.env.DB_NAME;

const database = new Sequelize(
  DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mysql",
    dialectOptions: { decimalNumbers: true },
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    define: {
      underscored: true,
      freezeTableName: true,
    },
    host: process.env.DB_HOST,
    logging:
      process.env.DB_LOG === "true" ? (e) => console.log(`${e}\n`) : () => {},
  }
);

module.exports = database;
