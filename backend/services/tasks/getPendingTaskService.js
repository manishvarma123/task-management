import { TaskGroup } from "../../models/taskGroup.model.js"


const getPendingTaskService = async (authorId) => {

    const allTask = await TaskGroup.find({ author: authorId })
        .sort({ createdAt: -1 })
        .populate({ path: 'tasks', select: "_id taskTitle taskImg status" })

    const pendingTask = allTask?.filter((taskGroup) => {
        return (
            taskGroup?.tasks?.some((task) => task?.status === "pending")
        )
    })

    if (pendingTask?.length === 0) {
        return res.status(200).json({
            message: "No Pending Task found",
            data: []
        })
    }

    return res.status(200).json({
        message: "Pending task group fetch successfully",
        data: pendingTask
    })

}

export { getPendingTaskService }