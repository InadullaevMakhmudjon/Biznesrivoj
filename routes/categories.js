import { Router } from 'express';
import passport from 'passport';
import category from '../controllers/categories';
import { check, validate } from '../utils/validation/category';
import { isNotUser } from '../middlewares/role';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), category.getAll);
router.get('/:id/articles', passport.authenticate('jwt', { session: false }), category.getArticles);
router.get('/:id', passport.authenticate('jwt', { session: false }), category.get);
router.post('/', passport.authenticate('jwt', { session: false }), isNotUser, check, validate, category.create);
router.post('/:id', passport.authenticate('jwt', { session: false }), isNotUser, check, validate, category.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), isNotUser, category.delete);

export default router;
