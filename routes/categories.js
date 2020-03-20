import { Router } from 'express';
import passport from 'passport';
import category from '../controllers/categories';
import { check, validate } from '../utils/validation/category';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), category.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), category.get);
router.post('/', passport.authenticate('jwt', { session: false }), check, validate, category.create);
router.post('/:id', passport.authenticate('jwt', { session: false }), check, validate, category.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), category.delete);

export default router;
