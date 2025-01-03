import { TaskGroup } from "../../models/taskGroup.model.js"


const getPendingTask = async (req,res) => {
    try {
        const authorId = req._id;
        const allTask = await TaskGroup.find({author:authorId})
            .sort({createdAt : -1})    
            .populate({path:'tasks',select:"_id taskTitle status"})

        const pendingTask = allTask?.filter((taskGroup)=>{
            return (
                taskGroup?.tasks?.some((task)=>task?.status === "pending")
            )
        })

        if(pendingTask?.length === 0){
            return res.status(200).json({
                message : "No Pending Task found",
                success : true,
                error : false,
                data : []
            })
        }

        return res.status(200).json({
            message : "Pending task group fetch successfully",
            success : true,
            error : false,
            data : pendingTask
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || "Internal server problem",
            success : false,
            error : true
        })
    }
}

export default getPendingTask