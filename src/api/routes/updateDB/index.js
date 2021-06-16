import schedule from "node-schedule";

import db from "../../../models";
import { getAllCoin, logger } from "../../../utils";

const Model = db.coin;
const ModelCoinImg = db.coinImg;
const ModelCoinPrice = db.coinPrice;

/**
 * Generamos un schedule el cual se ejecuta a cierta hora (8 am) el cual se encargara de eliminar los registros en nuestra DB y actualizarlos con los datos de coingecko.
 * Debido a que este proceso es muy demorado debido a que coingeck nos limita en las peticiones se recomienda hacer este schedule.
 *
 * Nota: Para un mejor nivel de desacoplamiento, hacer esto un microservicio
 * @returns
 */
export const updatedDb = () => async (req, res) => {
  /*
  const data = req.body;
  */
  schedule.scheduleJob("7 19 * * *", async () => {
    try {
      let inserCoin;
      let inserCoinImg;
      let inserCoinPrice;

      const { dataInsertCoin, dataInsertCoinImg, dataInsertCoinPrice } =
        await getAllCoin();

      if (dataInsertCoin.length) {
        await Model.destroy({ where: {}, truncate: true });
        inserCoin = Model.bulkCreate(dataInsertCoin);
      }

      if (dataInsertCoinImg.length) {
        await ModelCoinImg.destroy({ where: {}, truncate: true });
        inserCoinImg = ModelCoinImg.bulkCreate(dataInsertCoinImg);
      }

      if (dataInsertCoinPrice.length) {
        await ModelCoinPrice.destroy({ where: {}, truncate: true });
        inserCoinPrice = ModelCoinPrice.bulkCreate(dataInsertCoinPrice);
      }
      /*
      console.info({
        inserCoin: inserCoin.length,
        inserCoinImg: inserCoinImg.length,
        inserCoinPrice: inserCoinPrice.length,
      });
      */
    } catch (error) {
      logger.error(error.message);
    }
  });

  res.status(200).json({
    data: "ok. schedule is run",
  });
};
