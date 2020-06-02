import { Router } from 'express';
import * as bookmarks from '../controllers/bookmarks';

const router = Router();

router.get('/', bookmarks.getUserBookmarks);
router.get('/:id', bookmarks.get);
router.get('/user/:id', bookmarks.getUserBookmarks);
router.get('/article/:id', bookmarks.getArticleBookmarks);
router.post('/:id', bookmarks.create);
router.delete('/', bookmarks.deleteAll);
router.delete('/:id', bookmarks.deleteBookmark);

export default router;
