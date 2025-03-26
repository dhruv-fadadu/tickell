const { DataTypes, Model, Sequelize } = require("sequelize");

const sequelize = require("../config/db");

class Event extends Model {}

Event.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    event_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    start_date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    train_num: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    event_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Event",
    tableName: "events",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["event_name", "user_id", "start_date_time", "venue"],
      },
    ],
  }
);

module.exports = { Event };
