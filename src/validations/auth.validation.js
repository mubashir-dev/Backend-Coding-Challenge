const yup = require("yup");

const authValidator = {
  login: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
  refreshToken: yup.object().shape({
    refreshtoken: yup.string().required(),
  }),
  forgotPassword: yup.object().shape({
    email: yup.string().email().required(),
  }),
  passwordRestore: yup.object().shape({
    password: yup.string().min(6).max(16).required(),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  }),
};

module.exports = {
  authValidator,
};
