import { TaskGroup } from "../../models/taskGroup.model.js";


const getAllTask = async (req,res) => {
    try {
        const authorId = req._id;

        const tasks = await TaskGroup.find({author:authorId})
            .sort({createdAt:-1})
            .populate({
                path:"tasks",
                select : "_id taskTitle status taskImg"
            })

        res.status(200).json({
            message : 'All Task group fetch successfully',
            success : true,
            error : false,
            data : tasks
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server problem',
            success : false,
            error : true
        })
    }
}

export default getAllTask