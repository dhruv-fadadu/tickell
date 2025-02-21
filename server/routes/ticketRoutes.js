const express = require("express");
const {
  getTickets,
  getTicketById,
  createTicket,
} = require("../controllers/ticketController");

const router = express.Router();

// Define the routes
router.get("/", getTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);

module.exports = router;
