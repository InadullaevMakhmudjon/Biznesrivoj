import { Router } from 'express';
import home from '../controllers/home';

const router = Router();

router.get('/', home.get);

export default router;
