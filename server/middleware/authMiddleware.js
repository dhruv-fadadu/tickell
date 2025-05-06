const jwt = require("jsonwebtoken");
const { clientResponse } = require("../utils/responseHandler");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyToken = (req, res, next) => {
  const token = req.headers?.token?.split(" ")[0];

  if (!token) {
    clientResponse(res, 403, "Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    clientResponse(res, 401, "Invalid token");
  }
};
