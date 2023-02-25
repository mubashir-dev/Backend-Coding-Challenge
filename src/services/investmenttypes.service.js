const InvestmentType = require("../models/investmenttype.model");
const apiResponse = require("../utils/response.util");
const ObjectId = require("mongoose").Types.ObjectId;

exports.findAll = async (req, res, next) => {
  try {
    const result = InvestmentType.find();
    return result;
  } catch (error) {
    next(error);
  }
};

exports.find = async (filterObject, next) => {
  try {
    const { id } = filterObject;
    const result = InvestmentType.findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    next(error);
  }
};

//checking for duplication
exports.check = async (filter) => {
  try {
    const isExists = await InvestmentType.findOne(filter);
    return isExists;
  } catch (error) {
    return error;
  }
};

exports.store = async (req, res, next) => {
  const { title, description, access } = req.body;
  const _investmentType = InvestmentType.create({
    title,
    description,
  });
  return _investmentType;
};

exports.edit = async (req, res) => {
  const _investmentType = InvestmentType.updateOne({ ...req.body });
  return _investmentType;
};

exports.remove = async (req, res) => {
  const removeInvestmentType = InvestmentType.findOne({ _id: req.params.id });
  const _deleteInvestmentType = removeInvestmentType.deleteOne();
  return _deleteInvestmentType;
};
