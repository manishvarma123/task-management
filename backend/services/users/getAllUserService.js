import { User } from "../../models/user.model.js";


const getAllUserService = async (authorId) => {

    const user = await User.findById(authorId)
    console.log(user);

    const allUser = await User.find().select('fullName email role plan').sort();

    if (user?.role === 'manager') {
        return {
            message: 'user data fetch successfully',
            data: allUser,
        }
    }

    return {
        message: 'user not authorize to fetch data',
        data: [],
    }

}

export { getAllUserService }