const express = require("express");
const {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");
const {
  validateCreateTicket,
  validateUpdateTicket,
} = require("../middleware/ticketMiddleware");

const router = express.Router();

// Define the routes
router.post("/", validateCreateTicket, createTicket);
router.get("/", getTickets);
router.get("/:id", getTicketById);
router.put("/:id", validateUpdateTicket, updateTicket);
router.delete("/:id", deleteTicket);

module.exports = router;
