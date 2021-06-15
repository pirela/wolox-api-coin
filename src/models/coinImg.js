/**
 *
 * @param {*} sequelize
 * @param {*} DataTypes
 * Se define el modelo con la estructura que posee en la  base de datos
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "coinImg",
    {
      id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      idCoin: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      createdUsu: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      updatedUsu: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      tableName: "coinImg",
    }
  );
};
