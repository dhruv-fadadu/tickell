const jwt = require("jsonwebtoken");
const {
  successResponse,
  clientResponse,
  serverResponse,
} = require("../utils/responseHandler");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

// Refresh token
const refreshUserToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return clientResponse(
      res,
      400,
      "Access Denied. No refresh token provided."
    );
  }
  try {
    const decoded = jwt.verify(refreshToken, SECRET_KEY);
    const accessToken = jwt.sign({ user: decoded.user }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
    });
    return successResponse(
      res,
      200,
      "Refresh token updated successfully",
      decoded.user
    );
  } catch (error) {
    return serverResponse(
      res,
      500,
      "Error while fetching/updating refresh token",
      error
    );
  }
};

module.exports = { refreshUserToken };
