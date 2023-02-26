const yup = require("yup");

const investmentValidator = {
  store: yup.object().shape({
    investmentTitle: yup.string().required(),
    investmentDescription: yup.string(),
    investmentType: yup.string().required(),
    purchaseDate: yup.date().required(),
    symbol: yup.string().required(),
    quantity: yup.number().required(),
    purchasePrice: yup.number().required(),
    currentValue: yup.number().required(),
    currentDividendValue: yup.number().required(),
    targetAmount: yup.number().required(),
    averagePrice: yup.number().required(),
  }),
  update: yup.object().shape({
    investmentTitle: yup.string(),
    investmentDescription: yup.string(),
    investmentType: yup.string(),
    purchaseDate: yup.date(),
    symbol: yup.string(),
    quantity: yup.number(),
    purchasePrice: yup.number(),
    currentValue: yup.number(),
    currentDividendValue: yup.number(),
    targetAmount: yup.number(),
    averagePrice: yup.number(),
  }),
};

module.exports = {
  investmentValidator,
};
