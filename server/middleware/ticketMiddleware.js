const { clientResponse } = require("../utils/responseHandler");

const validateRequiredFields = (req, res, next) => {
  const { event_id, user_id, selling_price, original_price, seat_no } =
    req.body;
  if (!event_id || !user_id || !selling_price || !original_price || !seat_no) {
    return clientResponse(res, 400, "Missing required fields");
  }
  return next();
};

const validateStatus = (req, res, next) => {
  const { status } = req.body;
  if (status && !["available", "sold", "unsold"].includes(status)) {
    return clientResponse(res, 400, "Invalid ticket status value");
  }
  return next();
};

exports.validateCreateTicket = [validateRequiredFields, validateStatus];
exports.validateUpdateTicket = [validateStatus];
