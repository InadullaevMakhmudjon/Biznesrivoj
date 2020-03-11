import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import models from '../models';

require('dotenv').config();

function find(where, res, next) {
  models.User.findAll({ where })
    .then((users) => next(users))
    .catch((error) => res.status(502).json(error));
}

export default {
  details(req, res) {
    delete req.user.dataValues.genderId;
    delete req.user.dataValues.roleId;
    res.status(200).json({ user: req.user });
  },
  login(req, res) {
    if (!req.body) res.status(403);

    const { phone, password } = req.body;
    find({ phone }, res, ([user]) => {
      if (user) {
        if (compareSync(password, user.password)) {
          sign({ userId: user.id }, process.env.JWT_KEY, {}, (error, token) => {
            if (error) res.sendStatus(501);
            else {
              models.User.update({ lastLoggedIn: new Date() }, { where: { id: user.id } })
                .then(() => res.status(200).json({ token }));
            }
          });
        } else { res.sendStatus(403); }
      } else { res.sendStatus(403); }
    });
  },
  logout(req, res) {
    models.User.update({
      lastLoggedOut: new Date(),
    }, { where: { id: req.user.id } })
      .then(() => res.send(200))
      .catch((error) => res.status(502).json({ error }));
  },
};
