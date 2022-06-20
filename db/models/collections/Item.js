"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const Collection = require("./Collection");

const item = sequelize.define("Item", {
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

item.collectionID = item.hasOne(Collection);

module.exports = item;
