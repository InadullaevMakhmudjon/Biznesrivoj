import { Router } from 'express';
import passport from 'passport';
import home from '../controllers/home';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), home.get);

export default router;
