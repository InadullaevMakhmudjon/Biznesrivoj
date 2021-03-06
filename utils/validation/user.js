import { checkSchema, validationResult } from 'express-validator/check';
import { hashSync } from 'bcryptjs';
import models from '../../models';
import { exists, modifiedExist } from '../check';

export const check = checkSchema({
  firstname: {
    isString: true,
  },
  secondname: {
    isString: true,
  },
  phone: {
    isString: true,
    matches: /(?:\+\([9]{2}[8]\)[0-9]{2}\ [0-9]{3}\-[0-9]{2}\-[0-9]{2})/,
    custom: {
      options: (phone) => exists(models.User, { phone }, true),
      errorMessage: 'This phone number already registered',
    },
  },
  password: {
    isString: true,
  },
  genderId: {
    isInt: true,
    custom: {
      options: (id) => exists(models.Gender, { id }),
      errorMessage: 'Specified gender is not exist',
    },
  },
  roleId: {
    isInt: true,
    custom: {
      options: (id) => exists(models.Role, { id }),
      errorMessage: 'Specified role is not exist',
    },
  },
  image: {
    isURL: true,
  },
  quote: {
    isString: true,
  },
  dateOfBirth: {
    isString: true,
  },
});

export const checkUpdate = checkSchema({
  firstname: {
    isString: true,
    optional: true,
  },
  secondname: {
    isString: true,
    optional: true,
  },
  phone: {
    isString: true,
    optional: true,
    matches: /(?:\+\([9]{2}[8]\)[0-9]{2}\ [0-9]{3}\-[0-9]{2}\-[0-9]{2})/,
    custom: {
      options: (phone) => exists(models.User, { phone }, true),
      errorMessage: 'This phone number already registered',
    },
  },
  password: {
    isString: true,
    optional: true,
  },
  genderId: {
    isInt: true,
    optional: true,
    custom: {
      options: (id) => exists(models.Gender, { id }),
      errorMessage: 'Specified gender is not exist',
    },
  },
  roleId: {
    isInt: true,
    optional: true,
    custom: {
      options: (id) => exists(models.Role, { id }),
      errorMessage: 'Specified role is not exist',
    },
  },
  image: {
    isURL: true,
    optional: true,
  },
  quote: {
    isString: true,
    optional: true,
  },
  dateOfBirth: {
    isString: true,
    optional: true,
  },
});

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(403).json(errors.array());
  } else {
    req.newUser = {
      firstname: req.body.firstname,
      secondname: req.body.secondname,
      phone: req.body.phone,
      password: hashSync(req.body.password, 7),
      genderId: req.body.genderId,
      image: req.body.image,
      quote: req.body.quote,
      dateOfBirth: req.body.dateOfBirth,
      roleId: req.body.roleId,
      createdAt: new Date(),
    };
    next();
  }
};

export const validateUpdate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(403).json(errors.array());
  } else {
    req.newUser = {
      ...req.body,
    };
    next();
  }
};

export const checkIsExists = async (req, res) => {
  const { phone } = req.query;
  if (phone) {
    const isExist = await modifiedExist(models.User, { phone: `+${phone}` }, false);
    res.sendStatus(isExist ? 200 : 204);
  } else {
    res.status(403).json({ message: 'Please provide phone' });
  }
};
