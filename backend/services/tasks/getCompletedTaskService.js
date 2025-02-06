import { TaskGroup } from "../../models/taskGroup.model.js"


const getCompletedTaskService = async (authorId) => {
    const allTask = await TaskGroup.find({ author: authorId })
        .sort({ createdAt: -1 })
        .populate({ path: 'tasks', select: "_id taskTitle taskImg status" })

    const completedTasks = allTask?.filter((taskGroup) => {
        return (
            taskGroup?.tasks?.every((task) => task?.status === "completed")
        )
    })

    if(completedTasks?.length === 0){
        return {
            message : "No completed Task group Found",
            data : []
        }
    }

    return {
        message : "completed Task fetched successfully",
        data : completedTasks
    }
}

export { getCompletedTaskService }