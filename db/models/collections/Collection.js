"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const CollectionTopic = require("./CollectionTopic");

const collection = sequelize.define("Collection", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

collection.topic = collection.hasMany(CollectionTopic);

module.exports = collection;
