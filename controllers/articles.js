import models from '../models';
import { paginate, dynamicSort as sort, types } from '../utils/pagination';

export function viewed(articles) {
  const tasks = articles.map(({ id }) => new Promise((res, rej) => {
    models.Article.increment({ views: 1 }, { where: { id } })
      .then(() => res()).catch((error) => rej(error));
  }));
  return Promise.all(tasks);
}

function find(query, where, res, next, condition) {
  Promise.all([
    models.Article.count({ where }),
    models.Article.findAll({
      where,
      ...paginate(query),
      ...sort(query, types.ARTICLE),
      attributes: {
        exclude: condition ? [] : ['body_uz', 'body_ru'],
      },
      include: [
        {
          model: models.User,
          as: 'creator',
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              model: models.Role,
              as: 'role',
            },
            {
              model: models.Gender,
              as: 'gender',
            },
          ],
        },
        {
          model: models.Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    }),
  ])
    .then(async ([total, articles]) => {
      await viewed(articles);
      articles.forEach((article) => {
        delete article.dataValues.UserId;
        delete article.creator.dataValues.genderId;
        delete article.creator.dataValues.roleId;
      });
      next({ total, data: articles });
    })
    .catch((error) => res.status(502).json({ error }));
}

function getUserOwn({ user, query }, res, next) {
  const where = user.role.id === 1 ? null : { UserId: user.id };
  Promise.all([
    models.Article.count({ where }),
    models.Article.findAll({
      where,
      ...paginate(query),
      include: [
        {
          model: models.Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    }),
  ]).then(async ([total, data]) => {
    await viewed(data);
    next(total, data);
  })
    .catch((error) => res.status(502).json({ error }));
}

export default {
  getAll(req, res) {
    const { own } = req.query;
    if (own) getUserOwn(req, res, (total, data) => res.status(200).json({ total, data }));
    else find(req.query, null, res, (articles) => res.status(200).json(articles));
  },
  get(req, res) {
    models.Article.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: models.Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    })
      .then(async (article) => {
        if (article) {
          await viewed([article]);
          res.status(200).json(article);
        } else {
          res.status(404).json({ message: 'Given slug is not exist' });
        }
      })
      .catch((err) => res.status(502).json(err));
  },
  like(req, res) {
    models.Article.increment({ likes: 1 }, { where: { id: req.params.id } })
      .then(() => res.sendStatus(200))
      .catch((error) => res.status(502).json({ error }));
  },
  create(req, res) {
    models.Article.create(req.article)
      .then((article) => {
        article.setCategories(req.article.categories)
          .then(() => res.sendStatus(201));
      }).catch((error) => res.status(502).json({ error }));
  },
  update(req, res) {
    models.Article.update(req.article, { where: { slug: req.params.slug } })
      .then(async () => {
        const article = await models.Article.findOne({
          where: { slug: req.article.slug ? req.article.slug : req.params.slug },
          include: [{ model: models.Category, as: 'categories' }],
        });
        if (req.article.categories) {
          await article.removeCategories(article.categories);
          await article.setCategories(req.article.categories);
          res.sendStatus(200);
        } else {
          res.sendStatus(200);
        }
      }).catch((error) => res.status(502).json({ error }));
  },
  delete(req, res) {
    models.Article.findOne({ where: { slug: req.params.slug }, include: [{ model: models.Category, as: 'categories' }] })
      .then(async (article) => {
        if (article) {
          await article.removeCategories(article.categories);
          await article.destroy();
          res.sendStatus(200);
        } else {
          res.status(202).json({ message: 'Given slug is not found' });
        }
      })
      .catch((error) => res.status(502).json({ error }));
  },
};
