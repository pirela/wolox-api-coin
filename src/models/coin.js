/**
 *
 * @param {*} sequelize
 * @param {*} DataTypes
 * Se define el modelo con la estructura que posee en la  base de datos
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "coin",
    {
      id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      idCoin: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      symbol: {
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
      tableName: "coin",
    }
  );
};
