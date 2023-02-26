const InvestmentType = require("../models/investmenttype.model");
const apiResponse = require("../utils/response.util");
const ObjectId = require("mongoose").Types.ObjectId;

exports.portfolio = async (req, res, next) => {
  try {
    const result = InvestmentType.aggregate([
      {
        $lookup: {
          from: "investments",
          let: { id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$investmentType", "$$id"] } } },
            {
              $group: {
                _id: "$investmentType",
                totalInvestedAmount: {
                  $sum: { $multiply: ["$quantity", "$averagePrice"] },
                },
                currentEquityAmount: {
                  $sum: { $multiply: ["$purchasePrice", "$quantity"] },
                },
                target: {
                  $sum: "$targetAmount",
                },
                actual: {
                  $sum: "$currentValue",
                },
                totalPurchase: {
                  $sum: "$purchasePrice",
                },
                totalQuantity: {
                  $sum: "$quantity",
                },
              },
            },
          ],
          as: "investments",
        },
      },
      {
        $unwind: { path: "$investments", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          investments: 1,
          description: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    return result;
  } catch (error) {
    next(error);
  }
};

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
