const ObjectId = require("mongoose").Types.ObjectId;
const apiResponse = require("../utils/response.util");
const investmentTypeService = require("../services/investmenttypes.service");

// index;
exports.index = async (req, res, next) => {
  try {
    const data = await investmentTypeService.findAll(req, res, next);
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
    const data = await investmentTypeService.find(filterObject, next);
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
    const { title } = req.body;
    const nameExist = await investmentTypeService.check({ title: title });
    if (nameExist) {
      return apiResponse.validationConflict(
        res,
        `This '${req.body.title}' title already exists`
      );
    }
    const data = await investmentTypeService.store(req, res, next);
    return apiResponse.recordCreated(res, "record has been created", data);
  } catch (error) {
    next(error);
  }
};

//update
exports.update = async (req, res, next) => {
  try {
    const roleUpdate = await investmentTypeService.check({
      _id: req.params.id,
    });
    if (!roleUpdate) {
      return apiResponse.notFound(
        res,
        `The  record with this id '${req.params.id}' doesn't exists`
      );
    }
    const isUpdated = await investmentTypeService.edit(req, res, next);
    return apiResponse.success(res, "record has been updated");
  } catch (error) {
    next(error);
  }
};

//delete
exports.delete = async (req, res, next) => {
  try {
    const removeRole = await investmentTypeService.check({
      _id: req.params.id,
    });
    if (!removeRole) {
      return apiResponse.notFound(
        res,
        `The  record with this id '${req.body.title}' doesn't exists`
      );
    }
    const isDeleted = await investmentTypeService.remove(req, res);
    if (!isDeleted) {
      return apiResponse.Error(res, "record has not been deleted");
    }
    return apiResponse.success(res, "record has been deleted");
  } catch (error) {
    next(error);
  }
};
