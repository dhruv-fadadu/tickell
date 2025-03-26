const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Ticket extends Model {}

Ticket.init(
  {
    ticket_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    selling_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    original_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    seat_no: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    PNR_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "pnr_no",
    },
    status: {
      type: DataTypes.ENUM("available", "sold", "unsold"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Ticket",
    tableName: "tickets",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = { Ticket };
