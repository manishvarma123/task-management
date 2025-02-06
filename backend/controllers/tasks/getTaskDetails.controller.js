import { getTaskDetailsService } from "../../services/tasks/getTaskDetailsService.js";


const getTaskDetails = async(req,res) => {
    try {
        const {id} = req.params;

        const {data} = await getTaskDetailsService(id)


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