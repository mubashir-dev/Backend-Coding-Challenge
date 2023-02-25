const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvestmentTypeSchema = new Schema(
  {
    title: { type: String, require: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InvestmentType", InvestmentTypeSchema);
