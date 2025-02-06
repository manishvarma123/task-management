import { updateTaskService } from "../../services/tasks/updateTaskService.js";


const updateTask = async (req,res) => {
    try {
        const authorId = req._id;
        const {updatedTask,updatedTaskImg} = req.body;
        const {id} = req.params;

        const {task} = await updateTaskService(authorId,updatedTask,updatedTaskImg,id)

        return res?.status(200).json({
            message : "task updated successfully",
            success : true,
            error : false,
            data : task
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server problem',
            success : false,
            error : true
        })
    }
}

export default updateTask