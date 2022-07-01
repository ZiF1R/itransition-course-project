/* eslint-disable camelcase */
"use strict";

const { DataTypes } = require("sequelize");

module.exports = function(sequelize) {
  return sequelize.define("tags", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });
};
