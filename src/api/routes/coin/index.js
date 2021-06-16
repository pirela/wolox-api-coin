import db from "../../../models";

import { logger, excludeDef } from "../../../utils";

const Model = db.coin;
const ModelCoinPrice = db.coinPrice;

/**
 * cantidad: con este parametros sabremos cuantos registros devolver en el endpoint.
 *
 *    si el valor es inferior a 0 regresamos todas las coins
 *    Si el valor es superior a -1 regresamos 20 registros. El mismo valor (cantidad) se utiliza para el offset
 * @returns lista de las coin
 */
export const getCoinLimit = () => async (req, res) => {
  try {
    const cantidad = Number.parseInt(req.params.cantidad);
    const attributes = {
      exclude: excludeDef(),
    };
    const include = [
      {
        model: ModelCoinPrice,
        attributes: {
          exclude: excludeDef(),
        },
      },
    ];
    let objs;

    if (cantidad > -1) {
      objs = await Model.findAll({
        attributes,
        offset: cantidad,
        limit: 20,
        include,
      });
    } else {
      objs = await Model.findAll({
        attributes,
        include,
      });
    }

    if (objs) {
      res.status(200).json({ data: objs });
    } else {
      throw new Error("No se encontraron las coins");
    }
  } catch (e) {
    logger.error(e.message);
    res.status(500).json({ error: e.message });
  }
};
