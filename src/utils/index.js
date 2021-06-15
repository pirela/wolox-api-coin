import bunyan from "bunyan";
import uuid from "uuid/v4";
import axios from "axios";

export const defValues = (isUpdate) => {
  const date = new Date();
  return !isUpdate
    ? {
        id: uuid(),
        updatedAt: date,
        createdUsu: "",
        updatedUsu: "",
      }
    : {
        updatedAt: date,
      };
};

export const excludeDef = () => {
  return ["createdUsu", "updatedUsu", "createdAt", "updatedAt"];
};

export const logger = bunyan.createLogger({
  name: "logger",
  src: true,
  serializers: {
    err: bunyan.stdSerializers.err,
  },
});

function getAxioCoin() {
  return axios.create({
    baseURL: `https://api.coingecko.com/api/v3/`,
  });
}

const typeImg = ["thumb", "small", "large"];

const typePrice = ["ars", "eur", "usd"];

export const getEuroUsdArs = () => {
  return typePrice;
};

function delay(ms, value) {
  return new Promise((resolve) => setTimeout(resolve, ms, value));
}

async function findAllDataCoins(allDataCoin) {
  const dataInsertCoin = [];
  const dataInsertCoinImg = [];
  const dataInsertCoinPrice = [];

  let waitDelay = false;
  let i = 0;

  for (const { id } of allDataCoin) {
    i++;
    //epstein el id es '' (empty)
    if (id !== "") {
      //Esto se utiliza para probar solo las primeras 10
      if (i > 10) {
        break;
      }

      if (waitDelay) {
        await delay(750);
      } else {
        waitDelay = true;
      }

      const { data: coinComplete } = await getAxioCoin().get(
        `https://api.coingecko.com/api/v3/coins/${id}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );

      const insertCoin = {
        ...defValues(),
        idCoin: coinComplete.id,
        name: coinComplete.name,
        symbol: coinComplete.symbol,
      };
      const idCoin = insertCoin.id;

      dataInsertCoin.push(insertCoin);

      typeImg.forEach((type) => {
        dataInsertCoinImg.push({
          ...defValues(),
          idCoin,
          type,
          img: coinComplete.image[type],
        });
      });

      typePrice.forEach((type) => {
        dataInsertCoinPrice.push({
          ...defValues(),
          idCoin,
          type,
          price: coinComplete.market_data.current_price[type],
          updatePrice: coinComplete.last_updated,
        });
      });
      //en caso de ir probando en vivo, se imprimir el valor i para ver como va
      console.info("i", i);
    }
  }

  return {
    dataInsertCoin,
    dataInsertCoinImg,
    dataInsertCoinPrice,
  };
}

export const getAllCoin = async () => {
  try {
    const allCoins = await getAxioCoin().get(
      "coins/list?include_platform=false"
    );

    const dataCoins = await findAllDataCoins(allCoins.data);
    return dataCoins;
  } catch (error) {
    logger.error("Error getAllCoin.", error);
    return error;
  }
};
