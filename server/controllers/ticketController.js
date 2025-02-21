const Ticket = require("../models/Ticket");

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.getAll();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.getById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createTicket = async (req, res) => {
  const { title, description, price, event_date } = req.body;
  try {
    const newTicket = await Ticket.create({
      title,
      description,
      price,
      event_date,
    });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
};
