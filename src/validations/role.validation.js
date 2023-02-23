const yup = require("yup");

//validation for updating and creating roles

const roleValidator = {
  create: yup.object({
    title: yup.string().required(),
    access: yup.object({
      read: yup.boolean().required(),
      write: yup.boolean().required(),
      update: yup.boolean().required(),
      delete: yup.boolean().required(),
    }),
    description: yup.string(),
  }),
  edit: yup.object({
    title: yup.string(),
    read: yup.boolean(),
    write: yup.boolean(),
    update: yup.boolean(),
    delete: yup.boolean(),
    description: yup.string(),
  }),
};

module.exports = {
  roleValidator,
};
