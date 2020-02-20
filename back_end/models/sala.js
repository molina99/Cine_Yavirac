const Sequelize = require("sequelize");

const db = require("../config/db");
const Sala_pelicula = require("../models/sala_pelicula");

const Sala = db.sequelize.define("salas", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING
  },
  descripcion: {
    type: Sequelize.STRING
  }
});

Sala.hasMany(Sala_pelicula, {
  foreignKey: "idsala",
  sourceKey: "id"
});
Sala_pelicula.belongsTo(Sala, {
  foreignKey: "idsala",
  sourceKey: "id"
});

module.exports = Sala;
