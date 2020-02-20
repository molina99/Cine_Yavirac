const Sequelize = require("sequelize");

const db = require("../config/db");
const Compra = require("../models/compra");

const Sala_pelicula = db.sequelize.define("sala_peliculas", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idpelicula: {
    type: Sequelize.INTEGER
  },
  idhorario: {
    type: Sequelize.INTEGER
  },
  idsala: {
    type: Sequelize.INTEGER
  }
});

Sala_pelicula.hasMany(Compra, {
  foreignKey: "idsala_peliculas",
  sourceKey: "id"
});
Compra.belongsTo(Sala_pelicula, {
  foreignKey: "idsala_peliculas",
  sourceKey: "id"
});

module.exports = Sala_pelicula;
