/* eslint-disable camelcase */
"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const Item = require("./Item");
const CollectionOptionalField =
  require("../CollectionOptionalField");

const optionalField = sequelize.define("item_optional_field", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

optionalField.item_id = optionalField.hasOne(Item);
optionalField.collection_optional_field_id =
  optionalField.hasOne(CollectionOptionalField);

module.exports = optionalField;
