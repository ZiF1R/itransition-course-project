"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const OptionalFieldType = require("./OptionalFieldType");
const Collection = require("../Collection");

const optionalField = sequelize.define("OptionalField", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

optionalField.collectionID = optionalField.hasOne(OptionalFieldType);
optionalField.typeID = optionalField.hasOne(Collection);

module.exports = optionalField;
