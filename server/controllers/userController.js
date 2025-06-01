const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../models/userModel");
const {
  successResponse,
  clientResponse,
  serverResponse,
} = require("../utils/responseHandler");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

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
    return successResponse(res, 201, "User registerd successfully", newUser);
  } catch (error) {
    return serverResponse(res, 500, "Error while registering user", error);
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
      return clientResponse(res, 404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return clientResponse(res, 401, "Invalid credentials");
    }

    const accessToken = jwt.sign({ user_id: user.user_id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ user_id: user.user_id }, SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      // TODO to uncomment for production
      // secure: true,
    });

    const logedInUser = {
      user_id: user.user_id,
      email: user.email,
    };
    return successResponse(res, 200, "Login successful", logedInUser);
  } catch (error) {
    return serverResponse(res, 500, "Error while user login", error);
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return successResponse(res, 200, "Success", users);
  } catch (error) {
    return serverResponse(res, 500, "Error while fetching users", error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
