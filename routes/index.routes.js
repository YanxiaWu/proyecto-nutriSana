const express = require('express');
const router = express.Router();
const transporter = require('../config/transporter.config')

/* GET home page */
router.get("/", (req, res, next) => {

  res.render("index");
});

/* Contacto */

router.get("/contacto", (req, res, next) => {
  res.render("contact");
});

router.post("/contacto", (req, res) => {
  const { name, email, tema, descripcion } = req.body;

  transporter
    .sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: tema,
      text:
        "Enviado desde el usuario" +
        descripcion,
      html:
        "<p>Enviado desde el usuario: " +
        descripcion +
        "</p>",
    })
    .then((info) => res.send(info))
    .catch((error) => console.log(error));
});













module.exports = router;
