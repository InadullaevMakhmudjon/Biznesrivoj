import { Router } from 'express';
import article from '../controllers/articles';
import {
  check, checkUpdate, validate, validateUpdate,
} from '../utils/validation/article';

const router = Router();

router.get('/', article.getAll);
router.get('/:slug', article.get);
router.post('/like/:id', article.like);
router.post('/:slug', checkUpdate, validateUpdate, article.update);
router.post('/', check, validate, article.create);
router.delete('/:slug', article.delete);

export default router;
