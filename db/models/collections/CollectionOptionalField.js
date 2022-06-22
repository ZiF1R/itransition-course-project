/* eslint-disable camelcase */
"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const OptionalFieldType = require("./OptionalFieldType");
const Collection = require("./Collection");

const optionalField = sequelize.define("collection_optional_field", {
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

optionalField.collection_id = optionalField.hasOne(Collection);
optionalField.type_id = optionalField.hasOne(OptionalFieldType);

module.exports = optionalField;
