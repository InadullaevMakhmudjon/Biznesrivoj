import { Router } from 'express';
import passport from 'passport';
import auth from '../controllers/auth';

const router = Router();

router.post('/login', auth.login);
router.post('/logout', passport.authenticate('jwt', { session: false }), auth.logout);
router.get('/details', passport.authenticate('jwt', { session: false }), auth.details);

export default router;
