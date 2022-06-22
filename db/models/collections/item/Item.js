/* eslint-disable camelcase */
"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../../db");
const Collection = require("../Collection");

const item = sequelize.define("item", {
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

item.collection_id = item.hasOne(Collection);

module.exports = item;
