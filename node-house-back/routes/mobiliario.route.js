const express = require("express"),
  router = express.Router(),
  mobiliarioCtrl = require("../controllers/mobiliario.controller"),
  checkAuth = require("../middleware/verificarToken");

router.get("/", mobiliarioCtrl.listMobiliariosWithFilters);
router.get("/:_id", mobiliarioCtrl.mobiliarioById);
router.post("/", checkAuth.verificarToken, mobiliarioCtrl.createMobiliario);
router.delete(
  "/:_id",
  checkAuth.verificarToken,
  mobiliarioCtrl.deleteMobiliario
);
router.put("/:_id", checkAuth.verificarToken, mobiliarioCtrl.updateMobiliario);
router.get(
  "/:empleado",
  checkAuth.verificarToken,
  mobiliarioCtrl.getMobiliarioByEmpleado
);
router.patch("/:_id/:count", mobiliarioCtrl.updateCountById);
router.get("/popular", mobiliarioCtrl.mostViewed);

module.exports = router;
