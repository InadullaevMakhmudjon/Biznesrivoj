import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import models from '../models';
import service from '../services/twilio';

require('dotenv').config();

function find(where, res, next) {
  models.User.findAll({ where })
    .then((users) => next(users))
    .catch((error) => res.status(502).json(error));
}

function token({ id, res, isUser }) {
  sign({ userId: isUser || id }, process.env.JWT_KEY, { expiresIn: '12h' }, (error, token) => {
    if (error) res.sendStatus(501);
    else if (isUser) res.status(200).json({ token });
    else {
      models.User
        .update({ lastLoggedIn: new Date() }, { where: { id } })
        .then(() => res.status(200).json({ token }))
        .catch((error) => res.status(502).json(error));
    }
  });
}

export default {
  details(req, res) {
    delete req.user.dataValues.genderId;
    delete req.user.dataValues.roleId;
    res.status(200).json({ user: req.user });
  },
  getToken(req, res) {
    token({ isUser: 1, res });
  },
  loginByPassword(req, res) {
    if (!req.body) res.status(401).json({ message: 'Please fill the form' });

    const { phone, password } = req.body;
    find({ phone }, res, ([user]) => {
      if (user) {
        if (compareSync(password, user.password)) {
          token({ id: user.id, res });
        } else { res.status(401).json({ message: 'Password is incorrect' }); }
      } else { res.status(401).json({ message: 'Phone is not registered yet' }); }
    });
  },
  loginByPhone(req, res) {
    service.verificationChecks.create({
      to: req.phone,
      code: req.code,
    }).then(({ valid }) => {
      if (valid) {
        models.User.findOne({ where: { phone: req.phone } })
          .then((user) => user && token({ id: user.id, res }))
          .catch(() => res.status(502).json('Not valied'));
      } else res.status(401).json({ message: 'Code is not confirmed' });
    }).catch(() => res.status(502).json({ message: 'Ooops, something wend wrong' }));
  },
  logout(req, res) {
    models.User.update({
      lastLoggedOut: new Date(),
    }, { where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: 'Logged out' }))
      .catch((error) => res.status(502).json({ error }));
  },
};
