const Sequelize = require("sequelize");
const { db } = require("../config/db.js");

const Usuario = db.define("usuarios", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tipo_usuario: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
});

module.exports = { Usuario };
