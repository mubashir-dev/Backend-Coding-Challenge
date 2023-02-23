const ObjectId = require("mongoose").Types.ObjectId;
const apiResponse = require("../utils/response.util");
const roleService = require("../services/role.service");

// index;
exports.index = async (req, res, next) => {
  try {
    const data = await roleService.findAll(req, res, next);
    return apiResponse.successData(res, "request processed successfully", data);
  } catch (error) {
    next(error);
  }
};

//show
exports.find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await roleService.find(req, res, next);
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
    const nameExist = await roleService.check({ title: title });
    if (nameExist) {
      return apiResponse.validationConflict(
        res,
        `This '${req.body.title}' title already exists`
      );
    }
    const data = await roleService.store(req, res, next);
    return apiResponse.recordCreated(res, "record has been created", data);
  } catch (error) {
    next(error);
  }
};

//update
exports.update = async (req, res, next) => {
  try {
    const roleUpdate = await roleService.check({ _id: req.params.id });
    if (!roleUpdate) {
      return apiResponse.notFound(
        res,
        `The  record with this id '${req.params.id}' doesn't exists`
      );
    }
    const isUpdated = await roleService.edit(req, res, next);
    return apiResponse.success(res, "record has been updated");
  } catch (error) {
    next(error);
  }
};

//delete
exports.delete = async (req, res, next) => {
  try {
    const removeRole = await roleService.check({ _id: req.params.id });
    if (!removeRole) {
      return apiResponse.notFound(
        res,
        `The  record with this id '${req.body.title}' doesn't exists`
      );
    }
    const isDeleted = await roleService.remove(req, res);
    if (isDeleted) {
      return apiResponse.success(res, "record has been deleted");
    }
    return apiResponse.Error(res, "record has not been deleted");
  } catch (error) {
    next(error);
  }
};
