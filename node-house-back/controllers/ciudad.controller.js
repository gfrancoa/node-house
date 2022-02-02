const Ciudad = require("../models/Ciudad");

const listCiudades = (req, res) => {
  Ciudad.find((err, ciudades) => {
    if (err) return res.send(err);
    return res.send(ciudades);
  });
};

module.exports = { listCiudades };
