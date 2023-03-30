import express from 'express';
import { login, logout, register } from "../controllers/UserController.js";
import { refreshToken } from '../controllers/RefreshToken.js';
var router = express.Router();

router.post('/login',login)

router.post('/register', register)

router.get('/token', refreshToken)

router.delete('/logout', logout)

export default router