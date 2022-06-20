"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

module.exports = sequelize.define("OptionalFieldType", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
