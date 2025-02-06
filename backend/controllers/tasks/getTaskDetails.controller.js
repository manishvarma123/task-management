import { TaskGroup } from "../../models/taskGroup.model.js";


const getTaskDetails = async(req,res) => {
    try {
        const {id} = req.params;

        const data = await TaskGroup.findById(id)
            .populate({
                path : "tasks",
                select : "_id taskTitle taskImg status"
            })

        return res.status(200).json({
            message : "Task details fetch successfully",
            data : data,
            success : true,
            error : false
        })
        
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || "Internal server problem",
            success : false,
            error : true
        })
    }
}

export default getTaskDetails