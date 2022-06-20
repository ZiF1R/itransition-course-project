"use strict";

const { host, user, pass, dbname, port } = require("./db.constants");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${dbname}`, {
  dialectOptions: {
    options: {
      encrypt: true
    }
  }
});

module.exports = sequelize;
