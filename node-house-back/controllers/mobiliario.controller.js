const Mobiliario = require("../models/Mobiliario");

const listMobiliariosWithFilters = (req, res) => {
  Mobiliario.find(req.body.filters, (err, mobiliarios) => {
    if (err) return res.send(err);
    return res.send(mobiliarios);
  });
};

const mobiliarioById = async (req, res) => {
  const { _id } = req.params;
  const mobiliario = await Mobiliario.find({ _id: _id }).populate("created_by"); //el nombre la propiedad en la tabla
  res.json(mobiliario);
};

const createMobiliario = async (req, res) => {
  const newMobiliario = new Mobiliario({
    tipo_mobiliario: req.body.tipo_mobiliario,
    caracteristicas: req.body.caracteristicas,
    sector: req.body.sector,
    descripcion: req.body.descripcion,
    canon: req.body.canon,
    created_by: req.body.user_id,
    foto: req.body.foto,
  });

  await newMobiliario.save();

  res.json({
    message: "Registro creado exitosamente",
    status: 201,
    id: newMobiliario._id,
  });
};

const deleteMobiliario = async (req, res) => {
  const { _id } = req.params;
  const mobiliario = await Mobiliario.deleteOne({ _id: _id });
  res.json({ message: "Registro eliminado satisfactoriamente" });
};

const updateMobiliario = async (req, res) => {
  const _id = req.params._id;
  const {
    tipo_mobiliario,
    sector,
    descripcion,
    canon,
    foto,
    num_habitaciones,
    num_baños,
    tiene_patio,
    is_cocina_integral,
    piso,
  } = req.body;
  await Mobiliario.findOneAndUpdate(
    { _id: _id },
    {
      tipo_mobiliario: tipo_mobiliario,
      sector: sector,
      descripcion: descripcion,
      canon: canon,
      foto: foto,
      caracteristicas: {
        num_baños: num_baños,
        num_habitaciones: num_habitaciones,
        tiene_patio: tiene_patio,
        is_cocina_integral: is_cocina_integral,
        piso: piso,
      },
    }
  );
  res.json({ message: "Registro actualizado satisfactoriamente", status: 200 });
};

const getMobiliarioByEmpleado = async (req, res) => {
  const { empleado } = req.params;
  const mobiliario = await Mobiliario.find({ created_by: empleado });
  res.json(mobiliario);
};

const updateCountById = async (req, res) => {
  const { _id, count } = req.params;
  const mobiliario = await Mobiliario.findOneAndUpdate(
    { _id: _id },
    { num_interesados: count }
  );
  res.json({
    message: "Contador actualizado satisfactoriamente",
    status: 200,
  });
};

const mostViewed = async (req, res) => {
  const mobiliario = await Mobiliario.find({})
    .sort({ num_interesados: "desc" })
    .limit(3);
  res.json(mobiliario);
};

module.exports = {
  listMobiliariosWithFilters,
  mobiliarioById,
  createMobiliario,
  deleteMobiliario,
  updateMobiliario,
  getMobiliarioByEmpleado,
  updateCountById,
  mostViewed,
};
