import { Router } from 'express';
import user from '../controllers/users';
import {
  check, validate, checkUpdate, validateUpdate, checkIsExists,
} from '../utils/validation/user';

const router = Router();

router.get('/', user.getAll);
router.get('/editors', user.getAllEditors);
router.get('/:id', user.get);
router.get('/:id/articles', user.getArticles);
router.get('/:id/bookmarks', user.getBookmarks);
router.post('/', check, validate, user.create);
router.post('/exists', checkIsExists);
router.post('/:id', checkUpdate, validateUpdate, user.update);
router.delete('/:id', user.delete);

export default router;
