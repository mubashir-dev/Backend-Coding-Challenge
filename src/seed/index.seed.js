const { seedRoles } = require("./role.seed");
const { seedUser } = require("./user.seed");
const mongoose = require("mongoose");
require("dotenv").config();

//Connection Options
const mongooseOptions = {
  useUnifiedTopology: true,
};

const runSeed = function () {
  const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  mongoose.set("strictQuery", false);
  mongoose.connect(url, mongooseOptions, (err) => {
    if (!err) {
      seedRoles()
        .then(() => {
          console.log("successfully seed roles");
          seedUser().then(() => {
            console.log("successfully seed users");
            mongoose.connection.close();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("db connection failed", err);
    }
  });
};

runSeed();
