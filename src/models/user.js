/**
 *
 * @param {*} sequelize
 * @param {*} DataTypes
 * Se define el modelo con la estructura que posee en la  base de datos
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      idMoney: {
        type: DataTypes.STRING(255),
      },
      createdUsu: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      updatedUsu: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      createdAt: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.TIME,
        allowNull: false,
      }
    },
    {
      tableName: "user",
    }
  );
};
