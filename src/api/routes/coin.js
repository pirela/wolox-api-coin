import express from "express";

import { getCoinLimit } from "./coin/index";

const coinRoutes = express.Router();

//Rutas y validacion de los endpoint

coinRoutes.get("/all/:cantidad", getCoinLimit());

export default coinRoutes;
