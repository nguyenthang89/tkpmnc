import { Router } from 'express';
const router = Router();
import "@babel/polyfill"

const { checkDuplicateUsernameOrEmailOrExistRole } = require("../middleware/verifySignUp");
const { signin, signup } = require('../controllers/auth.controller');

// Kiem tra dk login truoc
router.post('/signin', signin);
router.post('/signup', checkDuplicateUsernameOrEmailOrExistRole, signup);
export default router;