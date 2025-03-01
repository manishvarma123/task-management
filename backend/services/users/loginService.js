import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const loginService = async (email, password) => {
    if (!email || !password) {
        throw new ApiError(400, "Something is missing please check");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordMatch = await bcrypt.compare(password, user?.password)

    if (!isPasswordMatch) {
        throw new ApiError(404, "Invalid email or pasword")
    }

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

    user.token = token;
    

    const currentTime = new Date();
    if(user.planExpiry < currentTime){
        user.plan = "basic"
    }

    await user.save();

    return {
        token,
        userDetails: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            plan : user.plan,
            signature : user.signature,
            token: user.token,
            plan: user.plan ,
            planExpiry : user.planExpiry ,

        }
    }
}

export { loginService }