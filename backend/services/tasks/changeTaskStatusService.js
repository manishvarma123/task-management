import { Task } from "../../models/task.model.js";
import { ApiError } from "../../utils/ApiError.js";


const changeTaskStatusService = async (id,status) => {
    if(!id || !status){
        throw new ApiError(400, "Invalid data provided")
    }

    const task =  await Task.findByIdAndUpdate({_id:id},{$set:{status:status}},{new:true})
    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return {task}
}

export {changeTaskStatusService}