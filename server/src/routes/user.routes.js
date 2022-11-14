import { Router } from 'express';
const router = Router();
import "@babel/polyfill"
import { createUser, getUser, getAdminInfo, deleteUser, updateUsers } from '../controllers/users.controller';
// const { createUser, getUser, getUsers, deleteUser, updateUsers } = require('../controllers/users.controller';

router.post('/getAdminInfo', getAdminInfo);
router.post('/updateUsers', updateUsers);

export default router;