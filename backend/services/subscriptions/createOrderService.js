import { ApiError } from "../../utils/ApiError.js";
import razorpayInstance from "../../utils/razorpayInstance .js";



const createOrderService = async (plan,amount) => {
    // console.log(plan,amount);
    
    // let amount = 0;
    // if (plan === "premium") {
    //     amount = 199;
    // } else if (plan === "premiumPlus") {
    //     amount = 399;
    // } else if (plan === "basic") {
    //     amount = 0;
    // } else {
    //     throw new ApiError(400, "Invalid plan selected")
    // }

    if((plan !== 'basic') && (plan !== 'premium') && (plan !== 'premiumPlus')){
        throw new ApiError(400, "Invalid plan selected")
    }


    const options = {
        amount: amount * 100,
        currency: 'INR',
        receipt: `receipt_order_${Math.random()}`,
        payment_capture: 1
    };

    const order = await razorpayInstance.orders.create(options);

    return order
}

export { createOrderService }