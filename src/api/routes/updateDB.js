import express from "express";

import { updatedDb } from "./updateDB/index";

const updateDB = express.Router();

//Rutas y validacion de los endpoint

updateDB.post("/", updatedDb());

export default updateDB;
