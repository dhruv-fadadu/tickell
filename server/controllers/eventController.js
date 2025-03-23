const { Event } = require("../models/eventModel");

const registerEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    return res.status(201).json({
      message: "Event registered successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error while registering event", error: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching all events",
      error: error.message,
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", error: error.message });
    }
    return res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while fetching a event", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", error: error.message });
    }
    const updatedEvent = await event.update(req.body);
    return res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Error while updating the event",
        error: error.message,
      });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", error: error.message });
    }
    await event.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: "Someting went wrong, while deleting the event",
      error: error.message,
    });
  }
};

module.exports = {
  registerEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
