const ObjectId = require("mongoose").Types.ObjectId;
const apiResponse = require("../utils/response.util");
const userService = require("../services/user.service");

// index;
exports.index = async (req, res, next) => {
  try {
    const data = await userService.findAll(req, res, next);
    return apiResponse.successData(res, "request processed successfully", data);
  } catch (error) {
    next(error);
  }
};

//show
exports.find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await userService.find(req, res, next);
    if (!data[0]) {
      return apiResponse.notFound(
        res,
        `The  record with this id '${id}' doesn't exists`
      );
    }
    return apiResponse.successData(
      res,
      "request processed successfully",
      data[0]
    );
  } catch (error) {
    next(error);
  }
};

//create
exports.create = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExists = await userService.check({ email: email });
    if (emailExists) {
      return apiResponse.validationConflict(
        res,
        `This '${req.body.email}' email has already taken`
      );
    }
    const data = await userService.store(req, res, next);
    return apiResponse.recordCreated(
      res,
      "user record has been created",
      data["_id"]
    );
  } catch (error) {
    next(error);
  }
};

//update
exports.update = async (req, res, next) => {
  try {
    const userUpdate = await userService.check({ _id: req.params.id });
    if (!userUpdate) {
      return apiResponse.notFound(
        res,
        `The  user with this id '${req.params.id}' doesn't exists`
      );
    }
    if (userUpdate.email != req.body.email) {
      const userEmailExists = await userService.check({
        email: req.body.email,
      });
      if (userEmailExists) {
        return apiResponse.notFound(
          res,
          `This '${req.body.email}' has already been taken`
        );
      }
    }
    const isUpdated = await userService.edit(req, res, next);
    return apiResponse.success(res, "record has been updated");
  } catch (error) {
    next(error);
  }
};

//status
exports.status = async (req, res, next) => {
  try {
    const userUpdate = await userService.check({ _id: req.params.id });
    if (!userUpdate) {
      return apiResponse.notFound(
        res,
        `The  user with this id '${req.params.id}' doesn't exists`
      );
    }
    const isUpdated = await userService.updateStatus(req, res, next);
    return apiResponse.success(res, "record status has been updated");
  } catch (error) {
    next(error);
  }
};

//change password
exports.changePassword = async (req, res, next) => {
  try {
    const userUpdate = await userService.check({ _id: req.params.id });
    if (!userUpdate) {
      return apiResponse.notFound(
        res,
        `The  user with this id '${req.params.id}' doesn't exists`
      );
    }
    const isUpdated = await userService.changePassword(req, res, next);
    return apiResponse.success(res, "user password has been updated");
  } catch (error) {
    next(error);
  }
};

//delete
exports.delete = async (req, res, next) => {
  try {
    const removeUser = await userService.check({ _id: req.params.id });
    if (!removeUser) {
      return apiResponse.notFound(
        res,
        `The  record with this id '${req.body.title}' doesn't exists`
      );
    }
    const isDeleted = await userService.remove(req, res);
    if (isDeleted) {
      return apiResponse.success(res, "record has been deleted");
    }
    return apiResponse.Error(res, "record has not been deleted");
  } catch (error) {
    next(error);
  }
};
