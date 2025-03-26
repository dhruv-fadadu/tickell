const { Ticket } = require("../models/ticketModal");

const createTicket = async (req, res) => {
  try {
    const { event_id, seat_no } = req.body;

    const existingTicket = await Ticket.findOne({
      where: { event_id, seat_no },
    });
    if (existingTicket) {
      return res.status(400).json({
        message: "Duplicate ticket found",
        error: "Duplicate ticket entry: Seat already booked for this event",
      });
    }

    const ticket = await Ticket.create(req.body);
    return res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error while creating ticket", error: error.message });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    return res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching tickets", error: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching ticket", error: error.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      return res.status(400).json({ message: "Ticket not found" });
    }
    const updatedTicket = await ticket.update(req.body);
    return res
      .status(200)
      .json({ message: "Ticket updated successfully", ticket: updatedTicket });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating ticket", error: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      return res.status(400).json({ message: "Ticket not found" });
    }
    await ticket.destroy();
    return res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error deleting ticket", error: error.message });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
