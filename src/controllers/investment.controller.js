const ObjectId = require("mongoose").Types.ObjectId;
const apiResponse = require("../utils/response.util");
const investmentService = require("../services/investment.service");
const commonService = require("../services/common.service");
const Investment = require("../models/investment.model");

//index;
exports.index = async (req, res, next) => {
  try {
    const data = await investmentService.findAll(req, res, next);
    return apiResponse.successData(res, "request processed successfully", data);
  } catch (error) {
    next(error);
  }
};

//show
exports.find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filterObject = {
      id,
    };
    const data = await investmentService.find(filterObject, next);
    if (!data) {
      return apiResponse.notFound(
        res,
        `The  record with this id '${id}' doesn't exists`
      );
    }
    return apiResponse.successData(res, "request processed successfully", data);
  } catch (error) {
    next(error);
  }
};

//create
exports.create = async (req, res, next) => {
  try {
    const { investmentTitle } = req.body;
    const nameExist = await commonService.check(Investment, {
      investmentTitle,
    });
    if (nameExist) {
      return apiResponse.validationConflict(
        res,
        `Investment with this '${req.body.investmentTitle}' title  has already exists`
      );
    }
    const data = await investmentService.store(req, res, next);
    return apiResponse.recordCreated(res, "record has been created", data);
  } catch (error) {
    next(error);
  }
};

//update
exports.update = async (req, res, next) => {
  try {
    const investmentUpdate = await commonService.check(Investment, {
      _id: req.params.id,
    });
    if (!investmentUpdate) {
      return apiResponse.notFound(
        res,
        `Investment with this id '${req.params.id}' doesn't exists`
      );
    }
    const isUpdated = await investmentService.edit(req, res, next);
    return apiResponse.success(res, "record has been updated");
  } catch (error) {
    next(error);
  }
};

//delete
exports.delete = async (req, res, next) => {
  try {
    const removeRole = await commonService.check(Investment, {
      _id: req.params.id,
    });
    if (!removeRole) {
      return apiResponse.notFound(
        res,
        `Investment with this id '${req.params.id}' doesn't exists`
      );
    }
    const isDeleted = await investmentService.remove(req, res);
    if (isDeleted) {
      return apiResponse.success(res, "record has been deleted");
    }
    return apiResponse.Error(res, "record has not been deleted");
  } catch (error) {
    next(error);
  }
};

//status
exports.status = async (req, res, next) => {
  try {
    const validStatus = ["hold", "sold"];
    if (!req.query.status) {
      return apiResponse.notFound(res, `query parameter is required`);
    }
    if (!validStatus.includes(req.query.status)) {
      return apiResponse.notFound(res, `invalid query parameter is required`);
    }
    const userUpdate = await commonService.check(Investment, {
      _id: req.params.id,
    });
    if (!userUpdate) {
      return apiResponse.notFound(
        res,
        `Investment with this id '${req.params.id}' doesn't exists`
      );
    }
    const isUpdated = await investmentService.updateStatus(req, res);
    return apiResponse.success(res, "record status has been updated");
  } catch (error) {
    next(error);
  }
};
