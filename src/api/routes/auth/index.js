import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import db from "../../../models";
import { logger, defValues } from "../../../utils";
import { checkPass, cryptPass } from "../../../utils/functions";

const Model = db.user;

function buildToken(data) {
  return jwt.sign({ user: data }, process.env.SECRET_API, { expiresIn: "4h" });
}

export const postLogin = () => async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ data: errors.array() });
  }
  try {
    const { userName, password } = req.body;
    const data = await Model.findOne({
      attributes: ["id", "userName", "password"],
      where: {
        userName,
      },
    });
    if (data && checkPass(password, data.password)) {
      delete data.password;
      res.status(200).json({ data, token: buildToken(data) });
    } else {
      res.status(201).json({ data: "Usuario o contraseña invalida" });
    }
  } catch (e) {
    logger.error(e.message);
    res.status(500).json({ error: e.message });
  }
};

export const postSignUp = () => async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ data: errors.array() });
  }
  try {
    const userNameExist = await Model.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    if (userNameExist) {
      res.status(201).json({ data: "El userName ya existe" });
    } else {
      const values = {
        ...req.body,
        ...defValues(),
        password: cryptPass(req.body.password),
      };

      const data = await Model.create(values);

      if (data) {
        res.status(200).json({
          data: {
            id: data.id,
            userName: data.userName,
            name: data.name,
            lastName: data.lastName,
          },
        });
      } else {
        throw new Error("No se creo el Usuario");
      }
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
