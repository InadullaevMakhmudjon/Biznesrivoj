import { Router } from 'express';
import passport from 'passport';
import files from '../controllers/files';
import { isNotUser } from '../middlewares/role';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), files.getAll);
router.get('/today', passport.authenticate('jwt', { session: false }), files.getToday);
router.get('/id/:id', passport.authenticate('jwt', { session: false }), files.get);
router.post('/', passport.authenticate('jwt', { session: false }), isNotUser, files.create);
router.delete('/:id', passport.authenticate('jwt', { session: false }), isNotUser, files.delete);

export default router;
