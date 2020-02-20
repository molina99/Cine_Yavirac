const Sala_pelicula = require("../models/sala_pelicula");

const getData = (req, res) => {
  const { query } = req;
  Sala_pelicula.findAll({ where: query })
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
  const { idpelicula, idhorario, idsala } = req.body;
  try {
    let nuevoSalaPelicula = await Sala_pelicula.create(
      {
        idpelicula,
        idhorario,
        idsala
      },
      {
        fields: ["idpelicula", "idhorario", "idsala"]
      }
    );
    if (nuevoSalaPelicula) {
      res.json({
        message: "SalaPelicula creada",
        datos: nuevoSalaPelicula
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
  Sala_pelicula.update(datos, { where: { id } })
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

  Sala_pelicula.destroy({ where: { id } }).then(response => {
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
