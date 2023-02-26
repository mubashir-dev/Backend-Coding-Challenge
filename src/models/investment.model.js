const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InvestmentType = require("./investmenttype.model");

const InvestmentSchema = new Schema(
  {
    investmentTitle: { type: String, require: true, unique: true },
    investmentDescription: { type: String },
    investmentType: {
      type: Schema.Types.ObjectId,
      ref: InvestmentType,
      require: false,
    },
    purchaseDate: { type: Date, require: true },
    symbol: { type: String, require: true },
    quantity: { type: Number, require: true },
    purchasePrice: { type: mongoose.Schema.Types.Decimal128, require: true },
    averagePrice: { type: mongoose.Schema.Types.Decimal128, require: true },
    currentValue: { type: mongoose.Schema.Types.Decimal128, require: true },
    currentDividendValue: {
      type: mongoose.Schema.Types.Decimal128,
      require: true,
    },
    currentEquityAmount: {
      type: mongoose.Schema.Types.Decimal128,
      require: false,
    },
    totalReturnAmount: {
      type: mongoose.Schema.Types.Decimal128,
      require: false,
    },
    targetAmount: {
      type: mongoose.Schema.Types.Decimal128,
      require: true,
    },
    investmentStatus: {
      type: String,
      enum: ["sold", "hold"],
      default: "hold",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Investment", InvestmentSchema);
