import { checkSchema, validationResult } from 'express-validator/check';
import models from '../../models';
import { exists } from '../check';

export const check = checkSchema({
  metaFields: { isString: true },
  slug: { isString: true },
  image: { isString: true },
  title_uz: { isString: true },
  title_kr: { isString: true },
  body_uz: { isString: true },
  body_kr: { isString: true },
  description_uz: { isString: true },
  description_kr: { isString: true },
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
  title_kr: { isString: true, optional: true },
  body_uz: { isString: true, optional: true },
  body_kr: { isString: true, optional: true },
  description_uz: { isString: true, optional: true },
  image: { isString: true, optional: true },
  description_kr: { isString: true, optional: true },
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
      title_kr: req.body.title_kr,
      body_uz: req.body.body_uz,
      body_kr: req.body.body_kr,
      description_uz: req.body.description_uz,
      description_kr: req.body.description_kr,
      categories: req.body.categories,
      image: req.body.image,
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
