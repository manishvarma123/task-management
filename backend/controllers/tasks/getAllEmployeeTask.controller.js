import { TaskGroup } from "../../models/taskGroup.model.js";


const getAllEmployeeTask = async (req,res) =>{
    try {
        const authorId = req._id;
        const {id} = req.params;

        const tasks = await TaskGroup.find({author : id})
            .sort({createdAt : -1})
            .populate({
                path : "tasks",
                select : "taskTitle status taskImg"
            })

        return res.status(200).json({
            message : 'All Task group fetch successfully',
            data : tasks,
            success : true,
            error : false
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server problem',
            success : false,
            error : true
        })
    }
}

export default getAllEmployeeTask