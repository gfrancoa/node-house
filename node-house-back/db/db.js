const mongoose = require("mongoose"),
  config = require("../config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.url).then(() => {
      console.log("Se ha establecido conexión con la base de datos!");
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  connectDB,
};
