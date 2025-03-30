const { Sequelize } = require("sequelize");
require("dotenv").config();

const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;

const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

sequelize
  .authenticate()
  .then(() => console.log("Postgres database connected successfully"))
  .catch((err) => console.error("Unable to connect to the database: ", err));

module.exports = sequelize;
