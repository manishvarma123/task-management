
import { verifyPaymentService } from '../../services/subscriptions/verifyPaymentService.js';


const verifyPayment = async (req,res) => {
    try {
        const authorId = req?._id
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature,plan } = req.body;

        const {message,data} = await verifyPaymentService(razorpay_payment_id, razorpay_order_id, razorpay_signature,authorId,plan)

        return res.status(200).json({
            message : message,
            data,
            success : true,
            error : false,
        })


    } catch (error) {
        res.status(error.statusCode || 500).json({
            message : error.message || "Internal server problem",
            success : false,
            error :true
        })
    }
}

export default verifyPayment