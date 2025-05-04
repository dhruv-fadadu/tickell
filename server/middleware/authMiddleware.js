const jwt = require("jsonwebtoken");
const { clientResponse } = require("../utils/responseHandler");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyToken = (req, res, next) => {
  const token = req.headers?.token?.split(" ")[0];
  console.log("verifyToken token = ", token);

  if (!token) {
    clientResponse(res, 403, "Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("verifyToken = ", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    clientResponse(res, 401, "Invalid token");
  }
};
