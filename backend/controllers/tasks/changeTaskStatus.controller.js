
import { changeTaskStatusService } from "../../services/tasks/changeTaskStatusService.js";


const changeTaskStatus = async (req,res) => {
    try {
        const {id,status} = req.body;

        const {task} = await changeTaskStatusService(id,status)

        return res.status(200).json({
            message : "status updated successfully",
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

export default changeTaskStatus