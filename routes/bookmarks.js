import { Router } from 'express';
import passport from 'passport';
import * as bookmarks from '../controllers/bookmarks';
import { isNotUser } from '../middlewares/role';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), bookmarks.getUserBookmarks);
router.get('/:id', passport.authenticate('jwt', { session: false }), bookmarks.get);
router.get('/user/:id', passport.authenticate('jwt', { session: false }), isNotUser, bookmarks.getUserBookmarks);
router.get('/article/:id', passport.authenticate('jwt', { session: false }), bookmarks.getArticleBookmarks);
router.post('/:id', passport.authenticate('jwt', { session: false }), isNotUser, bookmarks.create);
router.delete('/', passport.authenticate('jwt', { session: false }), isNotUser, bookmarks.deleteAll);
router.delete('/:id', passport.authenticate('jwt', { session: false }), isNotUser, bookmarks.deleteBookmark);

export default router;
