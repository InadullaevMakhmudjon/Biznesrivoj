import models from '../models';
import { paginate, categoryArticleSort as sort } from '../utils/pagination';
import { viewed } from './articles';

function find(where, res, next) {
  models.Category.findAll({ where })
    .then((data) => next(data))
    .catch((error) => res.status(502).json({ error }));
}

export default {
  getAll(req, res) {
    find(null, res, (data) => res.status(200).json(data));
  },
  getArticles(req, res) {
    Promise.all([
      models.ArticleCategory.count({ where: { categoryId: req.params.id } }),
      models.Article.findAll({
        ...paginate(req.query),
        ...sort(req.query),
        attributes: {
          exclude: ['body_uz', 'body_ru'],
        },
        include: [
          {
            model: models.Category,
            as: 'categories',
            where: { id: req.params.id },
            through: { attributes: [] },
          },
        ],
      }),
    ]).then(async ([total, data]) => {
      await viewed(data);
      res.status(200).json({ total, data });
    })
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
