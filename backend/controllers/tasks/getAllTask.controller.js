import { getAllTaskService } from "../../services/tasks/getAllTaskService.js";


const getAllTask = async (req,res) => {
    try {
        const authorId = req._id;

        const {tasks} = await getAllTaskService(authorId)

        return res.status(200).json({
            message : 'All Task group fetch successfully',
            success : true,
            error : false,
            data : tasks
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server problem',
            success : false,
            error : true
        })
    }
}

export default getAllTask