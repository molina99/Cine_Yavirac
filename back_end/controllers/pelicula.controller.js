const Pelicula = require("../models/pelicula");

const getData = (req, res) => {
  const { query } = req;
  Pelicula.findAll({ where: query })
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
  const { titulo, resumen, categoria, valorboleto, imagen, estado } = req.body;
  try {
    let nuevaPelicula = await Pelicula.create(
      {
        titulo,
        resumen,
        categoria,
        valorboleto,
        imagen,
        estado
      },
      {
        fields: [
          "titulo",
          "resumen",
          "categoria",
          "valorboleto",
          "imagen",
          "estado"
        ]
      }
    );
    if (nuevaPelicula) {
      res.json({
        message: "Pelicula creada",
        datos: nuevaPelicula
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
  Pelicula.update(datos, { where: { id } })
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

  Pelicula.destroy({ where: { id } }).then(response => {
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
