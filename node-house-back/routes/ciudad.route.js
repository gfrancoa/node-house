const express = require("express"),
  router = express.Router(),
  ciudadCtrl = require("../controllers/ciudad.controller");

router.get("/", ciudadCtrl.listCiudades);

module.exports = router;
