import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        default : 'employee',
        enum : ['manager','employee']
    },
    plan : {
        type : String,
        default : 'basic',
        enum : ['basic','premium','premiumPlus'],
    },
    signature : {
        type : String,
        default : ''
    },
    resumeTimer : {
        type : String,
        default : ''
    },
    stopTimer : {
        type : String,
        default : ''
    },
    token : {
        type: String,
        default : null,
    },
    plan : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Plan"
    }
},{timestamps:true})

export const User = mongoose.model('User',userSchema)