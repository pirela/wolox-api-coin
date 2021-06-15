import express from "express";

import { getCoinLimit } from "./coin/index";

const coinRoutes = express.Router();

coinRoutes.get("/all/:cantidad", getCoinLimit());

export default coinRoutes;
