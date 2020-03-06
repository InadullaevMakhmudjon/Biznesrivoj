import { Router } from 'express';
import passport from 'passport';
import auth from '../controllers/auth';

const router = Router();

router.get('/login', auth.login);
router.get('/hello', (req, res) => res.status(200).json({ message: 'HelloWorld!!' }));
router.get('/helloAuth', passport.authenticate('jwt', { session: false }), (req, res) => res.status(200).json({ message: 'HelloWorld!!' }));

export default router;
