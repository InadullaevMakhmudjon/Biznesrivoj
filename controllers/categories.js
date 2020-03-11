import models from '../models';

function find(where, res, next) {
  models.Category.findAll({ where })
    .then((data) => next(data))
    .catch((error) => res.status(502).json({ error }));
}

export default {
  getAll(req, res) {
    find(null, res, (data) => res.status(200).json(data));
  },
};
