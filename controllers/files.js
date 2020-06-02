import models from '../models';
import { paginate, dynamicSort as sort } from '../utils/pagination';

require('dotenv').config();

function find(where, query, res) {
  Promise.all([
    models.File.count({ where }),
    models.File.findAll({
      where,
      ...paginate(query),
      ...sort(query, ['createdAt']),
    }),
  ]).then(([total, data]) => res.status(200).json({ total, data }))
    .catch((error) => res.status(502).json(error));
}

export default {
  getAll(req, res) {
    find(null, req.query, res);
  },
  getToday(req, res) {
    const op = models.Sequelize.Op;
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();
    find({
      createdAt: {
        [op.gt]: TODAY_START,
        [op.lt]: NOW,
      },
    }, req.query, res);
  },
  get(req, res) {
    models.File.findByPk(req.params.id)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(502).json(error));
  },
  create(req, res) {
    models.File.create({ url: req.body.url })
      .then(() => res.status(201).json(req.body))
      .catch((error) => res.status(502).json(error));
  },
  delete(req, res) {
    models.File.findByPk(req.params.id).then((file) => {
      models.File.destroy({ where: { id: req.params.id } })
        .then(() => res.sendStatus(200))
        .catch((error) => res.status(502).json(error));
    });
  },
};
