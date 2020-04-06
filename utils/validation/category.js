import { checkSchema, validationResult } from 'express-validator/check';

export const check = checkSchema({
  desc_uz: {
    isString: true,
    optional: true,
  },
  desc_ru: {
    isString: true,
    optional: true,
  },
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
      desc_uz: req.body.desc_uz,
      desc_ru: req.body.desc_ru,
      name: req.body.name,
    };
    next();
  }
};
