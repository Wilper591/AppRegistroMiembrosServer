const jwt = require("jsonwebtoken");

const generarJWT = (id, tipo) => {
  return jwt.sign({ id, tipo }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

module.exports = generarJWT;
