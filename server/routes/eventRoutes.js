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

// router to register new event
router.post("/register", validateEvent, registerEvent);

// routers to fetch event details
router.get("/", getEvents);
router.get("/:id", getEventById);

// routers to update the event
router.put("/:id", validateEvent, updateEvent);

// router to delete the event
router.delete("/:id", deleteEvent);

module.exports = router;
