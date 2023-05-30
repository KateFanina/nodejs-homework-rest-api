const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (!Object.keys(req.body).length) {
        next(HttpError(400, `missing fields`));
      }
      const requiredFields = ['name', 'email', 'phone'];
      const missingFields = requiredFields.filter(
        fieldName => !Object.keys(req.body).includes(fieldName)
      );
      if (missingFields.length > 0 && !req.baseUrl.includes('users')) {
        const label = missingFields.join(', ');
        next(HttpError(400, `missing required ${label} field(s)`));
      } else {
        next(HttpError(400, error.message));
      }
    }
    next();
  };
  return func;
};

module.exports = validateBody;
