import express from 'express';
import register from '../controllers/users/register.controller.js';
import login from '../controllers/users/login.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';
import logout from '../controllers/users/logout.controller.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout)

export default router