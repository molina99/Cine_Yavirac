const db = require("../config/db");

const raw1 = (req, res) => {
  const pelicula = req.query.pelicula;
  const horario = req.query.horario;

  db.sequelize
    .query(
      `select sala_peliculas.id, peliculas.titulo as titulo, horarios.hora as hora, salas.nombre as nombre, peliculas.id as idpelicula, horarios.id as idhorario from sala_peliculas join peliculas on peliculas.id = sala_peliculas.idpelicula join horarios on horarios.id = sala_peliculas.idhorario join salas on salas.id = sala_peliculas.idsala where peliculas.id=${pelicula} and horarios.id=${horario};`,
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then(response => {
      return res
        .status(200)
        .json({
          ok: true,
          datos: response
        })
        .catch(error => {
          return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}`
          });
        });
    });
};

const raw2 = (req, res) => {
  const idpelicula = req.query.idpelicula;

  db.sequelize
    .query(
      `select sala_peliculas.id, sala_peliculas.idpelicula, peliculas.titulo as idpelicula_titulo,
      sala_peliculas.idsala, salas.nombre as idsala_nombre, sala_peliculas.idhorario, horarios.hora as idhorario_hora
      from sala_peliculas join peliculas on peliculas.id = sala_peliculas.idpelicula join horarios on horarios.id = sala_peliculas.idhorario
      join salas on salas.id = sala_peliculas.idsala where sala_peliculas.idpelicula=${idpelicula};`,
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then(response => {
      return res
        .status(200)
        .json({
          ok: true,
          datos: response
        })
        .catch(error => {
          return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}`
          });
        });
    });
};

const raw3 = (req, res) => {
  db.sequelize
    .query(
      `select sala_peliculas.id, peliculas.titulo as idpelicula_titulo, salas.nombre as idsala_nombre, horarios.hora as idhorario_hora from peliculas join sala_peliculas on peliculas.id = sala_peliculas.idpelicula join salas on salas.id = sala_peliculas.idsala join horarios on horarios.id = sala_peliculas.idhorario`,
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then(response => {
      return res
        .status(200)
        .json({
          ok: true,
          datos: response
        })
        .catch(error => {
          return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}`
          });
        });
    });
};

const raw4 = (req, res) => {
  db.sequelize
    .query(
      `select peliculas.titulo as label, peliculas.valorBoleto as valor_unit, sum(compras.numero_boletos) as value, sum(peliculas.valorBoleto*compras.numero_boletos) as recaudado from compras join sala_peliculas on sala_peliculas.id = compras.idsala_peliculas join peliculas on peliculas.id = sala_peliculas.idpelicula group by peliculas.titulo, peliculas.valorBoleto;`,
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then(response => {
      return res
        .status(200)
        .json({
          ok: true,
          datos: response
        })
        .catch(error => {
          return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}`
          });
        });
    });
};

module.exports = {
  raw1,
  raw2,
  raw3,
  raw4
};
