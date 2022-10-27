import { Router } from 'express';
const router = Router();
import "@babel/polyfill"
import { createUser, getUser, getUsers, deleteUser, updateUsers } from '../controllers/users.controller';
// const { createUser, getUser, getUsers, deleteUser, updateUsers } = require('../controllers/users.controller';

router.get('/getUsers', getUsers);
router.get('/updateUsers', updateUsers);

export default router;