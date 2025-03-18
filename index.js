const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const { db } = require("./src/config/db.js");
const rutasIndex = require("./src/routes/index.routes.js");

//Conectar a la base de datos
db.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 3000;

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      // El origen del Request esta permitido
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

/* app.use(cors(corsOptions)); */
/* app.use(helmet()); */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", rutasIndex);

app.listen(PORT, () => {
  console.log(
    `SERVIDOR LEVANTANDO EN EL PUERTO: ${PORT} - PID: ${process.pid}`
  );
});
