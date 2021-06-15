import express from "express";

import { updatedDb } from "./updateDB/index";

const updateDB = express.Router();

updateDB.post("/", updatedDb());

export default updateDB;
