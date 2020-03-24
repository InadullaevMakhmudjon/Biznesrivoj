import models from '../models';

export default {
  get(req, res) {
    Promise.all([
      models.Category.findAll(),
      models.Article.findAll({
        include: [
          {
            model: models.User,
            as: 'creator',
            attributes: ['fullName', 'phone', 'image', 'quote'],
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
        ],
      }),
    ]).then(([categories, articles]) => {
      res.status(200).json({
        home: articles,
        categories,
      });
    });
  },
};
