import { Router } from 'express';
import passport from 'passport';
import article from '../controllers/articles';
import {
  check, checkUpdate, validate, validateUpdate,
} from '../utils/validation/article';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), article.getAll);
router.get('/:slug', passport.authenticate('jwt', { session: false }), article.get);
router.post('/:slug', passport.authenticate('jwt', { session: false }), checkUpdate, validateUpdate, article.update);
router.post('/', passport.authenticate('jwt', { session: false }), check, validate, article.create);
router.delete('/:slug', passport.authenticate('jwt', { session: false }), article.delete);

export default router;
