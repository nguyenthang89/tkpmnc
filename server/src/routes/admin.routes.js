import { Router } from 'express';
const router = Router();
import "@babel/polyfill"

const { coordinate, getTop5ByCellPhone } = require('../controllers/admin.controller');
import { verifyToken } from '../middleware/auth.middleware';

router.post('/coordinate', verifyToken, coordinate);
router.get('/get-top-5', verifyToken, getTop5ByCellPhone);

export default router;