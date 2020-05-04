import models from '../models';
import { paginate, dynamicSort as sort, types } from '../utils/pagination';
import { viewed } from './articles';

function find(query, where, res, next) {
  Promise.all([
    models.User.count({ where }),
    models.User.findAll({
      where,
      ...paginate(query),
      ...sort(query, types.USER),
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
    }),
  ])
    .then(([total, users]) => {
      users.forEach((user) => {
        delete user.dataValues.genderId;
        delete user.dataValues.roleId;
      });
      next({ total, data: users });
    })
    .catch((error) => res.status(502).json({ error }));
}

export default {
  getAll(req, res) {
    find(req.query, null, res, (users) => res.status(200).json(users));
  },
  get(req, res) {
    models.User.findOne({ where: { id: req.params.id } })
      .then((user) => res.status(200).json(user))
      .catch((error) => res.status(502).json(error));
  },
  getAllEditors(req, res) {
    find(req.query, { roleId: 2 }, res, (users) => res.status(200).json(users));
  },
  getArticles(req, res) {
    Promise.all([
      models.Article.count({ where: { UserId: req.params.id } }),
      models.Article.findAll({
        where: { UserId: req.params.id },
        ...paginate(req.query),
        ...sort(req.query, types.ARTICLE),
        include: [
          {
            model: models.Category,
            as: 'categories',
            through: { attributes: [] },
          },
        ],
      }),
    ])
      .then(async ([total, data]) => {
        await viewed(data);
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
