import models from '../models';
import { paginate, dynamicSort as sort } from '../utils/pagination';
import { modifiedExist as exists } from '../utils/check';

const findBookmarks = (where, { query }) => new Promise((resolve, reject) => {
  Promise.all([
    models.Bookmark.count({ where }),
    models.Bookmark.findAll({
      ...paginate(query),
      ...sort(query, ['createdAt']),
      where,
      attributes: ['id'],
      include: [
        {
          model: models.Article,
          as: 'article',
          attributes: {
            exclude: ['body_uz', 'body_kr'],
          },
        },
        {
          model: models.User,
          as: 'user',
        },
      ],
    }),
  ]).then(resolve)
    .catch(reject);
});
const get = (req, res) => {
  models.Bookmark.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: models.User,
        as: 'user',
      },
      {
        model: models.Article,
        as: 'article',
      },
    ],
  })
    .then((bookmark) => {
      delete bookmark.dataValues.userId;
      delete bookmark.dataValues.articleId;
      res.status(200).json(bookmark);
    })
    .catch((err) => res.status(502).json(err));
};
const getAll = (req, res) => {
  Promise.all([
    models.Bookmark.count(),
    models.Bookmark.findAll({
      ...paginate(req.query),
      ...sort(req.query, ['createdAt']),
    }),
  ])
    .then(([total, data]) => res.status(200).json({ total, data }))
    .catch((e) => res.status(502).json(e));
};
const getUserBookmarks = async (req, res) => {
  try {
    const condition = await exists(models.User, { id: req.params.id || req.user.id });
    if (condition) {
      const [total, bookmarks] = await findBookmarks({ userId: req.params.id || req.user.id }, req);
      const data = bookmarks.map(({ article }) => article);
      res.status(200).json({ total, data });
    } else {
      res.status(403).json({ message: 'User is not exists' });
    }
  } catch (error) { res.status(502).json(error); }
};
const getArticleBookmarks = async (req, res) => {
  try {
    const condition = await exists(models.Article, { id: req.params.id });
    if (condition) {
      const [total, bookmarks] = await findBookmarks({ articleId: req.params.id }, req);
      const data = bookmarks.map(({ user }) => user);
      res.status(200).json({ total, data });
    } else {
      res.status(403).json({ message: 'Article is not exists' });
    }
  } catch (error) { res.status(502).json(error); }
};
const create = async (req, res) => {
  try {
    const condition = await exists(models.Article, { id: req.params.id });
    if (condition) {
      await models.Bookmark.create({
        userId: req.user.id,
        articleId: Number(req.params.id),
      });
      res.sendStatus(201);
    } else {
      res.status(403).json({ message: 'Article is not exist' });
    }
  } catch (error) {
    res.status(502).json(error);
  }
};
const deleteBookmark = (req, res) => {
  models.Bookmark.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch((error) => res.status(502).json(error));
};
const deleteAll = (req, res) => {
  models.Bookmark.destroy({ where: { userId: req.user.id } })
    .then(() => res.sendStatus(200))
    .catch((error) => res.status(502).json(error));
};

export {
  get,
  getAll,
  getUserBookmarks,
  getArticleBookmarks,
  deleteBookmark,
  deleteAll,
  create,
};
