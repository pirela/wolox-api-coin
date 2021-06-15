import express from "express";

import { postUserCoin, getTopUserCoin } from "./userCoin/index";

import { check } from "express-validator";

const userCoinRoutes = express.Router();

userCoinRoutes.post(
  "/",
  [check("idCoin", "idCoin is required").notEmpty()],
  postUserCoin()
);
userCoinRoutes.get("/top/:asc/:limit", getTopUserCoin());

export default userCoinRoutes;
