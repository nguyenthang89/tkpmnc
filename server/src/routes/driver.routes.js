import { Router } from 'express';
const router = Router();
import "@babel/polyfill"

const { infoUpd, latLongUpd, topNearby, getInfoDriver } = require('../controllers/driver.controller');
import { verifyToken } from '../middleware/auth.middleware';
// Kiem tra dk login truoc
router.post('/info-driver-upd', verifyToken, infoUpd);
router.post('/lat-long-upd', verifyToken, latLongUpd);
router.post('/top-nearby', verifyToken, topNearby);
router.post('/get-info-driver', verifyToken, getInfoDriver);


export default router;