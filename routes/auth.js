import { Router } from 'express';
import passport from 'passport';
import auth from '../controllers/auth';

const router = Router();

router.get('/login', auth.getToken);
router.post('/login', auth.login);
router.post('/logout', passport.authenticate('jwt', { session: false }), auth.logout); // Only for updating User's lastLoggedIn prop
router.get('/details', passport.authenticate('jwt', { session: false }), auth.details);

export default router;
