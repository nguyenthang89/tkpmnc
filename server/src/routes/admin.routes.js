import { Router } from 'express';
const router = Router();
import "@babel/polyfill"

const { coordinate, getTop5ByCellPhone, sendMessageForDriver } = require('../controllers/admin.controller');
import { verifyToken } from '../middleware/auth.middleware';

router.post('/coordinate', verifyToken, coordinate);
router.post('/get-top-5', verifyToken, getTop5ByCellPhone);
router.post('/send-message', verifyToken, sendMessageForDriver);

export default router;