import { Router } from 'express';
import {
  check, validate, checkVerify,
} from '../utils/validation/verify';
import verify from '../controllers/verify';

const router = Router();

router.post('/send', check, validate, verify.send);
router.post('/', checkVerify, validate, verify.verify);

export default router;
