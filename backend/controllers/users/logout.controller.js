import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";


const logout = async (req,res) => {
    try {
        // const userId = req._id;

        // const user = await User.findById(userId);
        // if(!user){
        //     throw new ApiError(401,"unauthorized User")
        // }

        return res.status(200).cookie("token","",{maxAge:0}).json({
            message : 'User Logged out successfully',
            success : true,
            error : false
        })


    } catch (error) {

        return res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server problem',
            success : false,
            error : true
        })
    }
}

export default logout