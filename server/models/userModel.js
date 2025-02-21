const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");

const sequelize = require("../config/db");

class User extends Model {}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone_num: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    profile_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "buyer", "seller"),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password_hash = await bcrypt.hash(user.password_hash, salt);
});

User.beforeUpdate((user) => {
  user.updated_at = new Date();
});

const findUserByEmail = async (email) => {
  try {
    const matchedUser = await User.findOne({
      where: {
        email: email,
      },
    });
    return matchedUser;
  } catch (error) {
    console.error("Error while finding the user by email: ", error);
    throw error;
  }
};

module.exports = { User, findUserByEmail };
