import { Router } from 'express';
import files from '../controllers/files';

const router = Router();

router.get('/', files.getAll);
router.get('/today', files.getToday);
router.get('/id/:id', files.get);
router.post('/', files.create);
router.delete('/:id', files.delete);

export default router;
