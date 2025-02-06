import { Task } from "../../models/task.model.js";
import { ApiError } from "../../utils/ApiError.js";


const deleteTaskService = async (id) => {
    if (!id) throw new ApiError(400, "id not found");

    const deleteTask = await Task.findByIdAndDelete(id);

    if (!deleteTask) throw new ApiError(400, "task not found")

    return {deleteTask}

}

export { deleteTaskService }