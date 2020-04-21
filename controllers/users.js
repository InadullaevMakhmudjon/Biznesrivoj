import models from '../models';
import { paginate } from '../utils/pagination';

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
    .then((users) => {
      users.forEach((user) => {
        delete user.dataValues.genderId;
        delete user.dataValues.roleId;
      });
      next(users);
    })
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
  getArticles(req, res) {
    Promise.all([
      models.Article.count({ where: { UserId: req.params.id } }),
      models.Article.findAll({
        where: { UserId: req.params.id },
        ...paginate(req.query),
        include: [
          {
            model: models.Category,
            as: 'categories',
            through: { attributes: [] },
          },
        ],
      }),
    ])
      .then(([total, data]) => {
        data.forEach((article) => { delete article.dataValues.UserId; });
        res.status(200).json({ total, data });
      });
  },
  update(req, res) {
    models.User.update(req.newUser, { where: { id: req.params.id } })
      .then(() => res.sendStatus(200))
      .catch((error) => res.status(502).json(error));
  },
  create(req, res) {
    models.User.create(req.newUser)
      .then(() => res.sendStatus(201))
      .catch((error) => res.status(502).json(error));
  },
  delete(req, res) {
    models.User.destroy({ where: { id: req.params.id } })
      .then(() => res.sendStatus(200))
      .catch((error) => res.status(502).json(error));
  },
};
