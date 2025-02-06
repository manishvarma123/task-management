import { loginService } from "../../services/users/loginService.js";

const login = async (req,res) => {
    try {
        const {email, password} = req.body;

        const {token,userDetails} = await loginService(email,password)

        return res.status(200).cookie('token',token,{httpOnly:true,secure:true,sameSite:'None',maxAge: 15*24*60*60*1000,}).json({
            message : 'User LoggedIn successfully',
            data : userDetails,
            success : true,
            error : false
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server error',
            success : false,
            error : true
        })
    }
}

export default login