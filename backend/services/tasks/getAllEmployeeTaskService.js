import { TaskGroup } from "../../models/taskGroup.model.js"


const getAllEmployeeTaskService = async (authorId, id) => {

    const tasks = await TaskGroup.find({ author: id })
        .sort({ createdAt: -1 })
        .populate({
            path: "tasks",
            select: "taskTitle status taskImg"
        })

    return {tasks}
}

export {getAllEmployeeTaskService}