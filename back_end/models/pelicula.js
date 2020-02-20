const Sequelize = require("sequelize");

const db = require("../config/db");
const Sala_pelicula = require("../models/sala_pelicula");

const Pelicula = db.sequelize.define("peliculas", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: Sequelize.STRING
  },
  resumen: {
    type: Sequelize.STRING
  },
  categoria: {
    type: Sequelize.STRING
  },
  valorboleto: {
    type: Sequelize.INTEGER
  },
  imagen: {
    type: Sequelize.STRING
  },
  estado: {
    type: Sequelize.BOOLEAN
  }
});

Pelicula.hasMany(Sala_pelicula, {
  foreignKey: "idpelicula",
  sourceKey: "id"
});
Sala_pelicula.belongsTo(Pelicula, {
  foreignKey: "idpelicula",
  sourceKey: "id"
});

module.exports = Pelicula;
