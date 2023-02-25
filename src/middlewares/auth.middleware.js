const jwtService = require("../services/jwt.service");
const apiResponse = require("../utils/response.util");

const auth = async (req, res, next) => {
  try {
    //authorization header check
    if (!req.headers["authorization"]) {
      return apiResponse.unauthorizedResponse(
        res,
        "No authorization token found"
      );
    }
    //getting json token
    const token = req.headers["authorization"].split(" ")[1];
    //getting userpayload
    const userPlayload = await jwtService.verifyAccessToken(token);
    req.user = userPlayload;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
};
