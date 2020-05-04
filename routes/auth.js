import { Router } from 'express';
import passport from 'passport';
import auth from '../controllers/auth';
import { check, validate } from '../utils/validation/auth';

const router = Router();

router.get('/login', auth.getToken);
router.post('/login/password', auth.loginByPassword);
router.post('/login/phone', check, validate, auth.loginByPhone);
router.post('/logout', passport.authenticate('jwt', { session: false }), auth.logout); // Only for updating User's lastLoggedIn prop
router.get('/details', passport.authenticate('jwt', { session: false }), auth.details);

export default router;
