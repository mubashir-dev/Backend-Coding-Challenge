const Investment = require("../models/investment.model");
const apiResponse = require("../utils/response.util");
const ObjectId = require("mongoose").Types.ObjectId;

exports.findAll = async (req, res, next) => {
  try {
    const result = Investment.aggregate([
      {
        $lookup: {
          from: "investmenttypes",
          localField: "investmentType",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
              },
            },
          ],
          as: "investmentType",
        },
      },
      {
        $unwind: { path: "$investmentType", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          totalInvestmentAmount: {
            $multiply: ["$quantity", "$averagePrice"],
          },
          currentEquityAmount: {
            $multiply: ["$purchasePrice", "$quantity"],
          },
          returnAamount: 0,
        },
      },
      {
        $project: {
          _id: 1,
          investmentTitle: 1,
          investmentDescription: 1,
          investmentType: 1,
          purchaseDate: 1,
          symbol: 1,
          quantity: 1,
          purchasePrice: 1,
          averagePrice: 1,
          currentValue: 1,
          targetAmount: 1,
          totalInvestmentAmount: 1,
          currentEquityAmount: 1,
          investmentStatus: 1,
          returnAamount: {
            $subtract: ["$currentEquityAmount", "$totalInvestmentAmount"],
          },
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

exports.find = async (filterObject, next) => {
  try {
    const { id } = filterObject;
    const result = Investment.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "investmenttypes",
          localField: "investmentType",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
              },
            },
          ],
          as: "investmentType",
        },
      },
      {
        $unwind: { path: "$investmentType", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          totalInvestmentAmount: {
            $multiply: ["$quantity", "$averagePrice"],
          },
          currentEquityAmount: {
            $multiply: ["$purchasePrice", "$quantity"],
          },
          returnAamount: 0,
        },
      },
      {
        $project: {
          _id: 1,
          investmentTitle: 1,
          investmentDescription: 1,
          investmentType: 1,
          purchaseDate: 1,
          symbol: 1,
          quantity: 1,
          purchasePrice: 1,
          averagePrice: 1,
          currentValue: 1,
          targetAmount: 1,
          totalInvestmentAmount: 1,
          currentEquityAmount: 1,
          investmentStatus: 1,
          returnAamount: {
            $subtract: ["$currentEquityAmount", "$totalInvestmentAmount"],
          },
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

exports.store = async (req, res, next) => {
  const _Investment = Investment.create({
    ...req.body,
  });
  return _Investment;
};

exports.edit = async (req, res) => {
  const updateInvestment = Investment.findOne({ _id: req.params.id });
  const result = updateInvestment.updateOne({ ...req.body });
  return result;
};

exports.updateStatus = async (req, res) => {
  const { status } = req.query;
  const updateInvestmentStatus = await Investment.findOne({
    _id: req.params.id,
  });
  const result = await updateInvestmentStatus.updateOne({
    investmentStatus: status,
  });
  return result;
};

exports.remove = async (req, res) => {
  const removeInvestment = Investment.findOne({ _id: req.params.id });
  const data = removeInvestment.deleteOne();
  return data;
};
