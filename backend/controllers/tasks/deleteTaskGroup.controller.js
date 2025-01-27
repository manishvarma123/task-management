import { Task } from "../../models/task.model.js";
import { TaskGroup } from "../../models/taskGroup.model.js";
import { ApiError } from "../../utils/ApiError.js";


const deleteTaskGroup = async (req,res) => {
    try {
        const {id} = req.params;

        if(!id) throw new ApiError(400,"Invalid id")

        const taskGroup = await TaskGroup.findById(id)
        if(!taskGroup) throw new ApiError(400,"Task group not found");

        await Promise.all(
            taskGroup?.tasks?.map((task)=>{
                return (
                    Task?.findByIdAndDelete(task)
                )
            })
        )

        const data = await TaskGroup.findByIdAndDelete(id)

        res.status(200).json({
            message : "tasks group deleted successfully",
            success : true,
            error : false,
            data : data
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message : error.message || "Internal server problem",
            error : true,
            success : false
        })
    }
}

export default deleteTaskGroup