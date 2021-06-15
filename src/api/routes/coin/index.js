import db from "../../../models";

import { logger, excludeDef } from "../../../utils";

const Model = db.coin;
const ModelCoinPrice = db.coinPrice;

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
