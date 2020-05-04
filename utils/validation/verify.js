import { checkSchema, validationResult } from 'express-validator/check';

const phone = {
  matches: {
    options: [/^\+9989[012345789][0-9]{7}$/],
  },
  errorMessage: 'This is not looks like phone',
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
