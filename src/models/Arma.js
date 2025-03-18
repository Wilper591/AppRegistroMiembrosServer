const Sequelize = require("sequelize");
const { db } = require("../config/db.js");

const Arma = db.define("armas", {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = { Arma };