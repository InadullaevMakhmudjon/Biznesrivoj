import { checkSchema, validationResult } from 'express-validator/check';
import models from '../../models';
import { exists } from '../check';

export const check = checkSchema({
  metaFields: { isString: true },
  slug: { isString: true },
  title_uz: { isString: true },
  title_ru: { isString: true },
  body_uz: { isString: true },
  body_ru: { isString: true },
  description_uz: { isString: true },
  description_ru: { isString: true },
  categories: { isArray: true },
});

export const checkUpdate = checkSchema({
  UserId: {
    optional: true,
    isInt: true,
    custom: {
      options: (id) => exists(models.User, { id }),
      errorMessage: 'Given user is not exist',
    },
  },
  metaFields: { isString: true, optional: true },
  slug: { isString: true, optional: true },
  title_uz: { isString: true, optional: true },
  title_ru: { isString: true, optional: true },
  body_uz: { isString: true, optional: true },
  body_ru: { isString: true, optional: true },
  description_uz: { isString: true, optional: true },
  description_ru: { isString: true, optional: true },
  categories: { isArray: true, optional: true },
});

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(403).json(errors.array());
  } else {
    req.article = {
      UserId: req.user.id,
      metaFields: req.body.metaFields,
      slug: req.body.slug,
      title_uz: req.body.title_uz,
      title_ru: req.body.title_ru,
      body_uz: req.body.body_uz,
      body_ru: req.body.body_ru,
      description_uz: req.body.description_uz,
      description_ru: req.body.description_ru,
      categories: req.body.categories,
    };
    next();
  }
};

export const validateUpdate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(403).json(errors.array());
  } else {
    req.article = {
      ...req.body,
    };
    next();
  }
};
