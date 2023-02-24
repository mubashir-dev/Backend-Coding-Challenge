const mongoose = require("mongoose");

//Connection Options
const mongooseOptions = {
  useUnifiedTopology: true,
};

const connectDatabase = function () {
  const url = `mongodb://root:root@db:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  return new Promise((resolve, reject) => {
    mongoose.connect(url, mongooseOptions, (err) => {
      if (!err) {
        resolve("connected");
      } else {
        reject("connction failed");
      }
    });
  });
};

module.exports = { connectDatabase };
