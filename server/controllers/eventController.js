const { Event } = require("../models/eventModel");
const {
  successResponse,
  clientResponse,
  serverResponse,
} = require("../utils/responseHandler");

const registerEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    successResponse(res, 201, "Event registered successfully", newEvent);
  } catch (error) {
    serverResponse(res, 500, "Error while registering event", error);
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    successResponse(res, 200, "Success", events);
  } catch (error) {
    serverResponse(res, 500, "Error while fetching all events", error);
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      clientResponse(res, 404, "Event not found");
    }
    successResponse(res, 200, "Success", event);
  } catch (error) {
    serverResponse(res, 500, "Error while fetching a event", error);
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      clientResponse(res, 404, "Event not found");
    }
    const updatedEvent = await event.update(req.body);
    successResponse(res, 200, "Event updated successfully", updatedEvent);
  } catch (error) {
    serverResponse(res, 500, "Error while updating the event", error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      clientResponse(res, 404, "Event not found");
    }
    await event.destroy();
    successResponse(res, 204);
  } catch (error) {
    serverResponse(
      res,
      500,
      "Someting went wrong, while deleting the event",
      error
    );
  }
};

module.exports = {
  registerEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
