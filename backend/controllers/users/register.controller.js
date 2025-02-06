import { registerService } from "../../services/users/registerService.js";

const register = async (req,res) => {
    try {
        const {fullName, email, password} = req.body;

        const {token, userDetails} = await registerService(fullName,email,password)

        return res.status(201).cookie('token',token,{httpOnly:true,secure:true, sameSite:'None', maxAge: 15*24*60*60*1000}).json({
            message : "User created successfully",
            data : userDetails,
            success : true,
            error : false
        })


    } catch (error) {
        console.log(error);
        
        return res.status(error.statusCode || 500).json({
            message : error.message || "Internal Server Problem",
            error : true,
            success : false
        })
    }
}

export default register