const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { contactId } = req.params;
      if (contactId) {
        if (!Object.keys(req.body).length) {
          next(HttpError(400, `missing fields`));
        } else {
          next(HttpError(400, error.message));
        }
      } else {
        const requiredFields = ['name', 'email', 'phone'];
        const missingFields = requiredFields.filter(
          fieldName => !Object.keys(req.body).includes(fieldName)
        );
        if (missingFields.length > 0) {
          const label = missingFields.join(', ');
          next(HttpError(400, `missing required ${label} field(s)`));
        }
      }
    }
    next();
  };
  return func;
};

module.exports = validateBody;
