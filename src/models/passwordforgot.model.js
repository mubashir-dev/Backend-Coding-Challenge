const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//PasswordForgotSchema
const PasswordForgotSchema = new Schema(
  {
    email: { type: String, require: true },
    token: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PasswordForgot", PasswordForgotSchema);
