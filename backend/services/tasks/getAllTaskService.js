import { TaskGroup } from "../../models/taskGroup.model.js"


const getAllTaskService = async (authorId) => {

    const tasks = await TaskGroup.find({ author: authorId })
        .sort({ createdAt: -1 })
        .populate({
            path: "tasks",
            select: "_id taskTitle status taskImg"
        })

    return {tasks}
}

export { getAllTaskService }