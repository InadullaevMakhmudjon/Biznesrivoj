import { checkSchema, validationResult } from 'express-validator/check';
import { modifiedExist } from '../check';
import models from '../../models';

const phone = {
  isString: true,
  custom: {
    options: (phone) => modifiedExist(models.User, { phone }, true),
    errorMessage: 'Phone already exist',
  },
};

export const check = checkSchema({ phone });

export const checkVerify = checkSchema({
  phone,
  code: { isString: true },
});

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(403).json(errors.array());
  } else {
    req.phone = req.body.phone;
    req.code = req.body.code;
    next();
  }
};
