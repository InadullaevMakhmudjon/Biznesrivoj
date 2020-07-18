import { Router } from 'express';
import credentials from '../controllers/credentials';

const router = Router();

router.post('/', credentials.get);

export default router;
