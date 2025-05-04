const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/userController");
const { validateCreateUser } = require("../middleware/userMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");

// Route to register a new user
router.post("/register", validateCreateUser, registerUser);

// Route to login a user
router.post("/login", loginUser);

// Route to get all users (admin only or protected)
router.get("/", verifyToken, getUsers);

module.exports = router;
