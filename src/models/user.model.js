const mongoose = require("mongoose");
const Role = require("./role.model");
const Schema = mongoose.Schema;

//UserSchema
const UserSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    roleId: { type: Schema.Types.ObjectId, ref: Role, require: false },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
