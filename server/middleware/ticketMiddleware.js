const { clientResponse } = require("../utils/responseHandler");

const validateRequiredFields = (req, res, next) => {
  const { event_id, user_id, selling_price, original_price, seat_no } =
    req.body;
  if (!event_id || !user_id || !selling_price || !original_price || !seat_no) {
    clientResponse(res, 400, "Missing required fields");
  }
  next();
};

const validateStatus = (req, res, next) => {
  const { status } = req.body;
  if (status && !["available", "sold", "unsold"].includes(status)) {
    clientResponse(res, 400, "Invalid ticket status value");
  }
  next();
};

exports.validateCreateTicket = [validateRequiredFields, validateStatus];
exports.validateUpdateTicket = [validateStatus];
