import { Router } from 'express';
import auth from '../controllers/auth';

const router = Router();

router.get('/login', auth.getToken);
router.post('/login', auth.loginByPassword);
router.post('/logout/:id', auth.logout); // Only for updating User's lastLoggedIn prop
router.get('/details', auth.details);

export default router;
