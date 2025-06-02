const express = require("express");
const router = express.Router();
const {
  registerEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { validateEvent } = require("../middleware/eventMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");

// router to register new event
router.post("/register", verifyToken, validateEvent, registerEvent);

// routers to fetch event details
router.get("/", getEvents);
router.get("/:id", getEventById);

// routers to update the event
router.put("/:id", verifyToken, validateEvent, updateEvent);

// router to delete the event
router.delete("/:id", verifyToken, deleteEvent);

module.exports = router;
