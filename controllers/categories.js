import models from '../models';

function find(where, res, next) {
  models.Category.findAll({ where })
    .then((data) => next(data))
    .catch((error) => res.status(502).json({ error }));
}

const sort = ({ views, likes, createdAt }, props) => {
  if (views) return { order: [['views', views]], ...props };
  if (likes) return { order: [['likes', likes]], ...props };
  if (createdAt) return { order: [['createdAt', createdAt]], ...props };
  return { ...props };
};

const paginate = ({ page, limit, ...others }) => sort(others, ((page && limit) ? {
  offset: (page - 1) > 0 ? (page - 1) : 0 * limit,
  limit,
} : {}));

export default {
  getAll(req, res) {
    find(null, res, (data) => res.status(200).json(data));
  },
  getArticles(req, res) {
    models.Article.findAll({
      ...paginate(req.query),
      include: [
        {
          model: models.Category,
          as: 'categories',
          where: { id: req.params.id },
          through: { attributes: [] },
        },
      ],
    }).then((articles) => res.status(200).json(articles))
      .catch((error) => res.status(502).json({ error }));
  },
  get(req, res) {
    find({ id: req.params.id }, res, ([data]) => res.status(200).json(data));
  },
  create(req, res) {
    models.Category.create(req.category)
      .then(() => res.sendStatus(201))
      .catch((error) => res.status(502).json({ error }));
  },
  update(req, res) {
    models.Category.update(req.category, { where: { id: req.params.id } })
      .then(() => res.sendStatus(200))
      .catch((error) => res.status(502).json({ error }));
  },
  async delete(req, res) {
    try {
      await models.ArticleCategory.destroy({ where: { categoryId: req.params.id }, raw: true });
      await models.Category.destroy({ where: { id: req.params.id } });
      res.sendStatus(200);
    } catch (error) { res.status(502).json({ error }); }
  },
};
