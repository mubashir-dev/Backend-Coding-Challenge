const yup = require("yup");

//investment types validator
const investmentTypeValidator = {
  create: yup.object({
    title: yup.string().required(),
    description: yup.string(),
  }),
  edit: yup.object({
    title: yup.string(),
    description: yup.string(),
  }),
};

module.exports = {
  investmentTypeValidator,
};
