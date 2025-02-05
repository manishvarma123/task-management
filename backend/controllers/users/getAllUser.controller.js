import { User } from "../../models/user.model.js";


const getAllUser = async(req,res) => {
    try {
        const authorId = req._id;

        const user = await User.findById(authorId)
        console.log(user);

        if(user?.role !== 'manager'){
            res.status(200).json({
                message : 'user not authorize to fetch data',
                data : [],
                success : true,
                error : false
            })
        }

        const allUser = await User.find().select('fullName email role').sort();

        res.status(200).json({
            message : 'user data fetch successfully',
            data : allUser,
            success : true,
            error : false
        })
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server problem',
            success : false,
            error : true
        })
    }
}

export default getAllUser