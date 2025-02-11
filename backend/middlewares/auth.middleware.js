import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';


const verifyJWT = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        const userId = req.get('userId');
        console.log(userId,12)

        if(!token){
            throw new ApiError(401, "Unauthorized User2");
        }

        const verifyUser = await User.findOne({token : token})

        // console.log(verifyUser._id.toString());
        

        if(!verifyUser || userId !== verifyUser._id.toString()){
            throw new ApiError(401, "Unauthorized User1")
        }

        req._id = userId
        
        next();
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server problem',
            success : false,
            error : true
        })
    }
}

export default verifyJWT