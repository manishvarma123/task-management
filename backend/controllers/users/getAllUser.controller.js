import { getAllUserService } from "../../services/users/getAllUserService.js";

const getAllUser = async(req,res) => {
    try {
        const authorId = req._id;

        const {message, data} = await getAllUserService(authorId)

        return res.status(200).json({
            message : message,
            data : data,
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

export default getAllUser