const { User } = require("../models/userModel");
const { clientResponse, serverResponse } = require("../utils/responseHandler");

const validateCreateUser = async (req, res, next) => {
  const { username, email, password, phone_num, role } = req.body;

  // validate that all required fields are present
  if (!username || !email || !password || !phone_num || !role) {
    return clientResponse(res, 400, "Required fields are missing");
  }

  // check if the username is taken
  try {
    const existinUserWithUsername = await User.findOne({ where: { username } });
    if (existinUserWithUsername) {
      return clientResponse(res, 409, "Username is already taken");
    }
  } catch (error) {
    return serverResponse(
      res,
      500,
      "Error while finding the user by username",
      error
    );
  }

  // check if the email is taken
  try {
    const existingUserWithEmail = await User.findOne({ where: { email } });
    if (existingUserWithEmail) {
      return clientResponse(res, 409, "Email is already taken");
    }
  } catch (error) {
    return serverResponse(
      res,
      500,
      "Error while finding the user by email",
      error
    );
  }

  // password length check
  if (password.length < 6) {
    return clientResponse(
      res,
      422,
      "Password must be at least 6 characters long"
    );
  }

  // validate phone number
  try {
    const exisitingUserPhoneNum = await User.findOne({ where: { phone_num } });
    if (exisitingUserPhoneNum) {
      return clientResponse(res, 409, "Contact number is already taken");
    }
  } catch (error) {
    return serverResponse(
      res,
      500,
      "Error while finding the user by phone number",
      error
    );
  }

  next();
};

module.exports = { validateCreateUser };
