import { Router } from 'express';
const router = Router();
import "@babel/polyfill"

const { coordinate } = require('../controllers/admin.controller');
import { verifyToken } from '../middleware/auth.middleware';

router.post('/coordinate', verifyToken, coordinate);


export default router;