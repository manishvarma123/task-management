import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const login = async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            throw new ApiError(400,"Something is missing please check");
        }

        const user = await User.findOne({email});

        if(!user){
            throw new ApiError(404, "User not found")
        }

        const isPasswordMatch = await bcrypt.compare(password,user?.password)

        if(!isPasswordMatch){
            throw new ApiError(404,"Invalid email or pasword")
        }

        const token = await jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY,{expiresIn:'15d'})

        await res.status(200).cookie('token',token,{httpOnly:true,secure:true,sameSite:'None',maxAge: 15*24*60*60*1000,}).json({
            message : 'User LoggedIn successfully',
            data : {
                fullName : user.fullName,
                email : user.email,
                role : user.role
            },
            success : true,
            error : false
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server error',
            success : false,
            error : true
        })
    }
}

export default login