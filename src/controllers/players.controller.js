const { Player } = require("../models/Player.js");
const { Rol } = require("../models/Rol.js");
const { Arma } = require("../models/Arma.js");
const { Op } = require("sequelize");
const { db } = require("../config/db.js");

const obtenerPlayers = async (req, res) => {
  try {
    const players = await Player.findAll({
      include: [
        { model: Rol, attributes: ["nombre"], as: "rol" },
        { model: Arma, attributes: ["nombre"], as: "arma1" },
        { model: Arma, attributes: ["nombre"], as: "arma2" },
      ],
    });

    if (!players) {
      console.log({
        status: "Error",
        message: "No se pudo encontrar players",
        code: 204,
      });
      res.status(204).json({
        status: "Error",
        message: "No se pudo encontrar players",
        code: 204,
      });
    } else {
      const formattedPlayers = players.map((player) => {
        return {
          id: player.id,
          nombre: player.nombre,
          role: player.rol ? player.rol.nombre : null,
          arma1: player.arma1 ? player.arma1.nombre : null,
          arma2: player.arma2 ? player.arma2.nombre : null,
          puntajePvP: player.puntajePvP,
          puntajePvE: player.puntajePvE,
        };
      });
      console.log({
        status: "Success",
        message: "Players encontradas con exito",
        code: 200,
        result: players,
      });
      res.status(200).send({
        status: "Success",
        is_Active: true,
        message: "Players encontradas con exito",
        code: 200,
        result: formattedPlayers,
      });
    }
  } catch (error) {
    console.log({
      status: "Error",
      message: error.message,
      mensajeDelProgramador: "Consulta de players fallida",
    });
    res.status(500).json({
      status: "Error",
      message: error.message,
      mensajeDelProgramador: "Consulta de players fallida",
    });
  }
};

const obtenerPlayerByName = async (req, res) => {
  try {
    const { username } = req.body;

    const players = await Player.findAll({
      where: {
        nombre: {
          [Op.like]: `%${username}%`,
        },
      },
      include: [
        { model: Rol, attributes: ["nombre"], as: "rol" },
        { model: Arma, attributes: ["nombre"], as: "arma1" },
        { model: Arma, attributes: ["nombre"], as: "arma2" },
      ],
    });

    if (players.length === 0) {
      res.status(404).json({
        status: "Error",
        message: "No se pudo encontrar al player",
        code: 500,
      });
    } else {
      const formattedPlayers = players.map((player) => {
        return {
          id: player.id,
          nombre: player.nombre,
          role: player.rol ? player.rol.nombre : null,
          arma1: player.arma1 ? player.arma1.nombre : null,
          arma2: player.arma2 ? player.arma2.nombre : null,
          puntajePvP: player.puntajePvP,
          puntajePvE: player.puntajePvE,
        };
      });
      res.status(200).json({
        status: "Success",
        is_Active: true,
        message: "Player encontrado con éxito",
        code: 200,
        result: formattedPlayers,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
      mensajeDelProgramador: "Consulta de player fallida",
    });
  }
};

const crearPlayer = async (req, res) => {
  try {
    const { nombre, role_id, arma1_id, arma2_id, puntajePvP, puntajePvE } =
      req.body;

    /* Inicia la transacción */
    const transaction = await db.transaction();

    const newPlayer = await Player.create({
      nombre,
      role_id,
      arma1_id,
      arma2_id,
      puntajePvP,
      puntajePvE,
    });

    if (!newPlayer) {
      await transaction.rollback();
      res.status(404).json({
        status: "Error",
        message: "No se pudo crear al player",
        code: 404,
      });
    } else {
      /* Finaliza transcción */
      await transaction.commit();
      /* Success */
      res.status(200).json({
        status: "Success",
        is_Active: true,
        message: "Player creado Éxitosamente",
        code: 200,
        newRoom: newPlayer.dataValues,
      });
    }
  } catch (error) {
    console.log({
      status: "Error",
      message: error.message,
      mensajeDelProgramador: "Creación de nueva player fallida.",
    });
    res.status(500).json({
      status: "Error",
      message: error.message,
      mensajeDelProgramador: "Creación de nueva player fallida.",
    });
  }
};

module.exports = { obtenerPlayers, obtenerPlayerByName, crearPlayer };