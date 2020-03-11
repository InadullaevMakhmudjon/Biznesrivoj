import { Router } from 'express';
import passport from 'passport';
import category from '../controllers/categories';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), category.getAll);

export default router;
