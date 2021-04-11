const config = require("../lib/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pengguna = require("./pengguna.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.nasabahmaster = require("./nasabahMaster.model")(sequelize, Sequelize);

db.role.belongsToMany(db.pengguna, {
  through: "pengguna_roles",
  foreignKey: "roleId",
  otherKey: "penggunaId",
});
db.pengguna.belongsToMany(db.role, {
  through: "pengguna_roles",
  foreignKey: "penggunaId",
  otherKey: "roleId",
});

db.ROLES = ["pengguna", "admin", "moderator"];

module.exports = db;
