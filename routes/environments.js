import { Router } from 'express';
import environments from '../controllers/environments';

const router = Router();

router.post('/', environments.get);

export default router;
