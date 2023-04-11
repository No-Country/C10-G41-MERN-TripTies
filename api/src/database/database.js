const mongoose = require("mongoose");
require("dotenv").config();
const dbConection = mongoose.connection;

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).catch((error) => console.log(error));

dbConection.on("open", (_) => {
  console.log(`Database connected to Mongo Atlas at PORT ${PORT}`);
});

dbConection.on("error", (error) => {
  console.log(error);
});
