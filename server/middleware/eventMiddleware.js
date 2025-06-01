const { clientResponse } = require("../utils/responseHandler");

const validateEvent = async (req, res, next) => {
  if (["POST", "PUT"].includes(req.method)) {
    const {
      event_name,
      user_id,
      category,
      start_date_time,
      end_date_time,
      train_num,
      venue,
    } = req.body;

    if (
      !event_name ||
      !user_id ||
      !category ||
      !start_date_time ||
      !end_date_time
    ) {
      return clientResponse(res, 400, "Required fields are missing");
    }

    // Validation for category-specific fields
    if (category.toLowerCase() === "train") {
      if (!train_num) {
        return clientResponse(
          res,
          400,
          "For train events, train_num is required"
        );
      }
    } else if (category.toLowerCase() === "concert") {
      if (!venue) {
        return clientResponse(
          res,
          400,
          "For concert events, venue is required"
        );
      }
    }
  }

  return next();
};

module.exports = { validateEvent };
