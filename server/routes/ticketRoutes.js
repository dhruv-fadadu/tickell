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
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Define the routes
router.post("/", verifyToken, validateCreateTicket, createTicket);
router.get("/", getTickets);
router.get("/:id", getTicketById);
router.put("/:id", verifyToken, validateUpdateTicket, updateTicket);
router.delete("/:id", verifyToken, deleteTicket);

module.exports = router;
