const mongoose = require("mongoose");

//Connection Options
const mongooseOptions = {
  useUnifiedTopology: true,
};

const connectDatabase = function () {
  const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  return new Promise((resolve, reject) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(url, mongooseOptions, (err) => {
      if (!err) {
        resolve("connected");
      } else {
        reject(err);
      }
    });
  });
};

module.exports = { connectDatabase };
