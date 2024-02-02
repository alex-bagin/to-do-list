const Sequelize = require("sequelize");
const keys = require("../keys/index");

const sequelize = new Sequelize(keys.DB_NAME, keys.USER_NAME, keys.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
