import { Router } from 'express';
const router = Router();
import "@babel/polyfill"

const { infoUpd, latLongUpd, topNearby } = require('../controllers/driver.controller');

// Kiem tra dk login truoc
router.post('/info-driver-upd', infoUpd);
router.post('/lat-long-upd', latLongUpd);
router.get('/top-nearby', topNearby);


export default router;