const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { User } = require("../models/userModel");

// Controller to handle user registration
const registerUser = async (req, res) => {
  const { username, email, password, phone_num, profile_info, role } = req.body;

  try {
    const newUser = await User.create({
      username,
      email,
      password_hash: password,
      phone_num,
      profile_info,
      role,
    });
    return res.status(201).json({
      message: "User registerd successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error while registering user", error: error.message });
  }
};

// User login and password verification
const loginUser = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: { user_id: user.user_id, email: user.email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  console.log("Get Users");
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
