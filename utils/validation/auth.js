import { checkSchema, validationResult } from 'express-validator/check';
import models from '../../models';
import { modifiedExist } from '../check';


export const check = checkSchema({
  phone: {
    isString: true,
    custom: {
      options: (phone) => modifiedExist(models.User, { phone }),
      errorMessage: 'Phone is not found',
    },
  },
  code: {
    isString: true,
  },
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
