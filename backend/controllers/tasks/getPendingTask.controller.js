import { getPendingTaskService } from "../../services/tasks/getPendingTaskService.js";


const getPendingTask = async (req,res) => {
    try {
        const authorId = req._id;

        const {message,data} = await getPendingTaskService(authorId)
        
        return res.status(200).json({
            message: message,
            success: true,
            error: false,
            data: data
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || "Internal server problem",
            success : false,
            error : true
        })
    }
}

export default getPendingTask