import { Task } from "../../models/task.model.js";
import { ApiError } from "../../utils/ApiError.js";


const deleteTask = async (req,res) => {
    try {
        const {id} = req.params;

        if(!id) throw new ApiError(400,"id not found");

        const deleteTask = await Task.findByIdAndDelete(id);

        if(!deleteTask) throw new ApiError(400, "task not found")

        return res.status(200).json({
            message : "task deleted successfully",
            success : true,
            error : false,
            data : deleteTask
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || "Internal server problem",
            error : true,
            success : false
        })
    }
}

export default deleteTask