import express from 'express'
import { deleteUser, update } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();


router.post('/update/:id',verifyToken,update);
router.delete('/delete/:id',verifyToken,deleteUser);

export default router