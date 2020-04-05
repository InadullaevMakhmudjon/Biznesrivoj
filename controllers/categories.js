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
  getArticles(req, res) {
    models.Category.findByPk(req.params.id, {
      include: {
        model: models.Article,
        as: 'articles',
        through: { attributes: [] },
      },
    }).then((category) => res.status(200).json(category))
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
