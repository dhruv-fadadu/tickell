const { Ticket } = require("../models/ticketModel");
const {
  successResponse,
  clientResponse,
  serverResponse,
} = require("../utils/responseHandler");

const createTicket = async (req, res) => {
  try {
    const { event_id, seat_no } = req.body;

    const existingTicket = await Ticket.findOne({
      where: { event_id, seat_no },
    });
    if (existingTicket) {
      clientResponse(
        res,
        409,
        "Duplicate ticket entry: Seat already booked for this event"
      );
    }

    const ticket = await Ticket.create(req.body);
    successResponse(res, 201, "Ticket created successfully", ticket);
  } catch (error) {
    serverResponse(res, 500, "Error while creating ticket", error);
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    successResponse(res, 200, "Success", tickets);
  } catch (error) {
    serverResponse(res, 500, "Error fetching tickets", error);
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      clientResponse(res, 404, "Ticket not found");
    }
    successResponse(res, 200, "Success", ticket);
  } catch (error) {
    serverResponse(res, 500, "Error fetching ticket", error);
  }
};

const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      clientResponse(res, 404, "Ticket not found");
    }
    const updatedTicket = await ticket.update(req.body);
    successResponse(res, 200, "Ticket updated successfully", updatedTicket);
  } catch (error) {
    serverResponse(res, 500, "Error updating ticket", error);
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      clientResponse(res, 404, "Ticket not found");
    }
    await ticket.destroy();
    successResponse(res, 204);
  } catch (error) {
    serverResponse(res, 500, "Error deleting ticket", error);
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
