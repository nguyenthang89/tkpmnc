import { Router } from 'express';
const router = Router();
import "@babel/polyfill"

const { coordinate, getTop5ByCellPhone, getNewOrder } = require('../controllers/admin.controller');
import { verifyToken } from '../middleware/auth.middleware';

router.post('/coordinate', verifyToken, coordinate);
router.post('/get-top-5', verifyToken, getTop5ByCellPhone);
router.post("/get-new-order", verifyToken, getNewOrder);

export default router;