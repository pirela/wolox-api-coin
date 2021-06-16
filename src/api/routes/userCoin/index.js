import { validationResult } from "express-validator";

import db from "../../../models";

import { logger, defValues, excludeDef } from "../../../utils";

const Model = db.userCoin;
const ModelCoin = db.coin;
const ModelCoinPrice = db.coinPrice;
const ModelCoinImg = db.coinImg;

//endpoint para la insercicion de monedas a seguir de un usuario
export const postUserCoin = () => async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ data: errors.array() });
  }
  try {
    const idUser = req.user.id;
    const idCoin = req.body.idCoin;
    const values = {
      idUser,
      ...req.body,
      ...defValues(),
    };

    const coin = await ModelCoin.findOne({
      where: {
        id: idCoin,
      },
    });

    const userCoinExist = await Model.findOne({
      where: {
        idCoin,
        idUser,
      },
    });
    if (coin) {
      if (userCoinExist) {
        res.status(201).json({ data: "La relacion user y coin ya existe." });
      } else {
        const data = await Model.create(values);
        if (data) {
          res.status(200).json({ data });
        } else {
          res.status(201).json({ data: "No se creo el userCoin" });
        }
      }
    } else {
      res.status(201).json({ data: "Coin no existe" });
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};


/**
 * parametros:
 *    asc: si el valor es asc entonces se ordena de manera ascender de lo contrario de manera descendete
 *    limit: si el valor es superior a 25 lo seteamos a 25 en caso contrario dejamos el valor que nos envian o como minimo 1
 * @returns top N de monedas del usuario
 */
export const getTopUserCoin = () => async (req, res) => {
  try {
    const ASC = req.params.asc === "asc" ? "ASC" : "DESC";
    const limitNumber =
      Number.parseInt(req.params.limit) > 0
        ? Number.parseInt(req.params.limit)
        : 1;
    const limit = limitNumber > 25 ? 25 : limitNumber;

    const idUser = req.user.id;
    //const userFavoriteMoney = req.user.idMoney;

    let objs = await Model.findAll({
      attributes: {
        exclude: excludeDef(),
      },
      order: [[ModelCoin, ModelCoinPrice, "price", ASC]],
      include: [
        {
          model: ModelCoin,
          attributes: {
            exclude: excludeDef(),
          },
          include: [
            {
              model: ModelCoinPrice,
              attributes: {
                exclude: excludeDef(),
              },
              /*where: {
                type: userFavoriteMoney,
              },*/
            },
            {
              model: ModelCoinImg,
              attributes: ["id", "type", "img"],
            },
          ],
        },
      ],
      limit,
      where: {
        idUser,
      },
    });

    if (objs) {
      res.status(200).json({ data: objs });
    } else {
      res.status(401).json({ data: "No se encontro el top coin del usuario" });
    }
  } catch (e) {
    logger.error(e.message);
    res.status(500).json({ error: e.message });
  }
};
