const nodemailer = require("nodemailer");

const sendMail = (req, res) => {
  const datos = req.body.datos;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "login",
      user: "@gmail.com",
      pass: ""
    }
  });

  const mailOptions = {
    from: "cine@yavirac.edu.ec",
    to: datos.correo,
    subject: "Cine Yavirac",
    html: `<div><h1>CINE YAVIRAC</h1><br><h2>Sala: ${datos.sala}</h2><br><h2>Película: ${datos.pelicula}</h2><br><h2>Horario: ${datos.horario}</h2><br><h2>Número de Boletos: ${datos.boletos}</h2></div>`
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: `Error del servidor: ${err}`
      });
    } else {
      return res.status(200).json({
        ok: true,
        datos: "Correo Enviado"
      });
    }
  });
};

module.exports = {
  sendMail
};
