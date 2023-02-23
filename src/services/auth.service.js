const User = require("../models/user.model");
const PasswordForgot = require("../models/passwordForgot.model");
const { Encryption } = require("../utils/hashing.util");
const Email = require("./email.service");
const { v4: uuidv4 } = require("uuid");

exports.find = async (searchObject) => {
  const result = await User.aggregate([
    {
      $match: { ...searchObject },
    },
    {
      $lookup: {
        from: "roles",
        localField: "roleId",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 1,
              title: 1,
              access: 1,
            },
          },
        ],
        as: "role",
      },
    },
    {
      $unwind: { path: "$role", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        roleId: 1,
        role: 1,
        password: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
        __v: 1,
      },
    },
  ]);
  return result[0] ?? null;
};

exports.randomToken = function () {
  return uuidv4();
};

exports.deletePasswordForgot = async function (req, res) {
  const { email } = req.body;
  const _passwordForgot = PasswordForgot.deleteMany({
    email,
  });
  return _passwordForgot;
};

exports.storePasswordForgot = async function (req, res) {
  const { email, token } = req.body;
  const _passwordForgot = PasswordForgot.create({
    email,
    token,
  });
  return _passwordForgot;
};

exports.getPasswordForgot = async function (req, res) {
  const { token } = req.params;
  const _passwordForgot = PasswordForgot.findOne({
    token,
  });
  return _passwordForgot;
};

exports.resetPassword = async function (req, res) {
  const { email, password } = req.body;
  const passwordHash = await Encryption.encrypt(password);
  const updateUserPassword = User.findOne({ email: email });
  const result = updateUserPassword.updateOne({ password: passwordHash });
  return result;
};
