"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

module.exports = sequelize.define("optional_field_type", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
