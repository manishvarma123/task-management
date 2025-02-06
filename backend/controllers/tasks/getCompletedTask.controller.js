import { getCompletedTaskService } from "../../services/tasks/getCompletedTaskService.js";
import { ApiError } from "../../utils/ApiError.js";


const getCompletedTask = async (req,res) => {
    try {
        const authorId = req?._id;
        if(!authorId) throw new ApiError(400,"Unauthorized user")

        const {message,data} = await getCompletedTaskService(authorId)

        return res.status(200).json({
            message : message,
            success : true,
            error:false,
            data : data
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server problem',
            success : false,
            error : true
        })
    }
}

export default getCompletedTask