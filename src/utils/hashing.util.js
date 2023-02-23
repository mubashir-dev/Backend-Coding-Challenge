const bcrypt = require("bcrypt");

const Encryption = {
  encrypt: function (value) {
    return new Promise((resolve, reject) => {
      resolve(bcrypt.hash(value, parseInt(process.env.HASH_SALT)));
    });
  },
  compare: function (value, hash) {
    return new Promise((resolve, reject) => {
      resolve(bcrypt.compare(value, hash));
    });
  },
};

module.exports = {
  Encryption,
};
