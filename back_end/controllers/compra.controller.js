const Compra = require("../models/compra");

const getData = (req, res) => {
  const { query } = req;
  Compra.findAll({ where: query })
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
  const { numero_boletos, idpersona, idsala_peliculas } = req.body;
  try {
    let nuevaCompra = await Compra.create(
      {
        numero_boletos,
        idpersona,
        idsala_peliculas
      },
      {
        fields: ["numero_boletos", "idpersona", "idsala_peliculas"]
      }
    );
    if (nuevaCompra) {
      res.json({
        message: "Compra creada",
        datos: nuevaCompra
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
  Compra.update(datos, { where: { id } })
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

  Compra.destroy({ where: { id } }).then(response => {
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
