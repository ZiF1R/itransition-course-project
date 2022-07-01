/* eslint-disable camelcase */
"use strict";

const { DataTypes } = require("sequelize");

module.exports = function(sequelize) {
  return sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    last_visit: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });
};
