const { User } = require("../models/userModel");

const validateCreateUser = async (req, res, next) => {
  const { username, email, password, phone_num, role } = req.body;

  // validate that all required fields are present
  if (!username || !email || !password || !phone_num || !role) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  // check if the username is taken
  const existinUserWithUsername = await User.findOne({ where: { username } });
  if (existinUserWithUsername) {
    return res.status(400).json({ message: "Username is already taken" });
  }

  // check if the email is taken
  const existingUserWithEmail = await User.findOne({ where: { email } });
  if (existingUserWithEmail) {
    return res.status(400).json({ message: "Email is already taken" });
  }

  // password length check
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  // validate phone number
  const exisitingUserPhoneNum = await User.findOne({ where: { phone_num } });
  if (exisitingUserPhoneNum) {
    return res.status(400).json({ message: "Contact number is already taken" });
  }

  next();
};

module.exports = { validateCreateUser };
