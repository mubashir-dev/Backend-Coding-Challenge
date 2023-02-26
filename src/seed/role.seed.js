const Role = require("../models/role.model");

const roleSeed = [
  {
    title: "Administrator",
    access: {
      read: true,
      write: true,
      update: true,
      delete: true,
    },
    description: "Administrator",
  },
  {
    title: "Financial Advisor",
    access: {
      read: true,
      write: true,
      update: false,
      delete: false,
    },
    description: "Financial Advisor",
  },
  {
    title: "Investor",
    access: {
      read: true,
      write: true,
      update: false,
      delete: false,
    },
    description: "Investor",
  },
];

module.exports.seedRoles = async () => {
  await Role.deleteMany();
  await Role.insertMany(roleSeed);
};
