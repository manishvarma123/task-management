import { taskAPI } from "./api.js";


const createPlan = "create-plan";
const verifyPayment = "verify-payment";


const PLANS = (route) => {
    return `api/v1/plan/${route}`;
}


export default {
    createPlan(payload) {
        return taskAPI.post(PLANS(createPlan),payload)
    },
    verifyPayment (payload) {
        return taskAPI.post(PLANS(verifyPayment), payload)
    }
}