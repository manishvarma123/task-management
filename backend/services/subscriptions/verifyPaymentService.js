import crypto from 'crypto';
import { User } from '../../models/user.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { Plan } from '../../models/plan.model.js';

const verifyPaymentService = async (razorpay_payment_id, razorpay_order_id, razorpay_signature, authorId,plan) => {

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');



    if (expectedSignature === razorpay_signature) {

        let user = await User.findById(authorId)
        if (!user) {
            throw new ApiError(404, "User not found")
        }

        let subscription = await Plan.create({
            authorId: authorId,
            name : user.fullName ,
            email : user.email,
            subscriptionType : plan ,
            expiry_date :  '',
            razorpay_payment_id : razorpay_payment_id,
            razorpay_order_id : razorpay_order_id
        })

        await subscription.save()

        user.plan = subscription.subscriptionType;

        user.save()


        return {
            message: 'Payment verified successfully!'
        }
    } else {
        return {
            message: 'Payment verification failed.'
        }
    }

}

export { verifyPaymentService }