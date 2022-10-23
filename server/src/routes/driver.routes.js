import { Router } from 'express';
const router = Router();
import "@babel/polyfill"

const { infoUpd, latLongUpd, topNearby } = require('../controllers/driver.controller');
import { verifyToken } from '../middleware/auth.middleware';
// Kiem tra dk login truoc
router.post('/info-driver-upd', verifyToken, infoUpd);
router.post('/lat-long-upd', verifyToken, latLongUpd);
router.get('/top-nearby', topNearby);


export default router;