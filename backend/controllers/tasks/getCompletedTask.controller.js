import { TaskGroup } from "../../models/taskGroup.model.js";
import { ApiError } from "../../utils/ApiError.js";


const getCompletedTask = async (req,res) => {
    try {
        const authorId = req?._id;
        if(!authorId) throw new ApiError(400,"Unauthorized user")

        const allTask = await TaskGroup.find({author:authorId})
            .sort({createdAt : -1})
            .populate({path:'tasks',select:"_id taskTitle status"})

        const completedTasks = allTask?.filter((taskGroup)=>{
            return(
                taskGroup?.tasks?.every((task)=>task?.status === "completed")
            )
        })

        if(completedTasks?.length === 0){
            return res.status(200).json({
                message : "No completed Task group Found",
                success : true,
                error:false,
                data : []
            })
        }

        return res.status(200).json({
            message : "completed Task fetched successfully",
            success : true,
            error:false,
            data : completedTasks
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server problem',
            success : false,
            error : true
        })
    }
}

export default getCompletedTask