import { Router } from 'express';
import passport from 'passport';
import user from '../controllers/users';
import {
  check, validate, checkUpdate, validateUpdate,
} from '../utils/validation/user';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), user.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), user.get);
router.post('/:id', passport.authenticate('jwt', { session: false }), checkUpdate, validateUpdate, user.update);
router.post('/', passport.authenticate('jwt', { session: false }), check, validate, user.create);
router.delete('/:id', passport.authenticate('jwt', { session: false }), user.delete);

export default router;
