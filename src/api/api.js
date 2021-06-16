import express from "express";
import jwt from "jsonwebtoken";

import db from "../models";

import updateDBRoutes from "./routes/updateDB";
import userCoinRoutes from "./routes/userCoin";

/**
 * Declaracion de los modelos a utilizar
 */
const ModelUser = db.user;

/**
 * Declaracion de las rutas privadas
 */

const apiRoutes = express.Router();

apiRoutes.get("/", (req, res) => {
  res.status(200).json({
    data: {
      title: "API ROOT",
      message:
        "this is the root of the API you need to login to access the API!",
    },
  });
});

/**
 *En caso de no encontrar la ruta retornamos un 404 diciendo Oooops! 404
 *en caso contrario continuamos con la ejecucion
 */
apiRoutes.use("/", async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET_API, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Authentication failed." });
      }
      const user = await ModelUser.findOne({
        attributes: ["id", "idMoney"],
        where: {
          userName: decoded.user.userName,
        },
      });
      if (!user) {
        return res
          .status(403)
          .json({ error: "Could not validate this user.." });
      }
      req.user = user;
      next();
    });
  } else {
    logger.error("No token provided.");
    return res.status(403).json({
      error: "No token provided.",
    });
  }
});

//apiRoutes.use("/user", userRoutes); en caso de quere hacer el CRUD completo de los usuarios
apiRoutes.use("/update-db", updateDBRoutes);
apiRoutes.use("/user-coin", userCoinRoutes);

export default apiRoutes;
