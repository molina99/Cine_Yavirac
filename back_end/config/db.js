const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize("cine", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: false
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
