const Sequelize = require("sequelize");
const { db } = require("../config/db.js");
const { Rol } = require("./Rol.js");
const { Arma } = require("./Arma.js");

const Player = db.define("players", {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role_id: {
    type: Sequelize.INTEGER,
  },
  arma1_id: {
    type: Sequelize.INTEGER,
  },
  arma2_id: {
    type: Sequelize.INTEGER,
  },
  puntajePvP: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  puntajePvE: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

Player.belongsTo(Rol, { foreignKey: "role_id", as: "rol" });
Player.belongsTo(Arma, { foreignKey: "arma1_id", as: "arma1" });
Player.belongsTo(Arma, { foreignKey: "arma2_id", as: "arma2" });

module.exports = { Player };
