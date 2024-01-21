const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { _id } = req.params;
  if (!isValidObjectId(_id)) {
    next(HttpError(400, `${_id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
