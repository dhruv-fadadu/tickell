// const { Client } = require("pg");
const { Sequelize } = require("sequelize");
require("dotenv").config();

// const client = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

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

// const connectDB = async () => {
//   try {
//     await client.connect();
//     console.log("PostgreSQL connected successfully");
//   } catch (error) {
//     console.log("Error connecting to PostgreSQL: ", error);
//     process.exit(1);
//   }
// };

module.exports = sequelize;
