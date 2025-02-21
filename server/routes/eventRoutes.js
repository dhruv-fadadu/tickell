const express = require("express");
const router = express.Router();

// router to register new event
router.post("/register");

// router to fetch all the events
router.get("/");

module.exports = router;
