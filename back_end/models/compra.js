const Sequelize = require("sequelize");

const db = require("../config/db");

const Compra = db.sequelize.define("compras", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero_boletos: {
    type: Sequelize.INTEGER
  },
  idpersona: {
    type: Sequelize.INTEGER
  },
  idsala_peliculas: {
    type: Sequelize.INTEGER
  }
});

module.exports = Compra;
