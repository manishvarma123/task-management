import { User } from "../../models/user.model.js";


const saveResumeTimer = async (req,res) => {
    try {
        const authorId = req?._id;
        const {day,hour,minute,second} = req.body;
        const stringTimer = `${day}:${hour}:${minute}:${second}`

        if(!authorId){
            throw new ApiError(400, 'signature is missing')
        }
    
        const user = await User.findById(authorId);
        if(!user){
            throw new ApiError(404, 'User not found');
        }
    
        user.resumeTimer = stringTimer;
    
        await user.save();
    
        return {
            message : 'ResumeTimer saved successfully',
            data : user.resumeTimer,
            success : true,
            error : false
        }
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server error',
            success : false,
            error : true
        })
    }
}

export default saveResumeTimer