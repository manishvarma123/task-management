import mongoose from 'mongoose';

const planSchema = mongoose.Schema({

    authorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    name : {
        type : String,
    },
    email : {
        type : String
    },
    subscriptionType : {
        type : String,
        enum : ["basic", "premium", "premiumPlus" ],
        required : true,
        default : "basic"
    },
    expiry_date: {
        type : Date,
    },
    razorpay_payment_id : {
        type : String,
    },
    razorpay_order_id : {
        type : String
    }

},{timestamps:true})

export const Plan = mongoose.model("Plan",planSchema)