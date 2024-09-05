const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("_____Connected to MongoDB!_____");
  })
  .catch((err) => {
    console.error("_____Could not connect to MongoDB_____", err);
  });
