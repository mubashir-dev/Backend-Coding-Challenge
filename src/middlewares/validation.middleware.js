const apiResponse = require("../utils/response.util");

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return apiResponse.validationErrorWithData(res, error.errors);
  }
};

module.exports = { validate };
