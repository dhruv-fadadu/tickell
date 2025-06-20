const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const sequelize = require("./config/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("Hello, PostgreSQL!");
});

sequelize
  .sync()
  .then(() => console.log("Database connected and synced"))
  .catch((err) => console.error("Error syncing database: ", err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
