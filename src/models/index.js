import path from "path";
import Sequelize from "sequelize";
import debug from "debug";

const db = {};

const conf = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: (s) => debug(s),
  operatorsAliases: false,
};

const sequelize = new Sequelize(conf);

db["user"] = sequelize["import"](path.join(__dirname, "user.js"));
db["userCoin"] = sequelize["import"](path.join(__dirname, "userCoin.js"));
db["coin"] = sequelize["import"](path.join(__dirname, "coin.js"));
db["coinPrice"] = sequelize["import"](path.join(__dirname, "coinPrice.js"));
db["coinImg"] = sequelize["import"](path.join(__dirname, "coinImg.js"));

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

require("../utils/associations")(db);

db.sequelize = sequelize;

module.exports = db;
