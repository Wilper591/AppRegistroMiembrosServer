const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      
      return next();
    } catch (error) {
      const e = new Error("Token no Válido");
      res.status(403).json({ msg: e.message });
    }
  }
  if (!token) {
    const error = new Error("Token no Válido o inexistente");
    res.status(403).json({ msg: error.message });
  }
  next();
};

module.exports = checkAuth;
