const Sequelize = require("sequelize");
const { db } = require("../config/db.js");

const Rol = db.define("roles", {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = { Rol };
