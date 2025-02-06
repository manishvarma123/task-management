import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const register = async (req,res) => {
    try {
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password){
            throw new ApiError(404, "Something is missing please check");
        }
        if(!email.trim().includes("@") || !email.trim().includes(".")){
            throw new ApiError(400, "Please give valid email address")
        }
        if(password.trim().length < 6){
            throw new ApiError(400, "Password should be atleast 6 characters")
        }

        const userExist = await User.findOne({email})
        if(userExist){
            throw new ApiError(409, "User already exists please provide different email")
        }

        const hashPassword = await bcrypt.hashSync(password,10);

        const user = await User.create({
            fullName,
            email,
            password : hashPassword,
        })
        
        const token = await jwt.sign({userId : user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '15d'});

        user.token = token;
        await user.save()

        await res.status(201).cookie('token',token,{httpOnly:true,secure:true, sameSite:'None', maxAge: 15*24*60*60*1000}).json({
            message : "User created successfully",
            data : {
                fullName : user.fullName,
                email : user.email,
                role : user.role,
                token : user.token
            },
            success : true,
            error : false
        })


    } catch (error) {
        console.log(error);
        
        res.status(error.statusCode || 500).json({
            message : error.message || "Internal Server Problem",
            error : true,
            success : false
        })
    }
}

export default register