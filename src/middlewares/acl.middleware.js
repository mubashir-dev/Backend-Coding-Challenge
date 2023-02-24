const jwtService = require("../services/jwt.service");

const auth = async (req, res, next) => {
  try {
    const user = req.user;
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
