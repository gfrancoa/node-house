const mongoose = require("mongoose");

let mobiliarioSchema = new mongoose.Schema({
  tipo_mobiliario: {
    type: String,
    enum: ["apartamento", "casa"],
  },
  caracteristicas: {
    num_habitaciones: { type: Number },
    num_baños: { type: Number },
    tiene_patio: { type: Boolean },
    is_cocina_integral: { type: Boolean },
    piso: { type: Number },
  },
  sector: { type: String },
  descripcion: { type: String },
  canon: { type: Number },
  num_interesados: { type: Number, default: 0 },
  created_date: { type: Date, default: new Date() },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "empleado" },
  foto: { type: String },
});

module.exports = mongoose.model("mobiliario", mobiliarioSchema);
