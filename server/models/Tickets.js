const db = require("../config/db");

const Ticket = {
  getAll: async () => {
    try {
      const res = await db.query("SELECT * FROM tickets");
      return res.rows;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const res = await db.query("SELECT * FROM tickets WHERE id = $1", [id]);
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  },

  create: async (ticket) => {
    try {
      const res = await db.query(
        "INSERT INTO tickets (title, description, price, event_date) VALUES ($1, $2, $3, $4) RETURNING *",
        [ticket.title, ticket.description, ticket.price, ticket.event_date]
      );
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Ticket;
