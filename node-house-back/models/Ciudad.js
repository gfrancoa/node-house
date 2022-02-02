const mongoose = require("mongoose");

let ciudadSchema = new mongoose.Schema({
  name: { type: String },
});

module.exports = mongoose.model("ciudades", ciudadSchema);
