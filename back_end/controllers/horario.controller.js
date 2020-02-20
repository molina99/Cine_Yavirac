const Horario = require("../models/horario");

const getData = (req, res) => {
  const { query } = req;
  Horario.findAll({ where: query })
    .then(response => {
      return res.status(200).json({
        ok: true,
        datos: response
      });
    })
    .catch(error => {
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: `Error del servidor: ${error}`
      });
    });
};

async function postData(req, res) {
  const { hora } = req.body;
  try {
    let nuevoHorario = await Horario.create(
      {
        hora
      },
      {
        fields: ["hora"]
      }
    );
    if (nuevoHorario) {
      res.json({
        message: "Horario creado",
        datos: nuevoHorario
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error en el servidor!",
      datos: {}
    });
  }
}

const putData = (req, res) => {
  const id = req.query.id;
  const datos = req.body.datos;
  Horario.update(datos, { where: { id } })
    .then(response => {
      return res.status(200).json({
        ok: true,
        datos: datos
      });
    })
    .catch(error => {
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: `Error del servidor: ${error}`
      });
    });
};

const deleteData = (req, res) => {
  const { id } = req.query;

  Horario.destroy({ where: { id } }).then(response => {
    return res
      .status(200)
      .json({
        ok: true,
        datos: "Eliminado"
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
  getData,
  postData,
  putData,
  deleteData
};
