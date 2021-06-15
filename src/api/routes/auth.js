import express from "express";

import { check } from "express-validator";

import { postLogin, postSignUp } from "./auth/index";

const authRoutes = express.Router();

authRoutes.post(
  "/",
  [
    check("userName", "userName is required").notEmpty(),
    check(
      "password",
      "password is required. length min 5 max 20. only Aphanumeric"
    )
      .isLength({ min: 5, max: 20 })
      .matches(/[0-9a-zA-Z\W+].{4,19}/)
      .notEmpty(),
  ],
  postLogin()
);
authRoutes.post(
  "/signup",
  [
    check("userName", "userName is required").notEmpty(),
    check("name", "name is required").notEmpty(),
    check("lastName", "lastName is required").notEmpty(),
    check(
      "password",
      "password is required. length min 5 max 20. only Aphanumeric"
    )
      .isLength({ min: 5, max: 20 })
      .matches(/[0-9a-zA-Z\W+].{4,19}/)
      .notEmpty(),
    check("idMoney", "idMoney is required").notEmpty(),
  ],
  postSignUp()
);

export default authRoutes;
