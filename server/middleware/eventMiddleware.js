const validateEvent = async (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
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
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Validation for category-specific fields
    if (category.toLowerCase() === "train") {
      if (!train_num) {
        return res.status(400).json({
          error: "For train events, train_num is required.",
        });
      }
    } else if (category.toLowerCase() === "concert") {
      if (!venue) {
        return res.status(400).json({
          error: "For concert events, venue is required.",
        });
      }
    }
  }

  next();
};

module.exports = { validateEvent };
