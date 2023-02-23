const yup = require("yup");

const userValidator = {
  store: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    roleId: yup.string().required().label("role"),
    password: yup.string().min(6).max(16).required(),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  }),
  update: yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    roleId: yup.string().label("role"),
  }),
  updatePassword: yup.object().shape({
    password: yup.string().min(6).max(16).required(),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  }),
};

module.exports = {
  userValidator,
};
