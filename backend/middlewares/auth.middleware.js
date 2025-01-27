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
        next();
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server problem',
            success : false,
            error : true
        })
    }
}

export default verifyJWT