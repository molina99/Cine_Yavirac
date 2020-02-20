const Sequelize = require("sequelize");

const db = require("../config/db");
const Compra = require("../models/compra");

const Persona = db.sequelize.define("personas", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING
  },
  apellido: {
    type: Sequelize.STRING
  },
  correo: {
    type: Sequelize.STRING
  },
  clave: {
    type: Sequelize.STRING
  }
});

Persona.hasMany(Compra, {
  foreignKey: "idpersona",
  sourceKey: "id"
});
Compra.belongsTo(Persona, {
  foreignKey: "idpersona",
  sourceKey: "id"
});

module.exports = Persona;
