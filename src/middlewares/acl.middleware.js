const jwtService = require("../services/jwt.service");
const apiResponse = require("../utils/response.util");
const roleService = require("../services/role.service");

const acl = async (req, res, next) => {
  try {
    const { role } = req.user;
    const { access } = await roleService.find({ id: role._id }, next);
    const { method } = req;

    if (method == "GET" && access.read == false) {
      return apiResponse.forbiddenResponse(res, "Permission denied");
    }
    if (method == "POST" && access.write == false) {
      return apiResponse.forbiddenResponse(res, "Permission denied");
    }
    if (method == "PUT" && access.update == false) {
      return apiResponse.forbiddenResponse(res, "Permission denied");
    }
    if (method == "PATCH" && access.update == false) {
      return apiResponse.forbiddenResponse(res, "Permission denied");
    }
    if (method == "DELETE" && access.delete == false) {
      return apiResponse.forbiddenResponse(res, "Permission denied");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  acl,
};
