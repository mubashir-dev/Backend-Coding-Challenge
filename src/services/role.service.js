const Role = require("../models/role.model");
const apiResponse = require("../utils/response.util");
const ObjectId = require("mongoose").Types.ObjectId;

exports.findAll = async (req, res, next) => {
  try {
    const result = Role.find();
    return result;
  } catch (error) {
    next(error);
  }
};

exports.find = async (req, res, next, id) => {
  try {
    const { id } = req.params;
    const result = Role.findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    next(error);
  }
};

//checking for duplication
exports.check = async (filter) => {
  try {
    const isExists = await Role.findOne(filter);
    return isExists;
  } catch (error) {
    return error;
  }
};

exports.store = async (req, res, next) => {
  const { title, description, access } = req.body;
  const _role = Role.create({
    title,
    description,
    access,
  });
  return _role;
};

exports.edit = async (req, res) => {
  const result = Role.updateOne({ ...req.body });
  return result;
};

exports.remove = async (req, res) => {
  const removeRole = Role.findOne({ _id: req.params.id });
  const data = removeRole.deleteOne();
  return data;
};
