import express from "express";

import {
  deleteUser,
  getUserById,
  getUserLimit,
  postUser,
  putUser,
} from "./user/index";

const userRoutes = express.Router();

//Rutas y validacion de los endpoint

userRoutes.post("/", postUser());
userRoutes.get("/all/:cantidad", getUserLimit());
userRoutes.get("/:id", getUserById());
userRoutes.put("/", putUser());
userRoutes.delete("/:id", deleteUser());

export default userRoutes;
