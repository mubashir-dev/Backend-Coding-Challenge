const jwtService = require("../services/jwt.service");
const apiResponse = require("../utils/response.util");
const roleService = require("../services/role.service");

const hasAccess = (method, access) => {
  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  if (methods.includes(method) && access == false) {
    return true;
  }
  return false;
};
const acl = async (req, res, next) => {
  try {
    const { role } = req.user;
    const { access } = await roleService.find({ id: role._id }, next);
    const { method } = req;

    if (hasAccess(method, access.read)) {
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
