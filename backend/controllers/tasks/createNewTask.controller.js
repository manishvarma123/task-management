import { Task } from "../../models/task.model.js";
import { TaskGroup } from "../../models/taskGroup.model.js";
import { ApiError } from "../../utils/ApiError.js";


const createNewTask = async (req, res) => {
    try {
        const authorId = req._id;
        const { title, tasks } = req.body

        if (!title || !Array.isArray(tasks) || tasks.length < 1) {
            throw new ApiError(400, "Something is missing please check")
        }

        let taskGroup = await TaskGroup.create({
            taskGroupTitle: title,
            author: authorId,
            tasks: []
        })

        const createdTasks = await Promise.all(
            tasks.map((task) => {
                if(!task.value) throw new ApiError(400, "Task value is missing");
                return Task.create({
                    taskTitle: task.value,
                    taskImg : task.taskImg,
                    groupId: taskGroup._id
                })

            })
        )

        const taskIds = await createdTasks.map(task => task._id)

        taskGroup.tasks = taskIds;
        await TaskGroup.findByIdAndUpdate({_id:taskGroup._id},{$set:{tasks:taskIds}},{new:true})
        // await taskGroup.save();

        return res.status(201).json({
            message : "Task group and Task created successfully",
            success : true,
            error : false,
            data : taskGroup
        })


    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "internal server problem",
            error: true,
            success: false
        })
    }
}

export default createNewTask