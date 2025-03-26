const validateRequiredFields = (req, res, next) => {
  const { event_id, user_id, selling_price, original_price, seat_no } =
    req.body;
  if (!event_id || !user_id || !selling_price || !original_price || !seat_no) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  next();
};

const validateStatus = (req, res, next) => {
  const { status } = req.body;
  if (!["available", "sold", "unsold"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  next();
};

exports.validateCreateTicket = [validateRequiredFields, validateStatus];
exports.validateUpdateTicket = [validateStatus];
