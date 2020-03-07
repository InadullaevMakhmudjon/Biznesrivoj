import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import models from '../models';

require('dotenv').config();

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
}, ({ userId }, callBack) => {
  models.User.findByPk(userId, {
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: models.Gender,
        as: 'gender',
      },
      {
        model: models.Role,
        as: 'role',
      },
    ],
  })
    .then((user) => callBack(null, user))
    .catch((error) => callBack(error, false));
}));
