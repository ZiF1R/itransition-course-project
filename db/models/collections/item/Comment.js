/* eslint-disable camelcase */
"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../../db");
const Item = require("./Item");
const User = require("../../Users");

const comment = sequelize.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

comment.user_id = comment.hasOne(User);
comment.item_id = comment.hasOne(Item);

module.exports = comment;
