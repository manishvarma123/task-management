import { Task } from "../../models/task.model.js";
import { ApiError } from "../../utils/ApiError.js";


const updateTask = async (req,res) => {
    try {
        const authorId = req._id;
        const {updatedTask} = req.body;
        const {id} = req.params;
        
        if(!updatedTask || !id){
            throw new ApiError(400,"Something is missing please check")
        }

        const task = await Task.findByIdAndUpdate({_id : id},{$set : {taskTitle : updatedTask}},{new:true})

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