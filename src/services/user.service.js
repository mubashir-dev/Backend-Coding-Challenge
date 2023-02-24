const User = require("../models/user.model");
const apiResponse = require("../utils/response.util");
const ObjectId = require("mongoose").Types.ObjectId;
const { Encryption } = require("../utils/hashing.util");

exports.findAll = async (req, res, next) => {
  try {
    const result = User.aggregate([
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
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
        },
      },
    ]);
    return result;
  } catch (error) {
    next(error);
  }
};

exports.find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = User.aggregate([
      {
        $match: { _id: ObjectId(id) },
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
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
        },
      },
    ]);
    return result;
  } catch (error) {
    next(error);
  }
};

//checking for duplication
exports.check = async (filter) => {
  try {
    const isExists = await User.findOne(filter);
    return isExists;
  } catch (error) {
    return error;
  }
};

exports.store = async (req, res, next) => {
  const { name, email, password, roleId } = req.body;
  const passwordHash = await Encryption.encrypt(password);
  const _User = User.create({
    name,
    email,
    password: passwordHash,
    roleId: roleId,
  });
  return _User;
};

exports.edit = async (req, res) => {
  const updateUser = User.findOne({ _id: req.params.id });
  const result = updateUser.updateOne({ ...req.body });
  return result;
};

exports.updateStatus = async (req, res) => {
  const { status } = req.query;
  const updateUserStatus = User.findOne({ _id: req.params.id });
  const result = updateUserStatus.updateOne({ status: status });
  return result;
};

exports.changePassword = async (req, res, next) => {
  const { password } = req.body;
  const passwordHash = await Encryption.encrypt(password);
  const updateUserStatus = User.findOne({ _id: req.params.id });
  const result = updateUserStatus.updateOne({ password: passwordHash });
  return result;
};

exports.remove = async (req, res) => {
  const removeUser = User.findOne({ _id: req.params.id });
  const data = removeUser.deleteOne();
  return data;
};
