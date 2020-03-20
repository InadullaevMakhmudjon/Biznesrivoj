import { checkSchema, validationResult } from 'express-validator/check';

export const check = checkSchema({
  name: {
    isString: true,
  },
});

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(403).json(errors.array());
  } else {
    req.category = {
      name: req.body.name,
    };
    next();
  }
};
