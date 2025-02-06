import { createNewTaskService } from "../../services/tasks/createNewTaskService.js";


const createNewTask = async (req, res) => {
    try {
        const authorId = req._id;
        const { title, tasks } = req.body

        const {taskGroup} = await createNewTaskService(authorId,title,tasks)

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