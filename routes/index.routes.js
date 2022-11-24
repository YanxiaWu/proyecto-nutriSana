const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* Contacto */
router.get("/contacto", (req, res, next) => {
  res.render("contact");
});

/* Thankspage */
router.get("/thankspage", (req, res, next) => {
  res.render("thankspage");
})

module.exports = router;
