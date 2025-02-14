import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


const registerService = async (fullName,email,password) => {
    if (!fullName || !email || !password) {
        throw new ApiError(404, "Something is missing please check");
    }
    if (!email.trim().includes("@") || !email.trim().includes(".")) {
        throw new ApiError(400, "Please give valid email address")
    }
    if (password.trim().length < 6) {
        throw new ApiError(400, "Password should be atleast 6 characters")
    }

    const userExist = await User.findOne({ email })
    if (userExist) {
        throw new ApiError(409, "User already exists please provide different email")
    }

    const hashPassword = await bcrypt.hashSync(password, 10);

    const user = await User.create({
        fullName,
        email,
        password: hashPassword,
    })

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    user.token = token;
    await user.save()

    return {
        token,
        userDetails: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            plan : user.plan,
            signature : user.signature,
            token: user.token
        }
    }
}

export { registerService }