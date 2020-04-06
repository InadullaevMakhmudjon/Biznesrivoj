import models from '../models';

function find(where, res, next) {
  models.Article.findAll({
    where,
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
  })
    .then((articles) => {
      articles.forEach((article) => {
        delete article.dataValues.UserId;
        delete article.creator.dataValues.genderId;
        delete article.creator.dataValues.roleId;
      });
      next(articles);
    })
    .catch((error) => res.status(502).json({ error }));
}

export default {
  getAll(req, res) {
    find(null, res, (articles) => res.status(200).json(articles));
  },
  get(req, res) {
    find({ slug: req.params.slug }, res, ([article]) => res.status(200).json(article));
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
          .then(() => res.sendStatus(200));
      }).catch((error) => res.status(502).json({ error }));
  },
  update(req, res) {
    models.Article.update(req.article, { where: { slug: req.params.slug } })
      .then(async () => {
        const article = await models.Article.findOne({ where: { slug: req.params.slug }, include: [{ model: models.Category, as: 'categories' }] });
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
