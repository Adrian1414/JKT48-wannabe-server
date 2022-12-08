"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Oshi)
      // User.hasMany(models.Member)  
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: { msg: "email must be unique" },
        allowNull: false,
        validate: {
          notEmpty: { msg: "Please insert your username" },
          notNull: { msg: "Please insert your username" },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: { msg: "email must be unique" },
        allowNull: false,
        validate: {
          notEmpty: { msg: "Please insert your email" },
          notNull: { msg: "Please insert your email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Please insert your password" },
          notNull: { msg: "Please insert your password" },
        },
      },
      profilePicture: {
        type: DataTypes.STRING,
        defaultValue:"https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password);
    user.status = "Fans";
  });
  return User;
};
