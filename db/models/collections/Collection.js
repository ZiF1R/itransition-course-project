/* eslint-disable camelcase */
"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const CollectionTopic = require("./CollectionTopic");
const User = require("../Users");

const collection = sequelize.define("collection", {
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
  image_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

collection.topic = collection.hasMany(CollectionTopic);
collection.user_id = collection.hasOne(User);

module.exports = collection;
