import express from 'express';
import verifyJWT from '../middlewares/auth.middleware.js';
import planSubscription from '../controllers/subscriptions/planSubscription.controller.js';
import verifyPayment from '../controllers/subscriptions/verifyPayment.controller.js';


const router = express.Router();

router.post('/create-plan',verifyJWT,planSubscription);
router.post('/verify-payment',verifyJWT,verifyPayment)



export default router