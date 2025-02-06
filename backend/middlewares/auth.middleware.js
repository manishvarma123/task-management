import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';


const verifyJWT = async (req,res,next) => {
    try {
        const {token} = req.cookies;

        if(!token){
            throw new ApiError(401, "Unauthorized User");
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){
            throw new ApiError(401, "Unauthorized User")
        }

        req._id = decoded?.userId;

        const verifyUser = await User.findById(req._id)

        if(!verifyUser){
            throw new ApiError(401, "Unauthorized User")
        }

        if(token !== verifyUser?.token){
            throw new ApiError(401, "Unauthorized User")
        }
        
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