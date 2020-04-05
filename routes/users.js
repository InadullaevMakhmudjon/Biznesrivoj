import { Router } from 'express';
import passport from 'passport';
import user from '../controllers/users';
import {
  check, validate, checkUpdate, validateUpdate,
} from '../utils/validation/user';
import { isNotUser } from '../middlewares/role';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), user.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), user.get);
router.get('/:id/articles', passport.authenticate('jwt', { session: false }), user.getArticles);
router.post('/:id', passport.authenticate('jwt', { session: false }), isNotUser, checkUpdate, validateUpdate, user.update);
router.post('/', passport.authenticate('jwt', { session: false }), isNotUser, check, validate, user.create);
router.delete('/:id', passport.authenticate('jwt', { session: false }), isNotUser, user.delete);

export default router;
