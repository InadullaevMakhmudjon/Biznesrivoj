import models from '../models';

export default {
  get(req, res) {
    models.Category.findAll({
      include: [
        {
          model: models.Article,
          as: 'articles',
          through: { attributes: [] },
        },
      ],
    }).then((categories) => {
      categories.forEach((category) => { category.articles.splice(5, categories.length); });
      res.status(200).json(categories);
    });
  },
};
