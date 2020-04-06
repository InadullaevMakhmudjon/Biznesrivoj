import { Router } from 'express';
import passport from 'passport';
import article from '../controllers/articles';
import {
  check, checkUpdate, validate, validateUpdate,
} from '../utils/validation/article';
import { isNotUser } from '../middlewares/role';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), article.getAll);
router.post('/like/:id', passport.authenticate('jwt', { session: false }), article.like);
router.get('/:slug', passport.authenticate('jwt', { session: false }), isNotUser, article.get);
router.post('/:slug', passport.authenticate('jwt', { session: false }), isNotUser, checkUpdate, validateUpdate, article.update);
router.post('/', passport.authenticate('jwt', { session: false }), isNotUser, check, validate, article.create);
router.delete('/:slug', passport.authenticate('jwt', { session: false }), isNotUser, article.delete);

export default router;
