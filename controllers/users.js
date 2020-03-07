import models from '../models';

function find(where, res, next) {
  models.User.findAll({
    where,
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: models.Gender,
        as: 'gender',
      },
      {
        model: models.Role,
        as: 'role',
      },
    ],
  })
    .then((users) => next(users))
    .catch((error) => res.status(502).json({ error }));
}

export default {
  getAll(req, res) {
    find(null, res, (users) => res.status(200).json(users));
  },
  get(req, res) {
    find({ id: req.params.id }, res, ([user]) => {
      res.status(200).json(user);
    });
  },
  update(req, res) {
    models.User.update(req.newUser, { where: { id: req.params.id } })
      .then(() => res.send(200))
      .catch((error) => res.status(502).json(error));
  },
  create(req, res) {
    models.User.create(req.newUser)
      .then(() => res.send(201))
      .catch((error) => res.status(502).json(error));
  },
  delete(req, res) {
    models.User.destroy({ where: { id: req.params.id } })
      .then(() => res.send(200))
      .json((error) => res.status(502).json(error));
  },
};
