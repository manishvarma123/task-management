import { deleteTaskGroupService } from "../../services/tasks/deleteTaskGroupService.js";

const deleteTaskGroup = async (req,res) => {
    try {
        const {id} = req.params;

        const {data} = await deleteTaskGroupService(id)

        return res.status(200).json({
            message : "tasks group deleted successfully",
            success : true,
            error : false,
            data : data
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || "Internal server problem",
            error : true,
            success : false
        })
    }
}

export default deleteTaskGroup