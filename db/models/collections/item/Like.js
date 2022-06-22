/* eslint-disable camelcase */
"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../../db");
const Item = require("./Item");
const User = require("../../Users");

const like = sequelize.define("likes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

like.user_id = like.hasOne(User);
like.item_id = like.hasOne(Item);

module.exports = like;
