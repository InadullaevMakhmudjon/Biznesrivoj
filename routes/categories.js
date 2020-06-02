import { Router } from 'express';
import category from '../controllers/categories';
import { check, validate } from '../utils/validation/category';

const router = Router();

router.get('/', category.getAll);
router.get('/:id/articles', category.getArticles);
router.get('/:id', category.get);
router.post('/', check, validate, category.create);
router.post('/:id', check, validate, category.update);
router.delete('/:id', category.delete);

export default router;
