import schedule from "node-schedule";

import db from "../../../models";
import { getAllCoin, logger } from "../../../utils";

const Model = db.coin;
const ModelCoinImg = db.coinImg;
const ModelCoinPrice = db.coinPrice;

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
