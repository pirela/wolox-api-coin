//creacion de las relaciones entre los modelos
module.exports = function (models) {
  //asignacion de los modelos
  const user = models.user;
  const userCoin = models.userCoin;

  const coin = models.coin;
  const coinImg = models.coinImg;
  const coinPrice = models.coinPrice;
  /**
   * implemetacion de las relaciones
   */

  user.hasMany(userCoin, {
    foreignKey: "idCoin",
  });
  userCoin.belongsTo(user, {
    foreignKey: "idCoin",
  });

  coin.hasMany(userCoin, {
    foreignKey: "idCoin",
  });
  userCoin.belongsTo(coin, {
    foreignKey: "idCoin",
  });

  coin.hasMany(coinImg, {
    foreignKey: "idCoin",
  });
  coinImg.belongsTo(coin, {
    foreignKey: "idCoin",
  });

  coin.hasMany(coinPrice, {
    foreignKey: "idCoin",
  });
  coinPrice.belongsTo(coin, {
    foreignKey: "idCoin",
  });
};
