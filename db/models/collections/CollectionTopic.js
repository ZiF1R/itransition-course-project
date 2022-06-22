"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

module.exports = sequelize.define("collection_topic", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
