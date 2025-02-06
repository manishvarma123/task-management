

const getAllEmployeeTask = async (req,res) =>{
    try {
        const authorId = req._id;
        const {id} = req.params;

        const {tasks} = await getAllEmployeeTaskService(authorId,id)

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