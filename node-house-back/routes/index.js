const { Router } = require("express"),
  router = Router();

router.use("/empleado", require("./empleado.route"));
router.use("/mobiliario", require("./mobiliario.route"));
router.use("/ciudades", require("./ciudad.route"));

module.exports = router;
