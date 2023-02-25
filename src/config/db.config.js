const mongoose = require("mongoose");

//Connection Options
const mongooseOptions = {
  useUnifiedTopology: true,
};

const connectDatabase = function () {
  const url = `mongodb://root:123456@mongoDb:27017/owbc`;
  return new Promise((resolve, reject) => {
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
