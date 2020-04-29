import moment from 'moment';
import fs from 'fs';
import models from '../models';
import { paginate, sortByCreatedAt as sort } from '../utils/pagination';

require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:3040';

function find(where, query, res) {
  Promise.all([
    models.File.count({ where }),
    models.File.findAll({
      where,
      ...paginate(query),
      ...sort(query),
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
    if (req.files) {
      const { file } = req.files;
      const filename = `${new Date().toISOString()}-${file.name}`;
      file.mv(`./files/${filename}`, (err) => {
        if (err) { res.status(500).json(err); } else {
          models.File.create({ url: `${BASE_URL}/files/${filename}` })
            .then(() => res.status(201).json({ url: `${BASE_URL}/files/${filename}` }))
            .catch((error) => res.status(502).json(error));
        }
      });
    } else {
      res.status(403).json({ message: 'file currupted or larger than expected' });
    }
  },
  delete(req, res) {
    models.File.findByPk(req.params.id).then((file) => {
      const path = `./files/${file.url.split('/')[2]}`;
      fs.unlink(path, () => {
        models.File.destroy({ where: { id: req.params.id } })
          .then((item) => res.status(200))
          .catch((error) => res.status(502).json(error));
      });
    });
  },
};
