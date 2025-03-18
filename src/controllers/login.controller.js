const { Usuario } = require("../models/Usuario.js");
const bcrypt = require("bcryptjs");
const generarJWT = require("../helpers/generarJWT.js");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loggeduser = await Usuario.findOne({
      where: { email },
      attributes: {
        exclude: ["token"],
      },
    });

    if (!loggeduser) {
      const error = new Error("El Player no Existe");
      return res.status(401).json({ msg: error.message });
    }
    //Verificar la contraseña
    const validPassword = await bcrypt.compare(password, loggeduser.password);

    if (!validPassword) {
      const error = new Error("El Password es Incorrecto");
      return res.status(401).json({ msg: error.message });
    } else {
      const token = generarJWT(loggeduser.id, loggeduser.username);
      // Guardar token en la base de datos
      await Usuario.update(
        { token },
        {
          where: {
            email,
          },
        }
      );
      console.log({
        status: "Success",
        is_Active: true,
        message: "Usuario logueado",
        loginData: loggeduser.dataValues,
        tokenUser: token,
      });
      res.status(200).json({
        status: "Success",
        is_Active: true,
        message: "Usuario logueado",
        loginData: loggeduser.dataValues,
        tokenUser: token,
      });
    }
  } catch (error) {
    console.log({
      status: "Error",
      message: error.message,
      mensajeDelProgramador: "Login fallido",
    });
    res.status(500).json({
      status: "Error",
      message: error.message,
      mensajeDelProgramador: "Login fallido",
    });
  }
};

const perfilUser = async (req, res) => {
  try {
    const { usuario } = req.body;
    res.json(usuario);
  } catch (error) {
    console.log({
      status: "Error",
      message: error.message,
      mensajeDelProgramador: "Búsqueda de datos fallido",
    });
    res.status(500).json({
      status: "Error",
      message: error.message,
      mensajeDelProgramador: "Búsqueda de datos fallido",
    });
  }
};

module.exports = { userLogin, perfilUser };
