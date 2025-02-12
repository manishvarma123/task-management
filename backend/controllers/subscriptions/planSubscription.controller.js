import { createOrderService } from "../../services/subscriptions/createOrderService.js";


const planSubscription = async (req, res) => {
    try {
        const { plan,amount } = req.body;
        // console.log(plan,12);
        

        const order = await createOrderService(plan,amount)

        return res.status(200).json({
            message : "order created successfully",
            data : order,
            success : true,
            error : false
        })


    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "internal server problem",
            error: true,
            success: false
        })
    }
}

export default planSubscription