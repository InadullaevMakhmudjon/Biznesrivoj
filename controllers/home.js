import models from '../models';

export default {
  get(req, res) {
    models.Category.findAll({ raw: true }).then((categories) => {
      const tasks = [];
      categories.forEach((category) => {
        tasks.push(new Promise((resolve, reject) => {
          models.Article.findAll({
            limit: 5,
            attributes: {
              exclude: ['body_uz', 'body_ru'],
            },
            order: [['createdAt', 'DESC']],
            include: [{
              model: models.Category,
              attributes: [],
              as: 'categories',
              where: { id: category.id },
            }],
          })
            .then((article) => resolve({ ...category, article }))
            .catch((error) => reject(error));
        }));
      });
      Promise.all(tasks)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(502).json({ error }));
    });
  },
};
