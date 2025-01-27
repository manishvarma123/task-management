
import { Task } from "../../models/task.model.js";
import { ApiError } from "../../utils/ApiError.js";


const changeTaskStatus = async (req,res) => {
    try {
        const {id,status} = req.body;

        if(!id || !status){
            throw new ApiError(400, "Invalid data provided")
        }

        const task =  await Task.findByIdAndUpdate({_id:id},{$set:{status:status}},{new:true})
        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        res.status(200).json({
            message : "status updated successfully",
            success : true,
            error : false,
            data : task
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server problem',
            success : false,
            error : true
        })
    }
}

export default changeTaskStatus