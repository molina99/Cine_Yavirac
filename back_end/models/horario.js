const Sequelize = require("sequelize");

const db = require("../config/db");
const Sala_pelicula = require("../models/sala_pelicula");

const Horario = db.sequelize.define("horarios", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  hora: {
    type: Sequelize.STRING
  }
});

Horario.hasMany(Sala_pelicula, {
  foreignKey: "idhorario",
  sourceKey: "id"
});
Sala_pelicula.belongsTo(Horario, {
  foreignKey: "idhorario",
  sourceKey: "id"
});

module.exports = Horario;
