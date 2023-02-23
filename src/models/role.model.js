const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    title: { type: String, require: true, unique: true },
    access: {
      read: { type: Boolean, required: true, default: false },
      write: { type: Boolean, required: true, default: false },
      update: { type: Boolean, required: true, default: false },
      delete: { type: Boolean, required: true, default: false },
    },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", RoleSchema);
