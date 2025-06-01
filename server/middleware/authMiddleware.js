const jwt = require("jsonwebtoken");
const { clientResponse, successResponse } = require("../utils/responseHandler");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyToken = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    return clientResponse(res, 403, "Access denied. No token provided");
  }

  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (error) {
    if (!refreshToken) {
      return clientResponse(
        res,
        401,
        "Access Denied. No refresh token provided.",
        error
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

      return next();
    } catch (error) {
      return clientResponse(res, 400, "Invalid Token.", error);
    }
  }
};
