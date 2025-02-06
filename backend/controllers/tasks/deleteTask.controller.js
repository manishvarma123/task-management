import { deleteTaskService } from "../../services/tasks/deleteTaskService.js";


const deleteTask = async (req,res) => {
    try {
        const {id} = req.params;

        const {deleteTask} = deleteTaskService(id)

    
        return res.status(200).json({
            message : "task deleted successfully",
            success : true,
            error : false,
            data : deleteTask
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || "Internal server problem",
            error : true,
            success : false
        })
    }
}

export default deleteTask