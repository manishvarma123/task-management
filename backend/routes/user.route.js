import express from 'express';
import register from '../controllers/users/register.controller.js';
import login from '../controllers/users/login.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';
import logout from '../controllers/users/logout.controller.js';
import getAllUser from '../controllers/users/getAllUser.controller.js';
import setSignature from '../controllers/users/signature.controller.js';
import saveResumeTimer from '../controllers/users/saveResumeTime.controller.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.post('/get-all-user',verifyJWT,getAllUser)
router.put('/signature',verifyJWT,setSignature)
router.post('/resume-timer',verifyJWT,saveResumeTimer)

export default router