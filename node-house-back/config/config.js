module.exports = {
  port: process.env.PORT || 5000,
  url:
    process.env.MONGODB ||
    "mongodb+srv://gfrancoa:Oreja123@cluster0.2mkpg.mongodb.net/nodehouse?retryWrites=true&w=majority",
};
