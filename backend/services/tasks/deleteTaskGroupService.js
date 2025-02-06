import { Task } from "../../models/task.model.js";
import { TaskGroup } from "../../models/taskGroup.model.js";
import { ApiError } from "../../utils/ApiError.js";


const deleteTaskGroupService = async (id) => {
    if (!id) throw new ApiError(400, "Invalid id")

    const taskGroup = await TaskGroup.findById(id)
    if (!taskGroup) throw new ApiError(400, "Task group not found");

    await Promise.all(
        taskGroup?.tasks?.map((task) => {
            return (
                Task?.findByIdAndDelete(task)
            )
        })
    )

    const data = await TaskGroup.findByIdAndDelete(id)

    return {data}
}

export { deleteTaskGroupService }