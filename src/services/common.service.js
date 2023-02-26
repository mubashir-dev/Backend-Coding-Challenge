//checking for duplication
exports.check = async (_model, filter) => {
  try {
    const isExists = await _model.findOne(filter);
    return isExists;
  } catch (error) {
    return error;
  }
};
