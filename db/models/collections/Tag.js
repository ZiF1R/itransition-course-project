"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const Item = require("./Item");

const tag = sequelize.define("Tag", {
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

tag.collectionID = tag.hasMany(Item);

module.exports = tag;
