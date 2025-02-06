import { Task } from "../../models/task.model.js"
import { ApiError } from "../../utils/ApiError.js"


const updateTaskService = async (authorId,updatedTask,updatedTaskImg,id) => {
    if (!updatedTask || !id) {
        throw new ApiError(400, "Something is missing please check")
    }

    const task = await Task.findByIdAndUpdate({ _id: id }, { $set: { taskTitle: updatedTask, taskImg: updatedTaskImg } }, { new: true })

    return {task}
}

export { updateTaskService }