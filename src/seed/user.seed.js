const User = require("../models/user.model");
const Role = require("../models/role.model");
const { Encryption } = require("../utils/hashing.util");

module.exports.seedUser = async () => {
  await User.deleteMany({});
  const role = Role.findOne({
    title: "Administrator",
  });
  const passwordHash = await Encryption.encrypt("admin"); //admin

  const user = {
    name: "Ali",
    email: "admin@example.com",
    password: passwordHash,
    roleId: role._id,
  };
  await User.deleteMany();
  await User.create(user);
};
